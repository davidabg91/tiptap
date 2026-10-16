import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseEnabled } from './supabase';
import { getWaiters, addReview } from '../utils/mockData';

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

/**
 * Unified data-access layer.
 *
 * When Supabase is configured these call the secure SECURITY DEFINER RPCs;
 * otherwise they fall back to the local mock layer so the app still runs as a
 * demo without any backend.
 */

export interface RatingTarget {
  waiterId: string;
  name: string;
  role: string;
  avatarUrl: string;
  restaurantName: string;
  restaurantCity: string | null;
  logoUrl: string | null;
}

/** Resolve an NFC/QR slug to the public info needed to render the rating screen. */
export async function getRatingTarget(slug: string): Promise<RatingTarget | null> {
  if (isSupabaseEnabled && supabase) {
    const { data, error } = await supabase.rpc('rating_target', { p_slug: slug });
    if (error || !data || data.length === 0) return null;
    const r = data[0];
    return {
      waiterId: r.waiter_id,
      name: r.waiter_name,
      role: r.waiter_role,
      avatarUrl: r.avatar_url,
      restaurantName: r.restaurant_name,
      restaurantCity: r.restaurant_city,
      logoUrl: r.logo_url,
    };
  }
  // Mock fallback — treat slug as a mock waiter id.
  const list = getWaiters();
  const w = list.find((x) => x.id === slug) || list[0];
  if (!w) return null;
  return {
    waiterId: w.id,
    name: w.name,
    role: w.role,
    avatarUrl: w.avatar,
    restaurantName: 'Ресторант Леденика',
    restaurantCity: 'София',
    logoUrl: null,
  };
}

export interface SubmitReviewInput {
  slug: string;
  waiterId?: string;
  waiterName?: string;
  rating: number;
  comment: string;
  tags: string[];
  tipAmount: number;
}

export interface SubmitReviewResult {
  isPublic: boolean;
  googleReviewUrl: string | null;
}

/** Store a guest review; returns whether it's public and the Google review URL. */
export async function submitReview(input: SubmitReviewInput): Promise<SubmitReviewResult> {
  if (isSupabaseEnabled && supabase) {
    const { data, error } = await supabase.rpc('submit_review', {
      p_slug: input.slug,
      p_rating: input.rating,
      p_comment: input.comment,
      p_tags: input.tags,
      p_tip: input.tipAmount,
    });
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    return {
      isPublic: Boolean(row?.is_public),
      googleReviewUrl: row?.google_review_url ?? null,
    };
  }
  // Mock fallback.
  addReview({
    waiterId: input.waiterId || input.slug,
    waiterName: input.waiterName || '',
    rating: input.rating,
    comment: input.comment,
    tipAmount: input.tipAmount,
    tags: input.tags,
  });
  return { isPublic: input.rating >= 4, googleReviewUrl: null };
}

export interface SubmitInquiryInput {
  name: string;
  contact: string;
  message: string;
  subject?: string;
  restaurantSlug?: string;
}

/** Store a contact-form inquiry. */
export async function submitInquiry(input: SubmitInquiryInput): Promise<void> {
  if (isSupabaseEnabled && supabase) {
    const { error } = await supabase.rpc('submit_inquiry', {
      p_name: input.name,
      p_contact: input.contact,
      p_message: input.message,
      p_subject: input.subject ?? null,
      p_restaurant_slug: input.restaurantSlug ?? null,
    });
    if (error) throw error;
  }
  // Mock fallback: nothing to persist.
}

// ============================================================================
// Auth + manager dashboard (authenticated)
// ============================================================================

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  googleReviewUrl: string | null;
  logoUrl: string | null;
}

export interface MyProfile {
  userId: string;
  fullName: string;
  role: string;
  restaurant: Restaurant | null;
}

function mapRestaurant(r: any): Restaurant {
  return {
    id: r.id, name: r.name, slug: r.slug, city: r.city,
    googleReviewUrl: r.google_review_url, logoUrl: r.logo_url,
  };
}

export async function signUp(email: string, password: string, fullName: string): Promise<{ needsConfirmation: boolean }> {
  const sb = requireClient();
  const { data, error } = await sb.auth.signUp({
    email, password, options: { data: { full_name: fullName } },
  });
  if (error) throw error;
  return { needsConfirmation: !data.session };
}

export async function signIn(email: string, password: string): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  if (supabase) await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb: (session: Session | null) => void): () => void {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session));
  return () => data.subscription.unsubscribe();
}

export async function getMyProfile(): Promise<MyProfile | null> {
  const sb = requireClient();
  const { data: userData } = await sb.auth.getUser();
  const user = userData.user;
  if (!user) return null;

  const { data: prof } = await sb
    .from('profiles')
    .select('full_name, role, restaurants(*)')
    .eq('id', user.id)
    .maybeSingle();

  const fallbackName = (user.user_metadata?.full_name as string) || '';
  if (!prof) {
    return { userId: user.id, fullName: fallbackName, role: 'owner', restaurant: null };
  }
  const r = (prof as any).restaurants;
  return {
    userId: user.id,
    fullName: (prof as any).full_name || fallbackName,
    role: (prof as any).role || 'owner',
    restaurant: r ? mapRestaurant(Array.isArray(r) ? r[0] : r) : null,
  };
}

function slugify(name: string): string {
  const base = name.toLowerCase()
    .replace(/[^a-z0-9а-я]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24) || 'venue';
  return `${base}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function createRestaurant(input: {
  name: string; city?: string; googleReviewUrl?: string; fullName?: string;
}): Promise<Restaurant> {
  const sb = requireClient();
  const { data: userData } = await sb.auth.getUser();
  const user = userData.user;
  if (!user) throw new Error('Not authenticated');

  const { data: r, error } = await sb
    .from('restaurants')
    .insert({
      owner_id: user.id,
      name: input.name,
      slug: slugify(input.name),
      city: input.city || null,
      google_review_url: input.googleReviewUrl || null,
    })
    .select()
    .single();
  if (error) throw error;

  const { error: pErr } = await sb.from('profiles').upsert({
    id: user.id,
    restaurant_id: r.id,
    full_name: input.fullName || (user.user_metadata?.full_name as string) || '',
    role: 'owner',
  });
  if (pErr) throw pErr;

  return mapRestaurant(r);
}

export async function updateRestaurant(id: string, patch: {
  name?: string; city?: string; googleReviewUrl?: string;
}): Promise<void> {
  const sb = requireClient();
  const body: Record<string, unknown> = {};
  if (patch.name !== undefined) body.name = patch.name;
  if (patch.city !== undefined) body.city = patch.city;
  if (patch.googleReviewUrl !== undefined) body.google_review_url = patch.googleReviewUrl;
  const { error } = await sb.from('restaurants').update(body).eq('id', id);
  if (error) throw error;
}

export interface DashWaiter {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatarUrl: string | null;
  active: boolean;
}

export async function listWaiters(): Promise<DashWaiter[]> {
  const sb = requireClient();
  const { data, error } = await sb
    .from('waiters')
    .select('id, slug, name, role, avatar_url, active')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).map((w: any) => ({
    id: w.id, slug: w.slug, name: w.name, role: w.role,
    avatarUrl: w.avatar_url, active: w.active,
  }));
}

export interface DashReview {
  id: string;
  waiterId: string;
  rating: number;
  comment: string | null;
  tags: string[];
  tipAmount: number;
  isPublic: boolean;
  createdAt: string;
}

export async function listReviews(): Promise<DashReview[]> {
  const sb = requireClient();
  const { data, error } = await sb
    .from('reviews')
    .select('id, waiter_id, rating, comment, tags, tip_amount, is_public, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((r: any) => ({
    id: r.id, waiterId: r.waiter_id, rating: r.rating, comment: r.comment,
    tags: r.tags || [], tipAmount: Number(r.tip_amount), isPublic: r.is_public,
    createdAt: r.created_at,
  }));
}

export async function createWaiter(restaurantId: string, input: {
  name: string; role: string; avatarUrl?: string;
}): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.from('waiters').insert({
    restaurant_id: restaurantId,
    slug: `w-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    role: input.role || 'Сервитьор',
    avatar_url: input.avatarUrl || null,
  });
  if (error) throw error;
}

export async function updateWaiterRow(id: string, patch: {
  name?: string; role?: string; avatarUrl?: string; active?: boolean;
}): Promise<void> {
  const sb = requireClient();
  const body: Record<string, unknown> = {};
  if (patch.name !== undefined) body.name = patch.name;
  if (patch.role !== undefined) body.role = patch.role;
  if (patch.avatarUrl !== undefined) body.avatar_url = patch.avatarUrl;
  if (patch.active !== undefined) body.active = patch.active;
  const { error } = await sb.from('waiters').update(body).eq('id', id);
  if (error) throw error;
}

export async function deleteWaiterRow(id: string): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.from('waiters').delete().eq('id', id);
  if (error) throw error;
}
