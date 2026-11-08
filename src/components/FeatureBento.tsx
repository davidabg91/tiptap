import React from 'react';
import './FeatureBento.css';

/**
 * "Всичко, което получавате" — every TipTap feature in one bento grid,
 * shared by the landing page and "Как работи". Each tile has a small,
 * static illustration so the grid reads at a glance.
 */

interface Tile {
  id: string;
  size: 'wide' | 'third';
  eyebrow: string;
  title: string;
  text: string;
  visual?: React.ReactNode;
}

const TILES: Tile[] = [
  {
    id: 'alerts',
    size: 'wide',
    eyebrow: 'Мигновени известия',
    title: 'Научавате за недоволен гост още в същата минута',
    text: 'При оценка 1 или 2 звезди получавате известие в Telegram или по имейл — със сервитьора, отбелязания проблем и коментара. Реагирате, докато гостът е още на масата.',
    visual: (
      <div className="fb-alert">
        <div className="fb-toast">
          <span className="fb-toast-icon is-telegram">✈</span>
          <div>
            <strong>Ниска оценка 2★ · Иван П.</strong>
            <span>Дълго чакане · „Чакахме сметката 25 минути.“</span>
          </div>
          <small>сега</small>
        </div>
        <div className="fb-toast is-back">
          <span className="fb-toast-icon is-mail">✉</span>
          <div>
            <strong>Същото известие по имейл</strong>
            <span>с бутон „Отвори таблото“</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tips',
    size: 'wide',
    eyebrow: 'Бакшиш без посредник',
    title: 'Парите отиват директно при сервитьора',
    text: 'Гостът избира сума и плаща през вашата страница за плащане — Revolut, myPOS, Stripe или банков линк. TipTap не докосва парите и не взима комисиона.',
    visual: (
      <div className="fb-tip">
        <div className="fb-amounts"><span>€2</span><span className="is-on">€5</span><span>€10</span></div>
        <div className="fb-pay">Към плащането · Revolut ↗</div>
        <div className="fb-tip-foot"><span>0% комисиона</span><span>Без посредник</span></div>
      </div>
    ),
  },
  {
    id: 'funnel',
    size: 'third',
    eyebrow: 'Пътят на госта',
    title: 'Виждате къде губите гости',
    text: 'Сканиране → оценка → бакшиш → Google. За всеки сервитьор и за всеки период — 7 дни, 30 дни или година.',
    visual: (
      <div className="fb-funnel">
        {[['Сканирания', 100], ['Оценки', 68], ['Бакшиш', 25], ['Google', 31]].map(([label, value]) => (
          <div key={label as string}>
            <span>{label}</span>
            <i style={{ width: `${value}%` }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'voucher',
    size: 'third',
    eyebrow: 'Ваучер за недоволен гост',
    title: 'Втори шанс вместо лош отзив',
    text: 'По ваш избор — десерт, кафе или отстъпка за следващото посещение. Вие решавате дали да е включен, за кои оценки и колко дни е валиден.',
    visual: (
      <div className="fb-voucher">
        <span>🎁 Подарък от заведението</span>
        <strong>Безплатен десерт</strong>
        <code>7F3A9C21</code>
      </div>
    ),
  },
  {
    id: 'languages',
    size: 'third',
    eyebrow: 'На езика на госта',
    title: '5 езика, автоматично',
    text: 'Страницата за оценка се отваря на езика на телефона. А вие четете всичко на български.',
    visual: (
      <div className="fb-langs">
        {['BG', 'EN', 'DE', 'RO', 'RU'].map((l, i) => <span key={l} className={i === 1 ? 'is-on' : ''}>{l}</span>)}
      </div>
    ),
  },
  {
    id: 'report',
    size: 'third',
    eyebrow: 'Седмичен отчет',
    title: 'Всеки понеделник в пощата ви',
    text: 'Сканирания, оценки, рейтинг по сервитьори и какво не е харесало на гостите — в едно кратко писмо.',
  },
  {
    id: 'google',
    size: 'third',
    eyebrow: 'Google отзиви',
    title: 'Повече отзиви от доволни гости',
    text: 'Гостите, оценили с 4–5★, стигат до страницата ви за отзиви в Google с едно докосване.',
  },
  {
    id: 'spam',
    size: 'third',
    eyebrow: 'Защита от злоупотреби',
    title: 'Само истински оценки',
    text: 'Невидима проверка за роботи и ограничение по устройство — никой не може да „напомпа“ или да срине рейтинга на сервитьор.',
  },
];

export const FeatureBento: React.FC = () => (
  <div className="fb-grid">
    {TILES.map((tile) => (
      <article key={tile.id} className={`fb-tile is-${tile.size} is-${tile.id}`}>
        {tile.visual && <div className="fb-visual" aria-hidden="true">{tile.visual}</div>}
        <div className="fb-copy">
          <span className="fb-eyebrow">{tile.eyebrow}</span>
          <h3>{tile.title}</h3>
          <p>{tile.text}</p>
        </div>
      </article>
    ))}
  </div>
);
