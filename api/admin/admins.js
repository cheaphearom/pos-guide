// Owner: people who can log in. GET list · POST add { email, name, role, password }
// PUT { id, role?, password? } · DELETE ?id=. There is always at least one Owner.
import { checkNewPassword, hashPassword, requireRole } from '../../lib/auth.js';
import { ensureSchema, q } from '../../lib/db.js';
import { api, HttpError, int, text } from '../../lib/http.js';
import { isRole, ROLES } from '../../lib/roles.js';

function role(v) {
  if (!isRole(v)) throw new HttpError(400, `Role must be one of: ${Object.values(ROLES).join(', ')}`);
  return v;
}
const owners = async () => (await q(`SELECT count(*)::int AS n FROM guide_admins WHERE role = 'owner'`)).rows[0].n;

export default api(['GET', 'POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const me = await requireRole(req, 'users');
  if (req.method === 'GET') return (await q('SELECT id, email, name, role, created_at FROM guide_admins ORDER BY id')).rows;
  if (req.method === 'POST') {
    const email = text(body.email, 'Email', 200, { required: true }).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, 'Enter a valid email');
    const r = role(body.role);
    checkNewPassword(body.password);
    try {
      return (await q('INSERT INTO guide_admins (email, name, role, password_hash) VALUES ($1,$2,$3,$4) RETURNING id, email, name, role, created_at',
        [email, text(body.name, 'Name', 100), r, await hashPassword(body.password)])).rows[0];
    } catch (e) {
      if (e.code === '23505') throw new HttpError(409, 'This email can already log in');
      throw e;
    }
  }
  if (req.method === 'PUT') {
    const id = int(body.id, 'id');
    const cur = (await q('SELECT role FROM guide_admins WHERE id=$1', [id])).rows[0];
    if (!cur) throw new HttpError(404, 'User not found');
    if (body.role !== undefined) {
      const r = role(body.role);
      if (cur.role === 'owner' && r !== 'owner' && (await owners()) <= 1) throw new HttpError(400, 'Keep at least one Owner');
      await q('UPDATE guide_admins SET role=$2 WHERE id=$1', [id, r]);
    }
    if (body.password !== undefined) {
      checkNewPassword(body.password);
      await q('UPDATE guide_admins SET password_hash=$2 WHERE id=$1', [id, await hashPassword(body.password)]);
    }
    return { ok: true };
  }
  const id = int(req.query?.id, 'id');
  if (id === me.id) throw new HttpError(400, 'You cannot remove yourself');
  const cur = (await q('SELECT role FROM guide_admins WHERE id=$1', [id])).rows[0];
  if (!cur) throw new HttpError(404, 'User not found');
  if (cur.role === 'owner' && (await owners()) <= 1) throw new HttpError(400, 'Keep at least one Owner');
  await q('DELETE FROM guide_admins WHERE id=$1', [id]);
  return { ok: true };
});
