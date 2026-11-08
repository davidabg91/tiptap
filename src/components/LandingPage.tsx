import React, { useState } from 'react';
import { CustomerRating } from './CustomerRating';
import { FeatureBento } from './FeatureBento';
import { PlanIncludes } from './PlanIncludes';
import { Faq } from './Faq';
import { PhoneHomeScreen, BrowserGlyph } from './PhoneHomeScreen';
import {
  CustomArrowRight as ArrowRight,
  CustomCheckCircle as CheckCircle,
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      
      {/* SECTION 1: HERO SECTION (TONE 1: MIDNIGHT TITANIUM) */}
      <section className="section-alt-dark hero-grid-pattern hero-section">
        <div className="mobile-stack hero-grid">
          
          {/* Glow Effects */}
          <div className="bg-glow-purple" style={{ top: '-10%', left: '-5%', opacity: 0.35 }}></div>
          <div className="bg-glow-cyan" style={{ bottom: '0%', right: '10%', opacity: 0.25 }}></div>

          {/* Hero Left Content */}
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              NFC карти за оценки и бакшиши
            </span>

            <h1 className="hero-headline">
              Вижте в реално време <br className="hero-br" />
              как работи <br className="hero-br" />
              <span className="hero-headline-accent">вашият персонал.</span>
            </h1>

            <p className="hero-lead">
              Гостите оценяват обслужването с едно докосване на NFC карта — без приложение.
              Вие виждате представянето на всеки сервитьор, реагирате навреме на недоволството
              и мотивирате екипа.
            </p>

            <div className="hero-actions">
              <button className="hero-cta hero-cta--primary" onClick={onNavigateToCustomizer}>
                Поръчайте NFC карти
                <ArrowRight size={18} className="hero-cta-arrow" />
              </button>
              <button className="hero-cta hero-cta--secondary" onClick={onNavigateToDashboard}>
                Вижте демото
              </button>
            </div>

            <ul className="hero-trust">
              <li><CheckCircle size={16} color="#a78bfa" /> Без приложение за госта</li>
              <li><CheckCircle size={16} color="#a78bfa" /> iPhone и Android</li>
              <li><CheckCircle size={16} color="#a78bfa" /> Без обвързващ договор</li>
            </ul>

            <div className="hero-features">
              <div className="hero-feature">
                <span className="hero-feature-icon"><IconHandShieldStar size={22} color="#c4b5fd" /></span>
                <div>
                  <span className="hero-feature-title">Известие при 1–2★</span>
                  <span className="hero-feature-text">В Telegram или по имейл, докато гостът е още на масата</span>
                </div>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon"><IconHandTipCard size={22} color="#c4b5fd" /></span>
                <div>
                  <span className="hero-feature-title">Бакшиш без посредник</span>
                  <span className="hero-feature-text">Директно по сметката на сервитьора, 0% комисиона</span>
                </div>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon"><IconHandChart size={22} color="#c4b5fd" /></span>
                <div>
                  <span className="hero-feature-title">Пълна картина</span>
                  <span className="hero-feature-text">Сканирания, оценки и класация на екипа в реално време</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Content: 3D NFC Scan Animation Stage */}
          <div className="hero-visual">

            {/* SMARTPHONE FRAME — zIndex above card */}
            <div className="floating-phone-container" style={{ position: 'relative', zIndex: 2 }}>
              <div className="try-me-badge">
                <span className="pulse-dot"></span>
                <span>Пробвай ме!</span>
              </div>

              {/* NFC tap — the real printed card slips behind the phone and taps its antenna */}
              <div className="tap-stage" aria-hidden="true">
                <div className="tap-card">
                  <div className="tap-card-edge" />
                  <div className="tap-card-edge tap-card-edge--mid" />
                  <div
                    className="tap-card-face"
                    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}card-front-hero.webp)` }}
                  >
                    <span className="tap-card-sheen" />
                  </div>
                </div>
                {/* NFC field — drawn over the card so it reads as light */}
                <div className="tap-field">
                  <span className="tap-ring" />
                  <span className="tap-ring" />
                  <span className="tap-ring" />
                </div>
              </div>

              {/* Phone frame */}
              <div className="titanium-phone-frame" style={{ position: 'relative', zIndex: 1 }}>
                <div className="dynamic-island">
                  <div className="dynamic-island-camera"></div>
                  <div className="dynamic-island-sensor"></div>
                  <div className="island-live" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M8.5 8.5a5 5 0 0 1 0 7" stroke="#c4b5fd" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M12 5.5a9.5 9.5 0 0 1 0 13" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M15.5 3a13.5 13.5 0 0 1 0 18" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" />
                      <circle cx="5" cy="12" r="1.6" fill="#c4b5fd" />
                    </svg>
                    <svg className="island-check" width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" fill="#22c55e" />
                      <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Before the tap the guest is on the home screen */}
                <PhoneHomeScreen />

                <div className="tap-screen-glow" aria-hidden="true" />
                {/* What the phone shows when it reads the card: open the link in the browser */}
                <div className="tap-banner" aria-hidden="true">
                  <span className="tap-banner-icon"><BrowserGlyph /></span>
                  <div className="tap-banner-body">
                    <div className="tap-banner-meta"><span>NFC етикет</span><span>сега</span></div>
                    <strong>Отворете tiptap.bg</strong>
                    <span className="tap-banner-sub">Оценете обслужването · Мария Г.</span>
                  </div>
                </div>
                <span className="tap-touch" aria-hidden="true" />

                {/* The rating page, opened in the browser — no app needed */}
                <div className="phone-app">
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

                  <div className="phone-url" aria-hidden="true">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                      <path d="M2 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 10 6.5v4A1.5 1.5 0 0 1 8.5 12h-7A1.5 1.5 0 0 1 0 10.5v-4A1.5 1.5 0 0 1 1.5 5zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0z" />
                    </svg>
                    tiptap.bg
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', paddingTop: '0.5rem', position: 'relative' }} className="phone-screen">
                    <CustomerRating
                      demo
                      initialWaiterId="waiter-2"
                      onReviewSubmitted={() => setDemoReviewCount(demoReviewCount + 1)}
                    />
                  </div>
                </div>
                <div style={{ height: '5px', width: '110px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', margin: '8px auto', zIndex: 10 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS — four steps, each with a small illustration */}
      <section className="section-alt-indigo">
        <div className="landing-container">
          <div className="section-head">
            <span className="section-eyebrow">Как работи</span>
            <h2 className="section-title">Четири стъпки. <br className="hero-br" />Без приложение. Без обучение.</h2>
            <p className="section-lead">
              Гостът докосва картата, която идва със сметката, оценява обслужването и при желание
              оставя бакшиш. Вие виждате всичко в таблото си.
            </p>
          </div>

          <ol className="steps-grid">
            <li className="step-card">
              <div className="step-visual" aria-hidden="true">
                <div className="mini-receipt">
                  <span className="mini-receipt-title">Сметка · Маса 7</span>
                  <i /><i /><i />
                  <b>Общо <em>€48,50</em></b>
                </div>
                <img className="mini-card" src={`${import.meta.env.BASE_URL}card-front-hero.webp`} alt="" />
              </div>
              <div className="step-body">
                <span className="step-index">01</span>
                <h3>Картата идва със сметката</h3>
                <p>Сервитьорът оставя своята NFC карта в папката със сметката. Всяка карта е свързана с конкретен човек от екипа.</p>
              </div>
            </li>

            <li className="step-card">
              <div className="step-visual" aria-hidden="true">
                <span className="mini-wave" /><span className="mini-wave" /><span className="mini-wave" />
                <div className="mini-phone">
                  <span className="mini-phone-notch" />
                  <span className="mini-phone-stars">★★★★★</span>
                  <span className="mini-phone-line" />
                  <span className="mini-phone-line mini-phone-line--short" />
                  <span className="mini-phone-btn" />
                </div>
              </div>
              <div className="step-body">
                <span className="step-index">02</span>
                <h3>Гостът докосва с телефона</h3>
                <p>Страницата за оценка се отваря веднага — без приложение и без регистрация. Без NFC работи и QR кодът на гърба.</p>
              </div>
            </li>

            <li className="step-card">
              <div className="step-visual" aria-hidden="true">
                <div className="mini-rate">
                  <span className="mini-stars">★★★★★</span>
                  <div className="mini-chips">
                    <span>Любезен</span><span>Бърз</span><span>Точен</span>
                  </div>
                  <div className="mini-chips">
                    <span>€2</span><span className="is-on">€5</span><span>€10</span>
                  </div>
                </div>
              </div>
              <div className="step-body">
                <span className="step-index">03</span>
                <h3>Оценка и бакшиш за секунди</h3>
                <p>Гостът избира звезди, отбелязва какво му е харесало и при желание оставя бакшиш — директно по сметката на сервитьора.</p>
              </div>
            </li>

            <li className="step-card">
              <div className="step-visual" aria-hidden="true">
                <div className="mini-dash">
                  <span className="mini-toast">Нова оценка · ★★★★★</span>
                  <div className="mini-dash-head">
                    <span className="mini-avatar">МГ</span>
                    <div>
                      <strong>Мария Г.</strong>
                      <span>Сервитьор</span>
                    </div>
                    <em>4,9 ★</em>
                  </div>
                  <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                </div>
              </div>
              <div className="step-body">
                <span className="step-index">04</span>
                <h3>Вие виждате всичко</h3>
                <p>Оценките и коментарите за всеки сервитьор са в таблото ви веднага, а при 1–2★ получавате известие в Telegram или по имейл.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* SECTION 3: ONE UNHAPPY GUEST, TWO ENDINGS — the case for owners */}
      <section className="section-alt-dark">
        <div className="landing-container">
          <div className="section-head">
            <span className="section-eyebrow">Защо TipTap</span>
            <h2 className="section-title">Един недоволен гост. Два различни края.</h2>
            <p className="section-lead">
              Петък вечер, пълен салон. Гостът на маса 7 чака сметката си 25 минути.
              Ето какво се случва след това.
            </p>
          </div>

          <div className="endings-grid">
            <article className="ending ending--without">
              <header>
                <span className="ending-tag">Без TipTap</span>
                <h3>Научавате, когато е късно</h3>
              </header>
              <ol className="ending-timeline">
                <li>
                  <time>21:30</time>
                  <div>
                    <strong>Гостът плаща и си тръгва раздразнен.</strong>
                    <span>Никой в заведението не разбира защо.</span>
                  </div>
                </li>
                <li>
                  <time>22:10</time>
                  <div>
                    <strong>Публикува отзив с 1★ в Google.</strong>
                    <span>„Чакахме сметката половин час.“ Ще го прочете всеки бъдещ гост.</span>
                  </div>
                </li>
                <li>
                  <time>след седмица</time>
                  <div>
                    <strong>Вие го виждате.</strong>
                    <span>Не знаете кой сервитьор е бил, нито какво точно се е случило.</span>
                  </div>
                </li>
              </ol>
              <p className="ending-result ending-result--bad">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Изгубен гост и отзив в Google, който остава.
              </p>
            </article>

            <article className="ending ending--with">
              <header>
                <span className="ending-tag">С TipTap</span>
                <h3>Научавате, докато гостът е още тук</h3>
              </header>
              <ol className="ending-timeline">
                <li>
                  <time>21:30</time>
                  <div>
                    <strong>Гостът докосва картата и дава 2★.</strong>
                    <span>„Чакахме сметката 25 минути.“</span>
                  </div>
                </li>
                <li>
                  <time>21:31</time>
                  <div>
                    <strong>Получавате известие в Telegram.</strong>
                    <span>С името на сервитьора и коментара на госта.</span>
                  </div>
                </li>
                <li>
                  <time>21:35</time>
                  <div>
                    <strong>Управителят отива на масата.</strong>
                    <span>Извинява се, а гостът получава ваучер за десерт при следващото посещение.</span>
                  </div>
                </li>
                <li>
                  <time>на другия ден</time>
                  <div>
                    <strong>Говорите с екипа с конкретен пример.</strong>
                    <span>Не с предположения.</span>
                  </div>
                </li>
              </ol>
              <p className="ending-result ending-result--good">
                <CheckCircle size={18} color="currentColor" />
                Спасен гост и по-добро обслужване още от следващата смяна.
              </p>
            </article>
          </div>

          <div className="endings-cta">
            <button className="hero-cta hero-cta--primary" onClick={onNavigateToDashboard}>
              Вижте демо таблото
              <ArrowRight size={18} className="hero-cta-arrow" />
            </button>
            <button className="hero-cta hero-cta--secondary" onClick={onNavigateToCustomizer}>
              Поръчайте NFC карти
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3b: EVERYTHING YOU GET — all features in one grid */}
      <section className="section-alt-indigo" id="features">
        <div className="landing-container is-wide">
          <div className="section-head">
            <span className="section-eyebrow">Функции</span>
            <h2 className="section-title">Всичко, което получавате с TipTap</h2>
            <p className="section-lead">
              Карти, табло и известия в един пакет — без приложение за гостите и без обучение за екипа.
            </p>
          </div>
          <FeatureBento />
        </div>
      </section>

      {/* SECTION 4: HARDWARE & CARD PREVIEW SECTION */}
      <section className="section-alt-dark">
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

      {/* SECTION 5: PRICING SUBSCRIPTION PLANS */}
      <section className="section-alt-indigo" id="plans">
        <div style={{ padding: '0 4vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div className="section-head">
            <span className="section-eyebrow">Цени</span>
            <h2 className="section-title">Прозрачни абонаментни планове</h2>
            <p className="section-lead">14 дни безплатно, без скрити такси и без обвързващ договор. После изберете плана според мащаба на заведението.</p>
          </div>

          <PlanIncludes />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '920px', margin: '0 auto' }}>
            {/* PLAN 1: START */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>План „Старт“</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>За кафенета, барове и малки ресторанти</p>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                  €19.99 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/месец</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>или €15.99/месец при годишно плащане</p>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> До 10 сервитьорски профила</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Табло с оценки, фуния и класация на екипа</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Google отзиви с едно докосване</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Поддръжка по имейл</li>
              </ul>
              <button className="btn btn-secondary" style={{ marginTop: 'auto' }} onClick={onNavigateToCustomizer}>
                Избери Старт
              </button>
            </div>

            {/* PLAN 2: PREMIUM (RECOMMENDED) */}
            <div className="glow-border-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '2px solid var(--accent-purple)', background: 'rgba(18, 18, 30, 0.85)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, var(--accent-purple) 0%, #06b6d4 100%)', padding: '0.25rem 0.85rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>
                НАЙ-ПОПУЛЯРЕН
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>План „Премиум“</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>За средни и големи ресторанти и вериги</p>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800 }} className="text-gradient-purple">
                  €39.99 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/месец</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>или €31.99/месец при годишно плащане</p>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Неограничен брой сервитьори и обекти</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Подробна статистика и експорт в Excel</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Общ преглед на всички обекти</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Карти с вашето лого и дизайн</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} color="var(--green)" /> Персонален акаунт мениджър</li>
              </ul>
              <button className="btn ios-glass-btn-primary" style={{ marginTop: 'auto' }} onClick={onNavigateToCustomizer}>
                Избери Премиум
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="section-alt-dark" id="faq">
        <div className="landing-container">
          <div className="section-head">
            <span className="section-eyebrow">Въпроси и отговори</span>
            <h2 className="section-title">Всичко, което питат управителите</h2>
            <p className="section-lead">Не намирате отговор? Пишете ни — отговаряме в рамките на работния ден.</p>
          </div>
          <Faq />
        </div>
      </section>
    </div>
  );
};
