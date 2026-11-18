// Fills an empty database with the starting pages: the System guide (converted from the generated guide) and
// Features. A database from the earlier portal (sections + cards) keeps its Features content: each section
// becomes a "cards" block and its cards move into it.
import { db } from './db.js';
import guide from './seed-guide.js';
import features from './seed.js';

let done;
export function ensureContent() {
  done ??= fill().catch((e) => { done = undefined; throw e; });
  return done;
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
