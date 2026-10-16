import { supabase, isSupabaseEnabled } from './supabase';
import { getWaiters, addReview } from '../utils/mockData';

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
