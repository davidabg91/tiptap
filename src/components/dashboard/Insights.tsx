import React from 'react';
import type { FunnelEvent, Review, VenueSettings } from '../../lib/types';
import {
  formatDateTime,
  funnel,
  percent,
  ratingDistribution,
  ratingsByDay,
  ratingsByMonth,
  topTags,
  type TimeRange,
} from '../../lib/stats';
import { tagLabel } from '../../lib/ratingI18n';
import { Card, Stars } from './ui';

interface InsightsProps {
  reviews: Review[];
  events: FunnelEvent[];
  range: TimeRange;
  settings: VenueSettings;
  onShowLowRatings: () => void;
}

const RANGE_LABEL: Record<TimeRange, string> = { '7d': 'последните 7 дни', '30d': 'последните 30 дни', year: 'последните 12 месеца' };

/** Overview tab: KPIs, the guest funnel, ratings over time and what guests say. */
export const Insights: React.FC<InsightsProps> = ({ reviews, events, range, settings, onShowLowRatings }) => {
  const f = funnel(reviews, events);
  const series = range === 'year' ? ratingsByMonth(reviews, 12) : ratingsByDay(reviews, range === '7d' ? 7 : 30);
  const maxCount = Math.max(1, ...series.map((s) => s.count));
  const praise = topTags(reviews.filter((r) => r.rating >= 4), 5);
  const problems = topTags(reviews.filter((r) => r.rating <= 2), 5);
  const latestLow = reviews.filter((r) => r.rating <= 2).slice(0, 3);
  const alertsOn = settings.notifyLowRating && (settings.telegramLinked || Boolean(settings.notifyEmail));

  const steps = [
    { label: 'Сканирали картата', value: f.scans, note: 'отворили страницата за оценка' },
    { label: 'Оставили оценка', value: f.ratings, note: `${percent(f.ratings, f.scans)} от сканиралите` },
    { label: 'Отворили линка за бакшиш', value: f.tipClicks, note: `${percent(f.tipClicks, f.ratings)} от оценилите` },
    { label: 'Отворили Google за отзив', value: f.googleClicks, note: `${percent(f.googleClicks, f.ratings)} от оценилите` },
  ];

  return (
    <div className="dash-stack">
      <div className="dash-kpis">
        <div className="dash-kpi">
          <span className="dash-kpi-label">Сканирания</span>
          <span className="dash-kpi-value">{f.scans.toLocaleString('bg-BG')}</span>
          <span className="dash-kpi-note">{RANGE_LABEL[range]}</span>
        </div>
        <div className="dash-kpi">
          <span className="dash-kpi-label">Оценки</span>
          <span className="dash-kpi-value">{f.ratings.toLocaleString('bg-BG')}</span>
          <span className="dash-kpi-note">{percent(f.ratings, f.scans)} от сканиранията</span>
        </div>
        <div className="dash-kpi">
          <span className="dash-kpi-label">Среден рейтинг</span>
          <span className="dash-kpi-value is-gold">{f.ratings ? f.avgRating.toFixed(1).replace('.', ',') : '—'} <small>★</small></span>
          <span className="dash-kpi-note">от {f.ratings} оценки</span>
        </div>
        <button type="button" className={`dash-kpi is-button${f.lowRatings ? ' is-alert' : ''}`} onClick={onShowLowRatings}>
          <span className="dash-kpi-label">Ниски оценки (1–2★)</span>
          <span className="dash-kpi-value">{f.lowRatings}</span>
          <span className="dash-kpi-note">{alertsOn ? 'Известията са включени' : 'Известията са изключени'}</span>
        </button>
      </div>

      <div className="dash-grid-2">
        <Card title="Пътят на госта" subtitle={`От докосването до отзива · ${RANGE_LABEL[range]}`}>
          <ol className="dash-funnel">
            {steps.map((s) => (
              <li key={s.label}>
                <div className="dash-funnel-row">
                  <span className="dash-funnel-label">{s.label}</span>
                  <span className="dash-funnel-value">{s.value.toLocaleString('bg-BG')}</span>
                </div>
                <div className="dash-funnel-bar"><span style={{ width: `${f.scans ? Math.max(2, (s.value / f.scans) * 100) : 0}%` }} /></div>
                <span className="dash-funnel-note">{s.note}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Разпределение на оценките" subtitle={`${f.ratings} оценки`}>
          <div className="dash-dist">
            {ratingDistribution(reviews).map((row) => (
              <div key={row.stars} className="dash-dist-row">
                <span className="dash-dist-label">{row.stars} ★</span>
                <div className={`dash-dist-bar is-${row.stars}`}><span style={{ width: `${row.pct}%` }} /></div>
                <span className="dash-dist-value">{row.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card
        title={range === 'year' ? 'Оценки по месеци' : 'Оценки по дни'}
        subtitle="Височината е броят оценки; цветът — средният рейтинг за деня"
      >
        <div className={`dash-bars${series.length > 14 ? ' is-dense' : ''}`}>
          {series.map((s) => {
            const label = range === 'year'
              ? s.date.toLocaleDateString('bg-BG', { month: 'short' })
              : s.date.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' });
            const tone = !s.count ? 'empty' : s.avg >= 4.5 ? 'great' : s.avg >= 3.5 ? 'good' : 'weak';
            return (
              <div key={s.date.toISOString()} className="dash-bar" title={`${label}: ${s.count} оценки${s.count ? `, средно ${s.avg.toFixed(1)} ★` : ''}`}>
                <span className="dash-bar-value">{s.count || ''}</span>
                <span className={`dash-bar-fill is-${tone}`} style={{ height: `${(s.count / maxCount) * 100}%` }} />
                <span className="dash-bar-label">{label}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="dash-grid-2">
        <Card title="Какво хвалят гостите" subtitle="Най-често отбелязано при 4–5★">
          {praise.length ? (
            <ul className="dash-tags">
              {praise.map((t) => <li key={t.key} className="is-good">{tagLabel(t.key)} <b>{t.count}</b></li>)}
            </ul>
          ) : <p className="dash-empty">Още няма достатъчно оценки.</p>}
        </Card>
        <Card title="Какво трябва да се подобри" subtitle="Най-често отбелязано при 1–2★">
          {problems.length ? (
            <ul className="dash-tags">
              {problems.map((t) => <li key={t.key} className="is-bad">{tagLabel(t.key)} <b>{t.count}</b></li>)}
            </ul>
          ) : <p className="dash-empty">Няма ниски оценки за периода. 🎉</p>}
        </Card>
      </div>

      {latestLow.length > 0 && (
        <Card
          title="Последни ниски оценки"
          action={<button type="button" className="dash-link-btn" onClick={onShowLowRatings}>Виж всички →</button>}
        >
          <ul className="dash-review-list">
            {latestLow.map((r) => (
              <li key={r.id} className="dash-review is-low">
                <div className="dash-review-head">
                  <strong>{r.waiterName}</strong>
                  <Stars value={r.rating} />
                  <span className="dash-review-date">{formatDateTime(r.createdAt)}</span>
                </div>
                {r.tags.length > 0 && <p className="dash-review-tags">{r.tags.map((t) => tagLabel(t)).join(' · ')}</p>}
                {r.comment && <p className="dash-review-comment">„{r.comment}“</p>}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};
