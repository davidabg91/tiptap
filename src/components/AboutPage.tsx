import React, { useState } from 'react';
import {
  CustomArrowRight as ArrowRight,
  CustomSend as Send,
  CustomCheckCircle as CheckCircle,
  CustomSmartphone as Phone,
  CustomMapPin as MapPin,
  CustomMessageSquare as MessageSquare,
  IconNfcChip,
  IconVipWaiters,
  IconEuroChip,
  IconSmartRadar,
  IconHandChart,
  IconHandShieldStar,
  IconHandTipCard,
} from './CustomIcons';

interface AboutPageProps {
  onNavigateToCustomizer: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToCustomizer }) => {
  const [form, setForm] = useState({ name: '', contact: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) return;
    // Mock submit — in a real backend this would POST the inquiry.
    setSubmitted(true);
  };

  const offerings = [
    { icon: <IconNfcChip size={26} color="#a78bfa" />, title: 'NFC карти & QR табелки', text: 'Брандирани безконтактни карти за сметкодържача и елегантни настолни табелки за всяка маса.' },
    { icon: <IconEuroChip size={26} color="#a78bfa" />, title: 'Дигитални бакшиши', text: 'Клиентите оставят бакшиш за секунди през Apple Pay и Google Pay — без кеш, без приложение.' },
    { icon: <IconVipWaiters size={26} color="#a78bfa" />, title: 'Оценка на сервитьорите', text: 'Реални оценки от гостите за всеки член на екипа, с детайлна статистика в админ таблото.' },
    { icon: <IconSmartRadar size={26} color="#a78bfa" />, title: 'Google 5★ отзиви', text: 'Доволните гости се насочват автоматично към Google Maps, а негативните — към скрит админ чат.' },
  ];

  const benefits = [
    { icon: <IconHandShieldStar size={30} color="#a78bfa" />, title: 'Защита на репутацията', text: 'Прихващате недоволството преди да стигне до Google и решавате проблема на момента.' },
    { icon: <IconHandChart size={30} color="#a78bfa" />, title: 'Пълна прозрачност', text: 'Виждате в реално време как се представя всеки сервитьор и цялото заведение.' },
    { icon: <IconHandTipCard size={30} color="#a78bfa" />, title: 'Мотивиран екип', text: 'По-високите бакшиши и справедливата бонус система задържат добрите служители.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

      {/* HERO / MISSION */}
      <section className="section-alt-dark hero-grid-pattern" style={{ padding: '4rem 4vw 4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="bg-glow-purple" style={{ top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}></div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.35)',
            padding: '0.4rem 1.1rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800,
            color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '0.5px', position: 'relative', zIndex: 1
          }}>
            За нас
          </div>
          <h1 style={{
            fontFamily: 'var(--font-official)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700,
            lineHeight: 1.2, color: '#ffffff', margin: '0 0 1.25rem', position: 'relative', zIndex: 1
          }}>
            Технология, създадена за българския ресторант
          </h1>
          <p className="font-casual-friendly" style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <strong>TipTap</strong> е българска платформа, която съчетава NFC хардуер и интелигентен софтуер,
            за да помогне на ресторантите да подобрят обслужването, да съберат повече 5-звездни Google отзиви
            и да увеличат бакшишите на своя екип — без клиентът да сваля никакво приложение.
          </p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section-alt-indigo">
        <div style={{ padding: '0 4vw', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-official)', fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              Какво предлагаме
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Едно цялостно решение — от физическата карта до анализите за управителя.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {offerings.map((o) => (
              <div key={o.title} className="glow-border-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(14, 14, 26, 0.85)' }}>
                {o.icon}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{o.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR GOAL */}
      <section className="section-alt-dark">
        <div style={{ padding: '0 4vw', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel" style={{ padding: '3rem 3vw', borderRadius: '28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="bg-glow-cyan" style={{ bottom: '-30%', right: '-10%', opacity: 0.25 }}></div>
            <span style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Нашата цел</span>
            <h2 style={{ fontFamily: 'var(--font-official)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, color: '#fff', margin: '0.75rem 0 1rem', lineHeight: 1.3, position: 'relative', zIndex: 1 }}>
              Всеки ресторант да има прозрачност, отлична репутация и щастлив екип.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              Вярваме, че доброто обслужване заслужава да бъде видяно и възнаградено. Затова изградихме инструмент,
              който дава на управителите реален контрол върху качеството, а на сервитьорите — заслужено признание и бакшиши.
            </p>
          </div>
        </div>
      </section>

      {/* BUSINESS BENEFITS */}
      <section className="section-alt-indigo">
        <div style={{ padding: '0 4vw', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-official)', fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              Предимства за вашия бизнес
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Защо стотици ресторантьори избират TipTap.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {benefits.map((b) => (
              <div key={b.title} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {b.icon}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{b.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{b.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn ios-glass-btn-primary" style={{ padding: '1rem 2.2rem', fontSize: '1rem' }} onClick={onNavigateToCustomizer}>
              Поръчай карти за твоя обект <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* TEAM + CONTACT FORM */}
      <section id="about-contact" className="section-alt-dark">
        <div style={{ padding: '0 4vw', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel mobile-stack" style={{ padding: '3rem 3vw', borderRadius: '28px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3vw', alignItems: 'start' }}>

            {/* Left: contact info / team */}
            <div>
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Свържете се с нас</span>
              <h2 style={{ fontFamily: 'var(--font-official)', fontSize: '1.9rem', fontWeight: 700, color: '#fff', margin: '0.6rem 0 1rem', lineHeight: 1.25 }}>
                Имате въпрос? Пишете ни.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                Оставете вашето запитване и ще се свържем с вас възможно най-скоро. Ще се радваме да ви покажем как TipTap работи за вашето заведение.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconVipWaiters size={20} color="#a78bfa" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff' }}>Дейвид Димитров</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Управител</div>
                  </div>
                </div>

                <a href="tel:0876141826" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} color="var(--green)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff' }}>0876 141 826</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Обадете се директно</div>
                  </div>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff' }}>София, България</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Покритие в цялата страна</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: inquiry form */}
            <div className="glow-border-card" style={{ padding: '2rem', background: 'rgba(12, 12, 24, 0.9)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={34} color="var(--green)" />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>Благодарим ви!</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '360px' }}>
                    Вашето запитване е получено. Ще се свържем с вас на посочения контакт възможно най-скоро.
                  </p>
                  <button className="btn btn-secondary" style={{ marginTop: '0.5rem' }} onClick={() => { setSubmitted(false); setForm({ name: '', contact: '', subject: '', message: '' }); }}>
                    Изпрати ново запитване
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <MessageSquare size={20} color="#a78bfa" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>Форма за запитване</h3>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Вашето име *</label>
                    <input className="input-field" type="text" placeholder="Име и фамилия" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Телефон или имейл *</label>
                    <input className="input-field" type="text" placeholder="Как да се свържем с вас" value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })} required />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Тема</label>
                    <input className="input-field" type="text" placeholder="Напр. Поръчка за ресторант / Въпрос за цени" value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Вашето съобщение / въпрос *</label>
                    <textarea className="input-field" rows={5} placeholder="Разкажете ни за вашето заведение или задайте въпроса си..." value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })} required
                      style={{ resize: 'vertical', minHeight: '110px', fontFamily: 'var(--font-body)' }} />
                  </div>

                  <button type="submit" className="btn ios-glass-btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.25rem' }}>
                    Изпрати запитване <Send size={17} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
