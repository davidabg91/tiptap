import React, { useState } from 'react';
import { getWaiters, addReview, type Waiter } from '../utils/mockData';
import { 
  CustomStar as Star, 
  CustomCheckCircle as CheckCircle, 
  CustomHeart as Heart, 
  CustomSend as Send, 
  CustomAward as Award, 
  CustomMessageSquare as MessageSquare, 
  CustomExternalLink as ExternalLink
} from './CustomIcons';

interface CustomerRatingProps {
  initialWaiterId?: string;
  onReviewSubmitted?: () => void;
}

// ─── Per-star feedback configuration ────────────────────────────────────────
const STAR_CONFIG = {
  1: {
    label: 'Много лошо',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)',
    glow: 'rgba(239,68,68,0.3)',
    border: 'rgba(239,68,68,0.4)',
    bg: 'rgba(239,68,68,0.08)',
    emoji: '😞',
    headline: 'Съжаляваме за лошото изживяване',
    subtext: 'Помогнете ни да се подобрим. Какво се случи?',
    placeholder: 'Опишете какво не отговори на очакванията ви...',
    tags: [
      'Дълго чакане',
      'Грубо отношение',
      'Грешна поръчка',
      'Мръсна маса / прибори',
      'Игнориран от персонала',
      'Студена храна',
      'Неправилна сметка',
      'Обещано, неизпълнено',
    ],
    btnLabel: 'Изпрати обратна връзка',
    btnStyle: { background: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
    showTip: false,
  },
  2: {
    label: 'Лошо',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #c2410c)',
    glow: 'rgba(249,115,22,0.3)',
    border: 'rgba(249,115,22,0.4)',
    bg: 'rgba(249,115,22,0.08)',
    emoji: '😕',
    headline: 'Под очакванията',
    subtext: 'Разкажете ни какво не се получи добре.',
    placeholder: 'Кажете ни какво може да подобрим...',
    tags: [
      'Обслужването бе бавно',
      'Персоналът бе невнимателен',
      'Менюто е объркващо',
      'Не ни препоръчаха нищо',
      'Чакахме прекалено дълго за сметката',
      'Недостатъчно внимание',
      'Проблем с резервацията',
    ],
    btnLabel: 'Изпрати обратна връзка',
    btnStyle: { background: 'linear-gradient(135deg, #f97316, #c2410c)' },
    showTip: false,
  },
  3: {
    label: 'Средно',
    color: '#eab308',
    gradient: 'linear-gradient(135deg, #eab308, #a16207)',
    glow: 'rgba(234,179,8,0.3)',
    border: 'rgba(234,179,8,0.4)',
    bg: 'rgba(234,179,8,0.08)',
    emoji: '😐',
    headline: 'Нормално обслужване',
    subtext: 'Кажете ни какво може да бъде по-добре.',
    placeholder: 'Какво би направило посещението ви по-добро?',
    tags: [
      'Обслужването е задоволително',
      'Добра храна, но бавна доставка',
      'Персоналът беше любезен',
      'Чакахме малко',
      'Удовлетворени сме, но очаквахме повече',
      'Добро, не страхотно',
    ],
    btnLabel: 'Продължи',
    btnStyle: { background: 'linear-gradient(135deg, #eab308, #a16207)' },
    showTip: true,
  },
  4: {
    label: 'Отлично',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #15803d)',
    glow: 'rgba(34,197,94,0.3)',
    border: 'rgba(34,197,94,0.4)',
    bg: 'rgba(34,197,94,0.08)',
    emoji: '😊',
    headline: 'Страхотно обслужване!',
    subtext: 'Радваме се! Какво ви направи впечатление?',
    placeholder: 'Разкажете ни кое ви хареса...',
    tags: [
      'Любезен и усмихнат персонал',
      'Бързо и точно обслужване',
      'Добри препоръки за менюто',
      'Чиста и приветлива среда',
      'Внимателно отношение',
      'Вкусна храна',
      'Ще се върна отново',
    ],
    btnLabel: 'Продължи',
    btnStyle: { background: 'linear-gradient(135deg, #22c55e, #15803d)' },
    showTip: true,
  },
  5: {
    label: 'Перфектно!',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    glow: 'rgba(167,139,250,0.4)',
    border: 'rgba(167,139,250,0.5)',
    bg: 'rgba(167,139,250,0.1)',
    emoji: '🤩',
    headline: 'Перфектно обслужване!',
    subtext: 'Изключително! Кажете ни какво направи деня ви!',
    placeholder: 'Споделете вашето страхотно изживяване...',
    tags: [
      'Изключително любезен',
      'Най-доброто обслужване',
      'Помни личните ни предпочитания',
      'Топъл и искрен прием',
      'Перфектен тайминг',
      'Препоръчва като приятел, не като сервитьор',
      'Превъзхожда очакванията',
      'Ще препоръча на приятели',
    ],
    btnLabel: 'Продължи',
    btnStyle: { background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' },
    showTip: true,
  },
} as const;

type StarCount = 1 | 2 | 3 | 4 | 5;

export const CustomerRating: React.FC<CustomerRatingProps> = ({ 
  initialWaiterId = 'waiter-1',
  onReviewSubmitted 
}) => {
  const waiters = getWaiters();
  const [selectedWaiter, setSelectedWaiter] = useState<Waiter>(
    waiters.find(w => w.id === initialWaiterId) || waiters[0]
  );
  
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tipAmount, setTipAmount] = useState<number>(5);
  const [customTip, setCustomTip] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [step, setStep] = useState<'rating' | 'tip' | 'success'>('rating');

  const cfg = rating > 0 ? STAR_CONFIG[rating as StarCount] : null;

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleRatingSelect = (star: number) => {
    if (star !== rating) {
      setSelectedTags([]);
      setComment('');
    }
    setRating(star);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTip = customTip ? parseFloat(customTip) || 0 : tipAmount;
    addReview({
      waiterId: selectedWaiter.id,
      waiterName: selectedWaiter.name,
      rating,
      comment,
      tipAmount: finalTip,
      tags: selectedTags
    });
    setStep('success');
    if (onReviewSubmitted) onReviewSubmitted();
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfg) return;
    if (cfg.showTip) {
      setStep('tip');
    } else {
      // For 1–2 stars: submit directly without tip step
      const finalTip = 0;
      addReview({
        waiterId: selectedWaiter.id,
        waiterName: selectedWaiter.name,
        rating,
        comment,
        tipAmount: finalTip,
        tags: selectedTags
      });
      setStep('success');
      if (onReviewSubmitted) onReviewSubmitted();
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div style={{ 
      maxWidth: '520px', 
      margin: '0 auto', 
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '0.5rem 0 0.25rem' }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem', 
          background: 'rgba(139, 92, 246, 0.15)', 
          border: '1px solid rgba(139, 92, 246, 0.35)', 
          padding: '0.3rem 0.9rem', borderRadius: '99px', 
          fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-purple)', 
          marginBottom: '0.6rem', letterSpacing: '0.8px', textTransform: 'uppercase'
        }}>
          Ресторант Леденика
        </div>
        <h1 style={{ 
          fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase'
        }}>
          ОЦЕНИ ОБСЛУЖВАНЕТО
        </h1>
      </div>

      {/* WAITER CARD */}
      <div className="glow-border-card" style={{ 
        padding: '1.5rem', background: 'rgba(14, 14, 26, 0.85)', 
        textAlign: 'center', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', gap: '0.85rem' 
      }}>
        <div style={{ position: 'relative' }}>
          <img 
            src={selectedWaiter.avatar} alt={selectedWaiter.name} 
            style={{ 
              width: '92px', height: '92px', borderRadius: '50%', objectFit: 'cover',
              border: `3px solid ${cfg ? cfg.color : 'var(--accent-purple)'}`,
              boxShadow: `0 8px 30px ${cfg ? cfg.glow : 'rgba(139, 92, 246, 0.4)'}`,
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
            }} 
          />
          <div style={{ 
            position: 'absolute', bottom: '2px', right: '2px', 
            background: 'var(--green)', borderRadius: '50%', padding: '5px',
            border: '2px solid #0c0c14', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
          }}>
            <CheckCircle size={15} color="#fff" />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{selectedWaiter.name}</h3>
            <Award size={16} color="var(--gold)" />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            {selectedWaiter.role} • <strong>Ресторант Леденика</strong>
          </p>
        </div>
        {/* DEMO WAITER SWITCHER */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
          {waiters.map(w => (
            <button key={w.id} type="button"
              style={{
                fontSize: '0.725rem', padding: '0.25rem 0.65rem', borderRadius: '99px',
                background: selectedWaiter.id === w.id ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                border: selectedWaiter.id === w.id ? '1px solid var(--accent-purple)' : '1px solid var(--border-light)',
                color: selectedWaiter.id === w.id ? '#fff' : 'var(--text-muted)',
                fontWeight: selectedWaiter.id === w.id ? 700 : 400,
                cursor: 'pointer'
              }}
              onClick={() => { setSelectedWaiter(w); setStep('rating'); setRating(0); setSelectedTags([]); setComment(''); }}
            >
              {w.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ─── STEP 1: STAR RATING + CONTEXTUAL FEEDBACK ─── */}
      {step === 'rating' && (
        <form onSubmit={handleProceed} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Stars */}
          <div className="glass-card" style={{ 
            padding: '1.75rem', textAlign: 'center',
            border: cfg ? `1px solid ${cfg.border}` : undefined,
            background: cfg ? cfg.bg : undefined,
            transition: 'border-color 0.4s ease, background 0.4s ease'
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.1rem', color: 'var(--text-primary)' }}>
              Как оценявате персоналото обслужване днес?
            </p>

            <div className="star-rating" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {[1, 2, 3, 4, 5].map(star => {
                const starCfg = STAR_CONFIG[star as StarCount];
                const isActive = displayRating >= star;
                return (
                  <button key={star} type="button" className="star-rating-btn"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingSelect(star)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      transform: isActive ? 'scale(1.25)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      filter: isActive ? `drop-shadow(0 0 8px ${starCfg.color})` : 'none'
                    }}
                  >
                    <Star 
                      size={38} 
                      fill={isActive ? starCfg.color : 'none'} 
                      color={isActive ? starCfg.color : 'var(--text-muted)'} 
                    />
                  </button>
                );
              })}
            </div>

            {/* Rating label pill */}
            {displayRating > 0 && (
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '0.3rem 1rem', borderRadius: '99px',
                background: STAR_CONFIG[displayRating as StarCount].bg,
                border: `1px solid ${STAR_CONFIG[displayRating as StarCount].border}`,
                color: STAR_CONFIG[displayRating as StarCount].color,
                fontSize: '0.85rem', fontWeight: 800,
                transition: 'all 0.3s ease',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1.1rem' }}>{STAR_CONFIG[displayRating as StarCount].emoji}</span>
                {displayRating}/5 — {STAR_CONFIG[displayRating as StarCount].label}
              </div>
            )}
          </div>

          {/* ─── CONTEXTUAL FEEDBACK PANEL (animated per star) ─── */}
          {rating > 0 && cfg && (
            <div style={{ 
              animation: 'fadeInUp 0.35s ease',
              display: 'flex', flexDirection: 'column', gap: '1rem'
            }}>
              {/* Headline banner */}
              <div style={{
                padding: '1.1rem 1.4rem',
                borderRadius: '16px',
                border: `1px solid ${cfg.border}`,
                background: cfg.bg,
                display: 'flex', alignItems: 'flex-start', gap: '1rem'
              }}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{cfg.emoji}</span>
                <div>
                  <p style={{ fontWeight: 800, color: cfg.color, fontSize: '1rem', margin: '0 0 0.25rem' }}>
                    {cfg.headline}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    {cfg.subtext}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {rating <= 2 ? 'Какъв беше проблемът?' : rating === 3 ? 'Кое беше окей?' : 'Какво ви хареса?'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {cfg.tags.map(tag => (
                    <button key={tag} type="button"
                      onClick={() => handleTagToggle(tag)}
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '10px',
                        background: selectedTags.includes(tag) ? cfg.bg : 'rgba(255,255,255,0.03)',
                        border: selectedTags.includes(tag) ? `1.5px solid ${cfg.color}` : '1px solid var(--border-light)',
                        color: selectedTags.includes(tag) ? cfg.color : 'var(--text-secondary)',
                        fontWeight: selectedTags.includes(tag) ? 700 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {selectedTags.includes(tag) && <span style={{ marginRight: '4px' }}>✓</span>}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment box */}
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Вашето мнение
                </p>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder={cfg.placeholder}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  style={{ 
                    fontSize: '0.875rem', lineHeight: 1.5,
                    border: `1px solid ${cfg.border}`,
                    background: cfg.bg,
                  }}
                />
              </div>

              {/* Warning box for 1-2 stars */}
              {rating <= 2 && (
                <div style={{
                  padding: '0.9rem 1.1rem',
                  borderRadius: '12px',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📣</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    Вашата обратна връзка ще бъде изпратена директно до управителя. Ние ценим всяко мнение и ще направим всичко за подобрение.
                  </p>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            disabled={rating === 0}
            style={{ 
              width: '100%', padding: '1.1rem', fontSize: '1.05rem',
              borderRadius: '14px', border: 'none',
              ...(cfg ? cfg.btnStyle : { background: 'var(--accent-purple)' }),
              color: '#fff', fontWeight: 800, cursor: rating === 0 ? 'not-allowed' : 'pointer',
              opacity: rating === 0 ? 0.4 : 1,
              transition: 'all 0.3s ease',
              boxShadow: cfg ? `0 8px 30px ${cfg.glow}` : undefined,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            {cfg ? cfg.btnLabel : 'Изберете оценка'} {rating > 0 && <Send size={18} />}
          </button>
        </form>
      )}

      {/* ─── STEP 2: TIP ─── */}
      {step === 'tip' && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeInUp 0.4s ease' }}>
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.4rem', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '10px', color: 'var(--red)' }}>
                <Heart size={20} fill="var(--red)" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Оставете Дигитален Бакшиш</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              100% от сумата се превежда директно по личната банкова сметка на <strong>{selectedWaiter.name.split(' ')[0]}</strong> през криптирана Apple Pay / Google Pay връзка.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.35rem', marginBottom: '1rem' }}>
              <button type="button"
                className={`btn ${tipAmount === 0 && (!customTip || customTip === '0') ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem', padding: '0.85rem 0.1rem', fontWeight: 800 }}
                onClick={() => { setTipAmount(0); setCustomTip('0'); }}
              >
                €0 (Без)
              </button>
              {[2, 5, 10, 15].map(amt => (
                <button key={amt} type="button"
                  className={`btn ${tipAmount === amt && customTip !== '0' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.95rem', padding: '0.85rem 0.1rem', fontWeight: 800 }}
                  onClick={() => { setTipAmount(amt); setCustomTip(''); }}
                >
                  €{amt}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              <input type="number" className="input-field"
                placeholder="Друга сума (€)"
                value={customTip === '0' ? '' : customTip}
                onChange={e => setCustomTip(e.target.value)}
                style={{ paddingLeft: '2.5rem', fontSize: '0.95rem' }}
              />
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 700 }}>€</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary"
                onClick={() => setStep('rating')}
                style={{ padding: '0.95rem 1.25rem' }}
              >
                Назад
              </button>
              <button type="submit" className="btn btn-primary"
                style={{ flex: 1, padding: '0.95rem', fontSize: '1.05rem', background: 'linear-gradient(135deg, var(--green) 0%, #059669 100%)' }}
              >
                {(tipAmount > 0 || (customTip && customTip !== '0')) ? 'Плати с Apple Pay / Card' : 'Изпрати Оценката'} <Send size={18} />
              </button>
            </div>
            <button type="button" className="btn btn-secondary"
              onClick={(e) => { setTipAmount(0); setCustomTip('0'); handleSubmit(e as any); }}
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}
            >
              Продължи без бакшиш (Изпрати само оценката)
            </button>
          </div>
        </form>
      )}

      {/* ─── STEP 3: SUCCESS ─── */}
      {step === 'success' && (
        <div className="glass-panel" style={{ padding: '2.25rem 1.5rem', textAlign: 'center', animation: 'fadeInUp 0.5s ease', background: 'rgba(14, 14, 26, 0.95)' }}>
          
          {/* Icon — green for good ratings, red for bad */}
          <div style={{ 
            width: '68px', height: '68px', borderRadius: '50%', 
            background: rating >= 3 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)',
            color: rating >= 3 ? 'var(--green)' : '#ef4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: rating >= 3 ? '0 0 25px rgba(16, 185, 129, 0.3)' : '0 0 25px rgba(239,68,68,0.25)'
          }}>
            {rating >= 3 ? <CheckCircle size={38} /> : <MessageSquare size={38} />}
          </div>

          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>
            {rating >= 4 ? 'Сърдечно Ви Благодарим!' : rating === 3 ? 'Благодарим за мнението!' : 'Получихме вашия сигнал!'}
          </h3>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {rating >= 3
              ? <>Вашият отзив бе получен от <strong>{selectedWaiter.name}</strong>. Ресторантът ви благодари за вашата оценка!</>
              : <>Вашата обратна връзка е изпратена до <strong>управителя</strong>. Ще вземем мерки за подобрение. Съжаляваме за неудобството.</>
            }
          </p>

          {/* Google Maps referral — only for 4+ stars */}
          {rating >= 4 && (
            <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.25rem', borderRadius: '16px', textAlign: 'left', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Star size={20} fill="var(--gold)" color="var(--gold)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--gold)' }}>Споделете вашия опит в Google Maps</h4>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                С 1 клик можете да копирате вашия отзив в Google Maps и да подкрепите ресторанта ни!
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                className="btn btn-primary" 
                style={{ width: '100%', fontSize: '0.9rem', padding: '0.75rem', justifyContent: 'center', background: 'linear-gradient(135deg, var(--gold) 0%, #d97706 100%)' }}
              >
                Публикувай в Google Maps <ExternalLink size={16} />
              </a>
            </div>
          )}

          {/* Manager notification note for 1-2 stars */}
          {rating <= 2 && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', padding: '1rem 1.25rem', borderRadius: '14px', textAlign: 'left', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 700, marginBottom: '0.25rem' }}>
                Уведомихме управителя
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Вашата обратна връзка е приоритетна. Ще се свържем с вас, ако сте оставили контакти.
              </p>
            </div>
          )}

          <button className="btn btn-secondary" style={{ width: '100%', padding: '0.85rem' }} 
            onClick={() => { setStep('rating'); setRating(0); setSelectedTags([]); setComment(''); }}>
            Нова Оценка
          </button>
        </div>
      )}
    </div>
  );
};
