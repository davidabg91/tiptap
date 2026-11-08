import React from 'react';

/** Small form building blocks shared by the dashboard panels. */

export const Switch: React.FC<{
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
  disabled?: boolean;
}> = ({ checked, onChange, label, hint, disabled }) => (
  <label className={`dash-switch${disabled ? ' is-disabled' : ''}`}>
    <span className="dash-switch-text">
      <span className="dash-switch-label">{label}</span>
      {hint && <span className="dash-switch-hint">{hint}</span>}
    </span>
    <input
      type="checkbox"
      role="switch"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className="dash-switch-track" aria-hidden="true"><span /></span>
  </label>
);

export const Field: React.FC<{
  label: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
}> = ({ label, hint, htmlFor, children }) => (
  <div className="dash-field">
    <label className="dash-field-label" htmlFor={htmlFor}>{label}</label>
    {children}
    {hint && <p className="dash-field-hint">{hint}</p>}
  </div>
);

export const Card: React.FC<{
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, action, className, children }) => (
  <section className={`dash-card${className ? ` ${className}` : ''}`}>
    {(title || action) && (
      <header className="dash-card-head">
        <div>
          {title && <h3 className="dash-card-title">{title}</h3>}
          {subtitle && <p className="dash-card-subtitle">{subtitle}</p>}
        </div>
        {action}
      </header>
    )}
    {children}
  </section>
);

export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <span className="dash-stars" style={{ fontSize: size }} aria-label={`${value} от 5`}>
      {'★'.repeat(value)}
      <span className="dash-stars-off">{'★'.repeat(5 - value)}</span>
    </span>
  );
}

/** "Saved ✓" / error line under a form. */
export function SaveStatus({ state }: { state: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (state === 'idle') return null;
  return (
    <span className={`dash-save-status is-${state}`} role="status">
      {state === 'saving' ? 'Запазване…' : state === 'saved' ? 'Запазено ✓' : 'Неуспешно запазване — опитайте отново'}
    </span>
  );
}
