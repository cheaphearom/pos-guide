// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Which pages a role can see. A page's viewers list holds roles; empty = everyone. The Owner sees every page.
import { isRole } from './roles.js';

export const canSee = (page, role) => role === 'owner' || !page.viewers?.length || page.viewers.includes(role);

/** Roles that can be chosen for a page (the Owner always sees everything, so it is not in the list) */
export function viewers(v) {
  const list = Array.isArray(v) ? [...new Set(v.map(String))] : [];
  return list.filter((r) => isRole(r) && r !== 'owner');
}
