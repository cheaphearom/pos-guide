// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Owner: blocks of a page. kind: text (Markdown) · cards (a group of feature cards) · generated (from the code: hide, move, add a note)
// POST create · PUT update (or { id, move: 'up' | 'down' }) · DELETE ?id=
import { requireRole } from '../../lib/auth.js';
import { db, ensureSchema, q } from '../../lib/db.js';
import { GENERATED } from '../../lib/generated/index.js';
import { api, HttpError, int, slug, tag, text } from '../../lib/http.js';
import { move } from '../../lib/order.js';

function fields(b) {
  const kind = ['text', 'cards', 'generated'].includes(b.kind) ? b.kind : null;
  if (!kind) throw new HttpError(400, 'Kind must be text, cards or generated');
  const source = kind === 'generated' ? text(b.source, 'Generated part', 40) : '';
  if (kind === 'generated' && !GENERATED[source]) throw new HttpError(400, `Generated part must be one of: ${Object.keys(GENERATED).join(', ')}`);
  return {
    page_id: int(b.page_id, 'Page'), kind, source,
    anchor: slug(b.anchor, 'Link name'),
    title: text(b.title, 'Title', 160, { required: true }),
    tag: tag(b.tag), body: text(b.body, 'Text', 200_000), published: b.published !== false,
  };
}

export default api(['POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const me = await requireRole(req, 'edit');
  try {
    if (req.method === 'POST') {
      const f = fields(body);
      return (await q(`INSERT INTO guide_blocks (page_id, kind, anchor, title, tag, body, source, published, sort_order, updated_by)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,(SELECT coalesce(max(sort_order),0)+10 FROM guide_blocks WHERE page_id=$1),$9) RETURNING *`,
        [f.page_id, f.kind, f.anchor, f.title, f.tag, f.body, f.source, f.published, me.email])).rows[0];
    }
    if (req.method === 'PUT') {
      const id = int(body.id, 'id');
      if (body.move) return move(db(), 'guide_blocks', id, body.move, 'page_id');
      const f = fields(body);
      const row = (await q(`UPDATE guide_blocks SET page_id=$2, kind=$3, anchor=$4, title=$5, tag=$6, body=$7, source=$8, published=$9, updated_at=now(), updated_by=$10,
          sort_order = CASE WHEN page_id = $2 THEN sort_order ELSE (SELECT coalesce(max(sort_order),0)+10 FROM guide_blocks WHERE page_id=$2) END
        WHERE id=$1 RETURNING *`, [id, f.page_id, f.kind, f.anchor, f.title, f.tag, f.body, f.source, f.published, me.email])).rows[0];
      if (!row) throw new HttpError(404, 'Block not found');
      return row;
    }
    const id = int(req.query?.id, 'id');
    if (!(await q('DELETE FROM guide_blocks WHERE id=$1', [id])).rowCount) throw new HttpError(404, 'Block not found');
    return { ok: true };
  } catch (e) {
    if (e.code === '23505') throw new HttpError(409, 'Another block on this page already uses this link name');
    if (e.code === '23503') throw new HttpError(400, 'That page does not exist');
    throw e;
  }
});
