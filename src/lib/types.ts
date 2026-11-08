/** Shared shapes for the dashboard — filled from Supabase or from the demo store. */

export interface WaiterBase {
  id: string;
  /** Code on the NFC card / QR. Demo waiters use their id. */
  slug: string;
  name: string;
  role: string;
  avatar: string;
  /** Personal payment page; falls back to the venue's link when empty. */
  tipUrl: string | null;
}

export interface Waiter extends WaiterBase {
  rating: number;
  totalReviews: number;
  scanCount: number;
  tipClicks: number;
  googleRedirects: number;
  topTags: string[];
  qrCodeUrl: string;
}

export interface Review {
  id: string;
  waiterId: string;
  waiterName: string;
  rating: number;
  comment: string;
  /** Tag keys, see TAG_KEYS in ratingI18n. */
  tags: string[];
  lang: string | null;
  /** ISO timestamp. */
  createdAt: string;
}

export type FunnelEventType = 'scan' | 'tip_click' | 'google_click';

export interface FunnelEvent {
  waiterId: string;
  type: FunnelEventType;
  createdAt: string;
  amount?: number | null;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  waiterName: string | null;
  rating: number | null;
  createdAt: string;
  expiresAt: string;
  redeemedAt: string | null;
}

export interface VenueSettings {
  googleReviewUrl: string;
  /** Default payment page for tips (Revolut, myPOS, bank, Stripe Payment Link…). */
  tipUrl: string;
  notifyEmail: string;
  notifyLowRating: boolean;
  weeklyReport: boolean;
  telegramLinked: boolean;
  voucherEnabled: boolean;
  voucherTitle: string;
  voucherValidDays: number;
  voucherMaxRating: number;
}

export const DEFAULT_SETTINGS: VenueSettings = {
  googleReviewUrl: '',
  tipUrl: '',
  notifyEmail: '',
  notifyLowRating: true,
  weeklyReport: true,
  telegramLinked: false,
  voucherEnabled: false,
  voucherTitle: 'Безплатен десерт при следващото посещение',
  voucherValidDays: 30,
  voucherMaxRating: 2,
};
