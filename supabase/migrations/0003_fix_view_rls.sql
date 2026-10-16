-- ============================================================================
-- Security fix: make waiter_stats respect the caller's RLS.
--
-- Plain Postgres views run with the *owner's* privileges, which bypasses the
-- RLS on the underlying tables — so `anon` could read aggregate stats (tips,
-- review counts) for every restaurant. `security_invoker = on` makes the view
-- run with the *querying* role's privileges, so RLS applies and anon sees
-- nothing while a manager sees only their own restaurant.
-- Requires PostgreSQL 15+ (Supabase is 15+).
-- ============================================================================

alter view waiter_stats set (security_invoker = on);

-- Belt and braces: guests never need this view (they use the RPCs).
revoke all on waiter_stats from anon;
