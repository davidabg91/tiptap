import React from 'react';
import { CustomCheckCircle as CheckCircle } from './CustomIcons';

/** "Included in every plan" strip shown above the subscription plans. */
const INCLUDED = [
  'Известия при 1–2★ в Telegram и по имейл',
  'Бакшиш директно по вашата сметка',
  'Ваучери за недоволни гости',
  'Страница за оценка на 5 езика',
  'Седмичен отчет по имейл',
  'Защита от фалшиви оценки',
];

export const PlanIncludes: React.FC = () => (
  <div className="plan-includes">
    <span className="plan-includes-title">Във всеки план</span>
    <ul>
      {INCLUDED.map((item) => (
        <li key={item}><CheckCircle size={16} color="#a78bfa" /> {item}</li>
      ))}
    </ul>
  </div>
);
