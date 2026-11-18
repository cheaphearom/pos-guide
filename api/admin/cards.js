// Admin: cards. POST create · PUT update (or { id, move: 'up' | 'down' }) · DELETE ?id=
import { requireAdmin } from '../../lib/auth.js';
import { db, ensureSchema, q } from '../../lib/db.js';
import { api, HttpError, int, tag, text } from '../../lib/http.js';
import { move } from '../../lib/order.js';

function fields(b) {
  return {
    section_id: int(b.section_id, 'Section'),
    title: text(b.title, 'Title', 120, { required: true }),
    tag: tag(b.tag),
    path: text(b.path, 'Page address', 120),
    body: text(b.body, 'Text', 20_000),
    published: b.published !== false,
  };
}

export default api(['POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const admin = await requireAdmin(req);
  try {
    if (req.method === 'POST') {
      const f = fields(body);
      const { rows } = await q(
        `INSERT INTO guide_cards (section_id, title, tag, path, body, published, sort_order, updated_by)
         VALUES ($1,$2,$3,$4,$5,$6,(SELECT coalesce(max(sort_order),0)+10 FROM guide_cards WHERE section_id=$1),$7) RETURNING *`,
        [f.section_id, f.title, f.tag, f.path, f.body, f.published, admin.email]);
      return rows[0];
    }
    if (req.method === 'PUT') {
      const id = int(body.id, 'id');
      if (body.move) return move(db(), 'guide_cards', id, body.move, 'section_id');
      const f = fields(body);
      const { rows } = await q(
        `UPDATE guide_cards SET section_id=$2, title=$3, tag=$4, path=$5, body=$6, published=$7, updated_at=now(), updated_by=$8,
           sort_order = CASE WHEN section_id = $2 THEN sort_order ELSE (SELECT coalesce(max(sort_order),0)+10 FROM guide_cards WHERE section_id=$2) END
         WHERE id=$1 RETURNING *`,
        [id, f.section_id, f.title, f.tag, f.path, f.body, f.published, admin.email]);
      if (!rows[0]) throw new HttpError(404, 'Card not found');
      return rows[0];
    }
    const id = int(req.query?.id, 'id');
    const { rowCount } = await q('DELETE FROM guide_cards WHERE id=$1', [id]);
    if (!rowCount) throw new HttpError(404, 'Card not found');
    return { ok: true };
  } catch (e) {
    if (e.code === '23503') throw new HttpError(400, 'That section does not exist');
    throw e;
  }
});
