import React, { useState } from 'react';
import { createRestaurant } from '../lib/data';
import { CustomArrowRight as ArrowRight } from './CustomIcons';

interface OnboardingProps {
  fullName?: string;
  onDone: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ fullName, onDone }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [google, setGoogle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    setLoading(true);
    setError('');
    try {
      await createRestaurant({
        name: name.trim(),
        city: city.trim() || undefined,
        googleReviewUrl: google.trim() || undefined,
        fullName,
      });
      onDone();
    } catch (err: any) {
      setError(err?.message || 'Възникна грешка. Опитайте отново.');
      setLoading(false);
    }
  };

  const label: React.CSSProperties = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' };

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', width: '100%' }}>
      <div className="glass-panel" style={{ padding: '2.5rem 2rem', borderRadius: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-official)', fontSize: '1.8rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem' }}>
          Добре дошли{fullName ? `, ${fullName.split(' ')[0]}` : ''}!
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          Създайте профила на вашето заведение, за да започнете. Можете да промените всичко по-късно.
        </p>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5', fontSize: '0.85rem', padding: '0.6rem 0.9rem', borderRadius: '10px' }}>
              {error}
            </div>
          )}
          <div>
            <label style={label}>Име на заведението *</label>
            <input className="input-field" type="text" required placeholder="Ресторант Леденика"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label style={label}>Град</label>
            <input className="input-field" type="text" placeholder="София"
              value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label style={label}>Google линк за отзив (по желание)</label>
            <input className="input-field" type="url" placeholder="https://search.google.com/local/writereview?placeid=..."
              value={google} onChange={(e) => setGoogle(e.target.value)} />
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0.35rem 0 0' }}>
              Към този линк пренасочваме доволните гости (4–5★). Може да го добавите и по-късно.
            </p>
          </div>
          <button type="submit" disabled={loading} className="btn ios-glass-btn-primary"
            style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.25rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Създаване…' : <>Създай заведение <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};
