import React, { useState } from 'react';
import { 
  CustomCheckCircle as CheckCircle2, 
  CustomArrowRight as ArrowRight,
  CustomShieldCheck as ShieldCheck,
  CustomStar as Star,
  CustomX as XMark
} from './CustomIcons';
import { IconEuroChip, IconNfcChip, IconCyberAnalytics, IconVipWaiters } from './CustomIcons';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCustomizer: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateToCustomizer 
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(8, 8, 16, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, rgba(18, 18, 36, 0.98) 0%, rgba(10, 10, 22, 0.99) 100%)',
        border: '1.5px solid rgba(139, 92, 246, 0.45)',
        borderRadius: '28px',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 45px rgba(139, 92, 246, 0.25)',
        padding: '2.5rem 2.2rem',
        color: '#fff'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
        >
          <XMark size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(16, 185, 129, 0.15)', 
            border: '1px solid rgba(16, 185, 129, 0.4)', 
            padding: '0.35rem 0.95rem', 
            borderRadius: '99px',
            marginBottom: '0.8rem'
          }}>
            <IconEuroChip size={18} color="var(--green)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--green)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ПРОЗРАЧНА ЦЕНОРАСПИС СИСТЕМА
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0.2rem 0 0.5rem' }}>
            Как Работи Заплащането в TipTap?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '680px', margin: '0 auto' }}>
            Моделът се състои от <strong>1) Еднократно закупуване на NFC хардуер</strong> (който остава ваша собственост завинаги) и <strong>2) Достъпен софтуерен абонамент за управители</strong> с 14 дни безплатен тест.
          </p>

          {/* Billing Switcher */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255,255,255,0.04)', 
            border: '1px solid var(--border-light)',
            padding: '0.3rem', 
            borderRadius: '99px',
            marginTop: '1.5rem'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '99px',
                border: 'none',
                background: billingCycle === 'monthly' ? 'var(--accent-purple)' : 'transparent',
                color: billingCycle === 'monthly' ? '#fff' : 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Месечно Плащане
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '99px',
                border: 'none',
                background: billingCycle === 'annual' ? 'var(--accent-purple)' : 'transparent',
                color: billingCycle === 'annual' ? '#fff' : 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Годишно Плащане <span style={{ background: '#10b981', color: '#fff', fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '99px' }}>-20% Отстъпка</span>
            </button>
          </div>
        </div>

        {/* SECTION A: PHYSICAL HARDWARE PRODUCT PRICES */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💳 Part 1:</span> Еднократно Закупуване на NFC Карти &amp; Табелки (Остават ваши завинаги)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {/* Hardware Product 1 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Брандирана NFC Карта</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--green)' }}>€14.99 / бр.</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                За сервиране в сметкодържача. Водоустойчив ламинат, вграден NFC чип и висока устойчивост.
              </p>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700, display: 'block' }}>
                +€5.00/бр. за индивидуален авторски дизайн
              </span>
            </div>

            {/* Hardware Product 2 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>NFC &amp; QR Табелка</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--green)' }}>€19.99 / бр.</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                За постамент на бар, хостеса или рецепция. Солидна плексигласова основа с двустранен QR &amp; NFC достъп.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, display: 'block' }}>
                Включва метална или черна престижна основа
              </span>
            </div>
          </div>
        </div>

        {/* SECTION B: SAAS SUBSCRIPTION PLANS FOR MANAGERS */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📊 Part 2:</span> Софтуерен Абонамент за Контрол на Качеството &amp; Ревютата
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            
            {/* PLAN 1: START */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '22px', padding: '1.6rem', position: 'relative' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>МАЛКИ ОБЕКТИ</span>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.2rem 0 0.6rem' }}>План "СТАРТ"</h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>
                  €{billingCycle === 'annual' ? '15.99' : '19.99'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ месец</span>
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: '0 0 1.5rem', listStyle: 'none', fontSize: '0.84rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> До 10 сервитьора</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Базов контролен панел</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Google 5★ Ревю филтър</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Онлайн бакшиш през Apple Pay</li>
              </ul>

              <button 
                className="btn ios-glass-btn-secondary" 
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.88rem' }}
                onClick={() => { onClose(); onNavigateToCustomizer(); }}
              >
                Тествай 14 Дни Безплатно
              </button>
            </div>

            {/* PLAN 2: PREMIUM (POPULAR) */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(10, 10, 22, 0.95) 100%)', 
              border: '2px solid var(--accent-purple)', 
              borderRadius: '22px', 
              padding: '1.6rem', 
              position: 'relative',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}>
              <span style={{ position: 'absolute', top: '-12px', right: '1.5rem', background: 'var(--accent-purple)', color: '#fff', fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.75rem', borderRadius: '99px' }}>
                НАЙ-ПОПУЛЯРЕН
              </span>

              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-purple)', letterSpacing: '1px' }}>СРЕДНИ &amp; ГОЛЕМИ РЕСТОРАНТИ</span>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.2rem 0 0.6rem' }}>План "ПРЕМИУМ"</h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>
                  €{billingCycle === 'annual' ? '31.99' : '39.99'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ месец</span>
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: '0 0 1.5rem', listStyle: 'none', fontSize: '0.84rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Неограничен брой сервитьори</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Пълен одит &amp; класация по рейтинг</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Скрит админ чат за лошите отзиви</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="var(--green)" /> Автоматични месечни изплащания</li>
              </ul>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.88rem', justifyContent: 'center' }}
                onClick={() => { onClose(); onNavigateToCustomizer(); }}
              >
                Избери Премиум План <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* Footer Guarantee */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border-light)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={18} color="var(--green)" />
          <span>100% Прозрачност • Без скрити такси • 14 дни тестов период за всеки управител</span>
        </div>
      </div>
    </div>
  );
};
