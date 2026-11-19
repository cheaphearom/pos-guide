// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// First setup. GET: { needsSetup }. POST { setupKey, email, name, password }: creates the tables, the first person
// (the Owner) and the starting pages, only while nobody can log in yet, and only with the SETUP_KEY set on the server.
import { timingSafeEqual } from 'node:crypto';
import { checkNewPassword, hashPassword, startSession } from '../lib/auth.js';
import { ensureContent } from '../lib/content.js';
import { db, ensureSchema, q } from '../lib/db.js';
import { api, HttpError, text } from '../lib/http.js';
import { permissions } from '../lib/roles.js';

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
  let admin;
  try {
    await client.query('BEGIN');
    await client.query('LOCK TABLE guide_admins IN EXCLUSIVE MODE'); // only one setup can win
    if ((await client.query('SELECT count(*)::int AS n FROM guide_admins')).rows[0].n > 0) throw new HttpError(409, 'Setup is already done. Log in instead.');
    admin = (await client.query(`INSERT INTO guide_admins (email, name, password_hash, role) VALUES ($1, $2, $3, 'owner') RETURNING id, email, name, role`,
      [email, name, await hashPassword(body.password)])).rows[0];
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
  await ensureContent();
  startSession(res, admin);
  return { admin: { ...admin, permissions: permissions('owner') } };
});
