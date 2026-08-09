import React, { useState, useEffect } from 'react';
import { CustomStar as Star, CustomCheckCircle as CheckCircle2 } from './CustomIcons';

export const CartoonRestaurantShowcase: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-play movie sequence (5 seconds per scene)
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(135deg, #0d0c1d 0%, #15122b 50%, #0c0b18 100%)',
      border: '2px solid rgba(139, 92, 246, 0.45)',
      borderRadius: '32px',
      boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(139, 92, 246, 0.25)',
      overflow: 'hidden',
      position: 'relative',
      padding: '2.5rem 2rem 2rem'
    }}>
      <div className="bg-glow-purple" style={{ top: '-30%', left: '10%', opacity: 0.35 }}></div>
      <div className="bg-glow-cyan" style={{ bottom: '-30%', right: '10%', opacity: 0.25 }}></div>

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '1.8rem', position: 'relative', zIndex: 5 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          padding: '0.35rem 0.95rem',
          borderRadius: '99px',
          marginBottom: '0.8rem'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase' }}>
            🎬 АНИМАЦИОННО КЛИПЧЕ С ЧОВЕЧЕТА
          </span>
        </div>

        <h3 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', margin: 0, color: '#fff' }}>
          Историята в Ресторанта: Сервитьорът, Гостът &amp; NFC Картата
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', maxWidth: '680px', margin: '0.4rem auto 0' }}>
          Проследете пълния процес чрез анимираните герои – от поднасянето на сметката до 5★ ревюто.
        </p>
      </div>

      {/* SCENE CONTROL BUTTONS */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.6rem',
        flexWrap: 'wrap',
        marginBottom: '1.8rem',
        position: 'relative',
        zIndex: 5
      }}>
        {[
          { num: 1, title: '🧑‍🍳 1. Сервитьорът поднася', sub: 'Носи сметкодържача' },
          { num: 2, title: '👥 2. Гостите отварят', sub: 'Виждат сметката & NFC' },
          { num: 3, title: '📱 3. Сканиране с телефон', sub: 'Докосване за 1 сек' },
          { num: 4, title: '⭐ 4. Оценка за шефа', sub: '5★ Google & Бакшиш' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => { setActiveStep(s.num); setIsPlaying(false); }}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '16px',
              border: activeStep === s.num ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
              background: activeStep === s.num ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%)' : 'rgba(255,255,255,0.03)',
              color: activeStep === s.num ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.25s ease',
              boxShadow: activeStep === s.num ? '0 4px 20px rgba(245, 158, 11, 0.35)' : 'none'
            }}
          >
            <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>{s.title}</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.75 }}>{s.sub}</span>
          </button>
        ))}
      </div>

      {/* CARTOON MOVIE THEATER STAGE (SVG CARTOON CHARACTERS) */}
      <div style={{
        position: 'relative',
        minHeight: '380px',
        background: 'linear-gradient(180deg, #121026 0%, #0a0918 100%)',
        border: '1.5px solid var(--border-light)',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
      }}>

        {/* CARTOON SCENE 1: WAITER CHARACTER WALKS TO TABLE */}
        {activeStep === 1 && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.4s ease-out', zIndex: 2, width: '100%' }}>
            <svg width="100%" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Restaurant Floor & Table */}
              <rect x="0" y="180" width="600" height="40" fill="#2d1f14" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
              
              {/* Table & 2 Chairs */}
              <rect x="380" y="110" width="160" height="70" rx="8" fill="#5a381b" stroke="#784824" strokeWidth="3" />
              <rect x="350" y="130" width="25" height="50" rx="4" fill="#3d2612" />
              <rect x="545" y="130" width="25" height="50" rx="4" fill="#3d2612" />

              {/* Customer 1 (Boy Character) */}
              <g transform="translate(340, 75)">
                <circle cx="20" cy="20" r="16" fill="#fde047" /> {/* Face */}
                <path d="M12 15 C15 10 25 10 28 15" stroke="#451a03" strokeWidth="3" fill="none" /> {/* Hair */}
                <circle cx="15" cy="18" r="2" fill="#000" /> {/* Eye L */}
                <circle cx="25" cy="18" r="2" fill="#000" /> {/* Eye R */}
                <path d="M16 26 Q20 30 24 26" stroke="#000" strokeWidth="2" fill="none" /> {/* Smile */}
                <rect x="8" y="38" width="24" height="40" rx="6" fill="#3b82f6" /> {/* Shirt */}
              </g>

              {/* Customer 2 (Girl Character) */}
              <g transform="translate(535, 75)">
                <circle cx="20" cy="20" r="16" fill="#fde047" /> {/* Face */}
                <path d="M8 20 C6 10 34 10 32 20" fill="#b91c1c" /> {/* Long Hair */}
                <circle cx="15" cy="18" r="2" fill="#000" />
                <circle cx="25" cy="18" r="2" fill="#000" />
                <path d="M16 26 Q20 30 24 26" stroke="#000" strokeWidth="2" fill="none" />
                <rect x="8" y="38" width="24" height="40" rx="6" fill="#ec4899" />
              </g>

              {/* WAITER CHARACTER (Walking with Tray & Bill Holder) */}
              <g transform="translate(140, 45)" className="waiter-walk-anim">
                {/* Hair & Face */}
                <circle cx="25" cy="20" r="18" fill="#fed7aa" />
                <path d="M10 18 C15 8 35 8 40 18" fill="#1e1b4b" /> {/* Neat Hair */}
                <circle cx="20" cy="18" r="2.5" fill="#000" />
                <circle cx="30" cy="18" r="2.5" fill="#000" />
                <path d="M20 27 Q25 32 30 27" stroke="#000" strokeWidth="2.5" fill="none" /> {/* Happy Smile */}

                {/* Body & Uniform */}
                <rect x="10" y="40" width="30" height="55" rx="8" fill="#0f172a" /> {/* Black Suit */}
                <polygon points="20,40 25,55 30,40" fill="#ffffff" /> {/* White Shirt */}
                <polygon points="23,43 27,43 25,48" fill="#ef4444" /> {/* Red Bowtie */}
                <rect x="8" y="65" width="34" height="30" rx="4" fill="#ffffff" opacity="0.9" /> {/* Apron */}

                {/* Legs */}
                <rect x="14" y="95" width="8" height="40" fill="#0f172a" />
                <rect x="28" y="95" width="8" height="40" fill="#0f172a" />
                <ellipse cx="18" cy="138" rx="7" ry="4" fill="#000" />
                <ellipse cx="32" cy="138" rx="7" ry="4" fill="#000" />

                {/* Serving Tray with Bill Holder & Glowing NFC Card */}
                <g transform="translate(30, 20)">
                  <ellipse cx="30" cy="40" rx="35" ry="8" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Bill Holder Folder */}
                  <rect x="15" y="15" width="30" height="22" rx="4" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                  {/* Receipt Paper */}
                  <rect x="18" y="10" width="24" height="12" rx="2" fill="#fff" />
                  {/* TipTap NFC Card Badge */}
                  <rect x="20" y="24" width="20" height="8" rx="2" fill="#8b5cf6" />
                </g>
              </g>

              {/* Speech Bubble */}
              <g transform="translate(180, 10)">
                <rect x="0" y="0" width="170" height="36" rx="12" fill="#8b5cf6" />
                <text x="85" y="22" fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle">
                  "Заповядайте сметката!" 💳
                </text>
              </g>
            </svg>

            <h4 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.4rem 0 0.2rem', color: '#fff' }}>
              1. Сервитьорът поднася сметкодържача с NFC картата
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto' }}>
              Анимираният сервитьор сервира сметката в кожения държач, където до бележката е поставена брандираната NFC карта.
            </p>
          </div>
        )}

        {/* CARTOON SCENE 2: CUSTOMER OPENS BILL HOLDER */}
        {activeStep === 2 && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.4s ease-out', zIndex: 2, width: '100%' }}>
            <svg width="100%" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="180" width="600" height="40" fill="#2d1f14" />
              
              {/* Table Top Close Up */}
              <rect x="100" y="110" width="400" height="70" rx="12" fill="#5a381b" stroke="#784824" strokeWidth="4" />

              {/* Open Bill Holder Folder */}
              <g transform="translate(180, 30)">
                {/* Left Flap (Receipt) */}
                <rect x="0" y="20" width="110" height="130" rx="10" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                <rect x="12" y="32" width="86" height="106" rx="6" fill="#ffffff" />
                <text x="55" y="52" fill="#000" fontSize="10" fontWeight="900" textAnchor="middle">🧾 СМЕТКА</text>
                <text x="55" y="70" fill="#475569" fontSize="8" textAnchor="middle">2x Вечеря - 48.50 лв</text>
                <text x="55" y="115" fill="#000" fontSize="10" fontWeight="900" textAnchor="middle">ОБЩО: 48.50 лв</text>

                {/* Right Flap (Glowing TipTap NFC Card) */}
                <rect x="130" y="20" width="110" height="130" rx="10" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                
                {/* NFC Card */}
                <rect x="142" y="45" width="86" height="55" rx="8" fill="url(#cardGrad)" stroke="#f59e0b" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#0c0b16" />
                  </linearGradient>
                </defs>
                <text x="185" y="65" fill="#f59e0b" fontSize="7" fontWeight="900" textAnchor="middle">РЕСТОРАНТ ЛЕДЕНИКА</text>
                <text x="185" y="80" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">ОЦЕНИ ОБСЛУЖВАНЕТО</text>
                <rect x="155" y="86" width="60" height="10" rx="5" fill="#8b5cf6" />
                <text x="185" y="93" fill="#fff" fontSize="6" fontWeight="900" textAnchor="middle">⚡ NFC TOUCH</text>
              </g>

              {/* Cartoon Hands Opening Folder */}
              <circle cx="170" cy="100" r="14" fill="#fde047" stroke="#eab308" strokeWidth="2" />
              <circle cx="430" cy="100" r="14" fill="#fde047" stroke="#eab308" strokeWidth="2" />
            </svg>

            <h4 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.4rem 0 0.2rem', color: '#fff' }}>
              2. Гостът отваря сметкодържача и вижда бележката &amp; NFC картата
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto' }}>
              При отваряне гостът вижда касовия бон и брандираната карта, подканяща за 5-звезден отзив.
            </p>
          </div>
        )}

        {/* CARTOON SCENE 3: CUSTOMER TAPS WITH PHONE */}
        {activeStep === 3 && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.4s ease-out', zIndex: 2, width: '100%' }}>
            <svg width="100%" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="180" width="600" height="40" fill="#2d1f14" />
              <rect x="150" y="140" width="300" height="40" rx="8" fill="#5a381b" stroke="#784824" strokeWidth="3" />

              {/* NFC Card on Table */}
              <rect x="230" y="125" width="140" height="85" rx="10" fill="#18152a" stroke="#f59e0b" strokeWidth="2" />
              <text x="300" y="150" fill="#f59e0b" fontSize="9" fontWeight="900" textAnchor="middle">РЕСТОРАНТ ЛЕДЕНИКА</text>
              <text x="300" y="170" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">ОЦЕНИ ОБСЛУЖВАНЕТО</text>

              {/* Cartoon Hand holding Smartphone Tapping Card */}
              <g transform="translate(245, 10)" className="phone-tap-anim">
                {/* Smartphone */}
                <rect x="20" y="10" width="70" height="120" rx="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                <rect x="25" y="20" width="60" height="100" rx="8" fill="#1e1b4b" />
                <text x="55" y="70" fill="#38bdf8" fontSize="9" fontWeight="900" textAnchor="middle">⚡ NFC READ</text>

                {/* Hand Holding Phone */}
                <circle cx="85" cy="80" r="14" fill="#fde047" stroke="#eab308" strokeWidth="2" />
              </g>

              {/* Glowing Pulse Rings */}
              <circle cx="300" cy="110" r="45" stroke="#10b981" strokeWidth="3" strokeDasharray="6 6" />
              <circle cx="300" cy="110" r="65" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
            </svg>

            <h4 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.4rem 0 0.2rem', color: '#fff' }}>
              3. Гостът докосва смартфона си до NFC картата
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto' }}>
              Без сваляне на апликация – докосването отнема под 1 секунда и активира формата за оценка.
            </p>
          </div>
        )}

        {/* CARTOON SCENE 4: 5-STAR RATING & HAPPY MANAGER */}
        {activeStep === 4 && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.4s ease-out', zIndex: 2, width: '100%' }}>
            <svg width="100%" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="180" width="600" height="40" fill="#2d1f14" />

              {/* Smartphone Screen Pop Up with 5 Stars */}
              <g transform="translate(130, 20)">
                <rect x="0" y="0" width="150" height="180" rx="18" fill="#0c0c14" stroke="#8b5cf6" strokeWidth="3" />
                <text x="75" y="25" fill="#8b5cf6" fontSize="9" fontWeight="900" textAnchor="middle">TipTap Portal</text>
                <text x="75" y="45" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">Сервитьор: Иван</text>
                
                {/* 5 Yellow Stars */}
                <g transform="translate(25, 55)">
                  {[0, 20, 40, 60, 80].map((x) => (
                    <polygon key={x} points={`${x+10},0 ${x+13},7 ${x+20},7 ${x+15},11 ${x+17},18 ${x+10},14 ${x+3},18 ${x+5},11 ${x+0},7 ${x+7},7`} fill="#f59e0b" />
                  ))}
                </g>

                <rect x="15" y="85" width="120" height="24" rx="6" fill="#10b981" />
                <text x="75" y="101" fill="#fff" fontSize="9" fontWeight="900" textAnchor="middle">+ €5.00 Бакшиш (Pay)</text>

                <rect x="15" y="120" width="120" height="24" rx="6" fill="#f59e0b" />
                <text x="75" y="136" fill="#000" fontSize="9" fontWeight="900" textAnchor="middle">🚀 Google 5★ Ревю</text>
              </g>

              {/* HAPPY MANAGER CHARACTER AT DASHBOARD */}
              <g transform="translate(360, 30)">
                {/* Laptop Screen */}
                <rect x="0" y="70" width="130" height="80" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
                <rect x="10" y="80" width="110" height="55" rx="4" fill="#0f172a" />
                <text x="65" y="100" fill="#10b981" fontSize="9" fontWeight="900" textAnchor="middle">📊 ОДИТ ЗА ШЕФА</text>
                <text x="65" y="118" fill="#f59e0b" fontSize="8" fontWeight="800" textAnchor="middle">Ново 5★ Google Ревю!</text>

                {/* Manager Face (Happy & Thumbs Up) */}
                <circle cx="65" cy="30" r="18" fill="#fed7aa" />
                <path d="M50 28 C55 18 75 18 80 28" fill="#451a03" /> {/* Manager Hair */}
                <circle cx="60" cy="28" r="2" fill="#000" />
                <circle cx="70" cy="28" r="2" fill="#000" />
                <path d="M58 37 Q65 44 72 37" stroke="#000" strokeWidth="2.5" fill="none" /> {/* Big Smile */}

                {/* Thumbs up hand */}
                <circle cx="120" cy="50" r="10" fill="#fed7aa" stroke="#eab308" strokeWidth="1.5" />
                <text x="120" y="54" fill="#000" fontSize="12" textAnchor="middle">👍</text>
              </g>
            </svg>

            <h4 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.4rem 0 0.2rem', color: '#fff' }}>
              4. Автоматичен 5★ отзив в Google &amp; Доволен Управител
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto' }}>
              Доволният гост оставя 5 звезди в Google Maps, а управителят получава мигновена статистика за сервиза.
            </p>
          </div>
        )}

      </div>

      {/* TABLE STAND ALTERNATIVE CARTOON FOOTER */}
      <div style={{
        marginTop: '1.5rem',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-light)',
        borderRadius: '20px',
        padding: '1.2rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.6rem' }}>📌</span>
          <div>
            <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Ако ползвате Настолна Табелка:</strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Табелката стои постоянно фиксирана на масата или бара – анимираните гости я сканират когато поискат.</span>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            padding: '0.45rem 1rem',
            borderRadius: '99px',
            border: 'none',
            background: isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'var(--accent-purple)',
            color: isPlaying ? '#ef4444' : '#fff',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          {isPlaying ? '⏸ Пауза' : '▶ Пусни Клипчето'}
        </button>
      </div>
    </div>
  );
};
