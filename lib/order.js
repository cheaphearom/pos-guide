// Move a row up or down among its neighbours (same section for cards), then number them 10, 20, 30...
import { HttpError } from './http.js';

const TABLES = { guide_sections: true, guide_cards: true };

export async function move(pool, table, id, dir, groupCol) {
  if (!TABLES[table]) throw new Error('bad table');
  if (dir !== 'up' && dir !== 'down') throw new HttpError(400, "move must be 'up' or 'down'");
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const me = (await client.query(`SELECT * FROM ${table} WHERE id=$1 FOR UPDATE`, [id])).rows[0];
    if (!me) throw new HttpError(404, 'Not found');
    const where = groupCol ? `WHERE ${groupCol} = $1` : '';
    const list = (await client.query(`SELECT id FROM ${table} ${where} ORDER BY sort_order, id FOR UPDATE`, groupCol ? [me[groupCol]] : [])).rows.map((r) => r.id);
    const i = list.indexOf(id);
    const j = dir === 'up' ? i - 1 : i + 1;
    if (j >= 0 && j < list.length) [list[i], list[j]] = [list[j], list[i]];
    for (const [k, rid] of list.entries()) await client.query(`UPDATE ${table} SET sort_order=$2 WHERE id=$1`, [rid, (k + 1) * 10]);
    await client.query('COMMIT');
    return { ok: true, order: list };
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}
