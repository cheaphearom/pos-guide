// GET /api/content : the published sections and cards, for features.html. Admins (logged in) can ask ?all=1 to also see hidden ones.
import { currentAdmin } from '../lib/auth.js';
import { ensureSchema, q } from '../lib/db.js';
import { api } from '../lib/http.js';

export default api(['GET'], async (req) => {
  await ensureSchema();
  const all = req.query?.all === '1' && (await currentAdmin(req));
  const [sections, cards] = await Promise.all([
    q(`SELECT id, slug, title, lead, tag, sort_order, published, updated_at FROM guide_sections ${all ? '' : 'WHERE published'} ORDER BY sort_order, id`),
    q(`SELECT id, section_id, title, tag, path, body, sort_order, published, updated_at FROM guide_cards ${all ? '' : 'WHERE published'} ORDER BY sort_order, id`),
  ]);
  return {
    sections: sections.rows.map((s) => ({ ...s, cards: cards.rows.filter((c) => c.section_id === s.id) })),
    updatedAt: [...sections.rows, ...cards.rows].reduce((m, r) => (r.updated_at > m ? r.updated_at : m), null),
  };
});
