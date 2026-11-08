// submit-review — the only way a guest review reaches the database.
//
// 1. Verifies the invisible Cloudflare Turnstile token (when TURNSTILE_SECRET_KEY is set).
// 2. Hashes the guest's device id and IP (salted SHA-256) for the spam limits
//    enforced inside the `submit_review` SQL function.
// 3. Stores the review (+ recovery voucher when the venue has them on).
// 4. For 1–2★ sends an instant alert to the venue by Telegram and email.
//
// Deploy with:  supabase functions deploy submit-review --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2';
import { clientIp, corsHeaders, inBackground, json } from '../_shared/http.ts';
import { escapeHtml, sendEmail, sendTelegram, sofiaTime } from '../_shared/notify.ts';
import { tagLabelBg } from '../_shared/tags.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);
const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY');
const HASH_SALT = Deno.env.get('HASH_SALT') ?? 'tiptap';
const APP_URL = (Deno.env.get('APP_URL') ?? '').replace(/\/$/, '');

async function hash(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${HASH_SALT}:${value}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function captchaOk(token: unknown, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true; // captcha not configured
  if (typeof token !== 'string' || !token) return false;
  const form = new FormData();
  form.append('secret', TURNSTILE_SECRET_KEY);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const out = await res.json();
    return out.success === true;
  } catch (err) {
    console.error('turnstile', err);
    return false;
  }
}

interface StoredReview {
  restaurant_id: string;
  waiter_name: string;
  restaurant_name: string;
}

async function alertLowRating(row: StoredReview, rating: number, comment: string, tags: string[]) {
  const { data: venue } = await supabase
    .from('restaurants')
    .select('notify_low_rating, notify_email, telegram_chat_id')
    .eq('id', row.restaurant_id)
    .maybeSingle();
  if (!venue?.notify_low_rating) return;

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const when = sofiaTime();
  const link = APP_URL ? `${APP_URL}/#dashboard` : '';
  const quote = comment.trim();
  const tagLine = tags.map(tagLabelBg).join(', ');

  const telegram = [
    `⚠️ <b>Ниска оценка ${rating}★</b> · ${escapeHtml(row.restaurant_name)}`,
    `Сервитьор: <b>${escapeHtml(row.waiter_name)}</b>`,
    quote ? `„${escapeHtml(quote)}“` : '',
    tagLine ? `Отбелязано: ${escapeHtml(tagLine)}` : '',
    `🕒 ${when}`,
    link ? `<a href="${link}">Отвори таблото</a>` : '',
  ].filter(Boolean).join('\n');

  const email = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#1c1b22">
      <p style="font-size:13px;color:#6b6880;margin:0 0 6px">TipTap · ${escapeHtml(row.restaurant_name)}</p>
      <h2 style="margin:0 0 12px;font-size:20px">Ниска оценка: <span style="color:#dc2626">${stars}</span></h2>
      <p style="margin:0 0 6px"><b>Сервитьор:</b> ${escapeHtml(row.waiter_name)}</p>
      ${quote ? `<p style="margin:12px 0;padding:12px 14px;background:#f4f2fb;border-radius:10px">„${escapeHtml(quote)}“</p>` : ''}
      ${tagLine ? `<p style="margin:0 0 6px"><b>Отбелязано:</b> ${escapeHtml(tagLine)}</p>` : ''}
      <p style="margin:0 0 16px;color:#6b6880">${when}</p>
      ${link ? `<a href="${link}" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none">Отвори таблото</a>` : ''}
      <p style="font-size:12px;color:#8f8da8;margin-top:20px">Гостът може още да е в заведението — сега е моментът да реагирате.</p>
    </div>`;

  await Promise.all([
    venue.telegram_chat_id ? sendTelegram(venue.telegram_chat_id, telegram) : Promise.resolve(false),
    venue.notify_email
      ? sendEmail(venue.notify_email, `⚠️ ${rating}★ за ${row.waiter_name} — ${row.restaurant_name}`, email)
      : Promise.resolve(false),
  ]);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const { slug, rating, comment, tags, lang, deviceId, captchaToken } = body;
  if (typeof slug !== 'string' || typeof rating !== 'number' || !Number.isInteger(rating)) {
    return json({ error: 'bad_request' }, 400);
  }

  const ip = clientIp(req);
  if (!(await captchaOk(captchaToken, ip))) return json({ error: 'captcha_failed' }, 403);

  const cleanComment = typeof comment === 'string' ? comment.slice(0, 2000) : '';
  const cleanTags = Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string').slice(0, 12) : [];

  const { data, error } = await supabase.rpc('submit_review', {
    p_slug: slug,
    p_rating: rating,
    p_comment: cleanComment || null,
    p_tags: cleanTags,
    p_lang: typeof lang === 'string' ? lang : null,
    p_device_hash: typeof deviceId === 'string' && deviceId.length >= 8 ? await hash(`device:${deviceId}`) : null,
    p_ip_hash: ip ? await hash(`ip:${ip}`) : null,
  });

  if (error) {
    if (error.message.includes('rate_limited')) return json({ error: 'rate_limited' }, 429);
    if (error.message.includes('unknown or inactive waiter')) return json({ error: 'unknown_card' }, 404);
    if (error.message.includes('rating must be')) return json({ error: 'bad_request' }, 400);
    console.error('submit_review', error);
    return json({ error: 'server_error' }, 500);
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return json({ error: 'server_error' }, 500);

  if (rating <= 2) await inBackground(alertLowRating(row, rating, cleanComment, cleanTags));

  return json({
    isPublic: Boolean(row.is_public),
    googleReviewUrl: row.google_review_url ?? null,
    tipUrl: row.tip_url ?? null,
    voucher: row.voucher_code
      ? { code: row.voucher_code, title: row.voucher_title, expiresAt: row.voucher_expires_at }
      : null,
  });
});
