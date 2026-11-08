// telegram-webhook — links a venue to a Telegram chat for low-rating alerts.
//
// The dashboard shows a deep link  https://t.me/<bot>?start=<code>; opening it
// sends "/start <code>" here and we store that chat for the venue.
// "/stop" unlinks the chat again.
//
// Deploy with:  supabase functions deploy telegram-webhook --no-verify-jwt
// Then register it once (see SETUP.md) with setWebhook + secret_token.

import { createClient } from 'npm:@supabase/supabase-js@2';
import { escapeHtml, sendTelegram } from '../_shared/notify.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);
const WEBHOOK_SECRET = Deno.env.get('TELEGRAM_WEBHOOK_SECRET');

Deno.serve(async (req) => {
  // Telegram echoes the secret_token given to setWebhook in this header.
  if (!WEBHOOK_SECRET || req.headers.get('x-telegram-bot-api-secret-token') !== WEBHOOK_SECRET) {
    return new Response('forbidden', { status: 403 });
  }

  const update = await req.json().catch(() => null);
  const message = update?.message;
  const chatId: number | undefined = message?.chat?.id;
  const text: string = typeof message?.text === 'string' ? message.text.trim() : '';
  if (!chatId || !text) return new Response('ok');

  const start = text.match(/^\/start(?:@\w+)?\s+([A-Za-z0-9_-]{8,64})$/);
  if (start) {
    const { data: venue } = await supabase
      .from('restaurants')
      .update({ telegram_chat_id: chatId, telegram_link_code: null })
      .eq('telegram_link_code', start[1])
      .select('name')
      .maybeSingle();
    await sendTelegram(chatId, venue
      ? `✅ Свързано! Ще получавате тук известия за оценки 1–2★ в <b>${escapeHtml(venue.name)}</b>.\nЗа спиране изпратете /stop.`
      : 'Този линк е невалиден или вече е използван. Генерирайте нов от таблото на TipTap.');
    return new Response('ok');
  }

  if (/^\/stop(?:@\w+)?$/.test(text)) {
    await supabase.from('restaurants').update({ telegram_chat_id: null }).eq('telegram_chat_id', chatId);
    await sendTelegram(chatId, 'Известията са спрени. Можете да ги включите отново от таблото.');
    return new Response('ok');
  }

  await sendTelegram(chatId, 'Здравейте! За да получавате известия, отворете бутона „Свържи Telegram“ в таблото на TipTap.');
  return new Response('ok');
});
