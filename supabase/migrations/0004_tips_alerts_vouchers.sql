-- ============================================================================
-- Phase 2
--  * Tips, "Variant A": TipTap never touches money. The guest is sent to the
--    venue's or the waiter's own payment page (Revolut, myPOS, bank, Stripe
--    Payment Link…). We only record that the guest opened it.
--  * Funnel events: scan → rating → tip click → Google click.
--  * Low-rating alerts (Telegram + email) and the weekly email report.
--  * Recovery vouchers for unhappy guests (the owner switches them on/off).
--  * Multilingual rating page (review language) and spam protection
--    (per-device / per-IP limits; the captcha is verified in the
--    `submit-review` Edge Function, which is now the only way to write a review).
-- ============================================================================

-- ---------- Tip links ---------------------------------------------------------
alter table restaurants add column tip_url text;     -- default for the venue
alter table waiters     add column tip_url text;     -- personal link, wins over the venue's

-- ---------- Alerts, weekly report, vouchers (per venue) ----------------------
alter table restaurants
  add column notify_email       text,
  add column notify_low_rating  boolean  not null default true,
  add column weekly_report      boolean  not null default true,
  add column telegram_chat_id   bigint,
  add column telegram_link_code text unique,
  add column voucher_enabled    boolean  not null default false,
  add column voucher_title      text     not null default 'Безплатен десерт при следващото посещение',
  add column voucher_valid_days int      not null default 30 check (voucher_valid_days between 1 and 365),
  add column voucher_max_rating smallint not null default 2  check (voucher_max_rating between 1 and 3);

-- ---------- Reviews: language + anonymous spam fingerprints -------------------
-- device_hash / ip_hash are salted SHA-256 hashes made in the Edge Function;
-- the raw device id and IP address are never stored.
alter table reviews
  add column lang        text,
  add column device_hash text,
  add column ip_hash     text;

create index idx_reviews_device on reviews (device_hash, created_at desc);
create index idx_reviews_ip     on reviews (ip_hash, created_at desc);

-- ---------- Funnel events -----------------------------------------------------
create table events (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  waiter_id     uuid not null references waiters (id) on delete cascade,
  type          text not null check (type in ('scan', 'tip_click', 'google_click')),
  session_id    text not null,                 -- one rating-page visit
  amount        numeric(10,2),                 -- tip the guest picked (intent only)
  created_at    timestamptz not null default now(),
  unique (session_id, waiter_id, type)         -- each visit counts once per step
);

create index idx_events_restaurant on events (restaurant_id, created_at desc);

alter table events enable row level security;

create policy events_select on events for select to authenticated
  using (restaurant_id = auth_restaurant_id());

-- ---------- Recovery vouchers -------------------------------------------------
create table vouchers (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  review_id     uuid not null unique references reviews (id) on delete cascade,
  code          text not null unique,
  title         text not null,
  expires_at    timestamptz not null,
  redeemed_at   timestamptz,
  created_at    timestamptz not null default now()
);

create index idx_vouchers_restaurant on vouchers (restaurant_id, created_at desc);

alter table vouchers enable row level security;

create policy vouchers_select on vouchers for select to authenticated
  using (restaurant_id = auth_restaurant_id());
create policy vouchers_update on vouchers for update to authenticated
  using (restaurant_id = auth_restaurant_id())
  with check (restaurant_id = auth_restaurant_id());

-- ============================================================================
-- Public surface
-- ============================================================================

-- Rating screen info, now with the tip link (a payment page meant for guests).
drop function if exists rating_target(text);
create function rating_target(p_slug text)
returns table (
  waiter_id       uuid,
  waiter_name     text,
  waiter_role     text,
  avatar_url      text,
  restaurant_name text,
  restaurant_city text,
  logo_url        text,
  tip_url         text
)
language sql stable security definer set search_path = public
as $$
  select w.id, w.name, w.role, w.avatar_url,
         r.name, r.city, r.logo_url,
         coalesce(nullif(w.tip_url, ''), nullif(r.tip_url, ''))
  from waiters w
  join restaurants r on r.id = w.restaurant_id
  where w.slug = p_slug and w.active;
$$;

revoke all on function rating_target(text) from public;
grant execute on function rating_target(text) to anon, authenticated;

-- Funnel tracking from the rating page (scan / tip click / Google click).
create or replace function track_event(
  p_slug    text,
  p_type    text,
  p_session text,
  p_amount  numeric default null
)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_waiter waiters%rowtype;
begin
  if p_type not in ('scan', 'tip_click', 'google_click') then
    raise exception 'unknown event type';
  end if;
  if p_session is null or length(p_session) not between 8 and 64 then
    raise exception 'invalid session';
  end if;

  select * into v_waiter from waiters where slug = p_slug and active;
  if not found then
    return;
  end if;

  insert into events (restaurant_id, waiter_id, type, session_id, amount)
  values (v_waiter.restaurant_id, v_waiter.id, p_type, p_session,
          case when p_type = 'tip_click' and p_amount between 0 and 500 then p_amount end)
  on conflict (session_id, waiter_id, type) do nothing;
end;
$$;

revoke all on function track_event(text, text, text, numeric) from public;
grant execute on function track_event(text, text, text, numeric) to anon, authenticated;

-- Store a guest review. Called ONLY by the `submit-review` Edge Function
-- (service role), after it has verified the captcha and hashed device / IP.
drop function if exists submit_review(text, smallint, text, text[], numeric);
create function submit_review(
  p_slug        text,
  p_rating      smallint,
  p_comment     text    default null,
  p_tags        text[]  default '{}',
  p_lang        text    default null,
  p_device_hash text    default null,
  p_ip_hash     text    default null
)
returns table (
  review_id          uuid,
  restaurant_id      uuid,
  waiter_name        text,
  restaurant_name    text,
  is_public          boolean,
  google_review_url  text,
  tip_url            text,
  voucher_code       text,
  voucher_title      text,
  voucher_expires_at timestamptz
)
language plpgsql security definer set search_path = public
as $$
#variable_conflict use_column
declare
  v_waiter  waiters%rowtype;
  v_rest    restaurants%rowtype;
  v_review  uuid;
  v_code    text;
  v_expires timestamptz;
begin
  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'rating must be between 1 and 5';
  end if;

  select * into v_waiter from waiters where slug = p_slug and active;
  if not found then
    raise exception 'unknown or inactive waiter';
  end if;
  select * into v_rest from restaurants where id = v_waiter.restaurant_id;

  -- Spam limits:
  --   one review per device per waiter every 12 h,
  --   at most 5 reviews per device per day,
  --   at most 20 reviews per IP address per hour (a busy venue's Wi-Fi).
  if p_device_hash is not null then
    if exists (
      select 1 from reviews
      where device_hash = p_device_hash and waiter_id = v_waiter.id
        and created_at > now() - interval '12 hours'
    ) then
      raise exception 'rate_limited: device_waiter';
    end if;
    if (select count(*) from reviews
        where device_hash = p_device_hash and created_at > now() - interval '24 hours') >= 5 then
      raise exception 'rate_limited: device_day';
    end if;
  end if;
  if p_ip_hash is not null
     and (select count(*) from reviews
          where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= 20 then
    raise exception 'rate_limited: ip_hour';
  end if;

  insert into reviews (waiter_id, restaurant_id, rating, comment, tags, is_public,
                       lang, device_hash, ip_hash)
  values (v_waiter.id, v_waiter.restaurant_id, p_rating,
          nullif(left(coalesce(p_comment, ''), 2000), ''),
          coalesce(p_tags[1:12], '{}'),
          p_rating >= 4,
          left(p_lang, 8), p_device_hash, p_ip_hash)
  returning id into v_review;

  -- Recovery voucher for an unhappy guest, if the owner has switched it on.
  if v_rest.voucher_enabled and p_rating <= v_rest.voucher_max_rating then
    v_code    := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
    v_expires := now() + make_interval(days => v_rest.voucher_valid_days);
    insert into vouchers (restaurant_id, review_id, code, title, expires_at)
    values (v_rest.id, v_review, v_code, v_rest.voucher_title, v_expires);
  end if;

  return query select
    v_review,
    v_rest.id,
    v_waiter.name,
    v_rest.name,
    p_rating >= 4,
    case when p_rating >= 4 then v_rest.google_review_url end,
    coalesce(nullif(v_waiter.tip_url, ''), nullif(v_rest.tip_url, '')),
    v_code,
    case when v_code is not null then v_rest.voucher_title end,
    v_expires;
end;
$$;

revoke all on function submit_review(text, smallint, text, text[], text, text, text)
  from public, anon, authenticated;
grant execute on function submit_review(text, smallint, text, text[], text, text, text)
  to service_role;
