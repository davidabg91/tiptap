// weekly-report — emails every venue (weekly_report on + notify_email set)
// a summary of the last 7 days. Triggered by pg_cron (migration 0005) with
// the shared CRON_SECRET in the "x-cron-secret" header.
//
// Deploy with:  supabase functions deploy weekly-report --no-verify-jwt

import { createClient } from 'npm:@supabase/supabase-js@2';
import { json } from '../_shared/http.ts';
import { escapeHtml, sendEmail } from '../_shared/notify.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);
const CRON_SECRET = Deno.env.get('CRON_SECRET');
const APP_URL = (Deno.env.get('APP_URL') ?? '').replace(/\/$/, '');

interface ReviewRow { waiter_id: string; rating: number; comment: string | null; created_at: string }
interface EventRow { waiter_id: string; type: string }
interface WaiterRow { id: string; name: string }

const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : '—');
const avg = (rows: ReviewRow[]) =>
  rows.length ? (rows.reduce((s, r) => s + r.rating, 0) / rows.length).toFixed(1).replace('.', ',') : '—';

function renderReport(venue: string, reviews: ReviewRow[], events: EventRow[], waiters: WaiterRow[]): string {
  const count = (type: string) => events.filter((e) => e.type === type).length;
  const scans = count('scan');
  const tipClicks = count('tip_click');
  const googleClicks = count('google_click');
  const low = reviews.filter((r) => r.rating <= 2);

  const kpi = (label: string, value: string, note = '') => `
    <td style="padding:12px;background:#f4f2fb;border-radius:12px;width:25%;vertical-align:top">
      <div style="font-size:12px;color:#6b6880">${label}</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">${value}</div>
      ${note ? `<div style="font-size:11px;color:#8f8da8;margin-top:2px">${note}</div>` : ''}
    </td>`;

  const rows = waiters
    .map((w) => {
      const mine = reviews.filter((r) => r.waiter_id === w.id);
      return { name: w.name, total: mine.length, avg: avg(mine), low: mine.filter((r) => r.rating <= 2).length };
    })
    .filter((w) => w.total > 0)
    .sort((a, b) => b.total - a.total)
    .map((w) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(w.name)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${w.total}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${w.avg} ★</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;color:${w.low ? '#dc2626' : '#6b6880'}">${w.low}</td>
      </tr>`)
    .join('');

  const quotes = low
    .filter((r) => r.comment)
    .slice(0, 3)
    .map((r) => `<li style="margin-bottom:6px">${r.rating}★ — „${escapeHtml(r.comment ?? '')}“</li>`)
    .join('');

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#1c1b22">
    <p style="font-size:13px;color:#6b6880;margin:0">TipTap · седмичен отчет</p>
    <h2 style="margin:4px 0 18px">${escapeHtml(venue)} — последните 7 дни</h2>
    <table style="width:100%;border-spacing:8px;margin:0 -8px"><tr>
      ${kpi('Сканирания', String(scans))}
      ${kpi('Оценки', String(reviews.length), `${pct(reviews.length, scans)} от сканиранията`)}
      ${kpi('Среден рейтинг', `${avg(reviews)} ★`)}
      ${kpi('Ниски оценки', String(low.length), '1–2★')}
    </tr></table>
    <p style="margin:16px 0 4px;color:#3c3a4a">
      Бакшиш: <b>${tipClicks}</b> гости отвориха линка за плащане ·
      Google: <b>${googleClicks}</b> гости отвориха страницата за отзив
    </p>
    ${rows ? `
    <h3 style="margin:24px 0 8px;font-size:16px">По сервитьори</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr style="color:#6b6880;font-size:12px;text-align:left">
        <th style="padding-bottom:6px">Сервитьор</th><th style="text-align:center">Оценки</th>
        <th style="text-align:center">Средно</th><th style="text-align:center">1–2★</th>
      </tr>${rows}
    </table>` : '<p style="color:#6b6880">През седмицата няма нови оценки.</p>'}
    ${quotes ? `<h3 style="margin:24px 0 8px;font-size:16px">Какво не е харесало на гостите</h3><ul style="padding-left:18px">${quotes}</ul>` : ''}
    ${APP_URL ? `<p style="margin-top:24px"><a href="${APP_URL}/#dashboard" style="background:#7c3aed;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none">Отвори таблото</a></p>` : ''}
    <p style="font-size:12px;color:#8f8da8;margin-top:24px">Отчетът може да се изключи от таблото → Известия.</p>
  </div>`;
}

Deno.serve(async (req) => {
  if (!CRON_SECRET || req.headers.get('x-cron-secret') !== CRON_SECRET) {
    return new Response('forbidden', { status: 403 });
  }

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: venues, error } = await supabase
    .from('restaurants')
    .select('id, name, notify_email')
    .eq('weekly_report', true)
    .not('notify_email', 'is', null);
  if (error) {
    console.error('weekly-report venues', error);
    return json({ error: 'server_error' }, 500);
  }

  let sent = 0;
  for (const venue of venues ?? []) {
    const [reviews, events, waiters] = await Promise.all([
      supabase.from('reviews').select('waiter_id, rating, comment, created_at')
        .eq('restaurant_id', venue.id).gte('created_at', since),
      supabase.from('events').select('waiter_id, type')
        .eq('restaurant_id', venue.id).gte('created_at', since),
      supabase.from('waiters').select('id, name').eq('restaurant_id', venue.id),
    ]);
    const html = renderReport(venue.name, reviews.data ?? [], events.data ?? [], waiters.data ?? []);
    if (await sendEmail(venue.notify_email, `TipTap · Седмичен отчет — ${venue.name}`, html)) sent++;
  }

  return json({ venues: venues?.length ?? 0, sent });
});
