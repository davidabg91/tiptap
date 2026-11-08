-- ============================================================================
-- Weekly email report — every Monday at 06:00 UTC (08:00 / 09:00 in Bulgaria).
--
-- Run this AFTER deploying the `weekly-report` Edge Function and storing two
-- secrets in Vault (SQL Editor, once — see SETUP.md):
--   select vault.create_secret('https://<project-ref>.supabase.co', 'project_url');
--   select vault.create_secret('<the same value as CRON_SECRET>', 'cron_secret');
-- ============================================================================

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'tiptap-weekly-report',
  '0 6 * * 1',
  $$
  select net.http_post(
    url     := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url')
               || '/functions/v1/weekly-report',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body    := '{}'::jsonb
  );
  $$
);
