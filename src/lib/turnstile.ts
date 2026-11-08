/**
 * Invisible Cloudflare Turnstile captcha for the guest rating page.
 *
 * Enabled only when VITE_TURNSTILE_SITE_KEY is set. The token is checked
 * server-side by the `submit-review` Edge Function (TURNSTILE_SECRET_KEY).
 * With `appearance: 'interaction-only'` nothing is shown unless Cloudflare
 * really needs the guest to click — then a small box appears bottom-right.
 */

interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  execute(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export const isCaptchaEnabled = Boolean(SITE_KEY);

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile missing')));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('turnstile failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/** Warm up the script while the guest is still choosing stars. */
export function preloadCaptcha(): void {
  if (SITE_KEY) loadTurnstile().catch(() => {});
}

/** A fresh one-time token, or undefined when the captcha isn't configured. */
export async function getCaptchaToken(): Promise<string | undefined> {
  if (!SITE_KEY) return undefined;
  const turnstile = await loadTurnstile();

  return new Promise((resolve, reject) => {
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:2000';
    document.body.appendChild(host);

    let widgetId = '';
    const done = (fn: () => void) => {
      window.clearTimeout(timer);
      if (widgetId) turnstile.remove(widgetId);
      host.remove();
      fn();
    };
    const timer = window.setTimeout(() => done(() => reject(new Error('captcha timeout'))), 30000);

    widgetId = turnstile.render(host, {
      sitekey: SITE_KEY,
      execution: 'execute',
      appearance: 'interaction-only',
      callback: (token: string) => done(() => resolve(token)),
      'error-callback': () => done(() => reject(new Error('captcha error'))),
      'expired-callback': () => done(() => reject(new Error('captcha expired'))),
    });
    turnstile.execute(widgetId);
  });
}
