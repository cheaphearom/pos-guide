// GET /api/me : the logged-in admin, or { admin: null }
import { currentAdmin } from '../lib/auth.js';
import { ensureSchema } from '../lib/db.js';
import { api } from '../lib/http.js';

export default api(['GET'], async (req) => {
  await ensureSchema();
  return { admin: await currentAdmin(req) };
});
