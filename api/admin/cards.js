// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Owner: feature cards inside a "cards" block. POST create · PUT update (or { id, move: 'up' | 'down' }) · DELETE ?id=
import { requireRole } from '../../lib/auth.js';
import { db, ensureSchema, q } from '../../lib/db.js';
import { api, HttpError, int, tag, text } from '../../lib/http.js';
import { move } from '../../lib/order.js';

const fields = (b) => ({
  block_id: int(b.block_id, 'Block'), title: text(b.title, 'Title', 120, { required: true }), tag: tag(b.tag),
  path: text(b.path, 'Page address', 120), body: text(b.body, 'Text', 20_000), published: b.published !== false,
});

async function cardsBlock(id) {
  const b = (await q('SELECT kind FROM guide_blocks WHERE id=$1', [id])).rows[0];
  if (!b) throw new HttpError(400, 'That block does not exist');
  if (b.kind !== 'cards') throw new HttpError(400, 'Cards can only go in a "cards" block');
}

export default api(['POST', 'PUT', 'DELETE'], async (req, res, body) => {
  await ensureSchema();
  const me = await requireRole(req, 'edit');
  if (req.method === 'POST') {
    const f = fields(body); await cardsBlock(f.block_id);
    return (await q(`INSERT INTO guide_cards (block_id, title, tag, path, body, published, sort_order, updated_by)
      VALUES ($1,$2,$3,$4,$5,$6,(SELECT coalesce(max(sort_order),0)+10 FROM guide_cards WHERE block_id=$1),$7) RETURNING *`,
      [f.block_id, f.title, f.tag, f.path, f.body, f.published, me.email])).rows[0];
  }
  if (req.method === 'PUT') {
    const id = int(body.id, 'id');
    if (body.move) return move(db(), 'guide_cards', id, body.move, 'block_id');
    const f = fields(body); await cardsBlock(f.block_id);
    const row = (await q(`UPDATE guide_cards SET block_id=$2, title=$3, tag=$4, path=$5, body=$6, published=$7, updated_at=now(), updated_by=$8,
        sort_order = CASE WHEN block_id = $2 THEN sort_order ELSE (SELECT coalesce(max(sort_order),0)+10 FROM guide_cards WHERE block_id=$2) END
      WHERE id=$1 RETURNING *`, [id, f.block_id, f.title, f.tag, f.path, f.body, f.published, me.email])).rows[0];
    if (!row) throw new HttpError(404, 'Card not found');
    return row;
  }
  const id = int(req.query?.id, 'id');
  if (!(await q('DELETE FROM guide_cards WHERE id=$1', [id])).rowCount) throw new HttpError(404, 'Card not found');
  return { ok: true };
});
