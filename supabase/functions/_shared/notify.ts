// Outbound messages: Telegram Bot API and email through Resend.
// Both are optional — without their secrets the senders quietly do nothing.

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
// Must be an address on a domain verified in Resend, e.g. "TipTap <alerts@tiptap.bg>".
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? 'TipTap <onboarding@resend.dev>';

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
  ));
}

/** Telegram message in HTML parse mode (only <b>, <i>, <a>, <code> are used). */
export async function sendTelegram(chatId: number | string, html: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    if (!res.ok) console.error('telegram', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('telegram', err);
    return false;
  }
}

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: EMAIL_FROM, to: [to], subject, html }),
    });
    if (!res.ok) console.error('resend', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('resend', err);
    return false;
  }
}

/** Date/time as a Bulgarian venue reads it. */
export function sofiaTime(date: Date = new Date()): string {
  return date.toLocaleString('bg-BG', {
    timeZone: 'Europe/Sofia', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}
