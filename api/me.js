// GET /api/me : the logged-in user (with role and permissions), or { admin: null }
// PUT /api/me { currentPassword, password } : change your own password (every role)
import { checkNewPassword, checkPassword, currentAdmin, hashPassword, requireAdmin } from '../lib/auth.js';
import { ensureSchema, q } from '../lib/db.js';
import { api, HttpError } from '../lib/http.js';
import { ROLES } from '../lib/roles.js';

export default api(['GET', 'PUT'], async (req, res, body) => {
  await ensureSchema();
  if (req.method === 'GET') return { admin: await currentAdmin(req), roles: ROLES };
  const me = await requireAdmin(req);
  checkNewPassword(body.password);
  const { rows } = await q('SELECT password_hash FROM guide_admins WHERE id = $1', [me.id]);
  if (!(await checkPassword(String(body.currentPassword ?? ''), rows[0].password_hash))) {
    await new Promise((r) => setTimeout(r, 700));
    throw new HttpError(400, 'Your current password is wrong');
  }
  await q('UPDATE guide_admins SET password_hash = $2 WHERE id = $1', [me.id, await hashPassword(body.password)]);
  return { ok: true };
});
