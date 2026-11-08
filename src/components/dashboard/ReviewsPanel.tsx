import React, { useMemo } from 'react';
import type { Review, Waiter } from '../../lib/types';
import { LANG_NAMES, tagLabel, type Lang } from '../../lib/ratingI18n';
import { formatDateTime } from '../../lib/stats';
import { Stars } from './ui';
import { CustomSearch as Search } from '../CustomIcons';
import type { ReviewFilters } from './reviewFilters';

interface ReviewsPanelProps {
  reviews: Review[];
  waiters: Waiter[];
  filters: ReviewFilters;
  onFiltersChange: (f: ReviewFilters) => void;
}

const PAGE = 40;

/** Reviews tab: every rating with tags (in Bulgarian), comment and language. */
export const ReviewsPanel: React.FC<ReviewsPanelProps> = ({ reviews, waiters, filters, onFiltersChange }) => {
  const [limit, setLimit] = React.useState(PAGE);
  const set = (patch: Partial<ReviewFilters>) => {
    setLimit(PAGE);
    onFiltersChange({ ...filters, ...patch });
  };

  const list = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return reviews
      .filter((r) => filters.stars === 'all' || (filters.stars === 'low' ? r.rating <= 2 : r.rating === filters.stars))
      .filter((r) => filters.waiterId === 'all' || r.waiterId === filters.waiterId)
      .filter((r) => !q
        || r.comment.toLowerCase().includes(q)
        || r.waiterName.toLowerCase().includes(q)
        || r.tags.some((t) => tagLabel(t).toLowerCase().includes(q)))
      .sort((a, b) => {
        if (filters.sort === 'rating_high') return b.rating - a.rating || b.createdAt.localeCompare(a.createdAt);
        if (filters.sort === 'rating_low') return a.rating - b.rating || b.createdAt.localeCompare(a.createdAt);
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [reviews, filters]);

  const withComments = list.filter((r) => r.comment).length;

  return (
    <div className="dash-stack">
      <div className="dash-card dash-filters">
        <div className="dash-searchbox">
          <Search size={16} color="var(--text-muted)" />
          <input
            placeholder="Търси в коментари, имена и отметки…"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            aria-label="Търсене в отзивите"
          />
        </div>
        <div className="dash-filter-row">
          <div className="dash-segment" role="group" aria-label="Звезди">
            {(['all', 'low', 5, 4, 3, 2, 1] as const).map((s) => (
              <button key={String(s)} type="button" className={filters.stars === s ? 'is-on' : ''} onClick={() => set({ stars: s })}>
                {s === 'all' ? 'Всички' : s === 'low' ? '1–2★' : `${s}★`}
              </button>
            ))}
          </div>
          <select className="input-field dash-select" value={filters.waiterId} onChange={(e) => set({ waiterId: e.target.value })} aria-label="Сервитьор">
            <option value="all">Всички сервитьори</option>
            {waiters.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <select className="input-field dash-select" value={filters.sort} onChange={(e) => set({ sort: e.target.value as ReviewFilters['sort'] })} aria-label="Подреждане">
            <option value="newest">Най-нови</option>
            <option value="rating_low">Най-ниски първо</option>
            <option value="rating_high">Най-високи първо</option>
          </select>
        </div>
        <p className="dash-field-hint">{list.length} оценки · {withComments} с коментар</p>
      </div>

      {list.length === 0 ? (
        <p className="dash-empty">Няма оценки по тези критерии.</p>
      ) : (
        <ul className="dash-review-list">
          {list.slice(0, limit).map((r) => (
            <li key={r.id} className={`dash-review dash-card${r.rating <= 2 ? ' is-low' : ''}`}>
              <div className="dash-review-head">
                <strong>{r.waiterName || '—'}</strong>
                <Stars value={r.rating} />
                {r.lang && r.lang !== 'bg' && (
                  <span className="dash-pill" title={LANG_NAMES[r.lang as Lang] ?? r.lang}>{r.lang.toUpperCase()}</span>
                )}
                <span className="dash-review-date">{formatDateTime(r.createdAt)}</span>
              </div>
              {r.tags.length > 0 && <p className="dash-review-tags">{r.tags.map((t) => tagLabel(t)).join(' · ')}</p>}
              {r.comment && <p className="dash-review-comment">„{r.comment}“</p>}
            </li>
          ))}
        </ul>
      )}
      {list.length > limit && (
        <button type="button" className="btn btn-secondary" onClick={() => setLimit((l) => l + PAGE)}>
          Покажи още ({list.length - limit})
        </button>
      )}
    </div>
  );
};
