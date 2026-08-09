import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { NfcCustomizer } from './components/NfcCustomizer';
import { CustomerRating } from './components/CustomerRating';
import { HowItWorks } from './components/HowItWorks';
import { PricingPage } from './components/PricingPage';
import { AuthModal } from './components/AuthModal';
import { LegalPage } from './components/LegalPage';
import { TipTapBrandSymbol, CustomCreditCard as CreditCard, CustomMenu as Menu, CustomX as X, CustomHeart as Heart } from './components/CustomIcons';

type ViewState = 'landing' | 'dashboard' | 'customizer' | 'rate' | 'howitworks' | 'pricing' | 'legal';
type LegalTab = 'terms' | 'privacy' | 'cookies' | 'withdrawal' | 'imprint';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [legalTab, setLegalTab] = useState<LegalTab>('terms');

  // Check URL path simulation (e.g., if there's a hash like #pricing)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#rate/')) {
        setView('rate');
      } else if (hash === '#dashboard') {
        setView('dashboard');
      } else if (hash === '#customizer') {
        setView('customizer');
      } else if (hash === '#how-it-works') {
        setView('howitworks');
      } else if (hash === '#pricing') {
        setView('pricing');
      } else if (hash === '#login' || hash === '#register') {
        setAuthInitialMode(hash === '#register' ? 'register' : 'login');
        setAuthModalOpen(true);
      } else if (hash.startsWith('#legal')) {
        const tabMap: Record<string, LegalTab> = {
          '#legal/terms': 'terms',
          '#legal/privacy': 'privacy',
          '#legal/cookies': 'cookies',
          '#legal/withdrawal': 'withdrawal',
          '#legal/imprint': 'imprint',
        };
        setLegalTab(tabMap[hash] || 'terms');
        setView('legal');
      } else {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView: ViewState) => {
    setView(newView);
    setMobileMenuOpen(false);
    if (newView === 'landing') window.location.hash = '';
    else if (newView === 'dashboard') window.location.hash = 'dashboard';
    else if (newView === 'customizer') window.location.hash = 'customizer';
    else if (newView === 'howitworks') window.location.hash = 'how-it-works';
    else if (newView === 'pricing') window.location.hash = 'pricing';
    else if (newView === 'rate') window.location.hash = 'rate/waiter-2';
    else if (newView === 'legal') window.location.hash = `legal/${legalTab}`;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setView('legal');
    setMobileMenuOpen(false);
    window.location.hash = `legal/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* HEADER NAVBAR (NEXT-GEN FLOATING ISLAND GLASS WITH TIPTAP LOGO) */}
      <div className="navbar-wrapper">
        <header className="floating-island-navbar">
          {/* Pure Brand Vector Symbol (No background box - like top tech brands) */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
            onClick={() => navigateTo('landing')}
          >
            <TipTapBrandSymbol size={32} />
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.35rem', 
              fontWeight: 900, 
              letterSpacing: '-0.5px' 
            }}>
              Tip<span style={{ color: 'var(--accent-purple)' }}>Tap</span>
            </span>
          </div>

          {/* Desktop Navigation Pills */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
            <span 
              className={`nav-pill-item ${view === 'landing' ? 'active' : ''}`}
              onClick={() => navigateTo('landing')}
            >
              Начало
            </span>
            <span 
              className={`nav-pill-item ${view === 'howitworks' ? 'active' : ''}`}
              onClick={() => navigateTo('howitworks')}
            >
              Как Работи
            </span>
            <span 
              className={`nav-pill-item ${view === 'pricing' ? 'active' : ''}`}
              onClick={() => navigateTo('pricing')}
            >
              Цени
            </span>
            <span 
              className={`nav-pill-item ${view === 'customizer' ? 'active' : ''}`}
              onClick={() => navigateTo('customizer')}
            >
              Конфигуратор
            </span>
            <span 
              className={`nav-pill-item ${view === 'rate' ? 'active' : ''}`}
              onClick={() => navigateTo('rate')}
            >
              Клиентски Изглед
            </span>
            <span 
              className={`nav-pill-item ${view === 'dashboard' ? 'active' : ''}`}
              onClick={() => navigateTo('dashboard')}
            >
              Демо за Управители
            </span>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              className="nav-super-cool-auth-btn" 
              onClick={() => openAuth('login')}
            >
              Вход / Регистрация
            </button>
            <button 
              className="btn ios-glass-btn-primary" 
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
              onClick={() => navigateTo('customizer')}
            >
              Поръчай карти
            </button>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(14, 14, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 99,
          borderBottom: '1px solid var(--border-light)'
        }}>
          <span 
            style={{ fontSize: '1.1rem', color: view === 'landing' ? 'var(--accent-purple)' : '#fff', fontWeight: 600 }}
            onClick={() => navigateTo('landing')}
          >
            Начало
          </span>
          <span 
            style={{ fontSize: '1.1rem', color: view === 'howitworks' ? 'var(--accent-purple)' : '#fff', fontWeight: 600 }}
            onClick={() => navigateTo('howitworks')}
          >
            Как Работи
          </span>
          <span 
            style={{ fontSize: '1.1rem', color: view === 'pricing' ? 'var(--accent-purple)' : '#fff', fontWeight: 600 }}
            onClick={() => navigateTo('pricing')}
          >
            Цени
          </span>
          <span 
            style={{ fontSize: '1.1rem', color: view === 'customizer' ? 'var(--accent-purple)' : '#fff', fontWeight: 600 }}
            onClick={() => navigateTo('customizer')}
          >
            Конфигуратор
          </span>
          <span 
            style={{ fontSize: '1.1rem', color: view === 'rate' ? 'var(--accent-purple)' : '#fff', fontWeight: 600 }}
            onClick={() => navigateTo('rate')}
          >
            Клиентски Изглед (Демо)
          </span>
          <span 
            style={{ fontSize: '1.1rem', color: view === 'dashboard' ? 'var(--accent-purple)' : '#fff', fontWeight: 600 }}
            onClick={() => navigateTo('dashboard')}
          >
            Демо за Управители
          </span>
          <span 
            style={{ fontSize: '1.1rem', color: '#f59e0b', fontWeight: 700 }}
            onClick={() => openAuth('login')}
          >
            Вход / Регистрация
          </span>
        </div>
      )}

      {/* MAIN VIEW ROUTER */}
      <main style={{ width: '100%' }}>
        {view === 'landing' && (
          <LandingPage 
            onNavigateToDashboard={() => navigateTo('dashboard')}
            onNavigateToCustomizer={() => navigateTo('customizer')}
          />
        )}

        {view === 'howitworks' && (
          <HowItWorks 
            onNavigateToCustomizer={() => navigateTo('customizer')}
            onNavigateToDashboard={() => navigateTo('dashboard')}
          />
        )}

        {view === 'pricing' && (
          <PricingPage 
            onNavigateToCustomizer={() => navigateTo('customizer')}
            onNavigateToDashboard={() => navigateTo('dashboard')}
          />
        )}

        {view === 'customizer' && (
          <div className="section-alt-indigo" style={{ padding: '3rem 4vw 4rem', width: '100%' }}>
            <NfcCustomizer 
              onOrderSuccess={() => navigateTo('dashboard')} 
            />
          </div>
        )}

        {view === 'dashboard' && (
          <div className="section-alt-indigo" style={{ padding: '3rem 4vw 4rem', width: '100%' }}>
            <AdminDashboard 
              onNavigateToCustomizer={() => navigateTo('customizer')}
            />
          </div>
        )}

        {view === 'rate' && (
          <div style={{ 
            minHeight: '85vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem 1rem'
          }}>
            <div style={{ 
              width: '100%', 
              maxWidth: '440px', 
              background: '#0c0c14', 
              borderRadius: '32px',
              border: '1px solid var(--border-light)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}>
              <CustomerRating initialWaiterId="waiter-1" />
            </div>
          </div>
        )}

        {view === 'legal' && (
          <LegalPage initialTab={legalTab} />
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ 
        borderTop: '1px solid var(--border-light)', 
        padding: '3rem 4vw 2rem', 
        background: 'rgba(8, 8, 16, 0.8)',
        marginTop: 'auto',
        width: '100%'
      }}>
        <div style={{ 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img 
                src="/logo.jpg" 
                alt="TipTap Logo" 
                style={{ width: '24px', height: '24px', borderRadius: '6px', objectFit: 'cover' }} 
              />
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>TipTap</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Иновативно дигитално решение за българския ресторантьорски бизнес. Съчетаваме NFC хардуер и софтуерни анализи за по-добро обслужване.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Често Задавани Въпроси</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>• Как работи NFC технологията?</span>
              <span>• Нужна ли е апликация за клиента?</span>
              <span>• Как се превеждат бакшишите?</span>
              <span>• Как се интегрира Google Maps?</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>За Ресторанти</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('customizer')}>Поръчка на брандирани карти</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('customizer')}>Поръчка на табелки за маси</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Управление на сервитьори</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Абонаментни планове</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Контакти &amp; Поддръжка</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              София, България<br />
              Email: support@tiptap.bg<br />
              Тел: +359 888 123 456
            </p>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--border-light)', 
          paddingTop: '1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} TipTap. Всички права запазени. Българска NFC платформа.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigateToLegal('terms')} onMouseEnter={e => (e.currentTarget.style.color='#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color='')}>Общи условия</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigateToLegal('privacy')} onMouseEnter={e => (e.currentTarget.style.color='#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color='')}>Политика за поверителност</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigateToLegal('cookies')} onMouseEnter={e => (e.currentTarget.style.color='#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color='')}>Бисквитки</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigateToLegal('withdrawal')} onMouseEnter={e => (e.currentTarget.style.color='#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color='')}>Право на отказ</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => navigateToLegal('imprint')} onMouseEnter={e => (e.currentTarget.style.color='#f59e0b')} onMouseLeave={e => (e.currentTarget.style.color='')}>Импресум</span>
          </div>
        </div>
      </footer>

      {/* AUTHENTICATION MODAL (LOGIN & REGISTRATION) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={() => navigateTo('dashboard')}
        initialMode={authInitialMode}
      />
    </div>
  );
}

export default App;
