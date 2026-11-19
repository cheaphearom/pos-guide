// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Fills an empty database with the starting pages: the System guide (converted from the generated guide) and
// Features. A database from the earlier portal (sections + cards) keeps its Features content: each section
// becomes a "cards" block and its cards move into it.
import { db } from './db.js';
import guide from './seed-guide.js';
import features from './seed.js';
import { PACKS } from './packs/index.js';
import { FIXES } from './packs/fixes.js';

let done;
export function ensureContent() {
  done ??= fill().then(installPacks).then(applyOnce).catch((e) => { done = undefined; throw e; });
  return done;
}

/** Settings applied once to every guide database (new or existing), recorded in guide_meta. */
const ONCE = [
  // QA reads Features and How to use only; the System guide is for Developer, Manager and Owner
  { key: 'setting:system-guide-not-for-qa', sql: "UPDATE guide_pages SET viewers = '{developer,manager}' WHERE slug = 'system-guide' AND cardinality(viewers) = 0" },
];
async function applyOnce() {
  const client = await db().connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(4713)');
    const have = new Set((await client.query("SELECT key FROM guide_meta WHERE key LIKE 'setting:%'")).rows.map((r) => r.key));
    for (const s of ONCE) {
      if (have.has(s.key)) continue;
      await client.query(s.sql);
      await client.query('INSERT INTO guide_meta (key, value) VALUES ($1, $2)', [s.key, 'applied']);
    }
    const fixed = new Set((await client.query("SELECT key FROM guide_meta WHERE key LIKE 'fix:%'")).rows.map((r) => r.key));
    for (const f of FIXES) {
      if (fixed.has(f.key)) continue;
      const r = await client.query(
        `UPDATE guide_blocks SET title = $1, body = $2, updated_at = now(), updated_by = 'update'
         WHERE anchor = $3 AND body = $4 AND page_id IN (SELECT id FROM guide_pages WHERE slug = $5)`,
        [f.title, f.body, f.anchor, f.oldBody, f.page]);
      await client.query('INSERT INTO guide_meta (key, value) VALUES ($1, $2)', [f.key, r.rowCount ? 'applied' : 'skipped: the text was changed by the Owner']);
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

/**
 * Content packs: extra pages added to an existing guide once (e.g. "How to use"). Each pack is recorded in
 * guide_meta, so it is never added twice, and a page the Owner deletes or renames does not come back.
 */
async function installPacks() {
  const client = await db().connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(4712)');
    const have = new Set((await client.query("SELECT key FROM guide_meta WHERE key LIKE 'pack:%'")).rows.map((r) => r.key));
    for (const pack of PACKS) {
      const key = 'pack:' + pack.key;
      if (have.has(key)) continue;
      const p = pack.page;
      const taken = (await client.query('SELECT 1 FROM guide_pages WHERE slug = $1', [p.slug])).rowCount;
      if (!taken) {
        const order = (await client.query('SELECT coalesce(max(sort_order), 0) + 10 AS n FROM guide_pages')).rows[0].n;
        const pid = (await client.query('INSERT INTO guide_pages (slug, title, intro, layout, sort_order, updated_by) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
          [p.slug, p.title, p.intro ?? '', p.layout ?? '', order, 'pack'])).rows[0].id;
        for (const [i, b] of p.blocks.entries()) {
          await client.query('INSERT INTO guide_blocks (page_id, kind, anchor, title, tag, body, source, sort_order, updated_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [pid, b.kind ?? 'text', b.anchor, b.title, b.tag ?? '', b.body ?? '', b.source ?? '', (i + 1) * 10, 'pack']);
        }
      }
      await client.query('INSERT INTO guide_meta (key, value) VALUES ($1, $2)', [key, taken ? 'skipped: page address already used' : 'installed']);
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

async function fill() {
  const client = await db().connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(4711)'); // only one request fills it
    const has = (await client.query('SELECT count(*)::int AS n FROM guide_pages')).rows[0].n;
    if (has > 0) { await client.query('COMMIT'); return; }
    const by = 'setup';
    const page = async (slug, title, intro, order) =>
      (await client.query('INSERT INTO guide_pages (slug, title, intro, sort_order, updated_by) VALUES ($1,$2,$3,$4,$5) RETURNING id', [slug, title, intro, order, by])).rows[0].id;
    const block = async (pageId, b, order) =>
      (await client.query('INSERT INTO guide_blocks (page_id, kind, anchor, title, tag, body, source, sort_order, published, updated_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
        [pageId, b.kind, b.anchor, b.title, b.tag ?? '', b.body ?? '', b.source ?? '', order, b.published ?? true, by])).rows[0].id;

    const g = guide.pages[0];
    const gid = await page(g.slug, g.title, g.intro, 10);
    for (const [i, b] of g.blocks.entries()) await block(gid, b, (i + 1) * 10);

    const fid = await page('features', 'Features', 'Everything the BROWN POS can do, by screen. **in use**: used and tested with real store data · **ready**: built and working, not yet used with real data.', 20);
    const old = (await client.query('SELECT * FROM guide_sections ORDER BY sort_order, id')).rows;
    if (old.length) {
      for (const [i, s] of old.entries()) {
        const bid = await block(fid, { kind: 'cards', anchor: s.slug, title: s.title, tag: s.tag, body: s.lead, published: s.published }, (i + 1) * 10);
        await client.query('UPDATE guide_cards SET block_id = $1 WHERE section_id = $2', [bid, s.id]);
      }
    } else {
      for (const [i, s] of features.sections.entries()) {
        const bid = await block(fid, { kind: 'cards', anchor: s.slug, title: s.title, tag: s.tag, body: s.lead }, (i + 1) * 10);
        for (const [j, c] of s.cards.entries()) {
          await client.query('INSERT INTO guide_cards (block_id, title, tag, path, body, sort_order, updated_by) VALUES ($1,$2,$3,$4,$5,$6,$7)', [bid, c.title, c.tag, c.path, c.body, (j + 1) * 10, by]);
        }
      }
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}
