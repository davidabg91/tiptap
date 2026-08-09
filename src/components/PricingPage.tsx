import React, { useState } from 'react';
import { 
  CustomCheckCircle as CheckCircle2, 
  CustomArrowRight as ArrowRight,
  CustomShieldCheck as ShieldCheck,
  CustomStar as Star
} from './CustomIcons';
import { IconEuroChip, IconNfcChip, IconCyberAnalytics, IconVipWaiters, IconSmartRadar } from './CustomIcons';

interface PricingPageProps {
  onNavigateToCustomizer: () => void;
  onNavigateToDashboard: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ 
  onNavigateToCustomizer,
  onNavigateToDashboard 
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '4rem', paddingBottom: '5rem' }}>
      
      {/* HERO PRICING HEADER */}
      <section className="section-alt-dark hero-grid-pattern" style={{ padding: '4.5rem 4vw 3.5rem', borderRadius: '0 0 32px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          
          <div className="bg-glow-purple" style={{ top: '-20%', left: '30%', opacity: 0.35 }}></div>
          <div className="bg-glow-cyan" style={{ bottom: '-10%', right: '20%', opacity: 0.25 }}></div>

          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(16, 185, 129, 0.15)', 
            border: '1px solid rgba(16, 185, 129, 0.4)', 
            padding: '0.4rem 1rem', 
            borderRadius: '99px',
            marginBottom: '1rem'
          }}>
            <IconEuroChip size={18} color="var(--green)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--green)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ПРОЗРАЧЕН И БЕЗПРЕЦЕДЕНТЕН ЦЕНОРАСПИС
            </span>
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
            Ясни Цени. <span className="text-gradient-purple">Без Скрити Такси.</span><br />
            100% Собственост &amp; Контрол.
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Моделът на TipTap е разделен на <strong>1) Еднократна покупка на брандиран хардуер</strong> (картичките остават ваши завинаги) и <strong>2) Достъпен софтуерен абонамент за управители</strong> с 14-дневен безплатен пробен период.
          </p>

          {/* Billing Switcher */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(255,255,255,0.04)', 
            border: '1.5px solid var(--border-light)',
            padding: '0.35rem', 
            borderRadius: '99px'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '99px',
                border: 'none',
                background: billingCycle === 'monthly' ? 'var(--accent-purple)' : 'transparent',
                color: billingCycle === 'monthly' ? '#fff' : 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Месечно Плащане
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '99px',
                border: 'none',
                background: billingCycle === 'annual' ? 'var(--accent-purple)' : 'transparent',
                color: billingCycle === 'annual' ? '#fff' : 'var(--text-secondary)',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              Годишно Плащане <span style={{ background: '#10b981', color: '#fff', fontSize: '0.72rem', padding: '0.15rem 0.6rem', borderRadius: '99px', fontWeight: 900 }}>-20% СПЕСТЯВАНЕ</span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 1: PHYSICAL HARDWARE PRICING */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 2vw' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            ЧАСТ 1: ФИЗИЧЕСКИ ПРОДУКТИ
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0.3rem 0 0.5rem' }}>
            Еднократно Закупуване на NFC Карти &amp; Табелки
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Картите и табелките остават ваша собственост завинаги. Без наеми и без нужда от пренастройване.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          
          {/* Hardware Card 1: CARD ONLY (€4.90) */}
          <div className="glow-border-card" style={{ padding: '2.2rem', background: 'rgba(14, 14, 26, 0.9)', borderRadius: '24px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '16px', 
              background: 'rgba(245, 158, 11, 0.15)', 
              border: '1.5px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <IconNfcChip size={26} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                NFC Карта за Сметката
              </h3>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--green)' }}>
                €4.90 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ бр.</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              За поставяне в сметкодържача. Водоустойчив ламинат, висока устойчивост и вграден NFC чип.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: '0 0 1.8rem', listStyle: 'none', fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--green)" /> Стандартни иконки (без оскъпяване)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--green)" /> Опция "Дизайн по ваш избор (+5€)"</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--green)" /> Избор между Черен или Бял цвят</li>
            </ul>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.9rem', justifyContent: 'center' }}
              onClick={onNavigateToCustomizer}
            >
              Конфигурирай Карти Сега <ArrowRight size={18} />
            </button>
          </div>

          {/* Hardware Card 2: STAND ONLY (€6.90) */}
          <div className="glow-border-card" style={{ padding: '2.2rem', background: 'rgba(14, 14, 26, 0.9)', borderRadius: '24px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '16px', 
              background: 'rgba(6, 182, 212, 0.15)', 
              border: '1.5px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <IconSmartRadar size={26} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                NFC &amp; QR Настолна Табелка
              </h3>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--green)' }}>
                €6.90 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ бр.</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              За бар плот, хостеса или маси. Солиден плексигласов постамент с двустранен QR &amp; NFC достъп.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0, margin: '0 0 1.8rem', listStyle: 'none', fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--green)" /> Престижна металикова или черна основа</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--green)" /> Двустранен лазерен печат</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} color="var(--green)" /> Бърз достъп без сваляне на апликация</li>
            </ul>

            <button 
              className="btn ios-glass-btn-secondary" 
              style={{ width: '100%', padding: '0.9rem', justifyContent: 'center' }}
              onClick={onNavigateToCustomizer}
            >
              Поръчай Табелка <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: SAAS SUBSCRIPTION PLANS FOR MANAGERS */}
      <section className="section-alt-indigo" style={{ padding: '5rem 4vw' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent-purple)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              ЧАСТ 2: СОФТУЕРЕН АБОНАМЕНТ
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: '0.3rem 0 0.5rem' }}>
              Софтуер за Управители &amp; Мотиция на Екипа
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
              Включва <strong>14 дни безплатен пробен период</strong>. Откажете по всяко време без неустойки.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* PLAN 1: START */}
            <div style={{ 
              background: 'rgba(14, 14, 26, 0.95)', 
              border: '1.5px solid var(--border-light)', 
              borderRadius: '28px', 
              padding: '2.5rem 2rem', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>МАЛКИ ОБЕКТИ</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0.3rem 0 0.8rem', color: '#fff' }}>План "СТАРТ"</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Перфектен за кафета, малки барове и обекти с до 10 сервитьора.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '1.8rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff' }}>
                    €{billingCycle === 'annual' ? '15.99' : '19.99'}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ месец</span>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, margin: '0 0 2rem', listStyle: 'none', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> До 10 сервитьорски профила</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Базов контролен панел за управителя</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Филтър за Google Maps 5★ отзиви</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Онлайн бакшиши през Apple &amp; Google Pay</li>
                </ul>
              </div>

              <button 
                className="btn ios-glass-btn-secondary" 
                style={{ width: '100%', padding: '0.95rem', justifyContent: 'center' }}
                onClick={onNavigateToDashboard}
              >
                Тествай 14 Дни Безплатно <ArrowRight size={18} />
              </button>
            </div>

            {/* PLAN 2: PREMIUM (POPULAR) */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(14, 14, 26, 0.98) 100%)', 
              border: '2px solid var(--accent-purple)', 
              borderRadius: '28px', 
              padding: '2.5rem 2rem', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(139, 92, 246, 0.35)'
            }}>
              <span style={{ position: 'absolute', top: '-14px', right: '2rem', background: 'var(--accent-purple)', color: '#fff', fontSize: '0.75rem', fontWeight: 900, padding: '0.3rem 0.9rem', borderRadius: '99px' }}>
                НАЙ-ПОПУЛЯРЕН ИЗБОР
              </span>

              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--accent-purple)', letterSpacing: '1px' }}>СРЕДНИ &amp; ГОЛЕМИ РЕСТОРАНТИ</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0.3rem 0 0.8rem', color: '#fff' }}>План "ПРЕМИУМ"</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Пълен одит на сервиза, анализи в реално време и защита на репутацията.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '1.8rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff' }}>
                    €{billingCycle === 'annual' ? '31.99' : '39.99'}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ месец</span>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, margin: '0 0 2rem', listStyle: 'none', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Неограничен брой сервитьори</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Пълен одит &amp; класация по рейтинг</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Скрит админ чат за критичните отзиви</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Автоматични банкови изплащания</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={20} color="var(--green)" /> Персонален акаунт мениджър</li>
                </ul>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.95rem', justifyContent: 'center' }}
                onClick={onNavigateToDashboard}
              >
                Започни 14 Дни Безплатно <ArrowRight size={18} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: FAQ FOR MANAGERS */}
      <section style={{ maxWidth: '900px', margin: '0 auto', width: '100%', padding: '0 2vw' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
            Често Задавани Въпроси от Управители
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              q: 'Трябва ли сервитьорите да свалят апликация на телефоните си?',
              a: 'Не! Системата е 100% уеб базирана. Сервитьорите и клиентите отварят профила веднага през браузър за под 1 секунда.'
            },
            {
              q: 'Какво става, ако клиентът е недоволен от обслужването?',
              a: 'Оценки от 1 до 3 звезди НЕ се публикуват в Google. Те се изпращат като скрит вътрешен отзив директно в контролния панел на управителя.'
            },
            {
              q: 'Колко време отнема изработката на брандираните карти?',
              a: 'Стандартният срок за изработка и доставка на индивидуално брандирани NFC карти в цяла България е 2 до 4 работни дни.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem 1.8rem', borderRadius: '18px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem', color: '#fff' }}>
                {faq.q}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
