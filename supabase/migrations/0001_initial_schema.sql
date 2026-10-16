-- ============================================================================
-- TipTap — Initial database schema (Phase 1: real rating flow)
-- Target: Supabase / PostgreSQL 15+
--
-- Design notes
--  * The PUBLIC (guest) surface is exposed ONLY through SECURITY DEFINER
--    RPC functions (rating_target / submit_review / submit_inquiry). Guests
--    never touch the tables directly, so we can't leak private 1–3★ feedback
--    or other restaurants' data.
--  * Managers (authenticated users) read/write their own restaurant's rows
--    through Row Level Security (RLS) policies.
--  * Waiter stats (rating, review count, tips) are computed from `reviews`
--    via the `waiter_stats` view — no stale denormalised counters.
-- ============================================================================

-- ---------- Enums ----------------------------------------------------------
create type user_role          as enum ('owner', 'manager', 'staff');
create type order_type         as enum ('card', 'stand', 'both');
create type card_color         as enum ('black', 'white');
create type order_status       as enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
create type subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled');

-- ---------- Tables ---------------------------------------------------------

-- A restaurant / venue. One owner (auth user), many staff profiles.
create table restaurants (
  id                uuid primary key default gen_random_uuid(),
  owner_id          uuid references auth.users (id) on delete set null,
  name              text not null,
  slug              text not null unique,            -- branding / public URL
  city              text,
  address           text,
  logo_url          text,
  google_review_url text,                            -- "write a review" deep link
  created_at        timestamptz not null default now()
);

-- App user ↔ restaurant ↔ role. id == auth.users.id.
create table profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  restaurant_id uuid references restaurants (id) on delete cascade,
  full_name     text,
  role          user_role not null default 'manager',
  created_at    timestamptz not null default now()
);

-- A waiter. `slug` is the short code encoded on the NFC card / QR.
create table waiters (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  slug          text not null unique,                -- goes on the card / QR
  name          text not null,
  role          text not null default 'Сервитьор',
  avatar_url    text,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- A guest review. is_public = true for 4–5★ (shown / sent to Google),
-- false for 1–3★ (private feedback routed to the manager only).
create table reviews (
  id            uuid primary key default gen_random_uuid(),
  waiter_id     uuid not null references waiters (id) on delete cascade,
  restaurant_id uuid not null references restaurants (id) on delete cascade,
  rating        smallint not null check (rating between 1 and 5),
  comment       text,
  tags          text[] not null default '{}',
  tip_amount    numeric(10,2) not null default 0 check (tip_amount >= 0),
  is_public     boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Contact-form submissions ("Пишете ни").
create table inquiries (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants (id) on delete set null,
  name          text not null,
  contact       text not null,
  subject       text,
  message       text not null,
  handled       boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Physical card / stand orders (used fully in Phase 3).
create table card_orders (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants (id) on delete set null,
  contact_name  text,
  contact_email text,
  contact_phone text,
  card_color    card_color not null default 'black',
  type          order_type not null default 'card',
  quantity      int not null check (quantity > 0),
  custom_text   text,
  logo          text,
  total_price   numeric(10,2),
  status        order_status not null default 'pending',
  created_at    timestamptz not null default now()
);

-- SaaS subscription per restaurant (used fully in Phase 3).
create table subscriptions (
  id                uuid primary key default gen_random_uuid(),
  restaurant_id     uuid not null unique references restaurants (id) on delete cascade,
  plan              text,
  price             numeric(10,2),
  status            subscription_status not null default 'trialing',
  next_billing_date date,
  card_limit        int,
  created_at        timestamptz not null default now()
);

-- ---------- Indexes --------------------------------------------------------
create index idx_waiters_restaurant on waiters (restaurant_id);
create index idx_reviews_waiter      on reviews (waiter_id);
create index idx_reviews_restaurant  on reviews (restaurant_id, created_at desc);
create index idx_profiles_restaurant on profiles (restaurant_id);
create index idx_inquiries_restaurant on inquiries (restaurant_id, created_at desc);
create index idx_orders_restaurant   on card_orders (restaurant_id, created_at desc);

-- ---------- Stats view -----------------------------------------------------
create view waiter_stats as
  select
    w.id                                        as waiter_id,
    w.restaurant_id,
    count(r.id)                                 as total_reviews,
    coalesce(round(avg(r.rating)::numeric, 1), 0) as rating,
    coalesce(sum(r.tip_amount), 0)              as total_tips
  from waiters w
  left join reviews r on r.waiter_id = w.id
  group by w.id, w.restaurant_id;

-- ---------- Helper: current user's restaurant ------------------------------
create or replace function auth_restaurant_id()
returns uuid
language sql stable security definer set search_path = public
as $$
  select restaurant_id from profiles where id = auth.uid();
$$;

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table restaurants  enable row level security;
alter table profiles     enable row level security;
alter table waiters      enable row level security;
alter table reviews      enable row level security;
alter table inquiries    enable row level security;
alter table card_orders  enable row level security;
alter table subscriptions enable row level security;

-- restaurants: owner or linked staff
create policy restaurants_select on restaurants for select to authenticated
  using (owner_id = auth.uid() or id = auth_restaurant_id());
create policy restaurants_insert on restaurants for insert to authenticated
  with check (owner_id = auth.uid());
create policy restaurants_update on restaurants for update to authenticated
  using (owner_id = auth.uid() or id = auth_restaurant_id());

-- profiles: your own row, or colleagues in your restaurant
create policy profiles_select on profiles for select to authenticated
  using (id = auth.uid() or restaurant_id = auth_restaurant_id());
create policy profiles_insert on profiles for insert to authenticated
  with check (id = auth.uid());
create policy profiles_update on profiles for update to authenticated
  using (id = auth.uid());

-- waiters: scoped to your restaurant (guests use the RPC instead)
create policy waiters_all on waiters for all to authenticated
  using (restaurant_id = auth_restaurant_id())
  with check (restaurant_id = auth_restaurant_id());

-- reviews: managers read their restaurant's reviews (guests insert via RPC)
create policy reviews_select on reviews for select to authenticated
  using (restaurant_id = auth_restaurant_id());

-- inquiries: managers read their restaurant's inquiries (guests insert via RPC)
create policy inquiries_select on inquiries for select to authenticated
  using (restaurant_id = auth_restaurant_id());
create policy inquiries_update on inquiries for update to authenticated
  using (restaurant_id = auth_restaurant_id());

-- card_orders: managers manage their restaurant's orders
create policy orders_all on card_orders for all to authenticated
  using (restaurant_id = auth_restaurant_id())
  with check (restaurant_id = auth_restaurant_id());

-- subscriptions: managers read their restaurant's subscription
create policy subscriptions_select on subscriptions for select to authenticated
  using (restaurant_id = auth_restaurant_id());

-- ============================================================================
-- Public (guest) surface — SECURITY DEFINER RPCs only
-- ============================================================================

-- Resolve an NFC/QR slug → the public info needed to render the rating screen.
create or replace function rating_target(p_slug text)
returns table (
  waiter_id       uuid,
  waiter_name     text,
  waiter_role     text,
  avatar_url      text,
  restaurant_name text,
  restaurant_city text,
  logo_url        text
)
language sql stable security definer set search_path = public
as $$
  select w.id, w.name, w.role, w.avatar_url,
         r.name, r.city, r.logo_url
  from waiters w
  join restaurants r on r.id = w.restaurant_id
  where w.slug = p_slug and w.active;
$$;

-- Store a guest review. Returns whether it is public and, if so, the Google
-- review URL the client should redirect a happy guest to.
create or replace function submit_review(
  p_slug    text,
  p_rating  smallint,
  p_comment text default null,
  p_tags    text[] default '{}',
  p_tip     numeric default 0
)
returns table (is_public boolean, google_review_url text)
language plpgsql security definer set search_path = public
as $$
declare
  v_waiter     waiters%rowtype;
  v_public     boolean;
  v_google_url text;
begin
  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'rating must be between 1 and 5';
  end if;
  if coalesce(p_tip, 0) < 0 then
    raise exception 'tip must be >= 0';
  end if;

  select * into v_waiter from waiters where slug = p_slug and active;
  if not found then
    raise exception 'unknown or inactive waiter';
  end if;

  v_public := p_rating >= 4;

  insert into reviews (waiter_id, restaurant_id, rating, comment, tags, tip_amount, is_public)
  values (v_waiter.id, v_waiter.restaurant_id, p_rating,
          nullif(left(coalesce(p_comment, ''), 2000), ''),
          coalesce(p_tags, '{}'), coalesce(p_tip, 0), v_public);

  if v_public then
    select r.google_review_url into v_google_url
    from restaurants r where r.id = v_waiter.restaurant_id;
  end if;

  return query select v_public, v_google_url;
end;
$$;

-- Store a contact-form inquiry (optionally tied to a restaurant slug).
create or replace function submit_inquiry(
  p_name            text,
  p_contact         text,
  p_message         text,
  p_subject         text default null,
  p_restaurant_slug text default null
)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_restaurant_id uuid;
begin
  if coalesce(btrim(p_name), '') = '' or coalesce(btrim(p_contact), '') = ''
     or coalesce(btrim(p_message), '') = '' then
    raise exception 'name, contact and message are required';
  end if;

  if p_restaurant_slug is not null then
    select id into v_restaurant_id from restaurants where slug = p_restaurant_slug;
  end if;

  insert into inquiries (restaurant_id, name, contact, subject, message)
  values (v_restaurant_id,
          left(p_name, 200), left(p_contact, 200),
          left(coalesce(p_subject, ''), 200), left(p_message, 4000));
end;
$$;

-- Expose only the RPCs to guests / logged-in users (no direct table access).
revoke all on function rating_target(text)                                   from public;
revoke all on function submit_review(text, smallint, text, text[], numeric)  from public;
revoke all on function submit_inquiry(text, text, text, text, text)          from public;
grant execute on function rating_target(text)                                  to anon, authenticated;
grant execute on function submit_review(text, smallint, text, text[], numeric) to anon, authenticated;
grant execute on function submit_inquiry(text, text, text, text, text)         to anon, authenticated;
