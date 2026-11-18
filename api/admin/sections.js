// Admin: sections. POST create · PUT update (or { id, move: 'up' | 'down' }) · DELETE ?id= (its cards go too)
import { requireAdmin } from '../../lib/auth.js';
import { db, ensureSchema, q } from '../../lib/db.js';
import { api, HttpError, int, tag, text } from '../../lib/http.js';
import { move } from '../../lib/order.js';

function fields(b) {
  const slug = text(b.slug, 'Link name', 60, { required: true }).toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new HttpError(400, 'Link name: lower-case letters, digits and dashes only (e.g. cashier-screen)');
  return { slug, title: text(b.title, 'Title', 120, { required: true }), lead: text(b.lead, 'Introduction', 2000), tag: tag(b.tag), published: b.published !== false };
}

export default api(['POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const admin = await requireAdmin(req);
  try {
    if (req.method === 'POST') {
      const f = fields(body);
      const { rows } = await q(
        `INSERT INTO guide_sections (slug, title, lead, tag, published, sort_order, updated_by)
         VALUES ($1,$2,$3,$4,$5,(SELECT coalesce(max(sort_order),0)+10 FROM guide_sections),$6) RETURNING *`,
        [f.slug, f.title, f.lead, f.tag, f.published, admin.email]);
      return rows[0];
    }
    if (req.method === 'PUT') {
      const id = int(body.id, 'id');
      if (body.move) return move(db(), 'guide_sections', id, body.move, null);
      const f = fields(body);
      const { rows } = await q(
        `UPDATE guide_sections SET slug=$2, title=$3, lead=$4, tag=$5, published=$6, updated_at=now(), updated_by=$7 WHERE id=$1 RETURNING *`,
        [id, f.slug, f.title, f.lead, f.tag, f.published, admin.email]);
      if (!rows[0]) throw new HttpError(404, 'Section not found');
      return rows[0];
    }
    const id = int(req.query?.id, 'id');
    const { rowCount } = await q('DELETE FROM guide_sections WHERE id=$1', [id]);
    if (!rowCount) throw new HttpError(404, 'Section not found');
    return { ok: true };
  } catch (e) {
    if (e.code === '23505') throw new HttpError(409, 'Another section already uses this link name');
    throw e;
  }
});
