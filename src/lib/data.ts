import type { Session } from '@supabase/supabase-js';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase, isSupabaseEnabled } from './supabase';
import * as demo from '../utils/mockData';
import { getDeviceId, getVisitId } from './device';
import { getCaptchaToken } from './turnstile';
import {
  DEFAULT_SETTINGS,
  type FunnelEvent,
  type FunnelEventType,
  type Review,
  type VenueSettings,
  type Voucher,
  type WaiterBase,
} from './types';

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

/**
 * Unified data-access layer.
 *
 * When Supabase is configured these call the secure RPCs / Edge Functions;
 * otherwise (and always for the marketing demos, `demo: true`) they use the
 * local demo store so the app still runs without any backend.
 */

const live = (isDemo?: boolean) => !isDemo && isSupabaseEnabled && supabase !== null;

// ============================================================================
// Guest rating page
// ============================================================================

export interface RatingTarget {
  waiterId: string;
  name: string;
  role: string;
  avatarUrl: string;
  restaurantName: string;
  restaurantCity: string | null;
  logoUrl: string | null;
  /** The venue's / waiter's own payment page for tips (null = no tips). */
  tipUrl: string | null;
}

/** Resolve an NFC/QR slug to the public info needed to render the rating screen. */
export async function getRatingTarget(slug: string, options: { demo?: boolean } = {}): Promise<RatingTarget | null> {
  if (live(options.demo)) {
    const { data, error } = await supabase!.rpc('rating_target', { p_slug: slug });
    if (error) throw error;
    if (!data || data.length === 0) return null;
    const r = data[0];
    return {
      waiterId: r.waiter_id,
      name: r.waiter_name,
      role: r.waiter_role,
      avatarUrl: r.avatar_url,
      restaurantName: r.restaurant_name,
      restaurantCity: r.restaurant_city,
      logoUrl: r.logo_url,
      tipUrl: r.tip_url,
    };
  }
  const w = demo.getWaiterBases().find((x) => x.slug === slug);
  if (!w) return null;
  return {
    waiterId: w.id,
    name: w.name,
    role: w.role,
    avatarUrl: w.avatar,
    restaurantName: 'Ресторант Леденика',
    restaurantCity: 'София',
    logoUrl: null,
    tipUrl: w.tipUrl || demo.getSettings().tipUrl || null,
  };
}

export interface SubmitReviewInput {
  slug: string;
  rating: number;
  comment: string;
  /** Tag keys (see TAG_KEYS). */
  tags: string[];
  lang: string;
}

export interface SubmitReviewResult {
  isPublic: boolean;
  googleReviewUrl: string | null;
  tipUrl: string | null;
  voucher: { code: string; title: string; expiresAt: string } | null;
}

export type SubmitErrorCode = 'rate_limited' | 'captcha_failed' | 'unknown_card' | 'network';

export class SubmitReviewError extends Error {
  readonly code: SubmitErrorCode;
  constructor(code: SubmitErrorCode) {
    super(code);
    this.code = code;
  }
}

/**
 * Store a guest review. Live reviews go through the `submit-review` Edge
 * Function (captcha + spam limits + low-rating alerts); demo ones stay local.
 */
export async function submitReview(
  input: SubmitReviewInput,
  options: { demo?: boolean } = {},
): Promise<SubmitReviewResult> {
  if (live(options.demo)) {
    let captchaToken: string | undefined;
    try {
      captchaToken = await getCaptchaToken();
    } catch {
      throw new SubmitReviewError('captcha_failed');
    }
    const { data, error } = await supabase!.functions.invoke('submit-review', {
      body: { ...input, deviceId: getDeviceId(), captchaToken },
    });
    if (error) {
      let code: SubmitErrorCode = 'network';
      if (error instanceof FunctionsHttpError) {
        const body = await error.context.json().catch(() => null);
        if (body?.error === 'rate_limited' || body?.error === 'captcha_failed' || body?.error === 'unknown_card') {
          code = body.error;
        }
      }
      throw new SubmitReviewError(code);
    }
    return data as SubmitReviewResult;
  }

  const waiter = demo.getWaiterBases().find((w) => w.slug === input.slug);
  if (!waiter) throw new SubmitReviewError('unknown_card');
  const settings = demo.getSettings();
  const { voucher } = demo.addReview({
    waiterId: waiter.id,
    waiterName: waiter.name,
    rating: input.rating,
    comment: input.comment,
    tags: input.tags,
    lang: input.lang,
  });
  return {
    isPublic: input.rating >= 4,
    googleReviewUrl: input.rating >= 4 ? settings.googleReviewUrl || null : null,
    tipUrl: waiter.tipUrl || settings.tipUrl || null,
    voucher: voucher ? { code: voucher.code, title: voucher.title, expiresAt: voucher.expiresAt } : null,
  };
}

/**
 * Funnel tracking: scan / tip click / Google click. Counted once per visit;
 * never throws — analytics must not break the guest's flow.
 */
export async function trackEvent(
  slug: string,
  type: FunnelEventType,
  options: { demo?: boolean; amount?: number | null } = {},
): Promise<void> {
  const visitKey = `tiptap_tracked_${slug}_${type}`;
  try {
    if (sessionStorage.getItem(visitKey)) return;
    sessionStorage.setItem(visitKey, '1');
  } catch { /* storage blocked — count anyway */ }

  try {
    if (live(options.demo)) {
      await supabase!.rpc('track_event', {
        p_slug: slug,
        p_type: type,
        p_session: getVisitId(slug),
        p_amount: options.amount ?? null,
      });
      return;
    }
    const waiter = demo.getWaiterBases().find((w) => w.slug === slug);
    if (waiter) demo.addEvent(waiter.id, type, options.amount);
  } catch {
    /* ignore */
  }
}

/** Fill "{amount}" in a tip link template (for payment pages that support it). */
export function tipLinkFor(url: string, amount: number | null): string {
  if (!url.includes('{amount}')) return url;
  return url.replace('{amount}', amount ? String(amount) : '');
}

// ============================================================================
// Contact form
// ============================================================================

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = (prof as any).restaurants;
  return {
    userId: user.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fullName: (prof as any).full_name || fallbackName,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// ---------- Venue settings (tips, alerts, vouchers, Google link) -----------------

const SETTINGS_COLUMNS =
  'google_review_url, tip_url, notify_email, notify_low_rating, weekly_report, telegram_chat_id, ' +
  'voucher_enabled, voucher_title, voucher_valid_days, voucher_max_rating';

/** Settings of the signed-in venue, or of the demo venue when `restaurantId` is null. */
export async function getVenueSettings(restaurantId: string | null): Promise<VenueSettings> {
  if (!restaurantId) return demo.getSettings();
  const sb = requireClient();
  const { data, error } = await sb.from('restaurants').select(SETTINGS_COLUMNS).eq('id', restaurantId).single();
  if (error) throw error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = data as any;
  return {
    googleReviewUrl: r.google_review_url ?? '',
    tipUrl: r.tip_url ?? '',
    notifyEmail: r.notify_email ?? '',
    notifyLowRating: r.notify_low_rating ?? DEFAULT_SETTINGS.notifyLowRating,
    weeklyReport: r.weekly_report ?? DEFAULT_SETTINGS.weeklyReport,
    telegramLinked: r.telegram_chat_id != null,
    voucherEnabled: r.voucher_enabled ?? false,
    voucherTitle: r.voucher_title ?? DEFAULT_SETTINGS.voucherTitle,
    voucherValidDays: r.voucher_valid_days ?? DEFAULT_SETTINGS.voucherValidDays,
    voucherMaxRating: r.voucher_max_rating ?? DEFAULT_SETTINGS.voucherMaxRating,
  };
}

export async function saveVenueSettings(restaurantId: string | null, patch: Partial<VenueSettings>): Promise<void> {
  if (!restaurantId) {
    demo.saveSettings(patch);
    return;
  }
  const columns: Record<string, unknown> = {};
  const trimOrNull = (v: string) => v.trim() || null;
  if (patch.googleReviewUrl !== undefined) columns.google_review_url = trimOrNull(patch.googleReviewUrl);
  if (patch.tipUrl !== undefined) columns.tip_url = trimOrNull(patch.tipUrl);
  if (patch.notifyEmail !== undefined) columns.notify_email = trimOrNull(patch.notifyEmail);
  if (patch.notifyLowRating !== undefined) columns.notify_low_rating = patch.notifyLowRating;
  if (patch.weeklyReport !== undefined) columns.weekly_report = patch.weeklyReport;
  if (patch.voucherEnabled !== undefined) columns.voucher_enabled = patch.voucherEnabled;
  if (patch.voucherTitle !== undefined) columns.voucher_title = patch.voucherTitle.trim() || DEFAULT_SETTINGS.voucherTitle;
  if (patch.voucherValidDays !== undefined) columns.voucher_valid_days = patch.voucherValidDays;
  if (patch.voucherMaxRating !== undefined) columns.voucher_max_rating = patch.voucherMaxRating;
  if (patch.telegramLinked === false) columns.telegram_chat_id = null;
  const { error } = await requireClient().from('restaurants').update(columns).eq('id', restaurantId);
  if (error) throw error;
}

const TELEGRAM_BOT = import.meta.env.VITE_TELEGRAM_BOT_USERNAME as string | undefined;
export const isTelegramConfigured = Boolean(TELEGRAM_BOT);

/** One-time deep link that connects the venue's Telegram chat to its alerts. */
export async function createTelegramLink(restaurantId: string | null): Promise<string> {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 20);
  if (restaurantId) {
    const { error } = await requireClient().from('restaurants').update({ telegram_link_code: code }).eq('id', restaurantId);
    if (error) throw error;
  }
  return `https://t.me/${TELEGRAM_BOT || 'TipTapAlertsBot'}?start=${code}`;
}

// ---------- Waiters ---------------------------------------------------------------

export async function listWaiters(): Promise<WaiterBase[]> {
  const sb = requireClient();
  const { data, error } = await sb
    .from('waiters')
    .select('id, slug, name, role, avatar_url, active, tip_url')
    .order('created_at', { ascending: true });
  if (error) throw error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((w: any) => ({
    id: w.id,
    slug: w.slug,
    name: w.name,
    role: w.role,
    avatar: w.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    tipUrl: w.tip_url,
  }));
}

export async function createWaiter(restaurantId: string, input: {
  name: string; role: string; avatarUrl?: string; tipUrl?: string | null;
}): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.from('waiters').insert({
    restaurant_id: restaurantId,
    slug: `w-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name,
    role: input.role || 'Сервитьор',
    avatar_url: input.avatarUrl || null,
    tip_url: input.tipUrl?.trim() || null,
  });
  if (error) throw error;
}

export async function updateWaiterRow(id: string, patch: {
  name?: string; role?: string; avatarUrl?: string; active?: boolean; tipUrl?: string | null;
}): Promise<void> {
  const sb = requireClient();
  const body: Record<string, unknown> = {};
  if (patch.name !== undefined) body.name = patch.name;
  if (patch.role !== undefined) body.role = patch.role;
  if (patch.avatarUrl !== undefined) body.avatar_url = patch.avatarUrl;
  if (patch.active !== undefined) body.active = patch.active;
  if (patch.tipUrl !== undefined) body.tip_url = patch.tipUrl?.trim() || null;
  const { error } = await sb.from('waiters').update(body).eq('id', id);
  if (error) throw error;
}

export async function deleteWaiterRow(id: string): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.from('waiters').delete().eq('id', id);
  if (error) throw error;
}

// ---------- Reviews, funnel events, vouchers --------------------------------------

export async function listReviews(waiters: WaiterBase[]): Promise<Review[]> {
  const sb = requireClient();
  const { data, error } = await sb
    .from('reviews')
    .select('id, waiter_id, rating, comment, tags, lang, created_at')
    .order('created_at', { ascending: false })
    .limit(5000);
  if (error) throw error;
  const nameById = new Map(waiters.map((w) => [w.id, w.name]));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((r: any) => ({
    id: r.id,
    waiterId: r.waiter_id,
    waiterName: nameById.get(r.waiter_id) || '',
    rating: r.rating,
    comment: r.comment || '',
    tags: r.tags || [],
    lang: r.lang,
    createdAt: r.created_at,
  }));
}

export async function listEvents(sinceIso: string): Promise<FunnelEvent[]> {
  const sb = requireClient();
  const { data, error } = await sb
    .from('events')
    .select('waiter_id, type, amount, created_at')
    .gte('created_at', sinceIso)
    .limit(20000);
  if (error) throw error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((e: any) => ({
    waiterId: e.waiter_id, type: e.type, createdAt: e.created_at, amount: e.amount,
  }));
}

export async function listVouchers(): Promise<Voucher[]> {
  const sb = requireClient();
  const { data, error } = await sb
    .from('vouchers')
    .select('id, code, title, created_at, expires_at, redeemed_at, reviews(rating, waiters(name))')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) throw error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((v: any) => ({
    id: v.id,
    code: v.code,
    title: v.title,
    rating: v.reviews?.rating ?? null,
    waiterName: v.reviews?.waiters?.name ?? null,
    createdAt: v.created_at,
    expiresAt: v.expires_at,
    redeemedAt: v.redeemed_at,
  }));
}

export async function redeemVoucherRow(id: string): Promise<void> {
  const { error } = await requireClient()
    .from('vouchers')
    .update({ redeemed_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}
