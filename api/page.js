// GET /api/page?slug=features : one page with its blocks (cards, generated HTML). Any role; the Owner can ask ?all=1
// to also get hidden blocks and cards.
import { requireRole } from '../lib/auth.js';
import { ensureContent } from '../lib/content.js';
import { ensureSchema, q } from '../lib/db.js';
import { GENERATED } from '../lib/generated/index.js';
import { api, HttpError } from '../lib/http.js';
import { can } from '../lib/roles.js';

export default api(['GET'], async (req) => {
  await ensureSchema();
  const me = await requireRole(req, 'view');
  await ensureContent();
  const all = req.query?.all === '1' && can(me.role, 'edit');
  const slug = String(req.query?.slug ?? '');
  const page = (await q(
    `SELECT * FROM guide_pages WHERE ${slug ? 'slug = $1' : 'true'} ${all ? '' : 'AND published'} ORDER BY sort_order, id LIMIT 1`,
    slug ? [slug] : [])).rows[0];
  if (!page) throw new HttpError(404, 'Page not found');
  const blocks = (await q(`SELECT * FROM guide_blocks WHERE page_id = $1 ${all ? '' : 'AND published'} ORDER BY sort_order, id`, [page.id])).rows;
  const ids = blocks.filter((b) => b.kind === 'cards').map((b) => b.id);
  const cards = ids.length ? (await q(`SELECT * FROM guide_cards WHERE block_id = ANY($1) ${all ? '' : 'AND published'} ORDER BY sort_order, id`, [ids])).rows : [];
  const stamps = [page.updated_at, ...blocks.map((b) => b.updated_at), ...cards.map((c) => c.updated_at)];
  return {
    page,
    blocks: blocks.map((b) => ({
      ...b,
      ...(b.kind === 'cards' && { cards: cards.filter((c) => c.block_id === b.id) }),
      ...(b.kind === 'generated' && { html: GENERATED[b.source]?.html ?? '' }),
    })),
    updatedAt: stamps.reduce((m, d) => (d > m ? d : m), page.updated_at),
  };
});
