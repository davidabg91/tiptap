import React, { useState } from 'react';
import { 
  CustomCheckCircle as CheckCircle2, 
  CustomArrowRight as ArrowRight,
  CustomX as XMark,
  CustomShieldCheck as ShieldCheck,
  GoogleLogoIcon,
  AppleLogoIcon
} from './CustomIcons';
import { IconEuroChip, IconNfcChip } from './CustomIcons';

interface NfcCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessOrder: (orderDetails: any) => void;
  productConfig: {
    type: 'card' | 'stand' | 'both';
    cardColor: 'black' | 'white';
    quantity: number;
    customText: string;
    logo: string;
    totalPrice: number;
  };
}

export const NfcCheckoutModal: React.FC<NfcCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccessOrder,
  productConfig
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [venueName, setVenueName] = useState('Ресторант Леденика');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Shipping State
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [courierOffice, setCourierOffice] = useState('Офис на Еконт / Спиди');
  const [shippingNotes, setShippingNotes] = useState('');

  // Logo & Design Notes State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [designNotes, setDesignNotes] = useState('');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoFileName(file.name);
    }
  };

  const handleFinalPay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onSuccessOrder({
        fullName,
        venueName,
        email,
        phone,
        city,
        address,
        logoFileName,
        designNotes,
        paymentMethod,
        totalPrice: productConfig.totalPrice,
        quantity: productConfig.quantity
      });
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      background: 'rgba(8, 8, 16, 0.92)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '94vh',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, rgba(18, 18, 36, 0.99) 0%, rgba(10, 10, 24, 1) 100%)',
        border: '1.5px solid rgba(139, 92, 246, 0.5)',
        borderRadius: '28px',
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(139, 92, 246, 0.3)',
        padding: '2.2rem 2rem',
        color: '#fff'
      }}>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-secondary)',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <XMark size={18} />
        </button>

        {/* STEP PROGRESS BAR */}
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1.8rem', gap: '0.5rem' }}>
          {[
            { num: 1, label: '1. Акаунт' },
            { num: 2, label: '2. Адрес' },
            { num: 3, label: '3. Лого & Дизайн' },
            { num: 4, label: '4. Плащане' }
          ].map((s) => (
            <div 
              key={s.num}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: '99px',
                textAlign: 'center',
                fontSize: '0.78rem',
                fontWeight: 800,
                background: step >= s.num ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.04)',
                border: step >= s.num ? '1px solid var(--accent-purple)' : '1px solid var(--border-light)',
                color: step >= s.num ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.25s ease'
              }}
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* SUMMARY BADGE */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '16px',
          padding: '0.85rem 1.2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.8rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase' }}>ПОРЪЧКА НА NFC ПРОДУКТИ:</span>
            <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>
              {productConfig.quantity}x {productConfig.type === 'card' ? 'NFC Карти' : productConfig.type === 'stand' ? 'Настолни Табелки' : 'Комплекта (Карта + Табелка)'} ({productConfig.cardColor === 'black' ? 'Черен' : 'Бял'} Цвят)
            </strong>
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--green)' }}>
            €{productConfig.totalPrice.toFixed(2)}
          </span>
        </div>

        {/* STEP 1: REGISTRATION & ACCOUNT DETAILS */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
              Стъпка 1: Регистрация на Акаунт за Управителя
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
              Въведете вашите данни или влезте бързо с 1 клик с профила си.
            </p>

            {/* QUICK SOCIAL SIGN-IN WITH REAL SVG LOGOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <button
                type="button"
                onClick={() => {
                  setFullName('Георги Иванов');
                  setVenueName('Ресторант Леденика');
                  setEmail('manager@ledenika-restaurant.bg');
                  setPhone('+359 888 123 456');
                }}
                style={{
                  padding: '0.65rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <GoogleLogoIcon size={18} /> Вход с Google
              </button>
              <button
                type="button"
                onClick={() => {
                  setFullName('Георги Иванов');
                  setVenueName('Ресторант Леденика');
                  setEmail('manager@ledenika-restaurant.bg');
                  setPhone('+359 888 123 456');
                }}
                style={{
                  padding: '0.65rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <AppleLogoIcon size={18} color="#ffffff" /> Вход с Apple ID
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Или въведете ръчно</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Име и Фамилия на Управителя *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="напр. Георги Иванов"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Име на Заведението *
                  </label>
                  <input 
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Телефонен Номер *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+359 888 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Имейл Адрес *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="manager@restaurant.bg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Парола за Вход *
                  </label>
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.8rem', justifyContent: 'center' }}
                onClick={() => setStep(2)}
              >
                Продължи към Адрес за Доставка <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SHIPPING ADDRESS */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
              Стъпка 2: Адрес за Доставка на Картите
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.4rem' }}>
              Въведете града и адреса за куриерската доставка (Еконт или Спиди).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Град / Населено Място *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="напр. София"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Куриер / Доставка *
                  </label>
                  <select
                    value={courierOffice}
                    onChange={(e) => setCourierOffice(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-light)',
                      background: '#121026',
                      color: '#fff',
                      outline: 'none'
                    }}
                  >
                    <option value="Офис на Еконт">Офис на Еконт</option>
                    <option value="Офис на Спиди">Офис на Спиди</option>
                    <option value="Точен адрес на заведението">Точен адрес на заведението</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Точен Адрес или Име на Куриерския Офис *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="напр. ул. Раковска 12 или Еконт Офис Граф Игнатиев"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                  Инструкции за Куриера (Опционално)
                </label>
                <textarea 
                  rows={2}
                  placeholder="Доставка до управителя след 11:00 часа..."
                  value={shippingNotes}
                  onChange={(e) => setShippingNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  className="btn ios-glass-btn-secondary"
                  style={{ flex: 1, padding: '0.85rem' }}
                  onClick={() => setStep(1)}
                >
                  Назад
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 2, padding: '0.85rem', justifyContent: 'center' }}
                  onClick={() => setStep(3)}
                >
                  Продължи към Качване на Лого <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: UPLOAD LOGO & DESIGN INSTRUCTIONS */}
        {step === 3 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
              Стъпка 3: Качване на Вашето Лого &amp; Инструкции
            </h3>

            {productConfig.logo === 'custom' ? (
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #f59e0b',
                borderRadius: '16px',
                padding: '0.85rem 1.2rem',
                marginBottom: '1.2rem',
                color: '#f59e0b',
                fontSize: '0.85rem',
                fontWeight: 800
              }}>
                 Опцията "Дизайн по ваш избор (+5€)" е избрана! Прикачете Вашето лого и въведете бележките за дизайнера по-долу.
              </div>
            ) : (
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px dashed var(--border-light)',
                borderRadius: '16px',
                padding: '0.9rem 1.2rem',
                marginBottom: '1.2rem',
                color: 'var(--text-secondary)',
                fontSize: '0.84rem'
              }}>
                🔒 <strong>Стандартна икона (без оскъпяване):</strong> Качването на авторско лого и бележките към дизайнера са отключени <strong>само при избор на "Дизайн по ваш избор (+5€)"</strong> от конфигуратора.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* File Drag & Drop Box */}
              <div style={{
                border: productConfig.logo === 'custom' ? '2px dashed #f59e0b' : '1px dashed var(--border-light)',
                borderRadius: '18px',
                padding: '1.8rem',
                textAlign: 'center',
                background: productConfig.logo === 'custom' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)',
                opacity: productConfig.logo === 'custom' ? 1 : 0.45,
                cursor: productConfig.logo === 'custom' ? 'pointer' : 'not-allowed',
                position: 'relative'
              }}>
                {productConfig.logo === 'custom' && (
                  <input 
                    type="file" 
                    accept="image/*,.pdf,.svg,.ai,.eps"
                    onChange={handleFileUpload}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                )}
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.4rem' }}>
                  {productConfig.logo === 'custom' ? '📁' : '🔒'}
                </span>
                <strong style={{ color: '#fff', display: 'block', fontSize: '0.98rem' }}>
                  {productConfig.logo === 'custom' 
                    ? (logoFileName ? `Прикачен файл: ${logoFileName}` : 'Натиснете тук за качване на Вашето Лого')
                    : 'Качването на лого е заключено (Изисква "Дизайн по ваш избор")'
                  }
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {productConfig.logo === 'custom' ? 'Поддържани формати: PNG, SVG, JPG, PDF (До 25MB)' : 'Изберете "Дизайн по ваш избор (+5€)" в конфигуратора, за да качите файл.'}
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: productConfig.logo === 'custom' ? '#f59e0b' : 'var(--text-muted)' }}>
                  Бележки към дизайнера / Допълнителен Текст {productConfig.logo === 'custom' ? '(ОТКЛЮЧЕНО)' : '(ЗАКЛЮЧЕНО)'}
                </label>
                <textarea 
                  rows={3}
                  disabled={productConfig.logo !== 'custom'}
                  placeholder={
                    productConfig.logo === 'custom'
                      ? "Искам логото да е в златист цвят в центъра, а под него надпис 'Ресторант Леденика'..."
                      : "Полето е отключено само ако сте избрали 'Дизайн по ваш избор (+5€)' в конфигуратора."
                  }
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: productConfig.logo === 'custom' ? '1px solid #f59e0b' : '1px solid var(--border-light)',
                    background: productConfig.logo === 'custom' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255,255,255,0.02)',
                    color: productConfig.logo === 'custom' ? '#fff' : 'var(--text-muted)',
                    outline: 'none',
                    resize: 'none',
                    cursor: productConfig.logo === 'custom' ? 'text' : 'not-allowed',
                    opacity: productConfig.logo === 'custom' ? 1 : 0.5
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  className="btn ios-glass-btn-secondary"
                  style={{ flex: 1, padding: '0.85rem' }}
                  onClick={() => setStep(2)}
                >
                  Назад
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 2, padding: '0.85rem', justifyContent: 'center' }}
                  onClick={() => setStep(4)}
                >
                  Продължи към Плащане <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT SELECTION & ORDER COMPLETION */}
        {step === 4 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
              Стъпка 4: Избор на Метод за Плащане
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.4rem' }}>
              Завършете поръчката сигурно. Картите ще бъдат изработени и доставени за 2-4 дни.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Option 1: Card / Apple Pay */}
              <div 
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '1.1rem 1.4rem',
                  borderRadius: '16px',
                  border: paymentMethod === 'card' ? '2px solid var(--accent-purple)' : '1px solid var(--border-light)',
                  background: paymentMethod === 'card' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <strong style={{ color: '#fff', fontSize: '1rem', display: 'block' }}>💳 Плащане с Карта / Apple Pay / Google Pay</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Мигновено потвърждение &amp; приоритетна изработка</span>
                </div>
                {paymentMethod === 'card' && <CheckCircle2 color="var(--green)" size={22} />}
              </div>

              {/* Option 2: Bank Transfer */}
              <div 
                onClick={() => setPaymentMethod('bank')}
                style={{
                  padding: '1.1rem 1.4rem',
                  borderRadius: '16px',
                  border: paymentMethod === 'bank' ? '2px solid var(--accent-purple)' : '1px solid var(--border-light)',
                  background: paymentMethod === 'bank' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <strong style={{ color: '#fff', fontSize: '1rem', display: 'block' }}>🏛️ Банков Превод (Фактура за Фирма)</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Автоматично издаване на фактура с ДДС</span>
                </div>
                {paymentMethod === 'bank' && <CheckCircle2 color="var(--green)" size={22} />}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className="btn ios-glass-btn-secondary"
                style={{ flex: 1, padding: '0.85rem' }}
                onClick={() => setStep(3)}
              >
                Назад
              </button>
              <button
                className="btn btn-primary"
                disabled={isProcessing}
                style={{ flex: 2, padding: '0.85rem', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                onClick={handleFinalPay}
              >
                {isProcessing ? 'Обработка на плащането...' : `Потвърди & Заплати €${productConfig.totalPrice.toFixed(2)}`}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '1.2rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--green)" /> 256-Bit SSL Защита на плащането • Издаване на фактура
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
