// Admin: editors who can log in. GET list · POST add { email, name, password } · PUT change password { id, password } · DELETE ?id=
import { checkNewPassword, hashPassword, requireAdmin } from '../../lib/auth.js';
import { ensureSchema, q } from '../../lib/db.js';
import { api, HttpError, int, text } from '../../lib/http.js';

export default api(['GET', 'POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const me = await requireAdmin(req);
  if (req.method === 'GET') return (await q('SELECT id, email, name, created_at FROM guide_admins ORDER BY id')).rows;
  if (req.method === 'POST') {
    const email = text(body.email, 'Email', 200, { required: true }).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, 'Enter a valid email');
    checkNewPassword(body.password);
    try {
      const { rows } = await q('INSERT INTO guide_admins (email, name, password_hash) VALUES ($1,$2,$3) RETURNING id, email, name, created_at', [email, text(body.name, 'Name', 100), await hashPassword(body.password)]);
      return rows[0];
    } catch (e) {
      if (e.code === '23505') throw new HttpError(409, 'This email can already log in');
      throw e;
    }
  }
  if (req.method === 'PUT') {
    checkNewPassword(body.password);
    const { rowCount } = await q('UPDATE guide_admins SET password_hash=$2 WHERE id=$1', [int(body.id, 'id'), await hashPassword(body.password)]);
    if (!rowCount) throw new HttpError(404, 'Editor not found');
    return { ok: true };
  }
  const id = int(req.query?.id, 'id');
  if (id === me.id) throw new HttpError(400, 'You cannot remove yourself');
  const { rows } = await q('SELECT count(*)::int AS n FROM guide_admins');
  if (rows[0].n <= 1) throw new HttpError(400, 'Keep at least one editor');
  const del = await q('DELETE FROM guide_admins WHERE id=$1', [id]);
  if (!del.rowCount) throw new HttpError(404, 'Editor not found');
  return { ok: true };
});
