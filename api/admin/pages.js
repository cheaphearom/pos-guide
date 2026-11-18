// Owner: pages. POST create · PUT update (or { id, move: 'up' | 'down' }) · DELETE ?id= (its blocks and cards go too)
import { requireRole } from '../../lib/auth.js';
import { db, ensureSchema, q } from '../../lib/db.js';
import { api, HttpError, int, slug, text } from '../../lib/http.js';
import { move } from '../../lib/order.js';
import { viewers } from '../../lib/access.js';

const fields = (b) => ({ slug: slug(b.slug, 'Page address'), title: text(b.title, 'Title', 120, { required: true }), intro: text(b.intro, 'Introduction', 4000), published: b.published !== false, viewers: viewers(b.viewers) });

export default api(['POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const me = await requireRole(req, 'edit');
  try {
    if (req.method === 'POST') {
      const f = fields(body);
      return (await q(`INSERT INTO guide_pages (slug, title, intro, published, viewers, sort_order, updated_by)
        VALUES ($1,$2,$3,$4,$5,(SELECT coalesce(max(sort_order),0)+10 FROM guide_pages),$6) RETURNING *`, [f.slug, f.title, f.intro, f.published, f.viewers, me.email])).rows[0];
    }
    if (req.method === 'PUT') {
      const id = int(body.id, 'id');
      if (body.move) return move(db(), 'guide_pages', id, body.move, null);
      const f = fields(body);
      const row = (await q('UPDATE guide_pages SET slug=$2, title=$3, intro=$4, published=$5, viewers=$6, updated_at=now(), updated_by=$7 WHERE id=$1 RETURNING *',
        [id, f.slug, f.title, f.intro, f.published, f.viewers, me.email])).rows[0];
      if (!row) throw new HttpError(404, 'Page not found');
      return row;
    }
    const id = int(req.query?.id, 'id');
    if ((await q('SELECT count(*)::int AS n FROM guide_pages')).rows[0].n <= 1) throw new HttpError(400, 'Keep at least one page');
    if (!(await q('DELETE FROM guide_pages WHERE id=$1', [id])).rowCount) throw new HttpError(404, 'Page not found');
    return { ok: true };
  } catch (e) {
    if (e.code === '23505') throw new HttpError(409, 'Another page already uses this address');
    throw e;
  }
});
