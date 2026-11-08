import React, { useState } from 'react';
import type { Waiter } from '../../lib/types';
import type { CardOrder } from '../../utils/mockData';
import { rateUrl } from '../../lib/stats';
import { Card } from './ui';
import { CustomQrCode as QrCode, CustomPlus as Plus } from '../CustomIcons';

interface CardsPanelProps {
  waiters: Waiter[];
  orders: CardOrder[] | null;
  onShowQr: (w: Waiter) => void;
  onOrderCards?: () => void;
}

/** Cards tab: the link written on every NFC card / QR, ready to copy or print. */
export const CardsPanel: React.FC<CardsPanelProps> = ({ waiters, orders, onShowQr, onOrderCards }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1800);
    } catch { /* clipboard blocked */ }
  };

  return (
    <div className="dash-stack">
      <Card
        title="Линкове на картите"
        subtitle="Този адрес се записва в NFC чипа и в QR кода на картата на всеки сервитьор"
        action={onOrderCards && (
          <button type="button" className="btn btn-primary" onClick={onOrderCards}><Plus size={16} /> Поръчайте карти</button>
        )}
      >
        <ul className="dash-link-rows">
          {waiters.map((w) => {
            const url = rateUrl(w.slug);
            return (
              <li key={w.id}>
                <div className="dash-link-person">
                  <img src={w.avatar} alt="" />
                  <div>
                    <strong>{w.name}</strong>
                    <span>Код на картата: <code>{w.slug}</code></span>
                  </div>
                </div>
                <div className="dash-inline">
                  <input className="input-field" readOnly value={url} aria-label={`Линк на картата на ${w.name}`} onFocus={(e) => e.target.select()} />
                  <button type="button" className="btn btn-secondary" onClick={() => copy(w.id, url)}>
                    {copied === w.id ? 'Копирано ✓' : 'Копирай'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => onShowQr(w)} aria-label={`QR код на ${w.name}`}>
                    <QrCode size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="dash-field-hint">
          Когато сервитьор напусне, редактирайте профила му — картата остава същата и не се преиздава.
        </p>
      </Card>

      {orders && (
        <Card title="Поръчки на карти" subtitle="Демо история">
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead><tr><th>Поръчка</th><th>Продукт</th><th>Брой</th><th>Сума</th><th>Статус</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td><code>{o.id}</code> <small>{o.createdAt}</small></td>
                    <td>{o.type === 'card' ? 'NFC карти' : o.type === 'stand' ? 'Табелки' : 'Карти + табелки'}</td>
                    <td>{o.quantity}</td>
                    <td>€{o.totalPrice.toFixed(2)}</td>
                    <td><span className={`dash-pill ${o.status === 'delivered' ? 'is-on' : ''}`}>{o.status === 'delivered' ? 'Доставена' : o.status === 'shipped' ? 'Изпратена' : 'Обработва се'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
