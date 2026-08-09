import React, { useState } from 'react';
import { 
  CustomStar as Star, 
  CustomCheckCircle as CheckCircle2, 
  CustomArrowRight as ArrowRight
} from './CustomIcons';
import { 
  IconCyberAnalytics, IconVipWaiters, IconEuroChip, IconSmartRadar, 
  IconCyberQr, IconPrismStar, IconNfcChip 
} from './CustomIcons';

export const ModernFeatureGrid: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      {/* 4 MODERN FEATURE CARDS GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        width: '100%'
      }}>
        
        {/* FEATURE CARD 1: NFC TOUCH */}
        <div 
          onClick={() => setActiveCard(1)}
          className="glow-border-card"
          style={{
            padding: '2rem',
            background: activeCard === 1 
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(14, 14, 26, 0.95) 100%)' 
              : 'rgba(14, 14, 26, 0.85)',
            borderColor: activeCard === 1 ? 'var(--accent-purple)' : 'var(--border-light)',
            boxShadow: activeCard === 1 ? '0 15px 40px rgba(139, 92, 246, 0.35)' : 'none',
            cursor: 'pointer',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '14px', 
            background: 'rgba(139, 92, 246, 0.2)', 
            border: '1.5px solid var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)'
          }}>
            <IconNfcChip size={26} />
          </div>

          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--accent-purple)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            СТЪПКА 1
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.3rem 0 0.6rem', color: '#fff' }}>
            Безконтактно Докосване
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Гостът докосва смартфона си до NFC картата в сметкодържача. Страницата се отваря за под 1 секунда без нужда от сваляне на апликация.
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-purple)', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>⚡ Бързо &amp; Лесно за под 1 сек</span>
          </div>
        </div>

        {/* FEATURE CARD 2: WAITER RATING & PERFORMANCE EVALUATION */}
        <div 
          onClick={() => setActiveCard(2)}
          className="glow-border-card"
          style={{
            padding: '2rem',
            background: activeCard === 2 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(14, 14, 26, 0.95) 100%)' 
              : 'rgba(14, 14, 26, 0.85)',
            borderColor: activeCard === 2 ? 'var(--green)' : 'var(--border-light)',
            boxShadow: activeCard === 2 ? '0 15px 40px rgba(16, 185, 129, 0.35)' : 'none',
            cursor: 'pointer',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '14px', 
            background: 'rgba(16, 185, 129, 0.2)', 
            border: '1.5px solid var(--green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
          }}>
            <IconVipWaiters size={26} />
          </div>

          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--green)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            СТЪПКА 2
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.3rem 0 0.6rem', color: '#fff' }}>
            Оценка на Сервитьора
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Гостът оценява любезността, бързината и вниманието на сервитьора. Данните се изпращат мигновено в таблото на управителя.
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--green)', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>⭐ Пълна информация за управителя</span>
          </div>
        </div>

        {/* FEATURE CARD 3: GOOGLE 5-STAR ROCKET */}
        <div 
          onClick={() => setActiveCard(3)}
          className="glow-border-card"
          style={{
            padding: '2rem',
            background: activeCard === 3 
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(14, 14, 26, 0.95) 100%)' 
              : 'rgba(14, 14, 26, 0.85)',
            borderColor: activeCard === 3 ? '#f59e0b' : 'var(--border-light)',
            boxShadow: activeCard === 3 ? '0 15px 40px rgba(245, 158, 11, 0.35)' : 'none',
            cursor: 'pointer',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '14px', 
            background: 'rgba(245, 158, 11, 0.2)', 
            border: '1.5px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)'
          }}>
            <Star size={24} color="#f59e0b" fill="#f59e0b" />
          </div>

          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase' }}>
            СТЪПКА 3
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.3rem 0 0.6rem', color: '#fff' }}>
            Google 5★ Магнит &amp; Щит
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Доволните клиенти (5 звезди) се пренасочват към Google Maps профила ви, а критичните отиват като скрит вътрешен отзив до шефа.
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>⭐ Тласък в класирането на заведението</span>
          </div>
        </div>

        {/* FEATURE CARD 4: MANAGER ANALYTICS */}
        <div 
          onClick={() => setActiveCard(4)}
          className="glow-border-card"
          style={{
            padding: '2rem',
            background: activeCard === 4 
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(14, 14, 26, 0.95) 100%)' 
              : 'rgba(14, 14, 26, 0.85)',
            borderColor: activeCard === 4 ? 'var(--accent-cyan)' : 'var(--border-light)',
            boxShadow: activeCard === 4 ? '0 15px 40px rgba(6, 182, 212, 0.35)' : 'none',
            cursor: 'pointer',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '14px', 
            background: 'rgba(6, 182, 212, 0.2)', 
            border: '1.5px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 6px 20px rgba(6, 182, 212, 0.3)'
          }}>
            <IconCyberAnalytics size={26} />
          </div>

          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--accent-cyan)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            СТЪПКА 4
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.3rem 0 0.6rem', color: '#fff' }}>
            Анализи &amp; Бонус Табло
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Управителят вижда класация по рейтинг и събрани бакшиши в реално време. Автоматизирана бонус система за задържане на най-добрите сервитьори.
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>📊 Прозрачност &amp; Мотивиран екип</span>
          </div>
        </div>

      </div>
    </div>
  );
};
