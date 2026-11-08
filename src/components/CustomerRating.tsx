import React, { useEffect, useState } from 'react';
import { getWaiterBases } from '../utils/mockData';
import {
  getRatingTarget,
  submitReview,
  trackEvent,
  tipLinkFor,
  SubmitReviewError,
  type RatingTarget,
  type SubmitReviewResult,
} from '../lib/data';
import { isSupabaseEnabled } from '../lib/supabase';
import { preloadCaptcha } from '../lib/turnstile';
import {
  LANGS,
  LOCALES,
  TAG_KEYS,
  detectLang,
  dict,
  fill,
  saveLang,
  sentimentOf,
  tagLabel,
  type Lang,
} from '../lib/ratingI18n';
import {
  CustomStar as Star,
  CustomCheckCircle as CheckCircle,
  CustomHeart as Heart,
  CustomSend as Send,
  CustomAward as Award,
  CustomMessageSquare as MessageSquare,
  CustomExternalLink as ExternalLink,
} from './CustomIcons';

interface CustomerRatingProps {
  initialWaiterId?: string;
  onReviewSubmitted?: () => void;
  /** Marketing demo: always local sample data, never the real database. */
  demo?: boolean;
}

type StarCount = 1 | 2 | 3 | 4 | 5;

// Colours per star; all wording comes from ratingI18n.
const STAR_STYLE: Record<StarCount, { color: string; gradient: string; glow: string; border: string; bg: string; emoji: string }> = {
  1: { color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)', glow: 'rgba(239,68,68,0.3)', border: 'rgba(239,68,68,0.4)', bg: 'rgba(239,68,68,0.08)', emoji: '😞' },
  2: { color: '#f97316', gradient: 'linear-gradient(135deg, #f97316, #c2410c)', glow: 'rgba(249,115,22,0.3)', border: 'rgba(249,115,22,0.4)', bg: 'rgba(249,115,22,0.08)', emoji: '😕' },
  3: { color: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #a16207)', glow: 'rgba(234,179,8,0.3)', border: 'rgba(234,179,8,0.4)', bg: 'rgba(234,179,8,0.08)', emoji: '😐' },
  4: { color: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e, #15803d)', glow: 'rgba(34,197,94,0.3)', border: 'rgba(34,197,94,0.4)', bg: 'rgba(34,197,94,0.08)', emoji: '😊' },
  5: { color: '#a78bfa', gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)', glow: 'rgba(167,139,250,0.4)', border: 'rgba(167,139,250,0.5)', bg: 'rgba(167,139,250,0.1)', emoji: '🤩' },
};

const TIP_AMOUNTS = [2, 5, 10];

const sectionLabel: React.CSSProperties = {
  fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, margin: '0 0 0.55rem',
  textTransform: 'uppercase', letterSpacing: '0.5px',
};

export const CustomerRating: React.FC<CustomerRatingProps> = ({
  initialWaiterId = 'waiter-1',
  onReviewSubmitted,
  demo = false,
}) => {
  const live = isSupabaseEnabled && !demo;
  const [lang, setLang] = useState<Lang>(detectLang);
  const t = dict(lang);

  // In the demo the visitor can switch between sample waiters.
  const demoWaiters = live ? [] : getWaiterBases();
  const [slug, setSlug] = useState(initialWaiterId);

  const [target, setTarget] = useState<RatingTarget | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitReviewResult | null>(null);

  const [tipAmount, setTipAmount] = useState<number | null>(5);
  const [demoNote, setDemoNote] = useState<'tip' | 'google' | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getRatingTarget(slug, { demo: !live })
      .then((found) => {
        if (cancelled) return;
        if (!found) {
          setNotFound(true);
          return;
        }
        setTarget(found);
        void trackEvent(slug, 'scan', { demo: !live });
        if (live) preloadCaptcha();
      })
      .catch(() => { if (!cancelled) setNotFound(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug, live]);

  const changeLang = (next: Lang) => {
    setLang(next);
    saveLang(next);
  };

  const reset = () => {
    setRating(0);
    setSelectedTags([]);
    setComment('');
    setError(null);
    setResult(null);
    setSubmitting(false);
    setTipAmount(5);
    setDemoNote(null);
  };

  const chooseRating = (star: number) => {
    if (sentimentOf(star) !== sentimentOf(rating || star)) setSelectedTags([]);
    setRating(star);
    setError(null);
  };

  const toggleTag = (key: string) =>
    setSelectedTags((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitReview(
        { slug, rating, comment: comment.trim(), tags: selectedTags, lang },
        { demo: !live },
      );
      setResult(res);
      onReviewSubmitted?.();
    } catch (err) {
      const code = err instanceof SubmitReviewError ? err.code : 'network';
      setError(code === 'rate_limited' ? t.errorRateLimited
        : code === 'captcha_failed' ? t.errorCaptcha
        : code === 'unknown_card' ? t.notFoundText
        : t.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const openTip = () => {
    if (!result?.tipUrl) return;
    void trackEvent(slug, 'tip_click', { demo: !live, amount: tipAmount });
    if (!live) {
      setDemoNote('tip');
      return;
    }
    window.open(tipLinkFor(result.tipUrl, tipAmount), '_blank', 'noopener,noreferrer');
  };

  const openGoogle = () => {
    if (!result?.googleReviewUrl) return;
    void trackEvent(slug, 'google_click', { demo: !live });
    if (!live) {
      setDemoNote('google');
      return;
    }
    window.open(result.googleReviewUrl, '_blank', 'noopener,noreferrer');
  };

  const displayRating = hoverRating || rating;
  const style = rating ? STAR_STYLE[rating as StarCount] : null;
  const sentiment = sentimentOf(rating || 5);
  const firstName = (target?.name || '').split(' ')[0];

  const langSelect = (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">{t.language}</span>
      <select
        value={lang}
        onChange={(e) => changeLang(e.target.value as Lang)}
        aria-label={t.language}
        style={{
          background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-light)',
          borderRadius: '8px', padding: '0.2rem 0.35rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
        }}
      >
        {LANGS.map((code) => <option key={code} value={code}>{code.toUpperCase()}</option>)}
      </select>
    </label>
  );

  if (loading) {
    return (
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        {t.loading}
      </div>
    );
  }

  if (notFound || !target) {
    return (
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>{langSelect}</div>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239,68,68,0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <MessageSquare size={32} />
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#fff' }}>{t.notFoundTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{t.notFoundText}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', padding: '1.25rem 1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.35)', padding: '0.28rem 0.8rem', borderRadius: '99px',
            fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-purple)', letterSpacing: '0.8px',
            textTransform: 'uppercase', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {target.restaurantName}
          </span>
          {langSelect}
        </div>
        <h1 style={{
          fontSize: '1.7rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {t.title}
        </h1>
      </div>

      {/* WAITER CARD */}
      <div className="glow-border-card" style={{ padding: '1.35rem', background: 'rgba(14, 14, 26, 0.85)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ position: 'relative' }}>
          {target.avatarUrl ? (
            <img
              src={target.avatarUrl} alt={target.name}
              style={{
                width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover',
                border: `3px solid ${style ? style.color : 'var(--accent-purple)'}`,
                boxShadow: `0 8px 30px ${style ? style.glow : 'rgba(139, 92, 246, 0.4)'}`,
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            />
          ) : (
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '1.8rem', fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg, #a78bfa, #6d28d9)' }}>
              {target.name.slice(0, 1)}
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '2px', right: '2px', background: 'var(--green)', borderRadius: '50%', padding: '5px', border: '2px solid #0c0c14' }}>
            <CheckCircle size={14} color="#fff" />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>{target.name}</h3>
            <Award size={16} color="var(--gold)" />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            {target.role} • <strong>{target.restaurantName}</strong>
          </p>
        </div>

        {/* Demo only: switch between the sample waiters */}
        {!live && demoWaiters.length > 1 && !result && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {demoWaiters.slice(0, 4).map((w) => (
              <button
                key={w.id} type="button"
                onClick={() => { setSlug(w.slug); reset(); }}
                style={{
                  fontSize: '0.72rem', padding: '0.25rem 0.65rem', borderRadius: '99px', cursor: 'pointer',
                  background: slug === w.slug ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                  border: slug === w.slug ? '1px solid var(--accent-purple)' : '1px solid var(--border-light)',
                  color: slug === w.slug ? '#fff' : 'var(--text-muted)',
                  fontWeight: slug === w.slug ? 700 : 400,
                }}
              >
                {w.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── STEP 1: RATING ─── */}
      {!result && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div className="glass-card" style={{
            padding: '1.5rem 1.25rem', textAlign: 'center',
            border: style ? `1px solid ${style.border}` : undefined,
            background: style ? style.bg : undefined,
            transition: 'border-color 0.4s ease, background 0.4s ease',
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-primary)' }}>{t.question}</p>
            <div className="star-rating" style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
              {[1, 2, 3, 4, 5].map((star) => {
                const s = STAR_STYLE[star as StarCount];
                const active = displayRating >= star;
                return (
                  <button
                    key={star} type="button" className="star-rating-btn"
                    aria-label={`${star} / 5 — ${t.starLabels[star - 1]}`}
                    aria-pressed={rating === star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => chooseRating(star)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: '0.15rem',
                      transform: active ? 'scale(1.2)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      filter: active ? `drop-shadow(0 0 8px ${s.color})` : 'none',
                    }}
                  >
                    <Star size={36} fill={active ? s.color : 'none'} color={active ? s.color : 'var(--text-muted)'} />
                  </button>
                );
              })}
            </div>
            {displayRating > 0 && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.3rem 1rem', borderRadius: '99px',
                background: STAR_STYLE[displayRating as StarCount].bg,
                border: `1px solid ${STAR_STYLE[displayRating as StarCount].border}`,
                color: STAR_STYLE[displayRating as StarCount].color, fontSize: '0.85rem', fontWeight: 800,
              }}>
                <span style={{ fontSize: '1.05rem' }}>{STAR_STYLE[displayRating as StarCount].emoji}</span>
                {displayRating}/5 — {t.starLabels[displayRating - 1]}
              </div>
            )}
          </div>

          {rating > 0 && style && (
            <div style={{ animation: 'fadeInUp 0.35s ease', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem 1.2rem', borderRadius: '16px', border: `1px solid ${style.border}`, background: style.bg, display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{style.emoji}</span>
                <div>
                  <p style={{ fontWeight: 800, color: style.color, fontSize: '1rem', margin: '0 0 0.2rem' }}>{t.headlines[rating - 1]}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>{t.subtext[sentiment]}</p>
                </div>
              </div>

              <div>
                <p style={sectionLabel}>{t.tagsHeading[sentiment]}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {TAG_KEYS[sentiment].map((key) => {
                    const on = selectedTags.includes(key);
                    return (
                      <button
                        key={key} type="button" aria-pressed={on}
                        onClick={() => toggleTag(key)}
                        style={{
                          fontSize: '0.8rem', padding: '0.4rem 0.8rem', borderRadius: '10px', cursor: 'pointer',
                          background: on ? style.bg : 'rgba(255,255,255,0.03)',
                          border: on ? `1.5px solid ${style.color}` : '1px solid var(--border-light)',
                          color: on ? style.color : 'var(--text-secondary)', fontWeight: on ? 700 : 400,
                          transition: 'all 0.18s ease',
                        }}
                      >
                        {on && <span style={{ marginRight: '4px' }}>✓</span>}
                        {tagLabel(key, lang)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="rating-comment" style={{ ...sectionLabel, display: 'block' }}>{t.commentLabel}</label>
                <textarea
                  id="rating-comment"
                  className="input-field"
                  rows={3}
                  maxLength={2000}
                  placeholder={sentiment === 'low' ? t.placeholderLow : t.placeholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ fontSize: '0.875rem', lineHeight: 1.5, border: `1px solid ${style.border}`, background: style.bg }}
                />
              </div>

              {sentiment === 'low' && (
                <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>📣</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{t.lowNotice}</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div role="alert" style={{ padding: '0.8rem 1rem', borderRadius: '12px', fontSize: '0.85rem', lineHeight: 1.5, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={rating === 0 || submitting}
            style={{
              width: '100%', padding: '1.05rem', fontSize: '1.02rem', borderRadius: '14px', border: 'none',
              background: style ? style.gradient : 'var(--accent-purple)',
              color: '#fff', fontWeight: 800, cursor: rating === 0 || submitting ? 'not-allowed' : 'pointer',
              opacity: rating === 0 ? 0.4 : submitting ? 0.75 : 1,
              transition: 'all 0.3s ease', boxShadow: style ? `0 8px 30px ${style.glow}` : undefined,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            {submitting ? t.sending : !rating ? t.choose : sentiment === 'low' ? t.submitLow : t.submit}
            {rating > 0 && !submitting && <Send size={18} />}
          </button>
        </form>
      )}

      {/* ─── STEP 2: THANK YOU + tip / Google / voucher ─── */}
      {result && (
        <div className="glass-panel" style={{ padding: '2rem 1.35rem', textAlign: 'center', animation: 'fadeInUp 0.5s ease', background: 'rgba(14, 14, 26, 0.95)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1rem',
              background: sentiment === 'low' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.15)',
              color: sentiment === 'low' ? '#ef4444' : 'var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {sentiment === 'low' ? <MessageSquare size={34} /> : <CheckCircle size={36} />}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.4rem', color: '#fff' }}>{t.successTitle[sentiment]}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
              {fill(t.successText[sentiment], { name: firstName })}
            </p>
          </div>

          {/* Recovery voucher (the venue decides if and what) */}
          {result.voucher && (
            <div style={{ border: '1.5px dashed rgba(16,185,129,0.55)', background: 'rgba(16,185,129,0.07)', borderRadius: '16px', padding: '1.1rem', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#6ee7b7' }}>🎁 {t.voucherTitle}</p>
              <p style={{ margin: '0.4rem 0 0.6rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{result.voucher.title}</p>
              <div style={{ display: 'inline-block', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.18em', padding: '0.4rem 0.9rem', borderRadius: '10px', background: 'rgba(0,0,0,0.35)', color: '#fff' }}>
                {result.voucher.code}
              </div>
              <p style={{ margin: '0.6rem 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {t.voucherShow}<br />
                {fill(t.voucherValid, { date: new Date(result.voucher.expiresAt).toLocaleDateString(LOCALES[lang]) })}
              </p>
            </div>
          )}

          {/* Tip — straight to the venue's / waiter's own payment page */}
          {result.tipUrl && rating >= 3 && (
            <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Heart size={18} fill="var(--red)" color="var(--red)" />
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{fill(t.tipTitle, { name: firstName })}</h4>
              </div>
              <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t.tipNote}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', marginBottom: '0.6rem' }}>
                {[...TIP_AMOUNTS, null].map((amount) => {
                  const on = tipAmount === amount;
                  return (
                    <button
                      key={amount ?? 'other'} type="button" aria-pressed={on}
                      onClick={() => setTipAmount(amount)}
                      className={`btn ${on ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.7rem 0.2rem', fontSize: amount ? '0.95rem' : '0.72rem', fontWeight: 800 }}
                    >
                      {amount ? `€${amount}` : t.tipOther}
                    </button>
                  );
                })}
              </div>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {result.tipUrl.includes('{amount}') && tipAmount ? t.tipAmountAuto : t.tipAmountHint}
              </p>
              <button
                type="button" onClick={openTip} className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', background: 'linear-gradient(135deg, var(--green) 0%, #059669 100%)' }}
              >
                {t.tipCta}{tipAmount ? ` · €${tipAmount}` : ''} <ExternalLink size={16} />
              </button>
              {demoNote === 'tip' && <p style={{ margin: '0.6rem 0 0', fontSize: '0.75rem', color: '#c4b5fd' }}>{t.tipDemo}</p>}
            </div>
          )}

          {/* Google review — offered to happy guests */}
          {rating >= 4 && result.googleReviewUrl && (
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.1rem', borderRadius: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Star size={18} fill="var(--gold)" color="var(--gold)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--gold)' }}>{t.googleTitle}</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 0.85rem' }}>{t.googleText}</p>
              <button
                type="button" onClick={openGoogle} className="btn btn-primary"
                style={{ width: '100%', fontSize: '0.9rem', padding: '0.8rem', justifyContent: 'center', background: 'linear-gradient(135deg, var(--gold) 0%, #d97706 100%)' }}
              >
                {t.googleCta} <ExternalLink size={16} />
              </button>
              {demoNote === 'google' && <p style={{ margin: '0.6rem 0 0', fontSize: '0.75rem', color: '#fcd34d' }}>{t.googleDemo}</p>}
            </div>
          )}

          {/* Re-rating is a demo convenience only — real guests rate once. */}
          {!live && (
            <button type="button" className="btn btn-secondary" style={{ width: '100%', padding: '0.8rem' }} onClick={reset}>
              {t.again}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
