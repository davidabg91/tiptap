import React from 'react';
import { FAQ, type FaqItem } from '../content/faq';
import './Faq.css';

export const Faq: React.FC<{ items?: FaqItem[] }> = ({ items = FAQ }) => (
  <div className="faq">
    {items.map((item, index) => (
      <details key={item.id} id={`faq-${item.id}`} className="faq-item" open={index === 0}>
        <summary>
          <span>{item.q}</span>
          <span className="faq-icon" aria-hidden="true" />
        </summary>
        <div className="faq-answer">{item.a}</div>
      </details>
    ))}
  </div>
);
