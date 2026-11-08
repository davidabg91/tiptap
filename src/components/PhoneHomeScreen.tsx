import React from 'react';
import './PhoneHomeScreen.css';

// Decorative home screen for the hero phone. It is what the guest sees before
// the NFC tap; the hero timeline in index.css fades it out once the tag opens
// the rating page, so this component is markup only.

type AppIcon = { label: string; bg: string; glyph: React.ReactNode };

const Glyph: React.FC<{ color?: string; children: React.ReactNode }> = ({ color = '#fff', children }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const BrowserGlyph: React.FC = () => (
  <Glyph>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z" fill="#fff" />
  </Glyph>
);

const APPS: AppIcon[] = [
  { label: 'Снимки', bg: 'linear-gradient(135deg, #f472b6, #f59e0b)', glyph: <Glyph><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><circle cx="9" cy="9.5" r="1.7" /><path d="M20.5 15.5l-5-5-9.5 9" /></Glyph> },
  { label: 'Карти', bg: 'linear-gradient(135deg, #34d399, #059669)', glyph: <Glyph><path d="M12 20.5s-6.5-5.8-6.5-10.8a6.5 6.5 0 0 1 13 0c0 5-6.5 10.8-6.5 10.8z" /><circle cx="12" cy="9.7" r="2.3" /></Glyph> },
  { label: 'Времето', bg: 'linear-gradient(180deg, #2563eb, #60a5fa)', glyph: <Glyph><circle cx="9" cy="9" r="3.2" /><path d="M9 3v1.3M3 9h1.3M4.8 4.8l.9.9M13.2 4.8l-.9.9" /><path d="M8.5 19h8.5a3.2 3.2 0 0 0 0-6.4 4.6 4.6 0 0 0-8.8 1.4 2.5 2.5 0 0 0 .3 5z" /></Glyph> },
  { label: 'Часовник', bg: '#0b0b0f', glyph: <Glyph><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Glyph> },
  { label: 'Бележки', bg: 'linear-gradient(180deg, #fef08a, #facc15)', glyph: <Glyph color="#7a5b00"><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" /></Glyph> },
  { label: 'Поща', bg: 'linear-gradient(180deg, #38bdf8, #2563eb)', glyph: <Glyph><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></Glyph> },
  { label: 'Музика', bg: 'linear-gradient(135deg, #fb7185, #e11d48)', glyph: <Glyph><path d="M9 17.5V5.5l10-2v12" /><circle cx="6.8" cy="17.5" r="2.3" /><circle cx="16.8" cy="15.5" r="2.3" /></Glyph> },
  { label: 'Портфейл', bg: 'linear-gradient(135deg, #1f2937, #030712)', glyph: <Glyph><rect x="3.5" y="6" width="17" height="13" rx="2.5" /><path d="M3.5 10h17M15.5 14.5h2" /></Glyph> },
  { label: 'Здраве', bg: '#ffffff', glyph: <Glyph color="#ec4899"><path d="M12 19.5s-7-4.3-7-9.6A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 7 2.3c0 5.3-7 9.6-7 9.6z" fill="#ec4899" /></Glyph> },
  { label: 'Подкасти', bg: 'linear-gradient(135deg, #c084fc, #7c3aed)', glyph: <Glyph><rect x="9.5" y="3.5" width="5" height="10" rx="2.5" /><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5" /></Glyph> },
  { label: 'Настройки', bg: 'linear-gradient(180deg, #9ca3af, #4b5563)', glyph: <Glyph><path d="M4 7.5h9M17 7.5h3M4 16.5h3M11 16.5h9" /><circle cx="15" cy="7.5" r="2" /><circle cx="9" cy="16.5" r="2" /></Glyph> },
];

const DOCK: AppIcon[] = [
  { label: 'Телефон', bg: 'linear-gradient(180deg, #4ade80, #16a34a)', glyph: <Glyph><path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z" fill="#fff" /></Glyph> },
  { label: 'Браузър', bg: 'linear-gradient(180deg, #60a5fa, #1d4ed8)', glyph: <BrowserGlyph /> },
  { label: 'Съобщения', bg: 'linear-gradient(180deg, #4ade80, #16a34a)', glyph: <Glyph><path d="M12 4c4.7 0 8.5 3.1 8.5 7s-3.8 7-8.5 7a9.6 9.6 0 0 1-3-.5L4.5 19l1.2-3.4A6.6 6.6 0 0 1 3.5 11c0-3.9 3.8-7 8.5-7z" fill="#fff" /></Glyph> },
  { label: 'Камера', bg: 'linear-gradient(180deg, #e5e7eb, #9ca3af)', glyph: <Glyph color="#1f2937"><path d="M3.5 8.5a2 2 0 0 1 2-2h2.3L9.3 4.5h5.4l1.5 2h2.3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.8" r="3.3" /></Glyph> },
];

export const PhoneHomeScreen: React.FC = () => {
  const today = new Date();
  const weekday = today.toLocaleDateString('bg-BG', { weekday: 'long' });
  const weekdayShort = today.toLocaleDateString('bg-BG', { weekday: 'short' }).replace('.', '');

  return (
    <div className="phone-home" aria-hidden="true">
      <div className="phone-home-inner">
        <div className="ph-status">
          <span>09:41</span>
          <span className="ph-status-right">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" />
            </svg>
            <span>5G</span>
            <span className="ph-battery" />
          </span>
        </div>

        <div className="ph-widgets">
          <div className="ph-widget ph-weather">
            <span className="ph-w-city">София</span>
            <span className="ph-w-temp">14°</span>
            <svg className="ph-w-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fde047" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" fill="#fde047" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
            </svg>
            <span className="ph-w-desc">Ясно</span>
            <span className="ph-w-range">М:16° Мин:7°</span>
          </div>
          <div className="ph-widget ph-calendar">
            <span className="ph-c-day">{weekday}</span>
            <span className="ph-c-num">{today.getDate()}</span>
            <span className="ph-c-event">
              <strong>Вечеря</strong>
              20:00 · ресторант
            </span>
          </div>
        </div>

        <div className="ph-grid">
          <div className="ph-app">
            <span className="ph-icon ph-icon--calendar">
              <span>{weekdayShort}</span>
              <b>{today.getDate()}</b>
            </span>
            <span className="ph-label">Календар</span>
          </div>
          {APPS.map((app) => (
            <div className="ph-app" key={app.label}>
              <span className="ph-icon" style={{ background: app.bg }}>{app.glyph}</span>
              <span className="ph-label">{app.label}</span>
            </div>
          ))}
        </div>

        <div className="ph-dots"><i className="is-on" /><i /><i /></div>

        <div className="ph-dock">
          {DOCK.map((app) => (
            <span className="ph-icon" key={app.label} style={{ background: app.bg }}>{app.glyph}</span>
          ))}
        </div>
        <div className="ph-home-bar" />
      </div>
    </div>
  );
};
