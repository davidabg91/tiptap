# TipTap — Настройка на бекенда

Това ръководство описва как да свържеш приложението с реална база данни и
как да включиш известията, седмичния отчет и защитата от спам.

Докато не добавиш ключовете, сайтът работи като демо (данните се пазят само в
браузъра). Демо страниците `#demo` и `#demo-guest` **винаги** работят с примерни
данни — и когато има свързана база.

> ⚠️ Към 08.11.2026 адресът в `.env.local` (`nvdw….supabase.co`) не съществува —
> проектът е изтрит или преименуван. Създай нов проект (стъпка 1) и смени
> ключовете, иначе входът и реалните NFC линкове няма да работят.

---

## 1. Supabase проект
1. Влез в <https://supabase.com> и създай безплатен проект.
2. Избери регион **Central EU (Frankfurt)** (най-близо до България).
3. Запомни паролата на базата (трябва ти само при директен достъп).

## 2. Схемата на базата
В Supabase → **SQL Editor → New query** изпълни **по ред** файловете от
[`supabase/migrations/`](supabase/migrations):

| Файл | Какво прави |
|---|---|
| `0001_initial_schema.sql` | Таблици, правила за достъп (RLS), функции |
| `0002_seed_demo.sql` | По желание — примерен ресторант и сервитьори |
| `0003_fix_view_rls.sql` | Поправка на сигурността на статистиката |
| `0004_tips_alerts_vouchers.sql` | Бакшиш линкове, сканирания, ваучери, известия, защита от спам |
| `0005_weekly_report_cron.sql` | Седмичният отчет — **пусни го накрая** (стъпка 6) |

## 3. Ключове за сайта
Supabase → **Project Settings → API**:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon / publishable** ключ → `VITE_SUPABASE_ANON_KEY`

Копирай `.env.example` като `.env.local`, попълни стойностите и рестартирай
`npm run dev`. `.env.local` е в `.gitignore` — ключовете не влизат в Git.

## 4. Edge функциите
Нужен е [Supabase CLI](https://supabase.com/docs/guides/cli). От папката на проекта:

```bash
supabase login
supabase link --project-ref <project-ref>
supabase functions deploy submit-review --no-verify-jwt
supabase functions deploy telegram-webhook --no-verify-jwt
supabase functions deploy weekly-report --no-verify-jwt
```

| Функция | Роля |
|---|---|
| `submit-review` | Единственият начин оценка да влезе в базата: проверява капчата, лимитите и изпраща известие при 1–2★ |
| `telegram-webhook` | Свързва чата на заведението с Telegram бота |
| `weekly-report` | Изпраща седмичния отчет по имейл |

### Тайни (Secrets) на функциите
Supabase → **Edge Functions → Secrets** (или `supabase secrets set ИМЕ=стойност`):

| Тайна | За какво | Задължителна |
|---|---|---|
| `HASH_SALT` | Дълъг случаен низ — за анонимните хешове на устройство и IP | Да |
| `APP_URL` | Адресът на сайта, напр. `https://tiptap.bg` (за линка „Отвори таблото“) | Препоръчително |
| `TURNSTILE_SECRET_KEY` | Капча (стъпка 7) | Препоръчително |
| `RESEND_API_KEY` | Имейли (стъпка 5) | За имейл |
| `EMAIL_FROM` | Подател, напр. `TipTap <alerts@tiptap.bg>` | За имейл |
| `TELEGRAM_BOT_TOKEN` | Telegram бот (стъпка 5) | За Telegram |
| `TELEGRAM_WEBHOOK_SECRET` | Случаен низ (A–Z, a–z, 0–9, `_`, `-`) | За Telegram |
| `CRON_SECRET` | Случаен низ за седмичния отчет (стъпка 6) | За отчета |

`SUPABASE_URL` и `SUPABASE_SERVICE_ROLE_KEY` се подават автоматично.

## 5. Известия при 1–2★

### Имейл (Resend)
1. Регистрирай се в <https://resend.com> и добави домейна си (напр. `tiptap.bg`) —
   Resend ще ти даде DNS записи за потвърждение.
2. Създай API ключ → тайна `RESEND_API_KEY`.
3. Задай `EMAIL_FROM` с адрес от потвърдения домейн.
   (Без собствен домейн Resend праща само до твоя собствен имейл — става за тест.)

### Telegram
1. В Telegram пиши на **@BotFather** → `/newbot` → вземи токена → тайна `TELEGRAM_BOT_TOKEN`.
2. Измисли случаен `TELEGRAM_WEBHOOK_SECRET` и го запиши като тайна.
3. Регистрирай webhook-а (веднъж):
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<project-ref>.supabase.co/functions/v1/telegram-webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
   ```
4. В `.env.local` добави потребителското име на бота: `VITE_TELEGRAM_BOT_USERNAME=ИмеНаБота`.
5. Управителят натиска **Табло → Известия и ваучери → Свържи Telegram** → **Start** в Telegram. Готово.
   С `/stop` в чата известията спират.

## 6. Седмичен отчет
1. Задай тайна `CRON_SECRET` (дълъг случаен низ).
2. В SQL Editor запиши два секрета във Vault:
   ```sql
   select vault.create_secret('https://<project-ref>.supabase.co', 'project_url');
   select vault.create_secret('<същата стойност като CRON_SECRET>', 'cron_secret');
   ```
3. Изпълни `supabase/migrations/0005_weekly_report_cron.sql`.

Отчетът тръгва всеки понеделник в 06:00 UTC (08:00/09:00 българско време) към
заведенията с включен „Седмичен отчет“ и попълнен имейл.

## 7. Защита от спам (Cloudflare Turnstile)
1. В Cloudflare → **Turnstile → Add widget**, режим **Invisible**, домейн на сайта.
2. **Site key** → `VITE_TURNSTILE_SITE_KEY` в `.env.local`.
3. **Secret key** → тайна `TURNSTILE_SECRET_KEY`.

Без тези ключове капчата е изключена, но лимитите остават:
1 оценка на устройство за сервитьор на 12 часа, до 5 на ден на устройство и до 20 на час от един IP.
За тест Cloudflare дава ключове `1x00000000000000000000BB` (site) и
`1x0000000000000000000000000000000AA` (secret) — **не ги ползвай на живо**.

## 8. Бакшиши (вариант A)
TipTap **не докосва парите**. Заведението (или всеки сервитьор) поставя в
**Табло → Бакшиши** линк към собствена страница за плащане — Revolut, myPOS,
Stripe Payment Link и т.н. Гостът избира сума и плаща директно. В таблото се
вижда колко гости са отворили линка.

- Ако страницата приема сума в адреса, напиши `{amount}` на мястото ѝ.
- Личните Revolut.me линкове имат лимит при плащане с карта (около £250 и 20
  плащания седмично) — за по-голям оборот използвай бизнес линк.
- Данъчното отчитане на бакшишите (становище на НАП от 23.10.2025 г.) е
  задължение на заведението — уточни го със счетоводител.

## 9. Живият сайт
GitHub Pages / Vercel трябва да получат същите `VITE_…` променливи при build-а
(например като Secrets в GitHub Actions). Без тях живият сайт работи само като демо.
