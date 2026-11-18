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
  `).catch((e) => { ready = undefined; throw e; });
  return ready;
}
