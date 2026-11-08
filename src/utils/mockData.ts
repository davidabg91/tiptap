/**
 * Demo store — used by the marketing demos (#demo, #demo-guest, the hero
 * phone) and whenever no backend is configured.
 *
 * Instead of hard-coded totals it keeps a realistic 60-day history of scans,
 * ratings, tip clicks, Google clicks and vouchers (generated once, seeded so
 * every visitor sees the same picture), and the dashboard computes every
 * number from it exactly like it does for live data.
 */

import {
  DEFAULT_SETTINGS,
  type FunnelEvent,
  type FunnelEventType,
  type Review,
  type VenueSettings,
  type Voucher,
  type Waiter,
  type WaiterBase,
} from '../lib/types';
import { TAG_KEYS, sentimentOf } from '../lib/ratingI18n';
import { withStats } from '../lib/stats';

export type { Review, Waiter } from '../lib/types';

export interface CardOrder {
  id: string;
  cardColor: 'black' | 'white';
  type: 'card' | 'stand' | 'both';
  quantity: number;
  customText: string;
  logo: string;
  status: 'pending' | 'shipped' | 'delivered';
  totalPrice: number;
  createdAt: string;
}

interface DemoStore {
  waiters: WaiterBase[];
  reviews: Review[];
  events: FunnelEvent[];
  vouchers: Voucher[];
  settings: VenueSettings;
}

const STORE_KEY = 'tiptap_demo_v2';
const DAY = 24 * 60 * 60 * 1000;

const DEMO_WAITERS: WaiterBase[] = [
  {
    id: 'waiter-1', slug: 'waiter-1', name: 'Иван Петров', role: 'Старши сервитьор', tipUrl: null,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'waiter-2', slug: 'waiter-2', name: 'Мария Георгиева', role: 'Сервитьор', tipUrl: 'https://revolut.me/maria-demo',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'waiter-3', slug: 'waiter-3', name: 'Георги Димитров', role: 'Барман / сервитьор', tipUrl: null,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
];

const DEMO_SETTINGS: VenueSettings = {
  ...DEFAULT_SETTINGS,
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=DEMO',
  tipUrl: 'https://revolut.me/ledenika-team',
  notifyEmail: 'manager@ledenika.bg',
  voucherEnabled: true,
};

const COMMENTS: Record<'low' | 'mid' | 'high', { text: string; lang: string }[]> = {
  low: [
    { text: 'Чакахме сметката повече от 20 минути.', lang: 'bg' },
    { text: 'Храната дойде студена, а никой не провери масата.', lang: 'bg' },
    { text: 'Сбъркаха поръчката и се наложи да чакаме отново.', lang: 'bg' },
    { text: 'We waited ages for someone to take our order.', lang: 'en' },
  ],
  mid: [
    { text: 'Храната беше хубава, но обслужването малко бавно.', lang: 'bg' },
    { text: 'Нормално, но в петък вечер е твърде натоварено.', lang: 'bg' },
    { text: 'Gutes Essen, der Service war etwas langsam.', lang: 'de' },
  ],
  high: [
    { text: 'Изключително внимателно обслужване, препоръча ни страхотно вино.', lang: 'bg' },
    { text: 'Много мило отношение към децата ни. Благодарим!', lang: 'bg' },
    { text: 'Бързо, усмихнато и професионално. Ще дойдем пак!', lang: 'bg' },
    { text: 'Lovely service, thank you so much!', lang: 'en' },
    { text: 'Sehr freundlich und aufmerksam!', lang: 'de' },
    { text: 'Servire excelentă, mulțumim!', lang: 'ro' },
  ],
};

/** Small seeded PRNG (mulberry32) so the demo history is the same for everyone. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStore(now = Date.now()): DemoStore {
  const random = rng(20261108);
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)];
  // Each waiter rates a little differently, so the leaderboard means something.
  const profiles: Record<string, number[]> = {
    'waiter-1': [5, 5, 5, 5, 5, 4, 4, 5, 3, 5],
    'waiter-2': [5, 5, 4, 5, 4, 5, 3, 5, 4, 2],
    'waiter-3': [5, 4, 4, 3, 5, 3, 4, 2, 5, 1],
  };

  const reviews: Review[] = [];
  const events: FunnelEvent[] = [];
  const vouchers: Voucher[] = [];
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  for (let daysAgo = 59; daysAgo >= 0; daysAgo--) {
    const day = today.getTime() - daysAgo * DAY;
    const weekday = new Date(day).getDay();
    const busy = weekday === 5 || weekday === 6 ? 1.6 : weekday === 0 ? 1.3 : 1;

    for (const waiter of DEMO_WAITERS) {
      const scans = Math.round((2 + random() * 4) * busy);
      for (let s = 0; s < scans; s++) {
        // Lunch 12–15 h or dinner 18–23 h.
        const hour = random() < 0.35 ? 12 + random() * 3 : 18 + random() * 5;
        const at = day + hour * 60 * 60 * 1000 + Math.floor(random() * 59) * 60 * 1000;
        if (at > now) continue;
        const createdAt = new Date(at).toISOString();
        events.push({ waiterId: waiter.id, type: 'scan', createdAt });
        if (random() > 0.72) continue; // opened the page but didn't rate

        const rating = pick(profiles[waiter.id]);
        const sentiment = sentimentOf(rating);
        const tagPool = TAG_KEYS[sentiment];
        const tags = random() < 0.75
          ? [...new Set([pick(tagPool), pick(tagPool)])].slice(0, random() < 0.5 ? 1 : 2)
          : [];
        const withComment = sentiment === 'low' ? random() < 0.8 : random() < 0.22;
        const comment = withComment ? pick(COMMENTS[sentiment]) : null;
        const id = `rev-${at}-${waiter.id}`;
        reviews.push({
          id, waiterId: waiter.id, waiterName: waiter.name, rating,
          comment: comment?.text ?? '', tags, lang: comment?.lang ?? 'bg', createdAt,
        });

        if (rating >= 3 && random() < 0.3) {
          events.push({ waiterId: waiter.id, type: 'tip_click', createdAt, amount: pick([2, 5, 5, 10]) });
        }
        if (rating >= 4 && random() < 0.38) {
          events.push({ waiterId: waiter.id, type: 'google_click', createdAt });
        }
        if (rating <= DEMO_SETTINGS.voucherMaxRating) {
          const expires = at + DEMO_SETTINGS.voucherValidDays * DAY;
          vouchers.push({
            id: `vch-${at}`,
            code: Math.floor(random() * 0xffffffff).toString(16).toUpperCase().padStart(8, '0'),
            title: DEMO_SETTINGS.voucherTitle,
            waiterName: waiter.name,
            rating,
            createdAt,
            expiresAt: new Date(expires).toISOString(),
            redeemedAt: random() < 0.55 && at + 3 * DAY < now ? new Date(at + 3 * DAY).toISOString() : null,
          });
        }
      }
    }
  }

  const newestFirst = (a: { createdAt: string }, b: { createdAt: string }) => b.createdAt.localeCompare(a.createdAt);
  return {
    waiters: DEMO_WAITERS,
    reviews: reviews.sort(newestFirst),
    events,
    vouchers: vouchers.sort(newestFirst),
    settings: DEMO_SETTINGS,
  };
}

let cache: DemoStore | null = null;

function load(): DemoStore {
  if (cache) return cache;
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      cache = JSON.parse(saved) as DemoStore;
      cache.settings = { ...DEFAULT_SETTINGS, ...cache.settings };
      return cache;
    }
  } catch { /* corrupt or blocked storage — regenerate */ }
  cache = generateStore();
  save();
  return cache;
}

function save(): void {
  try {
    if (cache) localStorage.setItem(STORE_KEY, JSON.stringify(cache));
  } catch { /* storage full or blocked — keep the in-memory copy */ }
}

/** Start the demo over (fresh 60-day history). */
export function resetDemo(): void {
  cache = generateStore();
  save();
}

// ---------- Waiters ----------------------------------------------------------

export const getWaiterBases = (): WaiterBase[] => load().waiters;

export function getWaiters(): Waiter[] {
  const store = load();
  return store.waiters.map((w) => withStats(w, store.reviews, store.events));
}

export function addWaiter(name: string, role: string, avatar?: string, tipUrl?: string | null): WaiterBase {
  const store = load();
  const id = `waiter-${Date.now()}`;
  const waiter: WaiterBase = {
    id, slug: id, name, role: role || 'Сервитьор', tipUrl: tipUrl || null,
    avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  };
  store.waiters.push(waiter);
  save();
  return waiter;
}

export function updateWaiter(id: string, patch: Partial<Pick<WaiterBase, 'name' | 'role' | 'avatar' | 'tipUrl'>>): void {
  const store = load();
  store.waiters = store.waiters.map((w) => (w.id === id ? { ...w, ...patch } : w));
  save();
}

export function deleteWaiter(id: string): void {
  const store = load();
  store.waiters = store.waiters.filter((w) => w.id !== id);
  save();
}

// ---------- Reviews, events, vouchers ------------------------------------------

export const getReviews = (): Review[] => load().reviews;
export const getEvents = (): FunnelEvent[] => load().events;
export const getVouchers = (): Voucher[] => load().vouchers;

export function addReview(input: Omit<Review, 'id' | 'createdAt'>): { review: Review; voucher: Voucher | null } {
  const store = load();
  const now = Date.now();
  const review: Review = { ...input, id: `rev-${now}`, createdAt: new Date(now).toISOString() };
  store.reviews.unshift(review);

  let voucher: Voucher | null = null;
  const { voucherEnabled, voucherMaxRating, voucherTitle, voucherValidDays } = store.settings;
  if (voucherEnabled && review.rating <= voucherMaxRating) {
    voucher = {
      id: `vch-${now}`,
      code: Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, '0'),
      title: voucherTitle,
      waiterName: review.waiterName,
      rating: review.rating,
      createdAt: review.createdAt,
      expiresAt: new Date(now + voucherValidDays * DAY).toISOString(),
      redeemedAt: null,
    };
    store.vouchers.unshift(voucher);
  }
  save();
  return { review, voucher };
}

export function addEvent(waiterId: string, type: FunnelEventType, amount?: number | null): void {
  load().events.push({ waiterId, type, createdAt: new Date().toISOString(), amount: amount ?? null });
  save();
}

export function redeemVoucher(id: string): void {
  const store = load();
  store.vouchers = store.vouchers.map((v) => (v.id === id ? { ...v, redeemedAt: new Date().toISOString() } : v));
  save();
}

// ---------- Venue settings ------------------------------------------------------

export const getSettings = (): VenueSettings => load().settings;

export function saveSettings(patch: Partial<VenueSettings>): VenueSettings {
  const store = load();
  store.settings = { ...store.settings, ...patch };
  save();
  return store.settings;
}

// ---------- Card orders & subscription (unchanged demo data) ---------------------

const INITIAL_ORDERS: CardOrder[] = [
  {
    id: 'ORD-9821',
    cardColor: 'black',
    type: 'both',
    quantity: 15,
    customText: 'Ресторант Леденика',
    logo: 'utensils',
    status: 'delivered',
    totalPrice: 222.0,
    createdAt: '2026-08-01',
  },
];

export const getOrders = (): CardOrder[] => {
  try {
    const saved = localStorage.getItem('tiptap_orders');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('tiptap_orders', JSON.stringify(INITIAL_ORDERS));
  } catch { /* storage blocked */ }
  return INITIAL_ORDERS;
};

export const addOrder = (
  cardColor: 'black' | 'white',
  type: 'card' | 'stand' | 'both',
  quantity: number,
  customText: string,
  logo: string,
  totalPrice: number,
): CardOrder => {
  const orders = getOrders();

  const newOrder: CardOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    cardColor,
    type,
    quantity,
    customText,
    logo,
    status: 'pending',
    totalPrice,
    createdAt: new Date().toISOString().substring(0, 10),
  };
  orders.unshift(newOrder);
  try {
    localStorage.setItem('tiptap_orders', JSON.stringify(orders));
  } catch { /* storage blocked */ }
  return newOrder;
};
