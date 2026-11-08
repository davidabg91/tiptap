/** Dashboard numbers, computed the same way for live and demo data. */

import type { FunnelEvent, Review, Waiter, WaiterBase } from './types';

export type TimeRange = '7d' | '30d' | 'year';

const DAY = 24 * 60 * 60 * 1000;

export function rangeStart(range: TimeRange, now = Date.now()): number {
  return now - (range === '7d' ? 7 : range === '30d' ? 30 : 365) * DAY;
}

export const inRange = <T extends { createdAt: string }>(rows: T[], from: number): T[] =>
  rows.filter((r) => Date.parse(r.createdAt) >= from);

export function rateUrl(slug: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${window.location.origin}${base}#rate/${encodeURIComponent(slug)}`;
}

export function qrCodeUrl(slug: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(rateUrl(slug))}`;
}

export function averageRating(reviews: Review[]): number {
  if (!reviews.length) return 0;
  return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
}

export function topTags(reviews: Review[], limit = 4): { key: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of reviews) for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
}

export function withStats(base: WaiterBase, reviews: Review[], events: FunnelEvent[]): Waiter {
  const mine = reviews.filter((r) => r.waiterId === base.id);
  const myEvents = events.filter((e) => e.waiterId === base.id);
  const count = (type: FunnelEvent['type']) => myEvents.filter((e) => e.type === type).length;
  return {
    ...base,
    rating: averageRating(mine),
    totalReviews: mine.length,
    scanCount: count('scan'),
    tipClicks: count('tip_click'),
    googleRedirects: count('google_click'),
    topTags: topTags(mine.filter((r) => r.rating >= 4), 3).map((t) => t.key),
    qrCodeUrl: qrCodeUrl(base.slug),
  };
}

export interface Funnel {
  scans: number;
  ratings: number;
  tipClicks: number;
  googleClicks: number;
  avgRating: number;
  lowRatings: number;
}

export function funnel(reviews: Review[], events: FunnelEvent[]): Funnel {
  const count = (type: FunnelEvent['type']) => events.filter((e) => e.type === type).length;
  return {
    scans: count('scan'),
    ratings: reviews.length,
    tipClicks: count('tip_click'),
    googleClicks: count('google_click'),
    avgRating: averageRating(reviews),
    lowRatings: reviews.filter((r) => r.rating <= 2).length,
  };
}

/** Ratings per calendar day (local time), oldest first. */
export function ratingsByDay(reviews: Review[], days: number, now = new Date()): { date: Date; count: number; avg: number }[] {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1));
  const buckets = Array.from({ length: days }, (_, i) => ({
    date: new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
    ratings: [] as number[],
  }));
  for (const r of reviews) {
    const d = new Date(r.createdAt);
    const index = Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() - start.getTime()) / DAY);
    if (index >= 0 && index < days) buckets[index].ratings.push(r.rating);
  }
  return buckets.map((b) => ({
    date: b.date,
    count: b.ratings.length,
    avg: b.ratings.length ? b.ratings.reduce((s, x) => s + x, 0) / b.ratings.length : 0,
  }));
}

/** Ratings per calendar month for the last `months` months, oldest first. */
export function ratingsByMonth(reviews: Review[], months: number, now = new Date()): { date: Date; count: number; avg: number }[] {
  const buckets = Array.from({ length: months }, (_, i) => ({
    date: new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1),
    ratings: [] as number[],
  }));
  for (const r of reviews) {
    const d = new Date(r.createdAt);
    const index = (d.getFullYear() - buckets[0].date.getFullYear()) * 12 + d.getMonth() - buckets[0].date.getMonth();
    if (index >= 0 && index < months) buckets[index].ratings.push(r.rating);
  }
  return buckets.map((b) => ({
    date: b.date,
    count: b.ratings.length,
    avg: b.ratings.length ? b.ratings.reduce((s, x) => s + x, 0) / b.ratings.length : 0,
  }));
}

export function ratingDistribution(reviews: Review[]): { stars: number; count: number; pct: number }[] {
  return [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, pct: reviews.length ? Math.round((count / reviews.length) * 100) : 0 };
  });
}

export const percent = (part: number, whole: number): string =>
  whole ? `${Math.round((part / whole) * 100)}%` : '—';

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('bg-BG', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
