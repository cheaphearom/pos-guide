// GET /api/site : the pages for the menu, and who is logged in (any role). The Owner can ask ?all=1 to see hidden pages.
import { requireRole } from '../lib/auth.js';
import { ensureContent } from '../lib/content.js';
import { ensureSchema, q } from '../lib/db.js';
import { api } from '../lib/http.js';
import { can, ROLES } from '../lib/roles.js';
import { canSee } from '../lib/access.js';

export default api(['GET'], async (req) => {
  await ensureSchema();
  const me = await requireRole(req, 'view');
  await ensureContent();
  const all = req.query?.all === '1' && can(me.role, 'edit');
  const pages = await q(`SELECT id, slug, title, sort_order, published, viewers FROM guide_pages ${all ? '' : 'WHERE published'} ORDER BY sort_order, id`);
  return { admin: me, roles: ROLES, pages: pages.rows.filter((p) => canSee(p, me.role)) };
});
