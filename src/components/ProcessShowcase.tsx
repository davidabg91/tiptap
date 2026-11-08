import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useInView, useMotionValue } from 'motion/react';
import './ProcessShowcase.css';

/**
 * "How it works" player: four steps on the left, an animated scene on the
 * right. Auto-advances while visible; pauses on hover / keyboard focus.
 * Motion respects the OS "reduce motion" setting (MotionConfig "user").
 */

const STEP_MS = 5200;

const STEPS = [
  {
    title: 'Гостът докосва картата',
    text: 'NFC картата идва със сметката. Едно докосване с телефона отваря страницата за оценка — без приложение и на езика на госта.',
  },
  {
    title: 'Оценява за секунди',
    text: 'Звезди, отметки и коментар. Невидима защита спира спама и фалшивите оценки.',
  },
  {
    title: 'Бакшиш и Google отзив',
    text: 'Доволният гост оставя бакшиш директно по сметката на сервитьора и отзив в Google — с едно докосване.',
  },
  {
    title: 'Вие научавате веднага',
    text: 'Ниска оценка? Известие в Telegram или по имейл още в същата минута, а всеки понеделник — седмичен отчет.',
  },
];

const spring = { type: 'spring', stiffness: 260, damping: 22 } as const;

function TapScene() {
  return (
    <div className="proc-scene">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="proc-ring"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 2.6, opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.8, delay: 1.05 + i * 0.35, repeat: Infinity, repeatDelay: 0.7, ease: 'easeOut' }}
        />
      ))}
      <motion.img
        className="proc-card"
        src={`${import.meta.env.BASE_URL}card-front-hero.webp`}
        alt=""
        initial={{ x: 150, y: 130, rotate: 22, opacity: 0 }}
        animate={{ x: 86, y: -70, rotate: -12, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.15 }}
      />
      <motion.div className="proc-phone" animate={{ y: [0, 0, 2, 0] }} transition={{ duration: 0.3, delay: 1, times: [0, 0.4, 0.7, 1] }}>
        <span className="proc-notch" />
        <motion.div
          className="proc-screen"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.45 }}
        >
          <span className="proc-pill">Ресторант Леденика</span>
          <strong className="proc-screen-title">Оценете обслужването</strong>
          <motion.span className="proc-avatar" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...spring, delay: 1.4 }}>МГ</motion.span>
          <span className="proc-name">Мария Георгиева</span>
          <span className="proc-lang">🌐 BG · EN · DE · RO · RU</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function RateScene() {
  return (
    <div className="proc-scene">
      <div className="proc-phone">
        <span className="proc-notch" />
        <div className="proc-screen">
          <strong className="proc-screen-title">Как беше обслужването?</strong>
          <div className="proc-stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span key={i} initial={{ scale: 0, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ ...spring, stiffness: 420, damping: 14, delay: 0.3 + i * 0.13 }}>
                ★
              </motion.span>
            ))}
          </div>
          <div className="proc-chips">
            {['Бързо', 'Любезно', 'Препоръки'].map((t, i) => (
              <motion.span key={t} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: 1.1 + i * 0.12 }}>
                {t}
              </motion.span>
            ))}
          </div>
          <motion.span className="proc-cta" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: 1.6 }}>
            Изпрати оценката
          </motion.span>
          <motion.span className="proc-done" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...spring, delay: 2.5 }}>
            ✓ Изпратено
          </motion.span>
        </div>
      </div>
      <motion.span className="proc-badge" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ...spring, delay: 2.1 }}>
        🛡 Защита от спам
      </motion.span>
    </div>
  );
}

function TipScene() {
  return (
    <div className="proc-scene is-column">
      <motion.div className="proc-panel" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ...spring, delay: 0.15 }}>
        <span className="proc-label">💜 Бакшиш за Мария</span>
        <div className="proc-amounts">
          {['€2', '€5', '€10'].map((a, i) => (
            <motion.span
              key={a}
              className={a === '€5' ? 'is-on' : ''}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1, scale: a === '€5' ? [1, 1.12, 1] : 1 }}
              transition={{ delay: 0.5 + i * 0.1, scale: { delay: 1.2, duration: 0.35 } }}
            >
              {a}
            </motion.span>
          ))}
        </div>
        <motion.span className="proc-pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          Към плащането · Revolut ↗
        </motion.span>
        <span className="proc-muted">Директно по сметката на сервитьора · 0% комисиона</span>
      </motion.div>
      <motion.div className="proc-panel is-gold" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ...spring, delay: 0.7 }}>
        <span className="proc-label">★ Google</span>
        <strong>Напишете отзив в Google</strong>
        <span className="proc-muted">Помага на нови гости да ви открият</span>
      </motion.div>
    </div>
  );
}

function AlertScene() {
  const rows: [string, number][] = [['Сканирания', 100], ['Оценки', 68], ['Бакшиш', 25], ['Google', 31]];
  return (
    <div className="proc-scene is-column">
      <motion.div className="proc-toast" initial={{ y: -50, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 170, damping: 16, delay: 0.2 }}>
        <span className="proc-toast-icon">✈</span>
        <div>
          <strong>Ниска оценка 2★ · Иван П.</strong>
          <span>„Чакахме сметката 25 минути.“</span>
        </div>
        <small>сега</small>
      </motion.div>
      <motion.div className="proc-panel" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: 0.6 }}>
        <span className="proc-label">Пътят на госта · 30 дни</span>
        {rows.map(([label, value], i) => (
          <div key={label} className="proc-funnel">
            <span>{label}</span>
            <div><motion.i initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 0.95 + i * 0.15, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }} /></div>
            <b>{value}%</b>
          </div>
        ))}
      </motion.div>
      <motion.span className="proc-badge is-static" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: 1.9 }}>
        ✉ Седмичен отчет · всеки понеделник
      </motion.span>
    </div>
  );
}

const SCENES = [TapScene, RateScene, TipScene, AlertScene];

export const ProcessShowcase: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);

  const paused = hovered || focused || !inView;

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= STEP_MS) {
        elapsed.current = 0;
        setActive((a) => (a + 1) % STEPS.length);
      }
      progress.set(elapsed.current / STEP_MS);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, progress]);

  const select = (index: number) => {
    elapsed.current = 0;
    progress.set(0);
    setActive(index);
  };

  const Scene = SCENES[active];

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className="proc"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
      >
        <ol className="proc-steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <button
                type="button"
                className={`proc-step${i === active ? ' is-active' : ''}`}
                aria-current={i === active ? 'step' : undefined}
                onClick={() => select(i)}
              >
                {i === active && (
                  <motion.span layoutId="proc-step-bg" className="proc-step-bg" transition={{ type: 'spring', stiffness: 320, damping: 32 }} />
                )}
                <span className="proc-step-num">0{i + 1}</span>
                <span className="proc-step-body">
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </span>
                <span className="proc-step-progress" aria-hidden="true">
                  <motion.span style={{ scaleX: i === active ? progress : i < active ? 1 : 0 }} />
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="proc-stage" aria-live="polite">
          <span className="sr-only">{`Стъпка ${active + 1}: ${STEPS[active].title}`}</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="proc-stage-inner"
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Scene />
            </motion.div>
          </AnimatePresence>
          <div className="proc-dots" aria-hidden="true">
            {STEPS.map((s, i) => <span key={s.title} className={i === active ? 'is-on' : ''} />)}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};
