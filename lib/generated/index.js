// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Parts of the System guide generated from the backend's database design. Shown as-is (the Owner can hide or move
// the block and write a note above it). Rebuild these files when the database design changes.
import database from './database.js';
import flows from './flows.js';
import valueLists from './value-lists.js';

export const GENERATED = {
  database: { label: 'Database tables (51 tables, by area)', html: database },
  flows: { label: 'How data flows', html: flows },
  'value-lists': { label: 'Value lists', html: valueLists },
};
