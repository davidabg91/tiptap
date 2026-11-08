/**
 * Anonymous identifiers for the guest rating page.
 *
 * - deviceId: random, kept in this browser; the Edge Function stores only a
 *   salted hash of it to enforce "one rating per waiter every 12 h".
 * - visitId: one rating-page visit (per tab), so a refresh doesn't count a
 *   second scan / tip click / Google click.
 */

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function stored(storage: Storage | undefined, key: string): string {
  try {
    if (!storage) return randomId();
    const existing = storage.getItem(key);
    if (existing) return existing;
    const id = randomId();
    storage.setItem(key, id);
    return id;
  } catch {
    return randomId(); // storage blocked (private mode etc.)
  }
}

export function getDeviceId(): string {
  return stored(typeof localStorage !== 'undefined' ? localStorage : undefined, 'tiptap_device_id');
}

export function getVisitId(slug: string): string {
  return stored(typeof sessionStorage !== 'undefined' ? sessionStorage : undefined, `tiptap_visit_${slug}`);
}
