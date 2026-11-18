// Admin logins: passwords stored as scrypt hashes, sessions in a signed, HTTP-only cookie.
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { q } from './db.js';
import { HttpError } from './http.js';
import { can, permissions } from './roles.js';

const scrypt = promisify(scryptCb);
const COOKIE = 'guide_session';
const DAYS = 7;

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function checkPassword(password, stored) {
  const [kind, salt, key] = String(stored).split('$');
  if (kind !== 'scrypt' || !salt || !key) return false;
  const want = Buffer.from(key, 'base64');
  const got = await scrypt(password, Buffer.from(salt, 'base64'), want.length);
  return timingSafeEqual(want, got);
}

export function checkNewPassword(password) {
  if (typeof password !== 'string' || password.length < 10) throw new HttpError(400, 'The password needs at least 10 characters');
  if (password.length > 200) throw new HttpError(400, 'The password is too long');
}

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new HttpError(500, 'SESSION_SECRET is not set (use at least 32 random characters)');
  return s;
}
const sign = (data) => createHmac('sha256', secret()).update(data).digest('base64url');

function parseCookies(req) {
  const out = {};
  for (const part of String(req.headers.cookie ?? '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function cookie(value, maxAge) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : '';
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function startSession(res, admin) {
  const data = Buffer.from(JSON.stringify({ id: admin.id, exp: Date.now() + DAYS * 86_400_000 })).toString('base64url');
  res.setHeader('Set-Cookie', cookie(`${data}.${sign(data)}`, DAYS * 86_400));
}

export function endSession(res) {
  res.setHeader('Set-Cookie', cookie('', 0));
}

/** The logged-in admin, or null. The admin must still exist (removing an editor logs them out). */
export async function currentAdmin(req) {
  const raw = parseCookies(req)[COOKIE];
  if (!raw || !raw.includes('.')) return null;
  const [data, mac] = raw.split('.');
  const want = Buffer.from(sign(data));
  const got = Buffer.from(mac ?? '');
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  let s;
  try { s = JSON.parse(Buffer.from(data, 'base64url').toString()); } catch { return null; }
  if (!s?.id || !(s.exp > Date.now())) return null;
  const { rows } = await q('SELECT id, email, name, role FROM guide_admins WHERE id = $1', [s.id]);
  return rows[0] ? { ...rows[0], permissions: permissions(rows[0].role) } : null;
}

export async function requireAdmin(req) {
  const a = await currentAdmin(req);
  if (!a) throw new HttpError(401, 'Please log in');
  return a;
}

/** The logged-in user, if their role allows this action (see lib/roles.js). */
export async function requireRole(req, action) {
  const a = await requireAdmin(req);
  if (!can(a.role, action)) throw new HttpError(403, 'Your role cannot do this');
  return a;
}
