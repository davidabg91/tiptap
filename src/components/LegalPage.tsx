import React, { useState } from 'react';

type LegalTab = 'terms' | 'privacy' | 'cookies' | 'withdrawal' | 'imprint';

interface LegalPageProps {
  initialTab?: LegalTab;
}

const COMPANY = 'ДАВИДА БГ ЕООД';
const EIK = '204356138';
const ADDRESS = 'жк. "Сторгозия", ул. „Цар Самуил" - паркинга срещу бл. 34А, 5802 гр. Плевен, България';
const EMAIL = 'legal@tiptap.bg';
const SUPPORT_EMAIL = 'support@tiptap.bg';
const PHONE = '+359 888 123 456';
const MANAGER = 'Дейвид Василев Димитров';
const DPA = 'Комисия за защита на личните данни (КЗЛД), ул. Проф. Цветан Лазаров № 2, 1592 Sofia, https://www.cpdp.bg';

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'terms' }) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  const tabs: { id: LegalTab; label: string; emoji: string }[] = [
    { id: 'terms', label: 'Общи Условия', emoji: '📜' },
    { id: 'privacy', label: 'Поверителност (GDPR)', emoji: '🔒' },
    { id: 'cookies', label: 'Бисквитки', emoji: '🍪' },
    { id: 'withdrawal', label: 'Право на Отказ', emoji: '↩️' },
    { id: 'imprint', label: 'Импресум', emoji: '🏢' },
  ];

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem',
  };
  const h2Style: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: '#f59e0b',
    marginBottom: '0.75rem',
    fontFamily: 'var(--font-display)',
    borderLeft: '3px solid #f59e0b',
    paddingLeft: '0.75rem',
  };
  const h3Style: React.CSSProperties = {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '0.5rem',
    marginTop: '1rem',
  };
  const pStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    lineHeight: 1.8,
    marginBottom: '0.75rem',
  };
  const ulStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    lineHeight: 1.8,
    paddingLeft: '1.5rem',
    marginBottom: '0.75rem',
  };
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  };
  const thStyle: React.CSSProperties = {
    background: 'rgba(139, 92, 246, 0.2)',
    color: '#fff',
    padding: '0.6rem 1rem',
    textAlign: 'left',
    border: '1px solid rgba(255,255,255,0.1)',
  };
  const tdStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    padding: '0.6rem 1rem',
    border: '1px solid rgba(255,255,255,0.07)',
    verticalAlign: 'top',
  };

  const today = new Date().toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '5rem 4vw 4rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            padding: '0.35rem 1.1rem',
            borderRadius: '99px',
            marginBottom: '1rem',
            fontSize: '0.8rem',
            color: '#f59e0b',
            fontWeight: 700,
          }}>
            ⚖️ Правна Информация
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
            Правни документи на <span style={{ color: 'var(--accent-purple)' }}>TipTap</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Последна актуализация: {today} · Всички документи са съобразени с българското и европейското законодателство.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '2.5rem',
        }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '99px',
                border: tab === t.id ? '1.5px solid var(--accent-purple)' : '1px solid var(--border-light)',
                background: tab === t.id ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.04)',
                color: tab === t.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div style={{
          background: 'rgba(18, 18, 36, 0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '2.5rem 2.5rem',
          backdropFilter: 'blur(20px)',
        }}>

          {/* ===== ОБЩИ УСЛОВИЯ ===== */}
          {tab === 'terms' && (
            <div>
              <h2 style={{ ...h2Style, color: '#fff', borderLeft: 'none', paddingLeft: 0, fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Общи Условия за Ползване
              </h2>
              <p style={{ ...pStyle, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Валидни от {today} · {COMPANY}, ЕИК {EIK}
              </p>

              <div style={sectionStyle}>
                <h2 style={h2Style}>1. Страни по договора</h2>
                <p style={pStyle}>
                  Настоящите Общи условия уреждат отношенията между <strong style={{ color: '#fff' }}>{COMPANY}</strong> (наричано по-долу „Доставчик") и всяко физическо или юридическо лице (наричано по-долу „Потребител"), което използва платформата TipTap, достъпна на адрес tiptap.bg.
                </p>
                <p style={pStyle}>Данни на Доставчика:</p>
                <ul style={ulStyle}>
                  <li>Фирма: {COMPANY}</li>
                  <li>ЕИК: {EIK}</li>
                  <li>Адрес: {ADDRESS}</li>
                  <li>Email: {EMAIL}</li>
                  <li>Регистриран по ЗДДС: Да</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>2. Предмет на услугата</h2>
                <p style={pStyle}>TipTap предоставя:</p>
                <ul style={ulStyle}>
                  <li><strong style={{ color: '#fff' }}>NFC хардуер</strong> – персонализирани карти и настолни табелки с вграден NFC чип, позволяващи безконтактно пренасочване към система за оценяване и бакшиш.</li>
                  <li><strong style={{ color: '#fff' }}>SaaS платформа</strong> – облачен софтуер за управление на отзиви, сервитьорски профили, бакшиши и аналитика (абонаментен достъп).</li>
                  <li><strong style={{ color: '#fff' }}>Клиентски портал</strong> – безплатна уеб страница, достъпна при сканиране на NFC продукта, без изискване за инсталация на приложение.</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>3. Сключване на договор</h2>
                <p style={pStyle}>Договорът между Доставчика и Потребителя се счита за сключен в момента, в който:</p>
                <ul style={ulStyle}>
                  <li>Потребителят попълни и изпрати формата за поръчка на NFC продукти, и</li>
                  <li>Получи електронно потвърждение от Доставчика на посочения имейл адрес.</li>
                </ul>
                <p style={pStyle}>За абонаментните услуги – при успешна регистрация и активиране на акаунт.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>4. Цени и плащания</h2>
                <p style={pStyle}>Всички цени са обявени в евро (EUR) и включват ДДС, освен ако изрично не е упоменато друго.</p>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Продукт</th>
                      <th style={thStyle}>Единична цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style={tdStyle}>NFC Карта (стандартен дизайн)</td><td style={tdStyle}>€4.90 / бр.</td></tr>
                    <tr><td style={tdStyle}>Настолна Табелка</td><td style={tdStyle}>€6.90 / бр.</td></tr>
                    <tr><td style={tdStyle}>Комплект (Карта + Табелка)</td><td style={tdStyle}>€11.80 / бр.</td></tr>
                    <tr><td style={tdStyle}>Дизайн по ваш избор (собствено лого)</td><td style={tdStyle}>+€5.00 еднократно</td></tr>
                    <tr><td style={tdStyle}>Абонамент Start (месечно)</td><td style={tdStyle}>€19.99 / месец</td></tr>
                    <tr><td style={tdStyle}>Абонамент Start (годишно)</td><td style={tdStyle}>€15.99 / месец</td></tr>
                    <tr><td style={tdStyle}>Абонамент Premium (месечно)</td><td style={tdStyle}>€39.99 / месец</td></tr>
                    <tr><td style={tdStyle}>Абонамент Premium (годишно)</td><td style={tdStyle}>€31.99 / месец</td></tr>
                  </tbody>
                </table>
                <p style={pStyle}>Приетите методи за плащане са: банкова карта (Visa, Mastercard), Apple Pay, Google Pay и банков превод. Плащането се обработва чрез сертифициран платежен доставчик (Stripe). TipTap не съхранява данни за банкови карти.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>5. Доставка</h2>
                <p style={pStyle}>NFC продуктите се изработват и доставят в срок от <strong style={{ color: '#fff' }}>2–5 работни дни</strong> след потвърдено плащане. Доставката се извършва чрез Еконт или Спиди на посочен от Потребителя адрес в България. За поръчки над €50 – доставката е безплатна. За поръчки под €50 – доставката е за сметка на Потребителя по тарифата на куриера.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>6. Отговорност и ограничения</h2>
                <p style={pStyle}>Доставчикът не носи отговорност за:</p>
                <ul style={ulStyle}>
                  <li>Неправомерно съдържание, публикувано от Потребителя в системата;</li>
                  <li>Прекъсвания, причинени от форсмажорни обстоятелства или действия на трети страни;</li>
                  <li>Загуба на данни, дължаща се на действия на Потребителя.</li>
                </ul>
                <p style={pStyle}>Отговорността на Доставчика е ограничена до размера на платените от Потребителя суми за съответния период.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>7. Интелектуална собственост</h2>
                <p style={pStyle}>Всички материали, дизайни, кодове, лога и съдържание на платформата TipTap са изключителна собственост на {COMPANY} и са защитени от авторското право. Забранено е копирането, разпространяването или модифицирането без изрично писмено съгласие.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>8. Приложимо право и спорове</h2>
                <p style={pStyle}>Настоящите Общи условия се уреждат от българското законодателство. При спорове страните се стремят към извънсъдебно решаване. Потребителите имат право да сезират Комисията за защита на потребителите (КЗП) или Платформата за онлайн решаване на спорове на ЕС (ORS): <strong style={{ color: '#f59e0b' }}>https://ec.europa.eu/consumers/odr/</strong></p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>9. Промени в условията</h2>
                <p style={pStyle}>Доставчикът си запазва правото да изменя Общите условия. Промените влизат в сила 14 дни след публикуването им и уведомяване на регистрираните потребители по имейл.</p>
              </div>
            </div>
          )}

          {/* ===== ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ (GDPR) ===== */}
          {tab === 'privacy' && (
            <div>
              <h2 style={{ ...h2Style, color: '#fff', borderLeft: 'none', paddingLeft: 0, fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Политика за Защита на Личните Данни
              </h2>
              <p style={{ ...pStyle, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Съобразена с Регламент (ЕС) 2016/679 (GDPR) · Валидна от {today}
              </p>

              <div style={sectionStyle}>
                <h2 style={h2Style}>1. Администратор на лични данни</h2>
                <ul style={ulStyle}>
                  <li>Наименование: {COMPANY}</li>
                  <li>ЕИК: {EIK}</li>
                  <li>Адрес: {ADDRESS}</li>
                  <li>Email на длъжностно лице по защита на данните (DPO): {EMAIL}</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>2. Какви лични данни събираме</h2>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Категория данни</th>
                      <th style={thStyle}>Примери</th>
                      <th style={thStyle}>Цел</th>
                      <th style={thStyle}>Правно основание</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tdStyle}>Идентификационни данни</td>
                      <td style={tdStyle}>Имена, имейл, телефон</td>
                      <td style={tdStyle}>Регистрация на акаунт, изпълнение на поръчка</td>
                      <td style={tdStyle}>Чл. 6, § 1, б. "б" – изпълнение на договор</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Адресни данни</td>
                      <td style={tdStyle}>Адрес за доставка, град</td>
                      <td style={tdStyle}>Доставка на NFC продукти</td>
                      <td style={tdStyle}>Чл. 6, § 1, б. "б" – изпълнение на договор</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Финансови данни</td>
                      <td style={tdStyle}>Вид на плащане (не съхраняваме карти)</td>
                      <td style={tdStyle}>Обработка на плащане</td>
                      <td style={tdStyle}>Чл. 6, § 1, б. "б" – изпълнение на договор</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Данни за използване</td>
                      <td style={tdStyle}>IP адрес, браузър, посетени страници</td>
                      <td style={tdStyle}>Сигурност, аналитика, подобряване на услугата</td>
                      <td style={tdStyle}>Чл. 6, § 1, б. "е" – легитимен интерес</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Маркетингови данни</td>
                      <td style={tdStyle}>Имейл за newsletter</td>
                      <td style={tdStyle}>Изпращане на промоционални съобщения</td>
                      <td style={tdStyle}>Чл. 6, § 1, б. "а" – съгласие</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>3. Вашите права по GDPR</h2>
                <p style={pStyle}>Като субект на данни имате следните права:</p>
                <ul style={ulStyle}>
                  <li><strong style={{ color: '#fff' }}>Право на достъп</strong> – да получите копие от данните, които обработваме за вас.</li>
                  <li><strong style={{ color: '#fff' }}>Право на коригиране</strong> – да поискате поправка на неточни данни.</li>
                  <li><strong style={{ color: '#fff' }}>Право на изтриване ("право да бъдеш забравен")</strong> – при определени условия.</li>
                  <li><strong style={{ color: '#fff' }}>Право на ограничаване на обработването</strong> – при оспорване на точността или законосъобразността.</li>
                  <li><strong style={{ color: '#fff' }}>Право на преносимост</strong> – да получите данните си в структуриран, машинночетим формат.</li>
                  <li><strong style={{ color: '#fff' }}>Право на възражение</strong> – срещу обработване на основание легитимен интерес или за директен маркетинг.</li>
                  <li><strong style={{ color: '#fff' }}>Право на оттегляне на съгласие</strong> – по всяко време без да засяга законосъобразността на предходното обработване.</li>
                  <li><strong style={{ color: '#fff' }}>Право на жалба</strong> – пред надзорния орган: {DPA}</li>
                </ul>
                <p style={pStyle}>За упражняване на правата си пишете на: <strong style={{ color: '#f59e0b' }}>{EMAIL}</strong>. Ние ще отговорим в срок от 30 дни.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>4. Срокове за съхранение на данните</h2>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Категория</th>
                      <th style={thStyle}>Срок на съхранение</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style={tdStyle}>Договорни данни (поръчки, фактури)</td><td style={tdStyle}>10 години (счетоводни изисквания)</td></tr>
                    <tr><td style={tdStyle}>Акаунт данни</td><td style={tdStyle}>До изтриване на акаунта + 30 дни</td></tr>
                    <tr><td style={tdStyle}>Маркетингово съгласие</td><td style={tdStyle}>До оттегляне на съгласието</td></tr>
                    <tr><td style={tdStyle}>Технически логове</td><td style={tdStyle}>90 дни</td></tr>
                  </tbody>
                </table>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>5. Предаване на данни на трети страни</h2>
                <p style={pStyle}>Данните ви могат да бъдат предадени на следните категории получатели:</p>
                <ul style={ulStyle}>
                  <li><strong style={{ color: '#fff' }}>Stripe Inc.</strong> – за обработка на плащания (сертифициран по PCI DSS).</li>
                  <li><strong style={{ color: '#fff' }}>Куриерски компании</strong> (Еконт, Спиди) – само адрес за доставка.</li>
                  <li><strong style={{ color: '#fff' }}>Google LLC</strong> – Google Analytics (с анонимизирани IP адреси).</li>
                  <li><strong style={{ color: '#fff' }}>Държавни органи</strong> – при законово изискване.</li>
                </ul>
                <p style={pStyle}>Не продаваме и не споделяме данните ви с рекламни мрежи.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>6. Сигурност на данните</h2>
                <p style={pStyle}>Прилагаме следните технически и организационни мерки: SSL/TLS криптиране на всички комуникации, криптиране на бази данни в покой, контрол на достъпа на принципа на минималните привилегии, редовни одити на сигурността и обучение на персонала.</p>
              </div>
            </div>
          )}

          {/* ===== ПОЛИТИКА ЗА БИСКВИТКИ ===== */}
          {tab === 'cookies' && (
            <div>
              <h2 style={{ ...h2Style, color: '#fff', borderLeft: 'none', paddingLeft: 0, fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Политика за Бисквитки (Cookie Policy)
              </h2>
              <p style={{ ...pStyle, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Съобразена с Директива 2002/58/ЕО и GDPR · Валидна от {today}
              </p>

              <div style={sectionStyle}>
                <h2 style={h2Style}>1. Какво са бисквитки?</h2>
                <p style={pStyle}>Бисквитките (cookies) са малки текстови файлове, съхранявани в браузъра ви при посещение на уебсайт. Те позволяват на сайта да запомни вашите предпочитания и да подобри потребителското ви изживяване.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>2. Видове бисквитки, които използваме</h2>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Вид</th>
                      <th style={thStyle}>Наименование</th>
                      <th style={thStyle}>Цел</th>
                      <th style={thStyle}>Срок</th>
                      <th style={thStyle}>Съгласие</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tdStyle}>Задължителни</td>
                      <td style={tdStyle}>session_id, auth_token</td>
                      <td style={tdStyle}>Поддържане на сесия, автентикация</td>
                      <td style={tdStyle}>Сесия</td>
                      <td style={tdStyle}>Не се изисква</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Функционални</td>
                      <td style={tdStyle}>lang_pref, theme</td>
                      <td style={tdStyle}>Запомняне на езикови и визуални предпочитания</td>
                      <td style={tdStyle}>1 година</td>
                      <td style={tdStyle}>Не се изисква</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Аналитични</td>
                      <td style={tdStyle}>_ga, _gid (Google Analytics)</td>
                      <td style={tdStyle}>Анализ на трафика и поведението на потребителите</td>
                      <td style={tdStyle}>2 години</td>
                      <td style={tdStyle}>Изисква се</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Маркетингови</td>
                      <td style={tdStyle}>fbp (Facebook Pixel)</td>
                      <td style={tdStyle}>Ремаркетинг и реклама</td>
                      <td style={tdStyle}>90 дни</td>
                      <td style={tdStyle}>Изисква се</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>3. Управление на бисквитките</h2>
                <p style={pStyle}>Можете да управлявате или изтриете бисквитките по всяко време:</p>
                <ul style={ulStyle}>
                  <li><strong style={{ color: '#fff' }}>Чрез настройките на браузъра</strong> – Chrome, Firefox, Safari, Edge предоставят опции за блокиране или изтриване на бисквитки.</li>
                  <li><strong style={{ color: '#fff' }}>Чрез нашия банер за съгласие</strong> – при първо посещение на сайта.</li>
                  <li><strong style={{ color: '#fff' }}>Google Analytics Opt-out</strong> – <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" style={{ color: '#f59e0b' }}>tools.google.com/dlpage/gaoptout</a></li>
                </ul>
                <p style={pStyle}>Забележка: Деактивирането на задължителните бисквитки може да наруши функционалността на платформата.</p>
              </div>
            </div>
          )}

          {/* ===== ПРАВО НА ОТКАЗ ===== */}
          {tab === 'withdrawal' && (
            <div>
              <h2 style={{ ...h2Style, color: '#fff', borderLeft: 'none', paddingLeft: 0, fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Право на Отказ от Договора
              </h2>
              <p style={{ ...pStyle, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Съобразено с Директива 2011/83/ЕС и Закона за защита на потребителите (ЗЗП) · Валидно от {today}
              </p>

              <div style={sectionStyle}>
                <h2 style={h2Style}>1. Право на отказ за физически продукти (NFC карти и табелки)</h2>
                <p style={pStyle}>В съответствие с чл. 50 от ЗЗП, имате право да се откажете от поръчката без да посочвате причина в срок от <strong style={{ color: '#fff' }}>14 календарни дни</strong> от датата на получаване на продуктите.</p>

                <h3 style={h3Style}>Изключения (чл. 57 от ЗЗП)</h3>
                <p style={pStyle}>Правото на отказ НЕ се прилага за:</p>
                <ul style={ulStyle}>
                  <li>Персонализирани NFC продукти, изработени по конкретна поръчка на Потребителя (с качено лого, специфичен дизайн и/или текст), тъй като те не могат да бъдат върнати в продажбата след изработка.</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>2. Как да упражните правото си на отказ</h2>
                <p style={pStyle}>Изпратете писмено уведомление до {EMAIL} с:</p>
                <ul style={ulStyle}>
                  <li>Вашите имена и имейл</li>
                  <li>Номер на поръчката</li>
                  <li>Изявление, че се отказвате от поръчката</li>
                </ul>
                <p style={pStyle}>Можете да използвате стандартния формуляр за отказ по-долу.</p>

                {/* Стандартен формуляр */}
                <div style={{
                  border: '1px dashed rgba(245, 158, 11, 0.4)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  background: 'rgba(245, 158, 11, 0.05)',
                  marginTop: '1.5rem',
                }}>
                  <h3 style={{ ...h3Style, color: '#f59e0b', marginTop: 0 }}>Стандартен формуляр за упражняване на право на отказ</h3>
                  <p style={pStyle}>До: {COMPANY}, {ADDRESS}, {EMAIL}</p>
                  <p style={pStyle}>С настоящото уведомявам, че се отказвам от договора за покупка на следните стоки:</p>
                  <p style={pStyle}>Поръчано на: _________________ | Получено на: _________________</p>
                  <p style={pStyle}>Имена на потребителя: _________________</p>
                  <p style={pStyle}>Адрес на потребителя: _________________</p>
                  <p style={pStyle}>Подпис (при подаване на хартия): _________________</p>
                  <p style={pStyle}>Дата: _________________</p>
                </div>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>3. Последици от отказа</h2>
                <p style={pStyle}>При валиден отказ ще ви върнем платената сума, включително стандартните разходи за доставка, в срок от <strong style={{ color: '#fff' }}>14 дни</strong> от получаване на уведомлението, при условие че продуктите са върнати или доказателство за изпращане е предоставено. Разходите за връщане на продуктите са за сметка на Потребителя.</p>
                <p style={pStyle}>Възстановяването се извършва чрез същия метод на плащане, използван при поръчката.</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>4. Право на отказ за абонаментни услуги (SaaS)</h2>
                <p style={pStyle}>Можете да анулирате абонамента си по всяко време от потребителското си табло. Абонаментът остава активен до края на платения период. Не се издават частични възстановявания за незаползвано абонаментно време.</p>
                <p style={pStyle}>Безплатният 14-дневен пробен период може да бъде прекратен без никакви задължения в рамките на пробния период.</p>
              </div>
            </div>
          )}

          {/* ===== ИМПРЕСУМ ===== */}
          {tab === 'imprint' && (
            <div>
              <h2 style={{ ...h2Style, color: '#fff', borderLeft: 'none', paddingLeft: 0, fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Импресум / Правна Бележка
              </h2>
              <p style={{ ...pStyle, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Задължителна информация съгласно Закона за електронната търговия (ЗЕТ)
              </p>

              <div style={sectionStyle}>
                <h2 style={h2Style}>Данни на дружеството</h2>
                <table style={tableStyle}>
                  <tbody>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700, width: '35%' }}>Фирма</td><td style={tdStyle}>{COMPANY}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>ЕИК / Булстат</td><td style={tdStyle}>{EIK}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>ДДС номер</td><td style={tdStyle}>Не е регистрирано по ЗДДС</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Правна форма</td><td style={tdStyle}>Еднолично дружество с ограничена отговорност (ЕООД)</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Дата на регистрация</td><td style={tdStyle}>01.12.2016</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Седалище и адрес</td><td style={tdStyle}>{ADDRESS}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Управител</td><td style={tdStyle}>{MANAGER}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Регистрация</td><td style={tdStyle}>Търговски регистър към Агенция по вписванията</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Email</td><td style={tdStyle}>{EMAIL}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Поддръжка</td><td style={tdStyle}>{SUPPORT_EMAIL}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Телефон</td><td style={tdStyle}>{PHONE}</td></tr>
                    <tr><td style={{ ...tdStyle, color: '#fff', fontWeight: 700 }}>Работно време</td><td style={tdStyle}>Пон – Пет: 09:00 – 18:00 ч.</td></tr>
                  </tbody>
                </table>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>Надзорни органи</h2>
                <ul style={ulStyle}>
                  <li><strong style={{ color: '#fff' }}>Комисия за защита на потребителите (КЗП)</strong><br />гр. София 1000, пл. "Славейков" № 4А, тел.: 0700 111 22, www.kzp.bg</li>
                  <li style={{ marginTop: '0.75rem' }}><strong style={{ color: '#fff' }}>Комисия за защита на личните данни (КЗЛД)</strong><br />ул. Проф. Цветан Лазаров № 2, 1592 София, www.cpdp.bg</li>
                  <li style={{ marginTop: '0.75rem' }}><strong style={{ color: '#fff' }}>Комисия за регулиране на съобщенията (КРС)</strong><br />ул. Гурко № 6, 1000 София, www.crc.bg</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>Онлайн решаване на спорове (ОРС)</h2>
                <p style={pStyle}>Европейската комисия предоставя платформа за онлайн решаване на спорове (ОРС) между потребители и търговци:</p>
                <p style={{ ...pStyle }}>
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#f59e0b', textDecoration: 'underline' }}>
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p style={pStyle}>Нашият имейл за целите на ОРС: {EMAIL}</p>
              </div>

              <div style={sectionStyle}>
                <h2 style={h2Style}>Отговорност за съдържанието</h2>
                <p style={pStyle}>Съдържанието на tiptap.bg е изготвено с максимална грижа. Въпреки това {COMPANY} не носи отговорност за актуалността, пълнотата и точността на предоставената информация. Като доставчик на услуги сме отговорни за собственото съдържание на тези страници съгласно общото законодателство. Не сме длъжни да наблюдаваме предадена или съхранена чужда информация или да търсим обстоятелства, указващи незаконна дейност.</p>
              </div>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '20px',
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            Имате въпроси относно правните ни документи?
          </p>
          <a href={`mailto:${EMAIL}`} style={{
            color: '#f59e0b',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
          }}>
            {EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
};
