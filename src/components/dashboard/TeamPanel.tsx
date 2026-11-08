import React, { useState } from 'react';
import type { VenueSettings, Waiter } from '../../lib/types';
import { tagLabel } from '../../lib/ratingI18n';
import { percent } from '../../lib/stats';
import {
  CustomEdit3 as Edit3,
  CustomPlus as Plus,
  CustomQrCode as QrCode,
  CustomTrash2 as Trash2,
} from '../CustomIcons';

type SortKey = 'rating' | 'reviews' | 'scans' | 'tips';

interface TeamPanelProps {
  waiters: Waiter[];
  settings: VenueSettings;
  onAdd: () => void;
  onEdit: (w: Waiter) => void;
  onDelete: (w: Waiter) => void;
  onShowQr: (w: Waiter) => void;
  onShowReviews: (w: Waiter) => void;
}

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'rating', label: 'Рейтинг' },
  { id: 'reviews', label: 'Брой оценки' },
  { id: 'scans', label: 'Сканирания' },
  { id: 'tips', label: 'Кликове за бакшиш' },
];

/** Team tab: leaderboard for the selected period + edit / QR / delete. */
export const TeamPanel: React.FC<TeamPanelProps> = ({ waiters, settings, onAdd, onEdit, onDelete, onShowQr, onShowReviews }) => {
  const [sortBy, setSortBy] = useState<SortKey>('rating');

  const sorted = [...waiters].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating || b.totalReviews - a.totalReviews;
    if (sortBy === 'reviews') return b.totalReviews - a.totalReviews;
    if (sortBy === 'scans') return b.scanCount - a.scanCount;
    return b.tipClicks - a.tipClicks;
  });

  return (
    <div className="dash-stack">
      <div className="dash-toolbar">
        <div className="dash-segment" role="group" aria-label="Подреди по">
          {SORTS.map((s) => (
            <button key={s.id} type="button" className={sortBy === s.id ? 'is-on' : ''} onClick={() => setSortBy(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} /> Нов сервитьор
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="dash-card dash-empty-state">
          <p>Още нямате добавени сервитьори.</p>
          <button type="button" className="btn btn-primary" onClick={onAdd}><Plus size={16} /> Добавете първия</button>
        </div>
      ) : (
        <div className="dash-team-grid">
          {sorted.map((w, index) => {
            const tipSource = w.tipUrl ? 'Личен линк за бакшиш' : settings.tipUrl ? 'Линкът на заведението' : 'Без линк за бакшиш';
            return (
              <article key={w.id} className="dash-card dash-person">
                <header className="dash-person-head">
                  <span className={`dash-rank${index === 0 && sortBy === 'rating' && w.totalReviews ? ' is-top' : ''}`}>
                    {index === 0 && sortBy === 'rating' && w.totalReviews ? '🏆 №1' : `№${index + 1}`}
                  </span>
                  <div className="dash-icon-btns">
                    <button type="button" onClick={() => onShowQr(w)} title="QR код и линк на картата" aria-label={`QR код на ${w.name}`}><QrCode size={15} /></button>
                    <button type="button" onClick={() => onEdit(w)} title="Редактирай" aria-label={`Редактирай ${w.name}`}><Edit3 size={15} /></button>
                    <button type="button" className="is-danger" onClick={() => onDelete(w)} title="Премахни" aria-label={`Премахни ${w.name}`}><Trash2 size={15} /></button>
                  </div>
                </header>

                <div className="dash-person-id">
                  <img src={w.avatar} alt="" />
                  <div>
                    <h4>{w.name}</h4>
                    <span>{w.role}</span>
                  </div>
                </div>

                <dl className="dash-person-stats">
                  <div><dt>Рейтинг</dt><dd className="is-gold">{w.totalReviews ? w.rating.toFixed(1).replace('.', ',') : '—'} ★ <small>({w.totalReviews})</small></dd></div>
                  <div><dt>Сканирания</dt><dd>{w.scanCount}</dd></div>
                  <div><dt>Оценили</dt><dd>{percent(w.totalReviews, w.scanCount)}</dd></div>
                  <div><dt>Бакшиш / Google</dt><dd>{w.tipClicks} / {w.googleRedirects}</dd></div>
                </dl>

                {w.topTags.length > 0 && (
                  <p className="dash-person-tags">{w.topTags.map((t) => tagLabel(t)).join(' · ')}</p>
                )}

                <footer className="dash-person-foot">
                  <span className={`dash-pill ${w.tipUrl || settings.tipUrl ? 'is-on' : ''}`}>{tipSource}</span>
                  <button type="button" className="dash-link-btn" onClick={() => onShowReviews(w)}>Оценки →</button>
                </footer>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
