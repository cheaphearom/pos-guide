// First setup. GET: { needsSetup }. POST { setupKey, email, name, password }: creates the tables, the first admin
// and the starting content, only while there is no admin yet, and only with the SETUP_KEY set on the server.
import { timingSafeEqual } from 'node:crypto';
import { hashPassword, checkNewPassword, startSession } from '../lib/auth.js';
import { db, ensureSchema, q } from '../lib/db.js';
import { api, HttpError, text } from '../lib/http.js';
import seed from '../lib/seed.js';

const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };

export default api(['GET', 'POST'], async (req, res, body) => {
  await ensureSchema();
  const { rows } = await q('SELECT count(*)::int AS n FROM guide_admins');
  if (req.method === 'GET') return { needsSetup: rows[0].n === 0 };
  if (rows[0].n > 0) throw new HttpError(409, 'Setup is already done. Log in instead.');

  const key = process.env.SETUP_KEY;
  if (!key || key.length < 12) throw new HttpError(500, 'SETUP_KEY is not set on the server (at least 12 characters)');
  if (!same(body.setupKey ?? '', key)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    throw new HttpError(403, 'Wrong setup key');
  }
  const email = text(body.email, 'Email', 200, { required: true }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, 'Enter a valid email');
  checkNewPassword(body.password);
  const name = text(body.name, 'Name', 100);

  const client = await db().connect();
  try {
    await client.query('BEGIN');
    // only one setup can win
    await client.query('LOCK TABLE guide_admins IN EXCLUSIVE MODE');
    const again = await client.query('SELECT count(*)::int AS n FROM guide_admins');
    if (again.rows[0].n > 0) throw new HttpError(409, 'Setup is already done. Log in instead.');
    const admin = (await client.query('INSERT INTO guide_admins (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name', [email, name, await hashPassword(body.password)])).rows[0];
    const has = await client.query('SELECT count(*)::int AS n FROM guide_sections');
    if (has.rows[0].n === 0) {
      for (const [i, s] of seed.sections.entries()) {
        const sid = (await client.query('INSERT INTO guide_sections (slug, title, lead, tag, sort_order, updated_by) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id', [s.slug, s.title, s.lead, s.tag, (i + 1) * 10, email])).rows[0].id;
        for (const [j, c] of s.cards.entries()) {
          await client.query('INSERT INTO guide_cards (section_id, title, tag, path, body, sort_order, updated_by) VALUES ($1,$2,$3,$4,$5,$6,$7)', [sid, c.title, c.tag, c.path, c.body, (j + 1) * 10, email]);
        }
      }
    }
    await client.query('COMMIT');
    startSession(res, admin);
    return { admin };
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
});
