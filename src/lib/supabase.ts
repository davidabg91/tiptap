import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client.
 *
 * Reads credentials from Vite env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
 * When they are absent — e.g. a fresh clone with no `.env.local` — `supabase`
 * is null and `isSupabaseEnabled` is false, so the app gracefully falls back to
 * the local mock data layer and still runs as a demo.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseEnabled
  ? createClient(url as string, anonKey as string)
  : null;
