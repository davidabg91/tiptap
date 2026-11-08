import { useState, useEffect, useRef, lazy, Suspense, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { LandingPage } from './components/LandingPage';
import { CustomerRating } from './components/CustomerRating';
import { AuthModal } from './components/AuthModal';

// Loaded on demand so a guest scanning a card only downloads the rating page.
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const NfcCustomizer = lazy(() => import('./components/NfcCustomizer').then((m) => ({ default: m.NfcCustomizer })));
const HowItWorks = lazy(() => import('./components/HowItWorks').then((m) => ({ default: m.HowItWorks })));
const PricingPage = lazy(() => import('./components/PricingPage').then((m) => ({ default: m.PricingPage })));
const LegalPage = lazy(() => import('./components/LegalPage').then((m) => ({ default: m.LegalPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then((m) => ({ default: m.AboutPage })));
const Onboarding = lazy(() => import('./components/Onboarding').then((m) => ({ default: m.Onboarding })));
import {
  TipTapBrandSymbol,
  CustomArrowRight as ArrowRight,
  CustomBarChart3 as BarChart,
  CustomChevronDown as ChevronDown,
  CustomSmartphone as Smartphone,
} from './components/CustomIcons';
import { isSupabaseEnabled } from './lib/supabase';
import { getSession, onAuthChange, getMyProfile, signOut, type MyProfile } from './lib/data';
import type { Session } from '@supabase/supabase-js';

// `demo` / `demoguest` always run on local sample data so the marketing
// demos work with or without a backend; `dashboard` / `rate` are the real app.
type ViewState = 'landing' | 'dashboard' | 'customizer' | 'rate' | 'howitworks' | 'pricing' | 'legal' | 'about' | 'demo' | 'demoguest';
type LegalTab = 'terms' | 'privacy' | 'cookies' | 'withdrawal' | 'imprint';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [legalTab, setLegalTab] = useState<LegalTab>('terms');
  const [rateSlug, setRateSlug] = useState<string>('waiter-1');

  // Auth (only relevant when a backend is configured)
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<MyProfile | null>(null);

  useEffect(() => {
    if (!isSupabaseEnabled) return;
    let active = true;
    getSession().then(async (s) => {
      if (!active) return;
      setSession(s);
      if (s) setProfile(await getMyProfile());
    });
    const unsubscribe = onAuthChange(async (s) => {
      setSession(s);
      setProfile(s ? await getMyProfile() : null);
    });
    return () => { active = false; unsubscribe(); };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    setProfile(null);
    navigateTo('landing');
  };

  // Check URL path simulation (e.g., if there's a hash like #pricing)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#rate/')) {
        const slug = decodeURIComponent(hash.slice('#rate/'.length));
        if (slug) setRateSlug(slug);
        setView('rate');
      } else if (hash === '#dashboard') {
        setView('dashboard');
      } else if (hash === '#demo') {
        setView('demo');
      } else if (hash === '#demo-guest') {
        setView('demoguest');
      } else if (hash === '#customizer') {
        setView('customizer');
      } else if (hash === '#how-it-works') {
        setView('howitworks');
      } else if (hash === '#pricing') {
        setView('pricing');
      } else if (hash === '#about') {
        setView('about');
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
    else if (newView === 'about') window.location.hash = 'about';
    else if (newView === 'rate') window.location.hash = `rate/${rateSlug}`;
    else if (newView === 'demo') window.location.hash = 'demo';
    else if (newView === 'demoguest') window.location.hash = 'demo-guest';
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

  /** Jump to a landing-page section; for a FAQ entry, also open its answer. */
  const navigateToSection = (sectionId: string, faqId?: string) => {
    setView('landing');
    setMobileMenuOpen(false);
    window.location.hash = '';
    setTimeout(() => {
      const target = document.getElementById(faqId ? `faq-${faqId}` : sectionId);
      if (target instanceof HTMLDetailsElement) target.open = true;
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const navigateToAboutContact = () => {
    setView('about');
    setMobileMenuOpen(false);
    window.location.hash = 'about';
    // Let the About page mount, then scroll to the inquiry form.
    setTimeout(() => {
      document.getElementById('about-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Navbar: denser glass once the page scrolls + the desktop "Демо" dropdown.
  const [scrolled, setScrolled] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const demoCloseTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen && !demoMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDemoMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen, demoMenuOpen]);

  useEffect(() => {
    if (!demoMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!demoRef.current?.contains(e.target as Node)) setDemoMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [demoMenuOpen]);

  const openDemoMenu = () => {
    window.clearTimeout(demoCloseTimer.current);
    setDemoMenuOpen(true);
  };

  const closeDemoMenuSoon = () => {
    window.clearTimeout(demoCloseTimer.current);
    demoCloseTimer.current = window.setTimeout(() => setDemoMenuOpen(false), 140);
  };

  const navLinks: { view: ViewState; label: string; href: string }[] = [
    { view: 'howitworks', label: 'Как работи', href: '#how-it-works' },
    { view: 'pricing', label: 'Цени', href: '#pricing' },
    { view: 'customizer', label: 'Конфигуратор', href: '#customizer' },
  ];

  const demoLinks: { view: ViewState; label: string; text: string; href: string; icon: ReactNode }[] = [
    { view: 'demoguest', label: 'Изглед за госта', text: 'Как гостът оценява и оставя бакшиш', href: '#demo-guest', icon: <Smartphone size={18} color="#c4b5fd" /> },
    { view: 'demo', label: 'Табло за управители', text: 'Оценки, бакшиши и екип на едно място', href: '#demo', icon: <BarChart size={18} color="#c4b5fd" /> },
  ];

  const isDemoView = view === 'demo' || view === 'demoguest';

  // Real <a href> links (keyboard, middle-click) that still route in-app.
  const go = (target: ViewState) => (e: ReactMouseEvent) => {
    e.preventDefault();
    setDemoMenuOpen(false);
    navigateTo(target);
  };

  return (
    <div className="app-container">
      {/* NAVBAR — floating glass bar: brand · centered links · actions */}
      <div className={`navbar-wrapper${scrolled ? ' is-scrolled' : ''}`}>
        <header className="site-nav">
          <a href="#" className="site-nav-brand" aria-label="TipTap — начало" onClick={go('landing')}>
            <TipTapBrandSymbol size={30} />
            <span className="site-nav-wordmark">Tip<span>Tap</span></span>
          </a>

          <nav className="site-nav-links" aria-label="Основна навигация">
            {navLinks.map((link) => (
              <a
                key={link.view}
                href={link.href}
                className={`site-nav-link${view === link.view ? ' is-active' : ''}`}
                aria-current={view === link.view ? 'page' : undefined}
                onClick={go(link.view)}
              >
                {link.label}
              </a>
            ))}

            <div
              ref={demoRef}
              className="site-nav-dropdown"
              onMouseEnter={openDemoMenu}
              onMouseLeave={closeDemoMenuSoon}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDemoMenuOpen(false);
              }}
            >
              <button
                type="button"
                className={`site-nav-link${isDemoView ? ' is-active' : ''}`}
                aria-expanded={demoMenuOpen}
                aria-haspopup="true"
                // A mouse click only opens (hover already may have); keyboard toggles.
                onClick={(e) => setDemoMenuOpen((open) => (e.detail === 0 ? !open : true))}
              >
                Демо <ChevronDown size={14} className="site-nav-chevron" />
              </button>
              <div className={`site-nav-menu${demoMenuOpen ? ' is-open' : ''}`}>
                {demoLinks.map((item) => (
                  <a
                    key={item.view}
                    href={item.href}
                    className={`site-nav-menu-item${view === item.view ? ' is-active' : ''}`}
                    onClick={go(item.view)}
                  >
                    <span className="site-nav-menu-icon">{item.icon}</span>
                    <span>
                      <span className="site-nav-menu-title">{item.label}</span>
                      <span className="site-nav-menu-text">{item.text}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#about"
              className={`site-nav-link${view === 'about' ? ' is-active' : ''}`}
              aria-current={view === 'about' ? 'page' : undefined}
              onClick={go('about')}
            >
              За нас
            </a>
          </nav>

          <div className="site-nav-actions">
            <button type="button" className="site-nav-login" onClick={() => openAuth('login')}>
              Вход
            </button>
            <button type="button" className="site-nav-cta" onClick={() => navigateTo('customizer')}>
              Поръчайте карти
            </button>
            <button
              type="button"
              className={`site-nav-burger${mobileMenuOpen ? ' is-open' : ''}`}
              aria-label={mobileMenuOpen ? 'Затвори менюто' : 'Отвори менюто'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </header>
      </div>

      {/* MOBILE MENU — sheet under the bar (≤ 900px) */}
      <div id="mobile-nav" className={`mobile-nav${mobileMenuOpen ? ' is-open' : ''}`}>
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <nav className="mobile-nav-panel" aria-label="Мобилна навигация">
          {[...navLinks, { view: 'about' as ViewState, label: 'За нас', href: '#about' }].map((link) => (
            <a
              key={link.view}
              href={link.href}
              className={`mobile-nav-link${view === link.view ? ' is-active' : ''}`}
              aria-current={view === link.view ? 'page' : undefined}
              onClick={go(link.view)}
            >
              {link.label}
              <ChevronDown size={16} className="mobile-nav-arrow" />
            </a>
          ))}

          <span className="mobile-nav-label">Демо</span>
          {demoLinks.map((item) => (
            <a
              key={item.view}
              href={item.href}
              className={`mobile-nav-demo${view === item.view ? ' is-active' : ''}`}
              onClick={go(item.view)}
            >
              <span className="site-nav-menu-icon">{item.icon}</span>
              <span>
                <span className="site-nav-menu-title">{item.label}</span>
                <span className="site-nav-menu-text">{item.text}</span>
              </span>
            </a>
          ))}

          <div className="mobile-nav-actions">
            <button type="button" className="hero-cta hero-cta--secondary" onClick={() => openAuth('login')}>
              Вход
            </button>
            <button type="button" className="hero-cta hero-cta--primary" onClick={() => navigateTo('customizer')}>
              Поръчайте карти <ArrowRight size={18} />
            </button>
          </div>
        </nav>
      </div>

      {/* MAIN VIEW ROUTER */}
      <main style={{ width: '100%' }}>
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: 'var(--text-secondary)' }}>Зареждане…</div>}>
        {view === 'landing' && (
          <LandingPage
            onNavigateToDashboard={() => navigateTo('demo')}
            onNavigateToCustomizer={() => navigateTo('customizer')}
          />
        )}

        {view === 'howitworks' && (
          <HowItWorks
            onNavigateToCustomizer={() => navigateTo('customizer')}
            onNavigateToDashboard={() => navigateTo('demo')}
          />
        )}

        {view === 'pricing' && (
          <PricingPage
            onNavigateToCustomizer={() => navigateTo('customizer')}
            onNavigateToDashboard={() => navigateTo('demo')}
          />
        )}

        {view === 'demo' && (
          <div className="section-alt-indigo" style={{ padding: '3rem 4vw 4rem', width: '100%' }}>
            <AdminDashboard onNavigateToCustomizer={() => navigateTo('customizer')} />
          </div>
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
            {!isSupabaseEnabled ? (
              <AdminDashboard onNavigateToCustomizer={() => navigateTo('customizer')} />
            ) : !session ? (
              <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', padding: '3rem 1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-official)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.75rem' }}>Вход за управители</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Влезте в профила си, за да видите таблото на вашето заведение.</p>
                <button className="btn ios-glass-btn-primary" style={{ padding: '0.9rem 2rem' }} onClick={() => openAuth('login')}>
                  Вход / Регистрация
                </button>
              </div>
            ) : profile === null ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>Зареждане…</div>
            ) : !profile.restaurant ? (
              <Onboarding fullName={profile.fullName} onDone={async () => setProfile(await getMyProfile())} />
            ) : (
              <AdminDashboard
                onNavigateToCustomizer={() => navigateTo('customizer')}
                restaurant={profile.restaurant}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        )}

        {(view === 'rate' || view === 'demoguest') && (
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
              {view === 'demoguest'
                ? <CustomerRating key="demo" demo initialWaiterId="waiter-2" />
                : <CustomerRating key={rateSlug} initialWaiterId={rateSlug} />}
            </div>
          </div>
        )}

        {view === 'about' && (
          <AboutPage onNavigateToCustomizer={() => navigateTo('customizer')} />
        )}

        {view === 'legal' && (
          <LegalPage initialTab={legalTab} />
        )}
        </Suspense>
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
                src={`${import.meta.env.BASE_URL}logo.jpg`} 
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
            <h4 className="footer-title">Въпроси и отговори</h4>
            <div className="footer-links">
              <button type="button" onClick={() => navigateToSection('faq', 'app')}>Трябва ли приложение на госта?</button>
              <button type="button" onClick={() => navigateToSection('faq', 'tips')}>Как работят бакшишите?</button>
              <button type="button" onClick={() => navigateToSection('faq', 'alerts')}>Как разбирам за недоволен гост?</button>
              <button type="button" onClick={() => navigateToSection('faq')}>Всички въпроси →</button>
            </div>
          </div>

          <div>
            <h4 className="footer-title">За ресторанти</h4>
            <div className="footer-links">
              <button type="button" onClick={() => navigateToSection('features')}>Функции</button>
              <button type="button" onClick={() => navigateTo('customizer')}>Поръчка на карти и табелки</button>
              <button type="button" onClick={() => navigateTo('demo')}>Демо табло за управители</button>
              <button type="button" onClick={() => navigateTo('about')}>За нас</button>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Контакти &amp; Поддръжка</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Дейвид Димитров — управител<br />
              София, България<br />
              Тел: <a href="tel:0876141826" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>0876 141 826</a>
            </p>
            <button
              className="btn ios-glass-btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.6rem 1.3rem' }}
              onClick={navigateToAboutContact}
            >
              Пишете ни
            </button>
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
