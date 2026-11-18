// Small helpers shared by the API functions (Vercel Node functions).
export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

/**
 * Wraps a handler: answers JSON, turns errors into { message }, and protects changes:
 * every POST / PUT / DELETE must be JSON with the X-Guide header (a page on another site cannot send that).
 */
export function api(methods, handler) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    try {
      if (!methods.includes(req.method)) throw new HttpError(405, `Use ${methods.join(' or ')}`);
      if (req.method !== 'GET' && req.headers['x-guide'] !== '1') throw new HttpError(403, 'Missing X-Guide header');
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
      const out = await handler(req, res, body);
      if (!res.headersSent) res.status(200).json(out ?? { ok: true });
    } catch (e) {
      const status = e.status ?? (e instanceof SyntaxError ? 400 : 500);
      if (status >= 500) console.error(e);
      // never send database details to the browser
      res.status(status).json({ message: status >= 500 && !e.status ? 'Server error' : e.message });
    }
  };
}

export function text(v, name, max, { required = false } = {}) {
  const s = typeof v === 'string' ? v.trim() : v == null ? '' : String(v);
  if (required && !s) throw new HttpError(400, `${name} is required`);
  if (s.length > max) throw new HttpError(400, `${name} is too long (max ${max})`);
  return s;
}

export const TAGS = ['', 'in use', 'ready', 'new', 'planned'];
export function tag(v) {
  const t = text(v, 'Tag', 20);
  if (!TAGS.includes(t)) throw new HttpError(400, `Tag must be one of: ${TAGS.filter(Boolean).join(', ')} (or empty)`);
  return t;
}

export function int(v, name) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0 || n > 1_000_000) throw new HttpError(400, `${name} must be a whole number`);
  return n;
}
