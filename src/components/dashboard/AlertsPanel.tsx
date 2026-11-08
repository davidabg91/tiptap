import React, { useEffect, useMemo, useState } from 'react';
import type { VenueSettings, Voucher } from '../../lib/types';
import { formatDate } from '../../lib/stats';
import { Card, Field, SaveStatus, Stars, Switch } from './ui';

interface AlertsPanelProps {
  settings: VenueSettings;
  vouchers: Voucher[];
  isDemo: boolean;
  telegramReady: boolean;
  onSave: (patch: Partial<VenueSettings>) => Promise<void>;
  onConnectTelegram: () => Promise<string>;
  onRedeemVoucher: (id: string) => Promise<void>;
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

const VOUCHER_PRESETS = [
  'Безплатен десерт при следващото посещение',
  'Безплатно кафе при следващото посещение',
  '10% отстъпка от следващата сметка',
  'Напитка от заведението',
];

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function voucherStatus(v: Voucher, now: number): 'used' | 'expired' | 'active' {
  if (v.redeemedAt) return 'used';
  return Date.parse(v.expiresAt) < now ? 'expired' : 'active';
}

/** Alerts (Telegram + email), weekly report, Google link and recovery vouchers. */
export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  settings, vouchers, isDemo, telegramReady, onSave, onConnectTelegram, onRedeemVoucher,
}) => {
  const [form, setForm] = useState<VenueSettings>(settings);
  const [state, setState] = useState<SaveState>('idle');
  const [telegramNote, setTelegramNote] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  const set = <K extends keyof VenueSettings>(key: K, value: VenueSettings[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setState('idle');
  };

  const emailProblem = form.notifyEmail && !isEmail(form.notifyEmail) ? 'Невалиден имейл адрес.' : null;
  const dirty = JSON.stringify(form) !== JSON.stringify(settings);

  const save = async () => {
    if (emailProblem) return;
    setState('saving');
    try {
      await onSave(form);
      setState('saved');
    } catch {
      setState('error');
    }
  };

  const connectTelegram = async () => {
    try {
      const url = await onConnectTelegram();
      if (isDemo) {
        setTelegramNote('Демо: в реалната версия тук се отваря Telegram и с едно натискане на „Start“ чатът се свързва.');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      setTelegramNote('Натиснете „Start“ в Telegram. След това презаредете таблото, за да видите статуса „Свързан“.');
    } catch {
      setTelegramNote('Не успяхме да създадем линк. Опитайте отново.');
    }
  };

  const disconnectTelegram = async () => {
    await onSave({ telegramLinked: false });
    setTelegramNote(null);
  };

  const now = Date.now();
  const filtered = useMemo(() => {
    const q = query.trim().toUpperCase();
    return vouchers.filter((v) => !q || v.code.includes(q) || (v.waiterName ?? '').toUpperCase().includes(q));
  }, [vouchers, query]);
  const counts = useMemo(() => ({
    active: vouchers.filter((v) => voucherStatus(v, now) === 'active').length,
    used: vouchers.filter((v) => voucherStatus(v, now) === 'used').length,
  }), [vouchers, now]);
  const visible = showAll ? filtered : filtered.slice(0, 8);

  return (
    <div className="dash-stack">
      <Card title="Мигновени известия при 1–2★" subtitle="Научавате за недоволен гост, докато той още е в заведението">
        <Switch
          checked={form.notifyLowRating}
          onChange={(v) => set('notifyLowRating', v)}
          label="Изпращай известие при оценка 1 или 2 звезди"
          hint="Със сервитьора, коментара и отбелязаните проблеми."
        />

        <div className="dash-channels">
          <div className="dash-channel">
            <div className="dash-channel-head">
              <span className="dash-channel-icon is-telegram" aria-hidden="true">✈</span>
              <div>
                <strong>Telegram</strong>
                <span>{form.telegramLinked ? 'Свързан — известията идват в чата' : 'Не е свързан'}</span>
              </div>
              <span className={`dash-pill ${form.telegramLinked ? 'is-on' : ''}`}>{form.telegramLinked ? 'Свързан' : 'Изключен'}</span>
            </div>
            {form.telegramLinked ? (
              <button type="button" className="btn btn-secondary" onClick={disconnectTelegram}>Прекъсни връзката</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={connectTelegram} disabled={!telegramReady && !isDemo}>
                Свържи Telegram
              </button>
            )}
            {!telegramReady && !isDemo && (
              <p className="dash-field-hint">Telegram ботът още не е настроен (вижте SETUP.md → Telegram).</p>
            )}
            {telegramNote && <p className="dash-field-hint">{telegramNote}</p>}
          </div>

          <div className="dash-channel">
            <div className="dash-channel-head">
              <span className="dash-channel-icon is-email" aria-hidden="true">✉</span>
              <div>
                <strong>Имейл</strong>
                <span>За известия и седмичния отчет</span>
              </div>
            </div>
            <Field label="Имейл на управителя" htmlFor="notify-email" hint={emailProblem ? <span className="is-error">{emailProblem}</span> : undefined}>
              <input
                id="notify-email"
                className="input-field"
                type="email"
                placeholder="manager@restaurant.bg"
                value={form.notifyEmail}
                onChange={(e) => set('notifyEmail', e.target.value)}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="Седмичен отчет" subtitle="Всеки понеделник сутрин — кратко резюме на изминалата седмица">
        <Switch
          checked={form.weeklyReport}
          onChange={(v) => set('weeklyReport', v)}
          label="Изпращай седмичния отчет по имейл"
          hint={form.notifyEmail ? `До ${form.notifyEmail}: сканирания, оценки, рейтинг по сервитьори и ниските оценки.` : 'Въведете имейл по-горе.'}
          disabled={!form.notifyEmail}
        />
      </Card>

      <Card title="Ваучер за недоволен гост" subtitle="Превърнете лошата вечер във втори шанс">
        <Switch
          checked={form.voucherEnabled}
          onChange={(v) => set('voucherEnabled', v)}
          label="Давай ваучер след ниска оценка"
          hint="Гостът вижда код веднага след оценката; персоналът го маркира като използван тук."
        />
        {form.voucherEnabled && (
          <div className="dash-voucher-form">
            <Field label="Какво получава гостът" htmlFor="voucher-title">
              <input
                id="voucher-title"
                className="input-field"
                maxLength={80}
                value={form.voucherTitle}
                onChange={(e) => set('voucherTitle', e.target.value)}
              />
            </Field>
            <div className="dash-chips">
              {VOUCHER_PRESETS.map((p) => (
                <button key={p} type="button" className={`dash-chip${form.voucherTitle === p ? ' is-on' : ''}`} onClick={() => set('voucherTitle', p)}>
                  {p.replace(' при следващото посещение', '').replace(' от следващата сметка', '')}
                </button>
              ))}
            </div>
            <div className="dash-grid-2 is-tight">
              <Field label="За оценки до" htmlFor="voucher-max">
                <select id="voucher-max" className="input-field" value={form.voucherMaxRating} onChange={(e) => set('voucherMaxRating', Number(e.target.value))}>
                  <option value={1}>1★</option>
                  <option value={2}>2★ (препоръчително)</option>
                  <option value={3}>3★</option>
                </select>
              </Field>
              <Field label="Валиден" htmlFor="voucher-days">
                <select id="voucher-days" className="input-field" value={form.voucherValidDays} onChange={(e) => set('voucherValidDays', Number(e.target.value))}>
                  {[7, 14, 30, 60, 90].map((d) => <option key={d} value={d}>{d} дни</option>)}
                </select>
              </Field>
            </div>
            <div className="dash-voucher-preview" aria-label="Така го вижда гостът">
              <span>🎁 Подарък от заведението</span>
              <strong>{form.voucherTitle || '—'}</strong>
              <code>7F3A9C21</code>
              <small>Валиден {form.voucherValidDays} дни</small>
            </div>
          </div>
        )}
      </Card>

      <Card title="Google отзиви" subtitle="Към този линк насочваме гостите, оценили с 4–5★">
        <Field
          label="Линк за отзив в Google"
          htmlFor="google-link"
          hint={<>В Google Business Profile → „Поискайте отзиви“ копирайте линка (започва с https://g.page/r/… или https://search.google.com/local/writereview…).</>}
        >
          <input
            id="google-link"
            className="input-field"
            type="url"
            placeholder="https://g.page/r/…/review"
            value={form.googleReviewUrl}
            onChange={(e) => set('googleReviewUrl', e.target.value)}
          />
        </Field>
      </Card>

      <div className="dash-savebar">
        <SaveStatus state={state} />
        <button type="button" className="btn btn-primary" onClick={save} disabled={!dirty || Boolean(emailProblem) || state === 'saving'}>
          Запази промените
        </button>
      </div>

      <Card
        title="Издадени ваучери"
        subtitle={`${counts.active} активни · ${counts.used} използвани`}
        action={(
          <input
            className="input-field dash-search"
            placeholder="Търси код или сервитьор…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
      >
        {visible.length === 0 ? (
          <p className="dash-empty">{vouchers.length ? 'Няма ваучер с този код.' : 'Още няма издадени ваучери.'}</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Код</th><th>Ваучер</th><th>Сервитьор</th><th>Издаден</th><th>Статус</th><th /></tr>
              </thead>
              <tbody>
                {visible.map((v) => {
                  const status = voucherStatus(v, now);
                  return (
                    <tr key={v.id}>
                      <td><code>{v.code}</code></td>
                      <td>{v.title}</td>
                      <td>{v.waiterName ?? '—'} {v.rating ? <Stars value={v.rating} size={11} /> : null}</td>
                      <td>{formatDate(v.createdAt)}</td>
                      <td>
                        <span className={`dash-pill is-${status}`}>
                          {status === 'used' ? `Използван ${v.redeemedAt ? formatDate(v.redeemedAt) : ''}` : status === 'expired' ? 'Изтекъл' : `Валиден до ${formatDate(v.expiresAt)}`}
                        </span>
                      </td>
                      <td>
                        {status === 'active' && (
                          <button type="button" className="btn btn-secondary dash-small-btn" onClick={() => onRedeemVoucher(v.id)}>
                            Използван
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {filtered.length > 8 && (
          <button type="button" className="dash-link-btn" onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Покажи по-малко' : `Покажи всички (${filtered.length})`}
          </button>
        )}
      </Card>
    </div>
  );
};
