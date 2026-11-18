// Connection to the Neon (PostgreSQL) database. The address comes from the DATABASE_URL environment variable.
import pg from 'pg';

let pool;

export function db() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw Object.assign(new Error('DATABASE_URL is not set'), { status: 500 });
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    // Neon needs TLS; a local database for testing does not
    pool = new pg.Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10_000, ssl: local ? false : { rejectUnauthorized: true } });
  }
  return pool;
}

export const q = (text, params) => db().query(text, params);

let ready;
/** Creates the tables the first time (safe to run again). */
export function ensureSchema() {
  ready ??= q(`
    CREATE TABLE IF NOT EXISTS guide_admins (
      id serial PRIMARY KEY,
      email varchar(200) NOT NULL UNIQUE,
      name varchar(100) NOT NULL DEFAULT '',
      password_hash text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS guide_sections (
      id serial PRIMARY KEY,
      slug varchar(60) NOT NULL UNIQUE,
      title varchar(120) NOT NULL,
      lead text NOT NULL DEFAULT '',
      tag varchar(20) NOT NULL DEFAULT '',
      sort_order int NOT NULL DEFAULT 0,
      published boolean NOT NULL DEFAULT true,
      updated_at timestamptz NOT NULL DEFAULT now(),
      updated_by varchar(200)
    );
    CREATE TABLE IF NOT EXISTS guide_cards (
      id serial PRIMARY KEY,
      section_id int NOT NULL REFERENCES guide_sections(id) ON DELETE CASCADE,
      title varchar(120) NOT NULL,
      tag varchar(20) NOT NULL DEFAULT '',
      path varchar(120) NOT NULL DEFAULT '',
      body text NOT NULL DEFAULT '',
      sort_order int NOT NULL DEFAULT 0,
      published boolean NOT NULL DEFAULT true,
      updated_at timestamptz NOT NULL DEFAULT now(),
      updated_by varchar(200)
    );
    CREATE INDEX IF NOT EXISTS guide_cards_section ON guide_cards(section_id, sort_order);
    ALTER TABLE guide_admins ADD COLUMN IF NOT EXISTS role varchar(20) NOT NULL DEFAULT 'owner';
    -- the Simple User role was removed: those people become QA (view only)
    UPDATE guide_admins SET role = 'qa' WHERE role = 'user';
    -- pages, each made of blocks: text (Markdown), cards (a group of feature cards) or generated (from the code)
    CREATE TABLE IF NOT EXISTS guide_pages (
      id serial PRIMARY KEY,
      slug varchar(60) NOT NULL UNIQUE,
      title varchar(120) NOT NULL,
      intro text NOT NULL DEFAULT '',
      sort_order int NOT NULL DEFAULT 0,
      published boolean NOT NULL DEFAULT true,
      updated_at timestamptz NOT NULL DEFAULT now(),
      updated_by varchar(200)
    );
    CREATE TABLE IF NOT EXISTS guide_blocks (
      id serial PRIMARY KEY,
      page_id int NOT NULL REFERENCES guide_pages(id) ON DELETE CASCADE,
      kind varchar(12) NOT NULL DEFAULT 'text',
      anchor varchar(60) NOT NULL,
      title varchar(160) NOT NULL,
      tag varchar(20) NOT NULL DEFAULT '',
      body text NOT NULL DEFAULT '',
      source varchar(40) NOT NULL DEFAULT '',
      sort_order int NOT NULL DEFAULT 0,
      published boolean NOT NULL DEFAULT true,
      updated_at timestamptz NOT NULL DEFAULT now(),
      updated_by varchar(200),
      UNIQUE (page_id, anchor)
    );
    CREATE INDEX IF NOT EXISTS guide_blocks_page ON guide_blocks(page_id, sort_order);
    -- feature cards now belong to a "cards" block (guide_sections is the older layout, moved over once)
    ALTER TABLE guide_cards ADD COLUMN IF NOT EXISTS block_id int REFERENCES guide_blocks(id) ON DELETE CASCADE;
    ALTER TABLE guide_cards ALTER COLUMN section_id DROP NOT NULL;
    CREATE INDEX IF NOT EXISTS guide_cards_block ON guide_cards(block_id, sort_order);
    -- content packs already installed (each is added once; deleting its page later does not bring it back)
    CREATE TABLE IF NOT EXISTS guide_meta (
      key varchar(80) PRIMARY KEY,
      value text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `).catch((e) => { ready = undefined; throw e; });
  return ready;
}
