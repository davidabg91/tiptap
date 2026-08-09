import React, { useState } from 'react';
import { CustomerRating } from './CustomerRating';
import { 
  CustomArrowRight as ArrowRight, 
  CustomStar as Star, 
  CustomCreditCard as CreditCard, 
  CustomDollarSign as DollarSign, 
  CustomTrendingUp as TrendingUp, 
  CustomCheckCircle as CheckCircle, 
  CustomShieldCheck as ShieldCheck, 
  CustomSmartphone as Smartphone,
  CustomAward as Award,
  CustomBarChart3 as BarChart3, 
  CustomMessageSquare as MessageSquare, 
  CustomChevronDown as ChevronDown
} from './CustomIcons';
import { 
  IconNfcChip, IconVipWaiters, IconEuroChip,
  IconSmartRadar, IconCyberQr, IconPrismStar,
  IconHandChart, IconHandShieldStar, IconHandTipCard
} from './CustomIcons';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToCustomizer: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigateToDashboard, 
  onNavigateToCustomizer 
}) => {
  const [demoReviewCount, setDemoReviewCount] = useState<number>(4);

  // ROI Calculator State
  const [tablesCount, setTablesCount] = useState<number>(20);
  const [turnsPerTable, setTurnsPerTable] = useState<number>(4);
  const [avgTipPerCheck, setAvgTipPerCheck] = useState<number>(3);

  // 3D Card Tilt State for Showcase
  const [cardRotateX, setCardRotateX] = useState<number>(0);
  const [cardRotateY, setCardRotateY] = useState<number>(0);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const box = container.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setCardRotateX(-(y / box.height) * 30);
    setCardRotateY((x / box.width) * 30);
  };

  const handleCardMouseLeave = () => {
    setCardRotateX(0);
    setCardRotateY(0);
  };

  // 100% Transparent Logical ROI Formulas
  const dailyChecks = tablesCount * turnsPerTable;
  const monthlyChecks = dailyChecks * 30;
  // 30% of tables leave an online tip averaging avgTipPerCheck
  const estimatedMonthlyTips = Math.round(monthlyChecks * 0.30 * avgTipPerCheck);
  // 8% of happy guests leave a 5-star Google Review
  const estimatedMonthlyReviews = Math.round(monthlyChecks * 0.08);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      
      {/* SECTION 1: HERO SECTION (TONE 1: MIDNIGHT TITANIUM) */}
      <section className="section-alt-dark hero-grid-pattern" style={{ padding: '4rem 4vw 5rem' }}>
        <div className="mobile-stack" style={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '4vw',
          alignItems: 'center'
        }}>
          
          {/* Glow Effects */}
          <div className="bg-glow-purple" style={{ top: '-10%', left: '-5%', opacity: 0.35 }}></div>
          <div className="bg-glow-cyan" style={{ bottom: '0%', right: '10%', opacity: 0.25 }}></div>

          {/* Hero Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 1, alignItems: 'center', textAlign: 'center' }}>
            
            <h1 className="hero-display-title">
              Вижте в реално време как <br />
              работи вашият персонал.
            </h1>

            <p className="font-casual-friendly" style={{ maxWidth: '680px', margin: '0 auto' }}>
              <strong>TipTap</strong> дава на управителите и собствениците 100% прозрачност за качеството на сервиза през преките отзиви на вашите гости. Оценете представянето на всеки сервитьор, контролирайте репутацията на заведението и мотивирайте екипа.
            </p>

            {/* 3 Real Problem-Solving Benefit Pills (Manager-Centric Order) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', width: '100%', maxWidth: '720px', margin: '0.5rem 0' }}>
              <div className="glow-border-card" style={{ padding: '1.15rem 1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <IconHandChart size={30} color="#a78bfa" />
                <div style={{ color: '#3b82f6', fontWeight: 800, fontSize: '0.95rem' }}>Контрол за Шефа</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Реална оценка и анализи за всеки сервитьор</p>
              </div>

              <div className="glow-border-card" style={{ padding: '1.15rem 1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <IconHandShieldStar size={30} color="#a78bfa" />
                <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.95rem' }}>Защита &amp; Google 5★</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Скрит админ чат за лошите отзиви &amp; Google 5★</p>
              </div>

              <div className="glow-border-card" style={{ padding: '1.15rem 1rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <IconHandTipCard size={30} color="#a78bfa" />
                <div style={{ color: 'var(--green)', fontWeight: 800, fontSize: '0.95rem' }}>Мотивация за Екипа</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Онлайн бакшиши &amp; Бонус система за сервиза</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}>
              <button 
                className="btn ios-glass-btn-primary" 
                style={{ padding: '1.05rem 2.4rem', fontSize: '1.05rem' }}
                onClick={onNavigateToCustomizer}
              >
                Поръчай карти за твоя обект <ArrowRight size={18} />
              </button>
              <button 
                className="btn ios-glass-btn-secondary"
                style={{ padding: '1.05rem 2.4rem', fontSize: '1.05rem' }}
                onClick={onNavigateToDashboard}
              >
                Демо за Управители
              </button>
            </div>
          </div>

          {/* Hero Right Content: 3D NFC Scan Animation Stage */}
          <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1, position: 'relative' }}>

            {/* SMARTPHONE FRAME — zIndex above card */}
            <div className="floating-phone-container" style={{ position: 'relative', zIndex: 2 }}>
              <div className="try-me-badge">
                <span className="pulse-dot"></span>
                <span>Пробвай ме!</span>
              </div>

              {/* 3D NFC card sweep stage — card flies from right, scans phone, exits left */}
              <div className="nfc-scan-stage">
                {/* NFC Radar Pulse Wave Rings behind phone */}
                <div className="nfc-radar-pulse" />

                <div className="nfc-card-3d realistic-restaurant-card">
                  {/* Holographic Sheen Layer */}
                  <div className="card-holographic-sheen" />

                  {/* Metallic Chamfered Gold Border Inner Accent */}
                  <div className="card-gold-inner-border" />

                  {/* TOP ROW: Restaurant Logo & Name + EMV Smart Chip */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img 
                        src={`${import.meta.env.BASE_URL}logo.jpg`} 
                        alt="Ресторант Леденика Logo" 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '8px', 
                          border: '1.5px solid #f59e0b',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                          objectFit: 'cover'
                        }} 
                      />
                      <div>
                        <div style={{ fontSize: '0.52rem', color: '#f59e0b', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', lineHeight: 1 }}>
                          РЕСТОРАНТ
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 900, letterSpacing: '0.5px', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
                          Леденика
                        </div>
                      </div>
                    </div>

                    {/* Contactless NFC Waves Badge */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.35)',
                      borderRadius: '99px'
                    }}>
                      <span style={{ fontSize: '0.45rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.8px' }}>NFC PASS</span>
                    </div>
                  </div>

                  {/* CENTER ROW: Card Title / Call to Action */}
                  <div style={{ margin: '8px 0 6px', textTransform: 'uppercase', zIndex: 2 }}>
                    <div style={{ 
                      fontSize: '0.92rem', 
                      fontWeight: 900, 
                      letterSpacing: '1.5px',
                      background: 'linear-gradient(135deg, #fff 0%, #fbbf24 60%, #d97706 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                      lineHeight: 1.1
                    }}>
                      ОЦЕНИ ОБСЛУЖВАНЕТО
                    </div>
                    <div style={{ 
                      fontSize: '0.52rem', 
                      color: 'rgba(255,255,255,0.7)', 
                      letterSpacing: '0.8px', 
                      marginTop: '3px',
                      fontWeight: 600
                    }}>
                      NFC SMART TOUCH CARD
                    </div>
                  </div>

                  {/* BOTTOM ROW: Serial & Contactless Waves + TipTap Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                    <div>
                      <div style={{ fontSize: '0.48rem', color: 'rgba(245, 158, 11, 0.9)', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>
                        CARD ID: LED-2026-NFC
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {/* Contactless Wave Icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12C4 12 7 6 12 6C17 6 20 12 20 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M7 12C7 12 9 8 12 8C15 8 17 12 17 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M10 12C10 12 11 10 12 10C13 10 14 12 14 12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="1.5" fill="#f59e0b"/>
                      </svg>
                      <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.6)', fontWeight: 800 }}>TipTap</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone frame */}
              <div className="titanium-phone-frame" style={{ position: 'relative', zIndex: 1 }}>
                <div className="dynamic-island">
                  <div className="dynamic-island-camera"></div>
                  <div className="dynamic-island-sensor"></div>
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '0.65rem 1.6rem 0.2rem',
                  fontSize: '0.7rem', fontWeight: 'bold',
                  color: 'var(--text-muted)', zIndex: 9, marginTop: '0.2rem'
                }}>
                  <span>09:41</span>
                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    <span>5G</span>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>100%</span>
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', paddingTop: '0.5rem', position: 'relative' }} className="phone-screen">
                  <CustomerRating
                    initialWaiterId="waiter-2"
                    onReviewSubmitted={() => setDemoReviewCount(demoReviewCount + 1)}
                  />
                </div>
                <div style={{ height: '5px', width: '110px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', margin: '8px auto', zIndex: 10 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (FUTURISTIC 4-STEP PIPELINE) */}
      <section className="section-alt-indigo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '0 4vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="hero-display-title" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', textAlign: 'center' }}>
              Как Работи Платформата?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Интеграцията става за броени минути, а резултатите започват веднага.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', position: 'relative' }}>
            
            {/* STEP 01 */}
            <div className="glow-border-card" style={{ padding: '2.25rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(14, 14, 26, 0.85)', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)', 
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                }}>01</div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.15)', padding: '0.2rem 0.65rem', borderRadius: '99px', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconNfcChip size={14} /> NFC СМЕТКА
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Сервитьорът дава сметката</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                Заедно със сметката, сервитьорът оставя своята матова NFC карта или табелка с QR код.
              </p>
            </div>

            {/* STEP 02 */}
            <div className="glow-border-card" style={{ padding: '2.25rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(14, 14, 26, 0.85)', border: '1px solid rgba(6, 182, 212, 0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 100%)', 
                  border: '1px solid rgba(6, 182, 212, 0.5)',
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                }}>02</div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.15)', padding: '0.2rem 0.65rem', borderRadius: '99px', border: '1px solid rgba(6, 182, 212, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconNfcChip size={14} /> БЕЗ АПЛИКАЦИЯ
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Клиентът допира телефона</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                Без сваляне на приложения! Мобилното меню се отваря моментално на екрана на клиента.
              </p>
            </div>

            {/* STEP 03 */}
            <div className="glow-border-card" style={{ padding: '2.25rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(14, 14, 26, 0.85)', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0.1) 100%)', 
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                }}>03</div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold)', background: 'rgba(245, 158, 11, 0.15)', padding: '0.2rem 0.65rem', borderRadius: '99px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconPrismStar size={14} /> APPLE PAY
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Оценка &amp; Дигитален Бакшиш</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                Клиентът избира 1-5 звезди, оставя бакшиш през Apple/Google Pay и пише отзив.
              </p>
            </div>

            {/* STEP 04 */}
            <div className="glow-border-card" style={{ padding: '2.25rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(14, 14, 26, 0.85)', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%)', 
                  border: '1px solid rgba(16, 185, 129, 0.5)',
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}>04</div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--green)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.65rem', borderRadius: '99px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconSmartRadar size={14} /> GOOGLE MAPS
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Google Reviews &amp; Табло</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                Доволните клиенти се насочват към Google Maps, а управителят вижда рейтинга в реално време.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE ROI & REVENUE CALCULATOR (FUTURISTIC HOLOGRAPHIC GLASS) */}
      <section className="section-alt-dark">
        <div style={{ padding: '0 4vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel mobile-stack" style={{ padding: '3.5rem 3.5vw', borderRadius: '32px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5vw', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            
            {/* Ambient Backlight Orbs */}
            <div className="bg-glow-purple" style={{ top: '-20%', right: '-10%', opacity: 0.4 }}></div>
            <div className="bg-glow-cyan" style={{ bottom: '-20%', left: '-10%', opacity: 0.3 }}></div>

            {/* Left Controls & Sliders */}
            <div style={{ zIndex: 2 }}>
              <h2 style={{
                fontFamily: 'var(--font-official)',
                fontSize: '1.85rem',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                textAlign: 'left',
                margin: '0 0 1rem',
                color: '#ffffff',
              }}>
                Изчислете допълнителните приходи &amp; отзиви
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.2rem', fontSize: '1.05rem' }}>
                Колко нови 5-звездни Google ревюта и дигитални бакшиши пропуска вашият ресторант всеки месец?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Tables Slider Box */}
                <div className="glow-border-card" style={{ padding: '1.1rem 1.35rem', background: 'rgba(18, 18, 30, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>🪑 Брой маси в заведението</label>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff', background: 'rgba(139, 92, 246, 0.3)', border: '1px solid rgba(139, 92, 246, 0.5)', padding: '0.2rem 0.75rem', borderRadius: '99px' }}>
                      {tablesCount} маси
                    </span>
                  </div>
                  <input 
                    type="range" min="5" max="100" step="5"
                    className="modern-range-slider"
                    value={tablesCount}
                    onChange={(e) => setTablesCount(parseInt(e.target.value))}
                  />
                </div>

                {/* Turns per Table Slider Box */}
                <div className="glow-border-card" style={{ padding: '1.1rem 1.35rem', background: 'rgba(18, 18, 30, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>🔄 Сметки на маса дневно (Заетост)</label>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff', background: 'rgba(6, 182, 212, 0.3)', border: '1px solid rgba(6, 182, 212, 0.5)', padding: '0.2rem 0.75rem', borderRadius: '99px' }}>
                      {turnsPerTable} сметки/маса
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="8" step="1"
                    className="modern-range-slider"
                    value={turnsPerTable}
                    onChange={(e) => setTurnsPerTable(parseInt(e.target.value))}
                  />
                </div>

                {/* Avg Tip per Check Slider Box */}
                <div className="glow-border-card" style={{ padding: '1.1rem 1.35rem', background: 'rgba(18, 18, 30, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>💶 Среден бакшиш на сметка (€)</label>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff', background: 'rgba(16, 185, 129, 0.3)', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '0.2rem 0.75rem', borderRadius: '99px' }}>
                      €{avgTipPerCheck.toFixed(2)}
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="0.5"
                    className="modern-range-slider"
                    value={avgTipPerCheck}
                    onChange={(e) => setAvgTipPerCheck(parseFloat(e.target.value))}
                  />
                </div>

                {/* Daily Total Summary pill */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  <span>Общо обслужени маси дневно: <strong style={{ color: '#fff' }}>{dailyChecks} сметки</strong></span>
                  <span>Месечен брой: <strong style={{ color: '#fff' }}>{monthlyChecks.toLocaleString()} сметки</strong></span>
                </div>
              </div>
            </div>

            {/* Right High-Tech Result Stage Card */}
            <div className="glow-border-card" style={{ padding: '2.5rem', background: 'rgba(12, 12, 24, 0.95)', border: '1px solid rgba(139, 92, 246, 0.4)', boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 50px rgba(139,92,246,0.25)', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800, letterSpacing: '-0.01em' }}>Прогнозиран Месечен Ефект</h3>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--green)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '99px', border: '1px solid rgba(16, 185, 129, 0.35)', boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' }}>
                  ⚡ Възвръщаемост за 3 дни
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Месечни Бакшиши</span>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--green)', display: 'block', lineHeight: 1.1 }}>
                    +€{estimatedMonthlyTips.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.35rem', display: 'block' }}>онлайн бакшиш, през Apple Pay</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>Нови Google 5★ Отзива</span>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold)', display: 'block', lineHeight: 1.1 }}>
                    +{estimatedMonthlyReviews.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.35rem', display: 'block' }}>класиране в Google Maps</span>
                </div>
              </div>

              <div style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', padding: '1.15rem', fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)' }}>
                💡 <strong>Логика на изчислението:</strong> При <strong>{tablesCount} маси</strong> и средно <strong>{turnsPerTable} сметки/маса дневно</strong> ({monthlyChecks.toLocaleString()} сметки/месец), екипът Ви ще получава допълнително <strong>~€{estimatedMonthlyTips.toLocaleString()} бакшиши</strong>, а ресторантът Ви ще привлича нови гости с <strong>+{estimatedMonthlyReviews.toLocaleString()} нови 5-звездни отзива</strong> в Google Maps всеки месец!
              </div>

              <button className="btn ios-glass-btn-primary" style={{ width: '100%', padding: '1.05rem', fontSize: '1rem' }} onClick={onNavigateToCustomizer}>
                Започнете с вашия ресторант <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HARDWARE & CARD PREVIEW SECTION (TONE 2: RICH OBSIDIAN INDIGO) */}
      <section className="section-alt-indigo">
        <div style={{ padding: '0 4vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel mobile-stack" style={{ padding: '3.5rem 3vw', borderRadius: '32px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4vw', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Брандирани Продукти с Високо Качество</span>
              <h2 style={{ fontSize: '2.4rem', margin: '0.75rem 0 1rem', lineHeight: 1.2 }}>
                Изработени с премиум матово покритие и вграден NTAG213 чип.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Вашите карти и табели издържат на над 100,000 докосвания, водоустойчиви са и са брандирани с логото на вашия ресторант.
              </p>
              <button className="btn ios-glass-btn-primary" onClick={onNavigateToCustomizer}>
                Конфигурирай карти за ресторанта <ArrowRight size={18} />
              </button>
            </div>

            {/* 3D INTERACTIVE CARD SHOWCASE */}
            <div
              className="card-showcase-3d"
              style={{ display: 'flex', justifyContent: 'center', perspective: '1000px', cursor: 'grab' }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div style={{ 
                display: 'flex', 
                position: 'relative', 
                width: '340px', 
                height: '240px',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${cardRotateX + 10}deg) rotateY(${cardRotateY - 15}deg)`,
                transition: 'transform 0.15s ease-out'
              }}>
                <img 
                  src={`${import.meta.env.BASE_URL}card-front.png`} 
                  alt="Предна страна на NFC карта TipTap" 
                  style={{
                    width: '250px',
                    borderRadius: '16px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(139,92,246,0.4)',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    zIndex: 2
                  }}
                />
                <img 
                  src={`${import.meta.env.BASE_URL}card-back.png`} 
                  alt="Задна страна на NFC карта с QR код" 
                  style={{
                    width: '250px',
                    borderRadius: '16px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
                    transform: 'translateZ(-50px) translateX(60px) translateY(30px) rotateY(15deg)',
                    position: 'absolute',
                    right: '0',
                    bottom: '0',
                    zIndex: 1
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING SUBSCRIPTION PLANS (TONE 1: MIDNIGHT TITANIUM) */}
      <section className="section-alt-dark">
        <div style={{ padding: '0 4vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Прозрачни Абонаментни Планове</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Без скрити такси. Изберете плана, който отговаря на мащаба на вашето заведение.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* PLAN 1 */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Старт Ресторант</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>За малки заведения и кафенета</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                €15 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/месец</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> До 10 активни NFC карти</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Дигитален бакшиш (Apple/Google Pay)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Google Reviews автоматично насочване</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Базово администраторско табло</li>
              </ul>
              <button className="btn btn-secondary" style={{ marginTop: 'auto' }} onClick={onNavigateToCustomizer}>
                Избери Старт
              </button>
            </div>

            {/* PLAN 2 (RECOMMENDED PRO) */}
            <div className="glow-border-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '2px solid var(--accent-purple)', background: 'rgba(18, 18, 30, 0.85)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, var(--accent-purple) 0%, #06b6d4 100%)', padding: '0.25rem 0.85rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>
                НАЙ-ПОПУЛЯРЕН
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>PRO Ресторант</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>За средни и големи ресторанти</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }} className="text-gradient-purple">
                €29 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/месец</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> До 30 активни NFC карти &amp; Табелки</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Детайлна статистика за всеки сервитьор</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Приоритетно превеждане на бакшишите</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Персонализирано лого &amp; дизайн</li>
              </ul>
              <button className="btn ios-glass-btn-primary" style={{ marginTop: 'auto' }} onClick={onNavigateToCustomizer}>
                Започни PRO Пробност
              </button>
            </div>

            {/* PLAN 3 */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Premium Верига</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>За вериги заведения &amp; франчайзи</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                €49 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/месец</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Неограничен брой карти &amp; маси</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> API интеграция с ПОС системи</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Персонален акаунт мениджър</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> 24/7 Денонощна поддръжка</li>
              </ul>
              <button className="btn btn-secondary" style={{ marginTop: 'auto' }} onClick={onNavigateToCustomizer}>
                Свържи се за Вериги
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OWNER TESTIMONIALS & FAQ (TONE 2: RICH OBSIDIAN INDIGO) */}
      <section className="section-alt-indigo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '0 4vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
          {/* Testimonials */}
          <div>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Доверено от Ресторантьори в България</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Вижте какво споделят собствениците на заведения за TipTap.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--gold)' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--gold)" />)}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, italic: 'true' }}>
                  "Откакто сложихме NFC картите в сметките, Google отзивите ни скочиха с над 300%. Клиентите са във възторг, че могат да платят бакшиш с телефона си."
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Димитър Василев</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Управител, Ресторант Леденика</span>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--gold)' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--gold)" />)}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, italic: 'true' }}>
                  "Бакшишите на персонала ни се увеличиха с 35%. Вече не се случва клиент да каже 'Нямам монети в брой' – просто докосва с Apple Pay."
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Елена Стоянова</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Собственик, Bistro Central</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
