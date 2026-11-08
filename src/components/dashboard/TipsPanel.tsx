import React, { useEffect, useState } from 'react';
import type { VenueSettings, Waiter } from '../../lib/types';
import { Card, Field, SaveStatus } from './ui';

interface TipsPanelProps {
  settings: VenueSettings;
  waiters: Waiter[];
  onSaveVenueLink: (url: string) => Promise<void>;
  onSaveWaiterLink: (waiterId: string, url: string) => Promise<void>;
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

/** Basic sanity check — the guest's phone will open this address. */
function linkProblem(url: string): string | null {
  const value = url.trim();
  if (!value) return null;
  try {
    const parsed = new URL(value.replace('{amount}', '1'));
    if (parsed.protocol !== 'https:') return 'Линкът трябва да започва с https://';
    return null;
  } catch {
    return 'Това не изглежда като валиден линк.';
  }
}

const PROVIDERS = [
  { name: 'Revolut', example: 'https://revolut.me/вашето-име', note: 'Личен Revolut.me линк или Payment Link от Revolut Business.' },
  { name: 'myPOS', example: 'https://… (Pay link)', note: 'Линк за плащане, създаден от вашия myPOS акаунт.' },
  { name: 'Stripe', example: 'https://buy.stripe.com/…', note: 'Payment Link с опция „клиентът избира сумата“.' },
  { name: 'Друг', example: 'https://…', note: 'Всяка страница за плащане, която гостът може да отвори от телефона.' },
];

/** Tips, "Variant A": guests pay straight to the venue's or waiter's own payment page. */
export const TipsPanel: React.FC<TipsPanelProps> = ({ settings, waiters, onSaveVenueLink, onSaveWaiterLink }) => {
  const [venueLink, setVenueLink] = useState(settings.tipUrl);
  const [venueState, setVenueState] = useState<SaveState>('idle');
  const [links, setLinks] = useState<Record<string, string>>({});
  const [rowState, setRowState] = useState<Record<string, SaveState>>({});

  useEffect(() => setVenueLink(settings.tipUrl), [settings.tipUrl]);
  useEffect(() => {
    setLinks(Object.fromEntries(waiters.map((w) => [w.id, w.tipUrl ?? ''])));
  }, [waiters]);

  const venueProblem = linkProblem(venueLink);

  const saveVenue = async () => {
    if (venueProblem) return;
    setVenueState('saving');
    try {
      await onSaveVenueLink(venueLink.trim());
      setVenueState('saved');
    } catch {
      setVenueState('error');
    }
  };

  const saveWaiter = async (id: string) => {
    if (linkProblem(links[id] ?? '')) return;
    setRowState((s) => ({ ...s, [id]: 'saving' }));
    try {
      await onSaveWaiterLink(id, (links[id] ?? '').trim());
      setRowState((s) => ({ ...s, [id]: 'saved' }));
    } catch {
      setRowState((s) => ({ ...s, [id]: 'error' }));
    }
  };

  return (
    <div className="dash-stack">
      <Card title="Как работят бакшишите" subtitle="Парите отиват директно при вас — TipTap само показва пътя">
        <ol className="dash-steps">
          <li><b>1</b><span>След оценката гостът избира сума и натиска „Към плащането“.</span></li>
          <li><b>2</b><span>Отваря се вашата страница за плащане (Revolut, myPOS, Stripe…) и гостът плаща директно на сервитьора или на заведението.</span></li>
          <li><b>3</b><span>TipTap не получава, не държи и не превежда пари и не взима комисиона. В таблото виждате колко гости са отворили линка.</span></li>
        </ol>
      </Card>

      <Card title="Линк на заведението" subtitle="Използва се за всички сервитьори без личен линк">
        <Field
          label="Страница за плащане"
          htmlFor="venue-tip-link"
          hint={venueProblem
            ? <span className="is-error">{venueProblem}</span>
            : <>Ако страницата приема сума в адреса, напишете <code>{'{amount}'}</code> на мястото на сумата — ще я попълним автоматично. Оставете празно, за да скриете бакшиша.</>}
        >
          <div className="dash-inline">
            <input
              id="venue-tip-link"
              className="input-field"
              type="url"
              inputMode="url"
              placeholder="https://revolut.me/вашето-заведение"
              value={venueLink}
              onChange={(e) => { setVenueLink(e.target.value); setVenueState('idle'); }}
            />
            <button type="button" className="btn btn-primary" onClick={saveVenue} disabled={Boolean(venueProblem) || venueState === 'saving'}>
              Запази
            </button>
          </div>
        </Field>
        <SaveStatus state={venueState} />
        <div className="dash-providers">
          {PROVIDERS.map((p) => (
            <div key={p.name} className="dash-provider">
              <strong>{p.name}</strong>
              <code>{p.example}</code>
              <span>{p.note}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Лични линкове на сервитьорите" subtitle="Ако сервитьорът иска бакшишът да отива директно при него">
        {waiters.length === 0 ? (
          <p className="dash-empty">Добавете сервитьори от раздел „Екип“.</p>
        ) : (
          <ul className="dash-link-rows">
            {waiters.map((w) => {
              const value = links[w.id] ?? '';
              const problem = linkProblem(value);
              return (
                <li key={w.id}>
                  <div className="dash-link-person">
                    <img src={w.avatar} alt="" />
                    <div>
                      <strong>{w.name}</strong>
                      <span>{w.tipClicks} отваряния на линка за периода</span>
                    </div>
                  </div>
                  <div className="dash-inline">
                    <input
                      className="input-field"
                      type="url"
                      inputMode="url"
                      aria-label={`Линк за бакшиш на ${w.name}`}
                      placeholder={settings.tipUrl ? 'Празно = линкът на заведението' : 'https://revolut.me/…'}
                      value={value}
                      onChange={(e) => {
                        setLinks((s) => ({ ...s, [w.id]: e.target.value }));
                        setRowState((s) => ({ ...s, [w.id]: 'idle' }));
                      }}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => saveWaiter(w.id)} disabled={Boolean(problem) || rowState[w.id] === 'saving'}>
                      Запази
                    </button>
                  </div>
                  {problem ? <span className="dash-field-hint is-error">{problem}</span> : <SaveStatus state={rowState[w.id] ?? 'idle'} />}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Card title="Добре е да знаете">
        <ul className="dash-notes">
          <li>
            Личните Revolut.me линкове имат лимит при плащане с карта (по данни на Revolut — около £250 и до 20 плащания седмично).
            За по-голям оборот използвайте Payment Link от Revolut Business или друг бизнес доставчик.
          </li>
          <li>
            Според становище на НАП от 23.10.2025 г. бакшишът е доход от труд, а платеният през заведението се отразява във
            фискалното устройство. Как да го отчитате при директни плащания, уточнете със счетоводителя си.
          </li>
        </ul>
      </Card>
    </div>
  );
};
