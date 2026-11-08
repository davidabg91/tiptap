import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as demo from '../utils/mockData';
import {
  createTelegramLink,
  createWaiter,
  deleteWaiterRow,
  getVenueSettings,
  isTelegramConfigured,
  listEvents,
  listReviews,
  listVouchers,
  listWaiters,
  redeemVoucherRow,
  saveVenueSettings,
  updateWaiterRow,
  type Restaurant,
} from '../lib/data';
import {
  DEFAULT_SETTINGS,
  type FunnelEvent,
  type Review,
  type VenueSettings,
  type Voucher,
  type Waiter,
  type WaiterBase,
} from '../lib/types';
import { inRange, rangeStart, rateUrl, withStats, type TimeRange } from '../lib/stats';
import {
  CustomDownload as Download,
  CustomMessageSquare as MessageSquare,
  CustomPrinter as Printer,
  CustomTrash2 as Trash2,
  IconCyberAnalytics,
  IconEuroChip,
  IconNfcChip,
  IconSmartRadar,
  IconVipWaiters,
} from './CustomIcons';
import { Insights } from './dashboard/Insights';
import { TeamPanel } from './dashboard/TeamPanel';
import { ReviewsPanel } from './dashboard/ReviewsPanel';
import { DEFAULT_REVIEW_FILTERS, type ReviewFilters } from './dashboard/reviewFilters';
import { TipsPanel } from './dashboard/TipsPanel';
import { AlertsPanel } from './dashboard/AlertsPanel';
import { CardsPanel } from './dashboard/CardsPanel';

interface AdminDashboardProps {
  onNavigateToCustomizer?: () => void;
  /** When present, the dashboard shows this real restaurant's live data. */
  restaurant?: Restaurant;
  onSignOut?: () => void;
}

type Tab = 'overview' | 'team' | 'reviews' | 'tips' | 'alerts' | 'cards';

const TABS: { id: Tab; label: string; title: string; subtitle: string; group: 'main' | 'settings' }[] = [
  { id: 'overview', label: 'Преглед', title: 'Преглед', subtitle: 'Как върви обслужването и какво казват гостите', group: 'main' },
  { id: 'team', label: 'Екип', title: 'Екип', subtitle: 'Класиране, профили и линкове на сервитьорите', group: 'main' },
  { id: 'reviews', label: 'Оценки', title: 'Оценки', subtitle: 'Всяка оценка с отметките и коментара на госта', group: 'main' },
  { id: 'tips', label: 'Бакшиши', title: 'Бакшиши', subtitle: 'Гостите плащат директно на вас — без посредник', group: 'settings' },
  { id: 'alerts', label: 'Известия и ваучери', title: 'Известия и ваучери', subtitle: 'Telegram, имейл, седмичен отчет, Google и ваучери', group: 'settings' },
  { id: 'cards', label: 'Карти и QR', title: 'Карти и QR кодове', subtitle: 'Линковете в NFC картите', group: 'settings' },
];

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  overview: <IconCyberAnalytics size={19} />,
  team: <IconVipWaiters size={19} />,
  reviews: <MessageSquare size={17} />,
  tips: <IconEuroChip size={19} />,
  alerts: <IconSmartRadar size={19} />,
  cards: <IconNfcChip size={19} />,
};

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
];

const ROLES = ['Сервитьор', 'Старши сервитьор', 'Барман / сервитьор', 'Управител', 'Хостеса'];

function csvCell(value: string | number): string {
  const text = String(value);
  // Neutralise spreadsheet formulas and quote everything.
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToCustomizer, restaurant, onSignOut }) => {
  const restaurantId = restaurant?.id ?? null;
  const live = restaurantId !== null;

  const [bases, setBases] = useState<WaiterBase[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [events, setEvents] = useState<FunnelEvent[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [settings, setSettings] = useState<VenueSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>('overview');
  const [range, setRange] = useState<TimeRange>('30d');
  const [reviewFilters, setReviewFilters] = useState<ReviewFilters>(DEFAULT_REVIEW_FILTERS);

  const reload = useCallback(async () => {
    try {
      if (restaurantId) {
        const waiters = await listWaiters();
        const since = new Date(rangeStart('year')).toISOString();
        const [r, e, v, s] = await Promise.all([
          listReviews(waiters), listEvents(since), listVouchers(), getVenueSettings(restaurantId),
        ]);
        setBases(waiters);
        setReviews(r);
        setEvents(e);
        setVouchers(v);
        setSettings(s);
      } else {
        setBases([...demo.getWaiterBases()]);
        setReviews([...demo.getReviews()]);
        setEvents([...demo.getEvents()]);
        setVouchers([...demo.getVouchers()]);
        setSettings({ ...demo.getSettings() });
      }
      setLoadError(null);
    } catch {
      setLoadError('Данните не можаха да се заредят. Проверете връзката и опитайте отново.');
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  // Everything on screen follows the selected period.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const from = useMemo(() => rangeStart(range), [range, reviews, events]);
  const periodReviews = useMemo(() => inRange(reviews, from), [reviews, from]);
  const periodEvents = useMemo(() => inRange(events, from), [events, from]);
  const waiters: Waiter[] = useMemo(
    () => bases.map((b) => withStats(b, periodReviews, periodEvents)),
    [bases, periodReviews, periodEvents],
  );

  // On mobile the menu sits above the content; scroll the panel into view.
  const workspaceRef = useRef<HTMLElement>(null);
  const openTab = (next: Tab) => {
    setTab(next);
    if (window.innerWidth <= 900) {
      window.setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  };

  // ---------- Waiter modal --------------------------------------------------------
  const [editing, setEditing] = useState<Waiter | null>(null);
  const [showWaiterModal, setShowWaiterModal] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Сервитьор', avatar: AVATAR_PRESETS[0], tipUrl: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Waiter | null>(null);
  const [qrWaiter, setQrWaiter] = useState<Waiter | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', role: 'Сервитьор', avatar: AVATAR_PRESETS[0], tipUrl: '' });
    setFormError(null);
    setShowWaiterModal(true);
  };

  const openEdit = (w: Waiter) => {
    setEditing(w);
    setForm({ name: w.name, role: w.role, avatar: w.avatar, tipUrl: w.tipUrl ?? '' });
    setFormError(null);
    setShowWaiterModal(true);
  };

  const saveWaiter = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    if (form.tipUrl.trim() && !/^https:\/\//.test(form.tipUrl.trim())) {
      setFormError('Линкът за бакшиш трябва да започва с https://');
      return;
    }
    try {
      if (restaurantId) {
        if (editing) {
          await updateWaiterRow(editing.id, { name, role: form.role, avatarUrl: form.avatar || undefined, tipUrl: form.tipUrl });
        } else {
          await createWaiter(restaurantId, { name, role: form.role, avatarUrl: form.avatar || undefined, tipUrl: form.tipUrl });
        }
      } else if (editing) {
        demo.updateWaiter(editing.id, { name, role: form.role, avatar: form.avatar || editing.avatar, tipUrl: form.tipUrl.trim() || null });
      } else {
        demo.addWaiter(name, form.role, form.avatar, form.tipUrl.trim() || null);
      }
      setShowWaiterModal(false);
      await reload();
    } catch {
      setFormError('Неуспешно запазване. Опитайте отново.');
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      if (restaurantId) await deleteWaiterRow(deleting.id);
      else demo.deleteWaiter(deleting.id);
      setDeleting(null);
      await reload();
    } catch {
      setDeleting(null);
      setLoadError('Сервитьорът не беше премахнат. Опитайте отново.');
    }
  };

  // ---------- Settings ------------------------------------------------------------
  const saveSettings = async (patch: Partial<VenueSettings>) => {
    await saveVenueSettings(restaurantId, patch);
    setSettings(await getVenueSettings(restaurantId));
  };

  const saveWaiterLink = async (waiterId: string, url: string) => {
    if (restaurantId) await updateWaiterRow(waiterId, { tipUrl: url });
    else demo.updateWaiter(waiterId, { tipUrl: url || null });
    await reload();
  };

  const connectTelegram = async () => {
    const url = await createTelegramLink(restaurantId);
    if (!restaurantId) await saveSettings({ telegramLinked: true }); // demo: pretend the chat linked
    return url;
  };

  const redeemVoucher = async (id: string) => {
    if (restaurantId) await redeemVoucherRow(id);
    else demo.redeemVoucher(id);
    await reload();
  };

  // ---------- CSV export (opens correctly in Excel: UTF-8 BOM + quoting) ----------
  const exportCsv = () => {
    const header = ['Сервитьор', 'Позиция', 'Среден рейтинг', 'Оценки', 'Сканирания', 'Кликове за бакшиш', 'Кликове към Google'];
    const rows = waiters.map((w) => [w.name, w.role, w.rating.toFixed(1), w.totalReviews, w.scanCount, w.tipClicks, w.googleRedirects]);
    const csv = [header, ...rows].map((row) => row.map(csvCell).join(';')).join('\r\n');
    const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `TipTap_${range}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };

  const showLowRatings = () => {
    setReviewFilters({ ...DEFAULT_REVIEW_FILTERS, stars: 'low' });
    openTab('reviews');
  };

  const current = TABS.find((t) => t.id === tab)!;
  const usesRange = tab === 'overview' || tab === 'team' || tab === 'reviews';
  const lowCount = periodReviews.filter((r) => r.rating <= 2).length;

  return (
    <div className="dash">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="dash-venue">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" />
          <div>
            <strong>{restaurant ? restaurant.name : 'Ресторант Леденика'}</strong>
            <span>{restaurant ? restaurant.city || 'Табло на заведението' : 'Демо с примерни данни'}</span>
          </div>
        </div>

        {(['main', 'settings'] as const).map((group) => (
          <nav key={group} className="dash-nav" aria-label={group === 'main' ? 'Основни раздели' : 'Настройки'}>
            <span className="dash-nav-title">{group === 'main' ? 'Основни' : 'Настройки'}</span>
            {TABS.filter((t) => t.group === group).map((t) => (
              <button
                key={t.id}
                type="button"
                className={`dash-nav-btn${tab === t.id ? ' is-active' : ''}`}
                aria-current={tab === t.id ? 'page' : undefined}
                onClick={() => openTab(t.id)}
              >
                {TAB_ICONS[t.id]}
                <span>{t.label}</span>
                {t.id === 'team' && <em>{bases.length}</em>}
                {t.id === 'reviews' && lowCount > 0 && <em className="is-alert" title="Ниски оценки за периода">{lowCount}</em>}
              </button>
            ))}
          </nav>
        ))}

        <div className="dash-sidebar-foot">
          {onNavigateToCustomizer && (
            <button type="button" className="btn btn-secondary" onClick={onNavigateToCustomizer}>Поръчайте още карти</button>
          )}
          {onSignOut && (
            <button type="button" className="btn btn-secondary" onClick={onSignOut}>Изход</button>
          )}
        </div>
      </aside>

      {/* WORKSPACE */}
      <main ref={workspaceRef} className="dash-main">
        {!live && (
          <div className="dash-demo-banner">
            <div>
              <strong>Демо табло с примерни данни</strong>
              <span>60 дни история на „Ресторант Леденика“. Всичко, което промените, остава само във вашия браузър.</span>
            </div>
            <div className="dash-inline">
              <button type="button" className="btn btn-secondary" onClick={() => { demo.resetDemo(); void reload(); }}>Започни отначало</button>
              {onNavigateToCustomizer && <button type="button" className="btn btn-primary" onClick={onNavigateToCustomizer}>Поръчайте NFC карти</button>}
            </div>
          </div>
        )}

        <header className="dash-head">
          <div>
            <h2>{current.title}</h2>
            <p>{current.subtitle}</p>
          </div>
          <div className="dash-inline">
            {usesRange && (
              <div className="dash-segment" role="group" aria-label="Период">
                {(['7d', '30d', 'year'] as const).map((r) => (
                  <button key={r} type="button" className={range === r ? 'is-on' : ''} onClick={() => setRange(r)}>
                    {r === '7d' ? '7 дни' : r === '30d' ? '30 дни' : '12 месеца'}
                  </button>
                ))}
              </div>
            )}
            {(tab === 'overview' || tab === 'team') && (
              <button type="button" className="btn btn-secondary" onClick={exportCsv}><Download size={16} /> CSV</button>
            )}
          </div>
        </header>

        {loadError && <div className="dash-error" role="alert">{loadError} <button type="button" className="dash-link-btn" onClick={() => void reload()}>Опитай пак</button></div>}

        {loading ? (
          <div className="dash-card dash-empty-state"><p>Зареждане…</p></div>
        ) : (
          <>
            {tab === 'overview' && (
              <Insights reviews={periodReviews} events={periodEvents} range={range} settings={settings} onShowLowRatings={showLowRatings} />
            )}
            {tab === 'team' && (
              <TeamPanel
                waiters={waiters}
                settings={settings}
                onAdd={openCreate}
                onEdit={openEdit}
                onDelete={setDeleting}
                onShowQr={setQrWaiter}
                onShowReviews={(w) => { setReviewFilters({ ...DEFAULT_REVIEW_FILTERS, waiterId: w.id }); openTab('reviews'); }}
              />
            )}
            {tab === 'reviews' && (
              <ReviewsPanel reviews={periodReviews} waiters={waiters} filters={reviewFilters} onFiltersChange={setReviewFilters} />
            )}
            {tab === 'tips' && (
              <TipsPanel
                settings={settings}
                waiters={waiters}
                onSaveVenueLink={(url) => saveSettings({ tipUrl: url })}
                onSaveWaiterLink={saveWaiterLink}
              />
            )}
            {tab === 'alerts' && (
              <AlertsPanel
                settings={settings}
                vouchers={vouchers}
                isDemo={!live}
                telegramReady={isTelegramConfigured}
                onSave={saveSettings}
                onConnectTelegram={connectTelegram}
                onRedeemVoucher={redeemVoucher}
              />
            )}
            {tab === 'cards' && (
              <CardsPanel waiters={waiters} orders={live ? null : demo.getOrders()} onShowQr={setQrWaiter} onOrderCards={onNavigateToCustomizer} />
            )}
          </>
        )}
      </main>

      {/* ADD / EDIT WAITER */}
      {showWaiterModal && (
        <div className="dash-modal" role="dialog" aria-modal="true" aria-labelledby="waiter-modal-title" onClick={(e) => { if (e.target === e.currentTarget) setShowWaiterModal(false); }}>
          <form onSubmit={saveWaiter} className="dash-modal-box">
            <h3 id="waiter-modal-title">{editing ? `Редактиране: ${editing.name}` : 'Нов сервитьор'}</h3>

            <div className="dash-field">
              <label className="dash-field-label" htmlFor="waiter-name">Име и фамилия</label>
              <input id="waiter-name" className="input-field" required autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Напр. Димитър Ангелов" />
            </div>

            <div className="dash-field">
              <label className="dash-field-label" htmlFor="waiter-role">Позиция</label>
              <select id="waiter-role" className="input-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                {(ROLES.includes(form.role) ? ROLES : [form.role, ...ROLES]).map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="dash-field">
              <label className="dash-field-label" htmlFor="waiter-tip">Личен линк за бакшиш (по желание)</label>
              <input id="waiter-tip" className="input-field" type="url" value={form.tipUrl} onChange={(e) => setForm({ ...form, tipUrl: e.target.value })} placeholder={settings.tipUrl ? 'Празно = линкът на заведението' : 'https://revolut.me/…'} />
              <p className="dash-field-hint">Бакшишът отива директно по сметката на сервитьора.</p>
            </div>

            <div className="dash-field">
              <span className="dash-field-label">Снимка</span>
              <div className="dash-avatars">
                {AVATAR_PRESETS.map((url) => (
                  <button key={url} type="button" className={form.avatar === url ? 'is-on' : ''} onClick={() => setForm({ ...form, avatar: url })} aria-label="Избери снимка">
                    <img src={url} alt="" />
                  </button>
                ))}
              </div>
              <input className="input-field" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="или поставете линк към снимка" aria-label="Линк към снимка" />
            </div>

            {formError && <p className="dash-field-hint is-error">{formError}</p>}

            <div className="dash-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowWaiterModal(false)}>Отказ</button>
              <button type="submit" className="btn btn-primary">Запази</button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleting && (
        <div className="dash-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title" onClick={(e) => { if (e.target === e.currentTarget) setDeleting(null); }}>
          <div className="dash-modal-box is-danger">
            <div className="dash-modal-icon"><Trash2 size={26} /></div>
            <h3 id="delete-title">Премахване на {deleting.name}?</h3>
            <p>
              Ще бъдат изтрити и всичките му оценки и статистика. Ако служителят просто напуска,
              по-добре редактирайте профила и дайте картата на новия колега.
            </p>
            <div className="dash-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setDeleting(null)}>Отказ</button>
              <button type="button" className="btn btn-primary dash-danger-btn" onClick={confirmDelete}>Да, премахни</button>
            </div>
          </div>
        </div>
      )}

      {/* QR / CARD LINK */}
      {qrWaiter && (
        <div className="dash-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title" onClick={(e) => { if (e.target === e.currentTarget) setQrWaiter(null); }}>
          <div className="dash-modal-box is-center">
            <h3 id="qr-title">QR код — {qrWaiter.name}</h3>
            <p>Отпечатайте го за табелка или проверете картата. Сочи към същия адрес като NFC чипа.</p>
            <div className="dash-qr">
              <img src={qrWaiter.qrCodeUrl} alt={`QR код за оценка на ${qrWaiter.name}`} />
              <strong>{qrWaiter.name}</strong>
              <code>{rateUrl(qrWaiter.slug)}</code>
            </div>
            <div className="dash-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setQrWaiter(null)}>Затвори</button>
              <button type="button" className="btn btn-primary" onClick={() => window.print()}><Printer size={16} /> Принтирай</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
