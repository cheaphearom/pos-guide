// POST /api/login { email, password }
import { checkPassword, startSession } from '../lib/auth.js';
import { ensureSchema, q } from '../lib/db.js';
import { api, HttpError, text } from '../lib/http.js';

export default api(['POST'], async (req, res, body) => {
  await ensureSchema();
  const email = text(body.email, 'Email', 200, { required: true }).toLowerCase();
  const password = String(body.password ?? '');
  const { rows } = await q('SELECT id, email, name, password_hash FROM guide_admins WHERE email = $1', [email]);
  const ok = rows[0] && password && (await checkPassword(password, rows[0].password_hash));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 700)); // slow down password guessing
    throw new HttpError(401, 'Wrong email or password');
  }
  const { password_hash: _, ...admin } = rows[0];
  startSession(res, admin);
  return { admin };
});
