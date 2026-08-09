import React, { useState } from 'react';
import { 
  CustomArrowRight as ArrowRight, 
  CustomCheckCircle as CheckCircle2, 
  CustomShieldCheck as ShieldCheck,
  CustomStar as Star,
  CustomX as XMark,
  GoogleLogoIcon,
  AppleLogoIcon
} from './CustomIcons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccessLogin,
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [managerName, setManagerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [tableCount, setTableCount] = useState<string>('15');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccessLogin();
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  const handleDemoFill = () => {
    setEmail('manager@ledenika-restaurant.bg');
    setPassword('demo2026');
    setRestaurantName('Ресторант Леденика');
    setManagerName('Иван Петров');
    setPhone('+359 88 812 3456');
  };

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
      padding: '1rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      {/* Click Outside Modal Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: mode === 'register' ? '560px' : '460px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'linear-gradient(135deg, rgba(18, 18, 36, 0.98) 0%, rgba(10, 10, 22, 0.99) 100%)',
          border: '1.5px solid rgba(139, 92, 246, 0.45)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(139, 92, 246, 0.25)',
          padding: '1.75rem 1.75rem 1.5rem',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
        >
          <XMark size={18} />
        </button>

        {/* Compact Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '0.4rem',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            padding: '0.25rem 0.8rem',
            borderRadius: '99px'
          }}>
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="TipTap Logo" style={{ width: '20px', height: '20px', borderRadius: '5px' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
              Tip<span style={{ color: 'var(--accent-purple)' }}>Tap</span> за Управители
            </span>
          </div>

          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            margin: '0.1rem 0 0.3rem',
            fontFamily: 'var(--font-display)' 
          }}>
            {mode === 'login' ? 'Вход в Портала' : 'Нова Регистрация'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
            {mode === 'login' 
              ? 'Контролирайте отзивите и представянето на заведението.' 
              : 'Започнете 14-дневен безплатен пробен период без кредитна карта.'}
          </p>
        </div>

        {/* Compact Tab Switcher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.4rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-light)',
          padding: '0.25rem',
          borderRadius: '12px',
          marginBottom: '1.2rem'
        }}>
          <button
            type="button"
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'login' ? 'var(--accent-purple)' : 'transparent',
              color: mode === 'login' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setMode('login')}
          >
            Вход
          </button>
          <button
            type="button"
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'register' ? 'var(--accent-purple)' : 'transparent',
              color: mode === 'register' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setMode('register')}
          >
            Регистрация (14 Дни Безплатно)
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem', animation: 'fadeIn 0.3s ease' }}>
            <CheckCircle2 size={48} color="var(--green)" style={{ margin: '0 auto 0.8rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              {mode === 'login' ? 'Успешен вход!' : 'Регистрацията е успешна!'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Пренасочване към Контролния Панел за Управители...
            </p>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {mode === 'register' && (
              <>
                {/* 2-Column Optimized Registration Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      Име на Заведението
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
                      placeholder="Ресторант Леденика"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      Брой маси / сервитьори
                    </label>
                    <select
                      className="input-field"
                      value={tableCount}
                      onChange={(e) => setTableCount(e.target.value)}
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
                    >
                      <option value="5" style={{ background: '#111' }}>1 – 5 маси</option>
                      <option value="15" style={{ background: '#111' }}>6 – 20 маси</option>
                      <option value="35" style={{ background: '#111' }}>20+ маси</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      Име на Управителя
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
                      placeholder="Иван Петров"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      Телефон за връзка
                    </label>
                    <input
                      type="tel"
                      required
                      className="input-field"
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
                      placeholder="+359 88 888 888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email & Password Grid in Register Mode */}
            <div style={{ 
              display: mode === 'register' ? 'grid' : 'flex',
              gridTemplateColumns: mode === 'register' ? '1fr 1fr' : undefined,
              flexDirection: mode === 'login' ? 'column' : undefined,
              gap: '0.75rem' 
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Работен Имейл
                </label>
                <input
                  type="email"
                  required
                  className="input-field"
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
                  placeholder="manager@restaurant.bg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Парола
                  </label>
                  {mode === 'login' && (
                    <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.72rem', color: 'var(--accent-purple)', textDecoration: 'none' }}>
                      Забравена парола?
                    </a>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="input-field"
                    style={{ padding: '0.55rem 2.2rem 0.55rem 0.85rem', fontSize: '0.85rem' }}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.6rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.72rem'
                    }}
                  >
                    {showPassword ? 'Скрий' : 'Виж'}
                  </button>
                </div>
              </div>
            </div>

            {mode === 'login' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--accent-purple)' }}
                  />
                  Запомни ме на това устройство
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.95rem',
                marginTop: '0.3rem',
                justifyContent: 'center'
              }}
            >
              {mode === 'login' ? 'Влез в Профила' : 'Създай Профил (14 Дни Безплатно)'} <ArrowRight size={16} />
            </button>

            {/* DEMO QUICK AUTO-FILL BUTTON */}
            <div style={{ textAlign: 'center', marginTop: '0.3rem' }}>
              <button
                type="button"
                onClick={() => {
                  handleDemoFill();
                  setTimeout(() => {
                    onSuccessLogin();
                    onClose();
                  }, 600);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ⚡ Бърз демо вход без парола за Управители
              </button>
            </div>

            {/* Quick OAuth options */}
            <div style={{ marginTop: '0.6rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.6rem', fontWeight: 600 }}>
                Или влезте бързо с 1 клик през:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <GoogleLogoIcon size={18} /> Google
                </button>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <AppleLogoIcon size={18} color="#ffffff" /> Apple ID
                </button>
              </div>
            </div>

            {/* Trust Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              <ShieldCheck size={14} color="var(--green)" />
              <span>100% Защитени данни • Без обвързващ договор</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
