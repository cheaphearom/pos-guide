// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// POST /api/logout
import { endSession } from '../lib/auth.js';
import { api } from '../lib/http.js';

export default api(['POST'], async (req, res) => {
  endSession(res);
  return { ok: true };
});
