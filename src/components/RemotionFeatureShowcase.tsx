import React, { useState, useEffect } from 'react';
import { 
  CustomStar as Star, 
  CustomCheckCircle as CheckCircle2, 
  CustomArrowRight as ArrowRight
} from './CustomIcons';
import { 
  IconCyberAnalytics, IconVipWaiters, IconEuroChip, IconSmartRadar, 
  IconCyberQr, IconPrismStar, IconNfcChip 
} from './CustomIcons';

export const RemotionFeatureShowcase: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [activeScene, setActiveScene] = useState<'nfc' | 'tip' | 'google' | 'payout'>('nfc');

  // Smooth & steady timer loop: advances 1% every 120ms (~3 seconds per step, 12 seconds loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Auto-switch scene crisply based on progress
  useEffect(() => {
    if (progress < 25) setActiveScene('nfc');
    else if (progress < 50) setActiveScene('tip');
    else if (progress < 75) setActiveScene('google');
    else setActiveScene('payout');
  }, [progress]);

  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(135deg, #0b0b14 0%, #0d0c1e 50%, #121026 100%)',
      border: '1.5px solid rgba(139, 92, 246, 0.4)',
      borderRadius: '32px',
      boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(139, 92, 246, 0.25)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* TOP SCENE TABS SELECTOR (Clean pill navigation) */}
      <div style={{
        padding: '1.25rem 2rem 0',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        zIndex: 10,
        position: 'relative'
      }}>
        {[
          { id: 'nfc', label: '1. NFC Докосване', sub: 'За 1 секунда' },
          { id: 'tip', label: '2. Оценка за Сервитьора', sub: 'В реално време' },
          { id: 'google', label: '3. Google 5★ Ревю', sub: 'Защитен Щит' },
          { id: 'payout', label: '4. Бонус Табло', sub: 'Класация' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveScene(tab.id as any);
              if (tab.id === 'nfc') setProgress(10);
              if (tab.id === 'tip') setProgress(35);
              if (tab.id === 'google') setProgress(60);
              if (tab.id === 'payout') setProgress(85);
            }}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '99px',
              border: activeScene === tab.id ? '1.5px solid var(--accent-purple)' : '1px solid var(--border-light)',
              background: activeScene === tab.id ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.03)',
              color: activeScene === tab.id ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              boxShadow: activeScene === tab.id ? '0 4px 20px rgba(139, 92, 246, 0.3)' : 'none'
            }}
          >
            <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>{tab.label}</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{tab.sub}</span>
          </button>
        ))}
      </div>

      {/* PURE CRISP ANIMATION CANVAS */}
      <div style={{
        position: 'relative',
        minHeight: '390px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        overflow: 'hidden'
      }}>
        {/* Animated Motion Glow background */}
        <div className="bg-glow-purple" style={{ top: '-20%', left: '20%', opacity: 0.4 }}></div>
        <div className="bg-glow-cyan" style={{ bottom: '-20%', right: '20%', opacity: 0.3 }}></div>

        {/* SCENE 1: NFC TOUCH (CRISP & STABLE) */}
        {activeScene === 'nfc' && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.35s ease-out', zIndex: 2 }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{
                width: '210px',
                height: '118px',
                background: 'linear-gradient(135deg, #18152a 0%, #0c0b16 100%)',
                border: '2px solid #f59e0b',
                borderRadius: '16px',
                padding: '1rem',
                margin: '0 auto',
                boxShadow: '0 15px 40px rgba(245, 158, 11, 0.45)',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 800, letterSpacing: '1px' }}>
                  РЕСТОРАНТ ЛЕДЕНИКА
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
                  ОЦЕНИ ОБСЛУЖВАНЕТО
                </div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>NFC PASS TOUCH</div>
              </div>

              {/* Pulsing Neon Halo (No wobble) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '240px',
                height: '148px',
                border: '2px dashed rgba(245, 158, 11, 0.4)',
                borderRadius: '24px',
                pointerEvents: 'none'
              }} />
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0.2rem 0', fontFamily: 'var(--font-display)' }}>
              Безконтактно NFC Докосване
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0.4rem auto 0' }}>
              Гостът доближава смартфона си до картата в сметката • За под 1 секунда се отваря екранът за оценка
            </p>
          </div>
        )}

        {/* SCENE 2: WAITER RATING & EVALUATION */}
        {activeScene === 'tip' && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.35s ease-out', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '1.2rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={36} fill="#f59e0b" color="#f59e0b" style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))' }} />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              {['⚡ Бърз сервиз', '😊 Внимателен', '🍷 Експерт за вино'].map((tag, idx) => (
                <span 
                  key={idx}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: '99px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid var(--accent-purple)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(16, 185, 129, 0.18)', 
              border: '1px solid rgba(16, 185, 129, 0.45)', 
              padding: '0.55rem 1.4rem', 
              borderRadius: '99px',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 color="var(--green)" size={22} />
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--green)' }}>
                🔔 Изпратена оценка: 5/5 за сервитьора Иван Петров
              </span>
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0.2rem 0', fontFamily: 'var(--font-display)' }}>
              Оценка за Сервитьора в Реално Време
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0.4rem auto 0' }}>
              Гостът оценява любезността и сервиза • Данните и комплиментите постъпват веднага при управителя за контрол на качеството.
            </p>
          </div>
        )}

        {/* SCENE 3: GOOGLE 5-STAR ROCKET */}
        {activeScene === 'google' && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.35s ease-out', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1.4rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={40} fill="#f59e0b" color="#f59e0b" style={{ filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.9))' }} />
              ))}
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.18)',
              border: '1.5px solid #f59e0b',
              borderRadius: '20px',
              padding: '1.1rem 2rem',
              display: 'inline-block',
              marginBottom: '1rem',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.35)'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>
                🚀 Автоматично пренасочване към Google Maps
              </span>
              <div style={{ fontSize: '0.85rem', color: '#f59e0b', marginTop: '0.25rem', fontWeight: 700 }}>
                "Страхотен сервиз от сервитьора Мартин! 5 звезди!"
              </div>
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0.2rem 0', fontFamily: 'var(--font-display)' }}>
              Ръст в Google Maps &amp; Защитен Щит
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0.4rem auto 0' }}>
              Доволните клиенти се насочват към Google, а критичните отиват като скрит вътрешен отзив до шефа.
            </p>
          </div>
        )}

        {/* SCENE 4: LEADERBOARD & BONUS ENGINE */}
        {activeScene === 'payout' && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.35s ease-out', zIndex: 2, width: '100%', maxWidth: '500px' }}>
            <div style={{
              background: 'rgba(14, 14, 26, 0.95)',
              border: '1.5px solid var(--accent-purple)',
              borderRadius: '22px',
              padding: '1.4rem 1.6rem',
              textAlign: 'left',
              marginBottom: '1rem',
              boxShadow: '0 15px 40px rgba(139, 92, 246, 0.35)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>🏆 Топ Сервитьор на Месеца</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--green)', fontWeight: 900 }}>+€145 Бакшиши</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: '1.1rem' }}>
                  ИП
                </div>
                <div>
                  <strong style={{ display: 'block', color: '#fff', fontSize: '1rem' }}>Иван Петров</strong>
                  <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 700 }}>⭐ 4.98 Rating (48 Отзива)</span>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0.2rem 0', fontFamily: 'var(--font-display)' }}>
              Бонус Система &amp; Автоматични Изплащания
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0.4rem auto 0' }}>
              Прозрачни класации за управителя и мотивиран екип с бързи банкови преводи.
            </p>
          </div>
        )}
      </div>

      {/* SEAMLESS ANIMATED PROGRESS INDICATOR */}
      <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-cyan) 50%, #f59e0b 100%)',
          transition: 'width 0.1s linear'
        }} />
      </div>
    </div>
  );
};
