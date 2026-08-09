export interface Waiter {
  id: string;
  name: string;
  role: string;
  rating: number;
  totalReviews: number;
  totalTips: number;
  scanCount: number;
  googleRedirects: number;
  shiftsCount: number;
  avgTipPerBill: number;
  qrCodeUrl: string;
  avatar: string;
  topTags: string[];
}

export interface Review {
  id: string;
  waiterId: string;
  waiterName: string;
  rating: number;
  comment: string;
  tipAmount: number;
  tags: string[];
  createdAt: string;
}

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

export interface Subscription {
  id: string;
  planName: string;
  price: number;
  status: 'active' | 'cancelled' | 'pending';
  nextBillingDate: string;
  cardLimit: number;
  activeCardsCount: number;
}

const INITIAL_WAITERS: Waiter[] = [
  {
    id: 'waiter-1',
    name: 'Иван Петров',
    role: 'Старши Сервитьор',
    rating: 4.9,
    totalReviews: 128,
    totalTips: 320.00,
    scanCount: 384,
    googleRedirects: 112,
    shiftsCount: 22,
    avgTipPerBill: 2.50,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tiptap.bg/rate/waiter-1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    topTags: ['Бързо обслужване', 'Усмихнат', 'Отлична препоръка']
  },
  {
    id: 'waiter-2',
    name: 'Мария Георгиева',
    role: 'Сервитьор',
    rating: 4.8,
    totalReviews: 95,
    totalTips: 485.50,
    scanCount: 290,
    googleRedirects: 84,
    shiftsCount: 19,
    avgTipPerBill: 5.11,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tiptap.bg/rate/waiter-2',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    topTags: ['Внимателна', 'Любезна', 'Чиста маса']
  },
  {
    id: 'waiter-3',
    name: 'Георги Димитров',
    role: 'Барман / Сервитьор',
    rating: 4.7,
    totalReviews: 76,
    totalTips: 195.00,
    scanCount: 450,
    googleRedirects: 62,
    shiftsCount: 16,
    avgTipPerBill: 4.21,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tiptap.bg/rate/waiter-3',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    topTags: ['Страхотни коктейли', 'Бърз', 'Атмосфера']
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    waiterId: 'waiter-1',
    waiterName: 'Иван Петров',
    rating: 5,
    comment: 'Изключително внимателно обслужване! Храната дойде бързо и ни препоръча страхотно вино.',
    tipAmount: 10.00,
    tags: ['Бързо обслужване', 'Отлична препоръка'],
    createdAt: '2026-08-06 20:45'
  },
  {
    id: 'rev-2',
    waiterId: 'waiter-2',
    waiterName: 'Мария Георгиева',
    rating: 5,
    comment: 'Страхотно отношение към децата на масата. Благодарим!',
    tipAmount: 5.00,
    tags: ['Любезна', 'Внимателна'],
    createdAt: '2026-08-06 19:30'
  },
  {
    id: 'rev-3',
    waiterId: 'waiter-1',
    waiterName: 'Иван Петров',
    rating: 4,
    comment: 'Много добро обслужване, малко забавяне при десерта, но всичко беше вкусно.',
    tipAmount: 3.50,
    tags: ['Усмихнат'],
    createdAt: '2026-08-06 18:15'
  }
];

const INITIAL_ORDERS: CardOrder[] = [
  {
    id: 'ORD-9821',
    cardColor: 'black',
    type: 'both',
    quantity: 15,
    customText: 'Ресторант Леденика',
    logo: 'utensils',
    status: 'delivered',
    totalPrice: 342.00,
    createdAt: '2026-08-01'
  }
];

const INITIAL_SUBSCRIPTION: Subscription = {
  id: 'SUB-4410',
  planName: 'Pro Бизнес Абонамент',
  price: 59.00,
  status: 'active',
  nextBillingDate: '2026-09-01',
  cardLimit: 30,
  activeCardsCount: 15
};

export const getWaiters = (): Waiter[] => {
  const saved = localStorage.getItem('tiptap_waiters');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((w: any, idx: number) => {
        const defaultData = INITIAL_WAITERS.find(iw => iw.id === w.id) || INITIAL_WAITERS[idx % INITIAL_WAITERS.length];
        return {
          ...defaultData,
          ...w,
          scanCount: typeof w.scanCount === 'number' ? w.scanCount : defaultData.scanCount,
          totalTips: typeof w.totalTips === 'number' ? w.totalTips : defaultData.totalTips,
          rating: typeof w.rating === 'number' ? w.rating : defaultData.rating,
          totalReviews: typeof w.totalReviews === 'number' ? w.totalReviews : defaultData.totalReviews
        };
      });
    } catch (e) {}
  }
  localStorage.setItem('tiptap_waiters', JSON.stringify(INITIAL_WAITERS));
  return INITIAL_WAITERS;
};

export const getReviews = (): Review[] => {
  const saved = localStorage.getItem('tiptap_reviews');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem('tiptap_reviews', JSON.stringify(INITIAL_REVIEWS));
  return INITIAL_REVIEWS;
};

export const getOrders = (): CardOrder[] => {
  const saved = localStorage.getItem('tiptap_orders');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem('tiptap_orders', JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

export const getSubscription = (): Subscription => {
  const saved = localStorage.getItem('tiptap_subscription');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem('tiptap_subscription', JSON.stringify(INITIAL_SUBSCRIPTION));
  return INITIAL_SUBSCRIPTION;
};

export const addReview = (review: Omit<Review, 'id' | 'createdAt'>): Review => {
  const reviews = getReviews();
  const newRev: Review = {
    ...review,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  reviews.unshift(newRev);
  localStorage.setItem('tiptap_reviews', JSON.stringify(reviews));

  // Update waiter totals
  const waiters = getWaiters();
  const waiterIndex = waiters.findIndex(w => w.id === review.waiterId);
  if (waiterIndex !== -1) {
    const w = waiters[waiterIndex];
    const newTotalReviews = w.totalReviews + 1;
    const newTotalTips = w.totalTips + review.tipAmount;
    const newRating = parseFloat(((w.rating * w.totalReviews + review.rating) / newTotalReviews).toFixed(1));
    
    waiters[waiterIndex] = {
      ...w,
      rating: newRating,
      totalReviews: newTotalReviews,
      totalTips: newTotalTips
    };
    localStorage.setItem('tiptap_waiters', JSON.stringify(waiters));
  }

  return newRev;
};

export const addWaiter = (name: string, role: string, avatar?: string): Waiter => {
  const waiters = getWaiters();
  const id = `waiter-${Date.now()}`;
  const newWaiter: Waiter = {
    id,
    name,
    role: role || 'Сервитьор',
    rating: 5.0,
    totalReviews: 0,
    totalTips: 0,
    scanCount: 0,
    googleRedirects: 0,
    shiftsCount: 1,
    avgTipPerBill: 0,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tiptap.bg/rate/${id}`,
    avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    topTags: ['Нов служител']
  };
  waiters.push(newWaiter);
  localStorage.setItem('tiptap_waiters', JSON.stringify(waiters));
  return newWaiter;
};

export const updateWaiter = (updatedWaiter: Waiter): Waiter => {
  const waiters = getWaiters();
  const index = waiters.findIndex(w => w.id === updatedWaiter.id);
  if (index !== -1) {
    waiters[index] = updatedWaiter;
    localStorage.setItem('tiptap_waiters', JSON.stringify(waiters));
  }
  return updatedWaiter;
};

export const deleteWaiter = (waiterId: string): void => {
  const waiters = getWaiters().filter(w => w.id !== waiterId);
  localStorage.setItem('tiptap_waiters', JSON.stringify(waiters));
};

export const addOrder = (
  cardColor: 'black' | 'white', 
  type: 'card' | 'stand' | 'both', 
  quantity: number, 
  customText: string, 
  logo: string
): CardOrder => {
  const orders = getOrders();
  const cardPrice = 4.90;
  const standPrice = 6.90;
  let unitPrice = cardPrice;
  if (type === 'stand') unitPrice = standPrice;
  if (type === 'both') unitPrice = cardPrice + standPrice;
  const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));

  const newOrder: CardOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    cardColor,
    type,
    quantity,
    customText,
    logo,
    status: 'pending',
    totalPrice,
    createdAt: new Date().toISOString().substring(0, 10)
  };
  orders.unshift(newOrder);
  localStorage.setItem('tiptap_orders', JSON.stringify(orders));
  return newOrder;
};
