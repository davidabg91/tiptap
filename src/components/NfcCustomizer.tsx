import React, { useState } from 'react';
import { addOrder } from '../utils/mockData';
import { 
  CustomAward as Award, 
  CustomCoffee as Coffee, 
  CustomUtensils as Utensils, 
  CustomGlassWater as GlassWater, 
  CustomArrowRight as ArrowRight, 
  CustomCheckCircle as CheckCircle2, 
  CustomRotateCw as RotateCw, 
  CustomLayers as Layers, 
  CustomStar as Star, 
  CustomWifi as Wifi,
  RealisticQrCode,
  IconPrismStar
} from './CustomIcons';

import { NfcCheckoutModal } from './NfcCheckoutModal';

interface NfcCustomizerProps {
  onOrderSuccess?: () => void;
}

export const NfcCustomizer: React.FC<NfcCustomizerProps> = ({ onOrderSuccess }) => {
  const [type, setType] = useState<'card' | 'stand' | 'both'>('card');
  const [cardColor, setCardColor] = useState<'black' | 'white'>('black');
  const [quantity, setQuantity] = useState<number>(10);
  const [customText, setCustomText] = useState<string>('Име на заведение');
  const [logo, setLogo] = useState<string>('utensils');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [ordered, setOrdered] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [showRealExample, setShowRealExample] = useState<boolean>(false);

  // 3D Tilt State
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Calculate rotation: Max 25 degrees
    const rX = -(y / box.height) * 25;
    const rY = (x / box.width) * 25;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const getLogoIcon = (size = 32) => {
    switch (logo) {
      case 'utensils': return <Utensils size={size} color="#f59e0b" />;
      case 'coffee': return <Coffee size={size} color="#f59e0b" />;
      case 'wine': return <GlassWater size={size} color="#f59e0b" />;
      case 'custom': return <IconPrismStar size={size} />;
      default: return <Award size={size} color="#f59e0b" />;
    }
  };

  const getPrice = () => {
    const cardPrice = 4.90;
    const standPrice = 6.90;
    const customDesignSurcharge = logo === 'custom' ? 5.00 : 0.00;

    let baseUnitPrice = cardPrice;
    if (type === 'stand') baseUnitPrice = standPrice;
    if (type === 'both') baseUnitPrice = cardPrice + standPrice;

    const finalUnitPrice = baseUnitPrice + customDesignSurcharge;
    return parseFloat((finalUnitPrice * quantity).toFixed(2));
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = (orderDetails: any) => {
    setIsCheckoutModalOpen(false);
    const newOrder = addOrder(cardColor, type, quantity, customText, logo);
    setOrderId(newOrder.id);
    setOrdered(true);
    setTimeout(() => {
      if (onOrderSuccess) {
        onOrderSuccess();
      }
    }, 2000);
  };

  return (
    <div className="nfc-customizer-container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
      <h2 style={{
          fontFamily: 'var(--font-official)',
          fontSize: '2.1rem',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          lineHeight: 1.25,
          color: '#ffffff'
        }}>
          <Layers color="#a78bfa" size={30} />
          <span>Персонализирайте Вашите NFC Продукти</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '-1.5rem' }}>
          Използвайте нашия интерактивен 3D симулатор, за да проектирате своите карти и табели. Ние ще ги брандираме с Вашето лого и текст.
        </p>

        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '520px' }}>
        
        {/* LEFT COLUMN: 3D Visualization Area */}
        <div className="customizer-preview" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="bg-glow-purple" style={{ top: '-10%', left: '-10%', opacity: 0.3 }}></div>
          <div className="bg-glow-cyan" style={{ bottom: '-10%', right: '-10%', opacity: 0.2 }}></div>

          {ordered ? (
            <div style={{ textAlign: 'center', animation: 'fadeInUp 0.5s ease', zIndex: 2 }}>
              <CheckCircle2 size={64} color="var(--green)" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Поръчката е приета!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Поръчка #{orderId} се обработва в момента.</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Пренасочване към Вашето табло...</p>
            </div>
          ) : (
            <>
              {/* 3D INTERACTIVE CANVAS STAGE */}
              <div style={{ 
                perspective: '1000px', 
                width: '100%', 
                minHeight: '340px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                {(type === 'stand' || type === 'both') && (
                  /* STAND 3D VIEW (3D Акрилна Табелка от Снимката table-stand.jpg) */
                  <div 
                    className="stand-scene" 
                    style={{ 
                      perspective: '1000px', 
                      width: '230px', 
                      height: '330px', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      zIndex: 1,
                      cursor: 'grab'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div 
                      className="acrylic-3d-stand-container"
                      style={{ 
                        transform: `rotateX(${rotateX + 10}deg) rotateY(${rotateY}deg)`,
                        transition: 'transform 0.15s ease-out'
                      }}
                    >
                      {/* Acrylic Glass Frame */}
                      <div className="acrylic-glass-frame">
                        {/* Glass Glare */}
                        <div className="acrylic-glass-glare" />

                        {/* Printed Insert (Warm Chocolate & Gold Pattern matching table-stand.jpg) */}
                        <div className="stand-printed-insert">
                          <div className="stand-geo-pattern" />

                          {/* Top: Brand Header */}
                          <div style={{ textAlign: 'center', zIndex: 2 }}>
                            <div style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '6px', 
                              background: 'rgba(245, 158, 11, 0.18)', 
                              border: '1px solid rgba(245, 158, 11, 0.4)', 
                              padding: '0.2rem 0.65rem', 
                              borderRadius: '99px',
                              marginBottom: '0.4rem'
                            }}>
                              {getLogoIcon(14)}
                              <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '1px' }}>
                                РЕСТОРАНТ
                              </span>
                            </div>

                            <div style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 900, 
                              fontFamily: 'var(--font-display)', 
                              letterSpacing: '0.5px',
                              color: '#ffffff',
                              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                            }}>
                              {customText || 'Леденика'}
                            </div>

                            <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.8px', marginTop: '2px', textTransform: 'uppercase' }}>
                              ОЦЕНИ ОБСЛУЖВАНЕТО
                            </div>
                          </div>

                          {/* Bottom Row: NFC Touch Badge + QR Code (matching table-stand.jpg layout) */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                            {/* Gold Circular NFC Touch Badge */}
                            <div style={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center',
                              gap: '3px'
                            }}>
                              <div style={{ 
                                width: '46px', 
                                height: '46px', 
                                borderRadius: '50%', 
                                background: 'linear-gradient(135deg, #fef08a 0%, #f59e0b 60%, #b45309 100%)',
                                border: '2px solid #fff',
                                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.5), inset 0 1px 2px rgba(255,255,255,0.8)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1f1008'
                              }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <path d="M4 12C4 12 7 6 12 6C17 6 20 12 20 12" stroke="#1f1008" strokeWidth="2.2" strokeLinecap="round"/>
                                  <path d="M7 12C7 12 9 8 12 8C15 8 17 12 17 12" stroke="#1f1008" strokeWidth="2.2" strokeLinecap="round"/>
                                  <path d="M10 12C10 12 11 10 12 10C13 10 14 12 14 12" stroke="#1f1008" strokeWidth="2.2" strokeLinecap="round"/>
                                  <circle cx="12" cy="12" r="1.5" fill="#1f1008"/>
                                </svg>
                                <span style={{ fontSize: '0.38rem', fontWeight: 900, letterSpacing: '0.5px' }}>NFC</span>
                              </div>
                              <span style={{ fontSize: '0.45rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.3px' }}>
                                Докосни тук
                              </span>
                            </div>

                            {/* White Designer QR Container */}
                            <div style={{ 
                              padding: '5px', 
                              background: '#ffffff', 
                              borderRadius: '8px', 
                              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                              border: '1px solid rgba(255,255,255,0.3)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center'
                            }}>
                              <RealisticQrCode size={46} color="#0f172a" logoCenter={true} />
                              <span style={{ fontSize: '0.38rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                                SCAN QR
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Weighted Solid Metallic Base */}
                      <div className={`stand-metallic-base-3d ${cardColor === 'white' ? 'white-base' : ''}`}>
                        <div className="stand-base-slot" />
                      </div>
                    </div>
                  </div>
                )}

                {(type === 'card' || type === 'both') && (
                  /* CARD 3D VIEW (ZOOMED FOR MAXIMUM CLARITY, ZERO WHITE BACKDROP) */
                  <div 
                    className="card-scene"
                    style={{ transform: 'scale(1.32)', margin: '1.8rem 0' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div 
                      className={`card-model-3d ${isFlipped ? 'flipped' : ''}`}
                      style={{ 
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
                        ...(logo === 'custom' ? { boxShadow: 'none', background: 'transparent' } : {})
                      }}
                    >
                      {/* CARD FRONT (Premium Restaurant Card Design) */}
                      <div 
                        className={`card-face card-face-front ${logo === 'custom' ? '' : (cardColor === 'white' ? 'white-card' : 'realistic-restaurant-card')}`} 
                        style={logo === 'custom' ? { background: 'transparent', backgroundColor: 'transparent', border: 'none', outline: 'none', boxShadow: 'none', padding: 0 } : {}}
                      >
                        {logo === 'custom' ? (
                          <img 
                            src={`${import.meta.env.BASE_URL}card-front.png`} 
                            alt="Реален пример Предна страна" 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover', 
                              borderRadius: '16px', 
                              border: 'none',
                              outline: 'none',
                              background: 'transparent',
                              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)' 
                            }} 
                          />
                        ) : (
                          <>
                            {/* Holographic Sheen Layer */}
                            <div className="card-holographic-sheen" />

                            {/* Metallic Gold Border Inner Accent */}
                            <div className="card-gold-inner-border" />

                            {/* TOP ROW: Restaurant Logo & Name + Contactless NFC Pass Badge */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ 
                                  width: '28px', height: '28px', borderRadius: '7px', 
                                  background: 'rgba(245, 158, 11, 0.15)', border: '1.5px solid #f59e0b',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                                }}>
                                  {getLogoIcon(18)}
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.48rem', color: '#f59e0b', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', lineHeight: 1 }}>
                                    РЕСТОРАНТ
                                  </div>
                                  <div style={{ fontSize: '0.8rem', color: cardColor === 'white' ? '#0f172a' : '#ffffff', fontWeight: 900, letterSpacing: '0.5px', lineHeight: 1.2 }}>
                                    {customText || 'Име на заведение'}
                                  </div>
                                </div>
                              </div>

                              {/* Contactless NFC Waves Badge */}
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '4px',
                                padding: '0.15rem 0.45rem',
                                background: 'rgba(245, 158, 11, 0.12)',
                                border: '1px solid rgba(245, 158, 11, 0.35)',
                                borderRadius: '99px'
                              }}>
                                <span style={{ fontSize: '0.42rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.8px' }}>NFC PASS</span>
                              </div>
                            </div>

                            {/* CENTER ROW: Standard Mode */}
                            <div style={{ margin: '4px 0', textTransform: 'uppercase', zIndex: 2, textAlign: 'center' }}>
                              <div style={{ 
                                fontSize: '0.85rem', 
                                fontWeight: 900, 
                                letterSpacing: '1.2px',
                                color: cardColor === 'white' ? '#0f172a' : '#ffffff',
                                background: cardColor === 'white' 
                                  ? 'none' 
                                  : 'linear-gradient(135deg, #ffffff 0%, #fbbf24 60%, #d97706 100%)',
                                WebkitBackgroundClip: cardColor === 'white' ? 'unset' : 'text',
                                WebkitTextFillColor: cardColor === 'white' ? '#0f172a' : 'transparent',
                                lineHeight: 1.1,
                                textShadow: cardColor === 'white' ? 'none' : '0 2px 4px rgba(0,0,0,0.8)'
                              }}>
                                ОЦЕНИ ОБСЛУЖВАНЕТО
                              </div>
                              <div style={{ fontSize: '0.48rem', color: cardColor === 'white' ? '#475569' : 'rgba(255,255,255,0.7)', letterSpacing: '0.8px', marginTop: '2px', fontWeight: 700 }}>
                                NFC SMART TOUCH CARD
                              </div>
                            </div>

                            {/* BOTTOM ROW: Serial & Contactless Waves + TipTap Badge */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                              <div style={{ fontSize: '0.45rem', color: '#f59e0b', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>
                                CARD ID: LED-2026-NFC
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Wifi size={14} style={{ transform: 'rotate(90deg)', color: '#f59e0b' }} />
                                <span style={{ fontSize: '0.5rem', opacity: 0.7, fontWeight: 800 }}>TipTap</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* CARD BACK (Matching Front Face Luxury Design) */}
                      <div 
                        className={`card-face card-face-back ${logo === 'custom' ? '' : (cardColor === 'white' ? 'white-card' : 'realistic-restaurant-card')}`} 
                        style={logo === 'custom' ? { background: 'transparent', backgroundColor: 'transparent', border: 'none', outline: 'none', boxShadow: 'none', padding: 0 } : {}}
                      >
                        {logo === 'custom' ? (
                          <img 
                            src={`${import.meta.env.BASE_URL}card-back.png`} 
                            alt="Реален пример Задна страна" 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover', 
                              borderRadius: '16px', 
                              border: 'none',
                              outline: 'none',
                              background: 'transparent',
                              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)' 
                            }} 
                          />
                        ) : (
                          <>
                            {/* Holographic Sheen Layer */}
                            <div className="card-holographic-sheen" />

                            {/* Metallic Gold Border Inner Accent */}
                            <div className="card-gold-inner-border" />

                            {/* TOP ROW: Gold Star Badge & Scan NFC Label */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                <span style={{ fontSize: '0.52rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                                  ОЦЕНКА &amp; БАКШИШ
                                </span>
                              </div>
                              <span style={{ fontSize: '0.45rem', color: cardColor === 'white' ? '#64748b' : 'rgba(255,255,255,0.7)', fontWeight: 800, letterSpacing: '0.5px' }}>
                                SCAN OR TOUCH NFC
                              </span>
                            </div>

                            {/* CENTER ROW: Designer QR Code Container */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2, margin: '2px 0' }}>
                              <div style={{ 
                                padding: '4px', 
                                background: '#ffffff', 
                                borderRadius: '10px', 
                                display: 'inline-flex',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                                border: '1.5px solid rgba(245, 158, 11, 0.6)'
                              }}>
                                <RealisticQrCode size={58} color="#0f172a" logoCenter={true} />
                              </div>
                              <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '0.52rem', fontWeight: 800, color: cardColor === 'white' ? '#0f172a' : '#ffffff', margin: 0, letterSpacing: '0.3px' }}>
                                  Оценете Вашия сервитьор тук
                                </p>
                              </div>
                            </div>

                            {/* BOTTOM ROW: Serial & TipTap Auth Hologram */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                              <div style={{ fontSize: '0.45rem', color: '#f59e0b', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>
                                CARD ID: LED-2026-NFC
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Wifi size={14} style={{ transform: 'rotate(90deg)', color: '#f59e0b' }} />
                                <span style={{ fontSize: '0.5rem', opacity: 0.7, fontWeight: 800 }}>TipTap</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Preview */}
              <div style={{ display: 'flex', gap: '1rem', zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                {(type === 'card' || type === 'both') && (
                  <button 
                    type="button"
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <RotateCw size={16} /> Обърни картата
                  </button>
                )}

                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                  * Поставете курсора върху обектите, за да ги въртите в 3D
                </span>
              </div>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: Customization Controls Form */}
        <form onSubmit={handleOrder} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3>Конфигурирайте Поръчката</h3>

          {/* Type selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Тип Продукт
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                className={`btn ${type === 'card' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.85rem', padding: '0.6rem 0.5rem' }}
                onClick={() => setType('card')}
              >
                NFC Карта (€4.90)
              </button>
              <button
                type="button"
                className={`btn ${type === 'stand' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.85rem', padding: '0.6rem 0.5rem' }}
                onClick={() => setType('stand')}
              >
                NFC Табелка (€6.90)
              </button>
              <button
                type="button"
                className={`btn ${type === 'both' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.85rem', padding: '0.6rem 0.5rem' }}
                onClick={() => setType('both')}
              >
                И двете (€11.80)
              </button>
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Цвят на Матовото Покритие
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: '#111',
                  color: '#fff',
                  border: cardColor === 'black' ? '2px solid var(--accent-purple)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => setCardColor('black')}
              >
                Матово Черно
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: '#f8fafc',
                  color: '#0f172a',
                  border: cardColor === 'white' ? '2px solid var(--accent-purple)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => setCardColor('white')}
              >
                Матово Бяло
              </button>
            </div>
          </div>

          {/* Brand Custom Text */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Име на заведението
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Напр. Ресторант Леденика"
            />
          </div>

          {/* Logo Icon Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Стил на Бранд Иконата
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
              {[
                { id: 'utensils', label: 'Прибори', icon: <Utensils size={18} /> },
                { id: 'coffee', label: 'Кафе', icon: <Coffee size={18} /> },
                { id: 'wine', label: 'Напитки', icon: <GlassWater size={18} /> },
                { id: 'custom', label: 'Дизайн по ваш избор (+5€)', icon: <IconPrismStar size={18} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  style={{
                    padding: '0.6rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: logo === item.id ? 'var(--accent-purple-glow)' : 'rgba(255,255,255,0.03)',
                    border: logo === item.id ? '1.5px solid var(--accent-purple)' : '1px solid var(--border-light)',
                    color: logo === item.id ? '#f59e0b' : '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.78rem',
                    fontWeight: logo === item.id ? 700 : 500
                  }}
                  onClick={() => setLogo(item.id)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Количество (броя)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--accent-purple)' }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: 700, minWidth: '45px', textAlign: 'right' }}>
                {quantity} бр.
              </span>
            </div>
          </div>

          {/* Pricing summary */}
          <div style={{ 
            borderTop: '1px solid var(--border-light)', 
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>
                Обща цена {logo === 'custom' && <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>(+€5.00/бр. индивидуален дизайн)</span>}
              </span>
              <span style={{ fontSize: '1.75rem', fontWeight: 800 }} className="text-gradient-purple">
                €{getPrice().toFixed(2)}
              </span>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
              Поръчай Сега <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* NFC CHECKOUT & ONBOARDING MODAL */}
      <NfcCheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSuccessOrder={handleCheckoutSuccess}
        productConfig={{
          type,
          cardColor,
          quantity,
          customText,
          logo,
          totalPrice: getPrice()
        }}
      />
    </div>
  );
};
