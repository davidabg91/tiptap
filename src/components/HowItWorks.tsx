import React, { useState } from 'react';
import { 
  CustomStar as Star, 
  CustomTrendingUp as TrendingUp, 
  CustomAward as Award, 
  CustomCheckCircle as CheckCircle2, 
  CustomDollarSign as DollarSign, 
  CustomUsers as Users, 
  CustomZap as Zap, 
  CustomShieldCheck as ShieldCheck, 
  CustomSmartphone as Smartphone, 
  CustomArrowRight as ArrowRight,
  CustomQrCode as QrCode,
  CustomMessageSquare as MessageSquare
} from './CustomIcons';
import { 
  IconCyberAnalytics, IconVipWaiters, IconEuroChip, IconSmartRadar, 
  IconCyberQr, IconPrismStar, IconNfcChip 
} from './CustomIcons';
import { RemotionFeatureShowcase } from './RemotionFeatureShowcase';
import { ModernFeatureGrid } from './ModernFeatureGrid';

interface HowItWorksProps {
  onNavigateToCustomizer: () => void;
  onNavigateToDashboard: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ 
  onNavigateToCustomizer, 
  onNavigateToDashboard 
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Bonus Calculator Interactive State
  const [waiterCount, setWaiterCount] = useState<number>(8);
  const [reviewBonus, setReviewBonus] = useState<number>(2.50); // € per 5-star review
  const [avgChecksPerDay, setAvgChecksPerDay] = useState<number>(120);

  // Calculated estimates
  const estimatedReviewsMonth = Math.round(avgChecksPerDay * 30 * 0.08); // 8% review conversion
  const totalBonusPool = Math.round(estimatedReviewsMonth * reviewBonus);
  const estimatedTipIncrease = Math.round(avgChecksPerDay * 30 * 0.30 * 3.50); // 30% leave tip avg 3.50 €

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '4rem', paddingBottom: '4rem' }}>
      
      {/* SECTION 1: HERO HEADER & SYSTEM VISION */}
      <section className="section-alt-dark hero-grid-pattern" style={{ padding: '4rem 4vw 3rem', borderRadius: '0 0 32px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          
          <div className="bg-glow-purple" style={{ top: '-20%', left: '30%', opacity: 0.35 }}></div>
          <div className="bg-glow-cyan" style={{ bottom: '-10%', right: '20%', opacity: 0.25 }}></div>

          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(245, 158, 11, 0.15)', 
            border: '1px solid rgba(245, 158, 11, 0.4)', 
            padding: '0.4rem 1rem', 
            borderRadius: '99px',
            marginBottom: '1rem'
          }}>
            <IconPrismStar size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Контролен Панел &amp; Оценка на Персонала
            </span>
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 1.15, marginBottom: '1.2rem' }}>
            Как Работи <span className="text-gradient-purple">TipTap</span>: Пълна Видимост за Управителя<br />
            върху Представянето на Персонала
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '820px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Определете точно кой сервитьор обслужва най-добре, контролирайте репутацията на заведението и намерете слабостите в сервиза. Преките отзиви от гостите дават на управителя <strong>100% обективна оценка</strong> и възможност за изграждане на справедлива бонус система.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn ios-glass-btn-primary" style={{ padding: '1rem 2.2rem' }} onClick={onNavigateToCustomizer}>
              Поръчай NFC Карти <ArrowRight size={18} />
            </button>
            <button className="btn ios-glass-btn-secondary" style={{ padding: '1rem 2.2rem' }} onClick={onNavigateToDashboard}>
              Тествай Демо за Управители
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: OPERATIONAL CARTOON ANIMATION & DETAILED FLOW */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 2vw', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* DETAILED OPERATIONAL EXPLANATION CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          
          {/* Card Option A: Bill Holder Card */}
          <div className="glow-border-card" style={{ padding: '2.2rem', background: 'rgba(14, 14, 26, 0.9)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem' }}>💳</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                Вариант 1: С NFC Карта в Сметкодържача
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              При сервиране на сметката сервитьорът поднася кожения/метален сметкодържач на гостите. Заедно с хартиения бон, вътре е поставена луксозната брандирана TipTap NFC карта.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1.2rem', color: '#fff', fontSize: '0.88rem' }}>
              <li><strong>Отваряне:</strong> Клиентът отваря сметкодържача и вижда картата до бележката.</li>
              <li><strong>Докосване:</strong> Доближава телефона си до NFC картата (под 1 сек).</li>
              <li><strong>Резултат:</strong> Отваря се форма за оценка на сервитьора и 5★ отзив.</li>
            </ul>
          </div>

          {/* Card Option B: Table Stand */}
          <div className="glow-border-card" style={{ padding: '2.2rem', background: 'rgba(14, 14, 26, 0.9)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem' }}>📌</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                Вариант 2: С Настолна Табелка на Масата
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              Табелката стои постоянно фиксирана на масата, на бар плота или на рецепцията. Гостите имат 24/7 достъп до нея по време на целия си престой.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '1.2rem', color: '#fff', fontSize: '0.88rem' }}>
              <li><strong>Постоянно намерение:</strong> Стои елегантно на масата без да пречи.</li>
              <li><strong>NFC &amp; QR:</strong> Сканиране с камера или докосване с телефон.</li>
              <li><strong>Резултат:</strong> Перфектна за бързи отзиви и онлайн менюта.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* SECTION 3: SYSTEM FEATURE GRID */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 2vw', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
            4-те Основно Стъпки на Интелигентния Процес
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', margin: '0.4rem auto 0' }}>
            Прегледайте как безконтактното докосване, оценката за сервитьора, Google Maps отзивите и бонус системата работят в синхрон.
          </p>
        </div>

        <RemotionFeatureShowcase />

        <ModernFeatureGrid />
      </section>

      {/* SECTION 3: BENEFICIAL FEATURES FOR MANAGERS VS WAITERS */}
      <section className="section-alt-indigo" style={{ padding: '5rem 4vw' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
              Как TipTap Помага на Управителите и Сервитьорите
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Печеливша комбинация за перфектно обслужване и по-високи приходи
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            
            {/* CARD 1: FOR MANAGERS */}
            <div className="glow-border-card" style={{ padding: '2.2rem', background: 'rgba(14, 14, 26, 0.85)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid var(--accent-purple)' }}>
                  <IconCyberAnalytics size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>За Управители &amp; Собственици</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 700 }}>Пълен Контрол &amp; Ръст на Бизнеса</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="var(--accent-purple)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Автоматичен Ръст на Google 5★ Ревюта</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Увеличете с до 300% положителните отзиви в Google Maps и класирайте заведението на челните места в града.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="var(--accent-purple)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Щит Защита Срещу Негативни Оценки</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Критичните отзиви остават скрити и се изпращат само до управителя, давайки ви възможност да реагирате веднага.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="var(--accent-purple)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Прозрачна Статистика за Всеки Сервитьор</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Следете в реално време кой сервитьор има най-висок рейтинг, най-много сметки и най-доволни клиенти.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="var(--accent-purple)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Лесна Настройка на Бонус План</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Задайте месечни цели за ревюта и рейтинги и възнаграждавайте най-добрите служители без субективност.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: FOR WAITERS */}
            <div className="glow-border-card" style={{ padding: '2.2rem', background: 'rgba(14, 14, 26, 0.85)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b' }}>
                  <IconVipWaiters size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>За Сервитьорите &amp; Екипа</h3>
                  <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>Мотивация &amp; По-Висок Доход</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="#f59e0b" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>+40% Повече Дигитални Бакшиши</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Безконтактното плащане през Apple/Google Pay улеснява гостите без бройни пари да оставят по-голям бакшиш.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="#f59e0b" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Лично Признание &amp; Комплименти</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Сервитьорите виждат пердонализираните си звезди и похвали от клиентите, което изключително ги мотивира.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="#f59e0b" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>100% Честно &amp; Прозрачно Разпределение</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Всеки бакшиш и ревю е свързано точно с личния профил/карта на сервитьора без грешки и съмнения.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <CheckCircle2 color="#f59e0b" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Бързи Автоматични Изплащания</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>В края на смяната или седмицата набраният бакшиш се превежда директно по сметката на сервитьора.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: EXECUTIVE STAFF EVALUATION & BONUS PANEL */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 2vw' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(14, 14, 28, 0.95) 0%, rgba(20, 18, 40, 0.95) 100%)',
          border: '1.5px solid rgba(139, 92, 246, 0.5)',
          borderRadius: '32px',
          padding: '3.5rem 3rem',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 45px rgba(139, 92, 246, 0.22)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="bg-glow-purple" style={{ top: '-30%', right: '-10%', opacity: 0.3 }}></div>
          <div className="bg-glow-cyan" style={{ bottom: '-30%', left: '-10%', opacity: 0.2 }}></div>

          {/* Panel Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
            {/* PURE CRISP EXECUTIVE TYPOGRAPHY OVERVIEW TITLE */}
            <div style={{ marginBottom: '0.8rem' }}>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: 900, 
                letterSpacing: '1.5px', 
                textTransform: 'uppercase',
                color: 'var(--green)'
              }}>
                ИНТЕРАКТИВЕН ОДИТ ЗА УПРАВИТЕЛИ • РЕАЛЕН АНАЛИЗ НА СЕРВИЗА
              </span>
            </div>

            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: 0 }}>
              Вижте как добрите отзиви мотивират сервитьорите
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.08rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Задайте параметрите на вашето заведение и вижте с колко ще нарстнат отзивите и мотивацията на сервиза.
            </p>
          </div>

          {/* 2-Column Dashboard Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            
            {/* Left Column: Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Slider 1: Waiter Count */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', padding: '1.25rem 1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                    👥 Брой сервитьори в заведението
                  </label>
                  <span style={{ 
                    fontWeight: 900, 
                    color: 'var(--accent-purple)', 
                    fontSize: '1rem',
                    background: 'rgba(139, 92, 246, 0.18)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '99px'
                  }}>
                    {waiterCount} Сервитьора
                  </span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={waiterCount}
                  onChange={(e) => setWaiterCount(parseInt(e.target.value))}
                  className="modern-range-slider"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Slider 2: Average Daily Checks */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', padding: '1.25rem 1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                    🍽️ Дневен поток (Среден брой сметки)
                  </label>
                  <span style={{ 
                    fontWeight: 900, 
                    color: 'var(--accent-cyan)', 
                    fontSize: '1rem',
                    background: 'rgba(6, 182, 212, 0.18)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '99px'
                  }}>
                    {avgChecksPerDay} Сметки / ден
                  </span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="400" 
                  step="10"
                  value={avgChecksPerDay}
                  onChange={(e) => setAvgChecksPerDay(parseInt(e.target.value))}
                  className="modern-range-slider"
                  style={{ width: '100%' }}
                />
              </div>

              {/* Slider 3: Review Bonus */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', padding: '1.25rem 1.5rem', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                    ⭐ Месечен стимул за 5★ Google отзив
                  </label>
                  <span style={{ 
                    fontWeight: 900, 
                    color: '#f59e0b', 
                    fontSize: '1rem',
                    background: 'rgba(245, 158, 11, 0.18)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '99px'
                  }}>
                    €{reviewBonus.toFixed(2)} / ревю
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0.50" 
                  max="10.00" 
                  step="0.50"
                  value={reviewBonus}
                  onChange={(e) => setReviewBonus(parseFloat(e.target.value))}
                  className="modern-range-slider"
                  style={{ width: '100%' }}
                />
              </div>

            </div>

            {/* Right Column: Results Dashboard Box */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(12, 12, 26, 0.98) 0%, rgba(18, 16, 38, 0.98) 100%)',
              border: '1.5px solid rgba(139, 92, 246, 0.45)',
              borderRadius: '24px',
              padding: '2.2rem 2rem',
              boxShadow: '0 15px 45px rgba(0,0,0,0.7)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  📈 Прогнозирани Резултати
                </h3>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--green)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                  АКТИВЕН АНАЛИЗ
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Metric 1 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Прогнозирани Google 5★ Ревюта:</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Автоматичен отзив от доволните гости</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>
                    +{estimatedReviewsMonth} / мес.
                  </span>
                </div>

                {/* Metric 2 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Допълнителни Приходи за Екипа:</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Безконтактен бакшиш от гостите</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--green)' }}>
                    +€{estimatedTipIncrease}
                  </span>
                </div>

                {/* Metric 3 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Общ Бонус Фонд за Качество:</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Награда за най-добрите оценки</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-purple)' }}>
                    €{totalBonusPool}
                  </span>
                </div>

              </div>

              <div style={{ marginTop: '2rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', justifyContent: 'center' }}
                  onClick={onNavigateToCustomizer}
                >
                  Поръчай NFC Карти за Твоя Обект <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CALL TO ACTION */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 2vw', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3.5rem 2rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1.5px solid var(--accent-purple)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: '0.8rem' }}>
            Готови ли сте да Мотивирате Вашия Екип?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
            Присъединете се към водещите заведения в България, които изградиха успешна култура на обслужване с TipTap.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn ios-glass-btn-primary" style={{ padding: '1rem 2.2rem' }} onClick={onNavigateToCustomizer}>
              Персонализирай NFC Карти <ArrowRight size={18} />
            </button>
            <button className="btn ios-glass-btn-secondary" style={{ padding: '1rem 2.2rem' }} onClick={onNavigateToDashboard}>
              Прегледай Демо за Управители
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

const EuroChipIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.5 15.5H10.5C9.67 15.5 9 14.83 9 14V13H14V11H9V10C9 9.17 9.67 8.5 10.5 8.5H14.5V7H10.5C8.84 7 7.5 8.34 7.5 10V11H6V13H7.5V14C7.5 15.66 8.84 17 10.5 17H14.5V15.5Z" fill="#10b981"/>
  </svg>
);
