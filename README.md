# BROWN POS Guide

The guide to the BROWN POS (the point-of-sale system for BROWN Coffee stores) as a small website. **Everyone must log in to read it.** The Owner edits every page in an admin portal. The content is stored in a **Neon** (PostgreSQL) database.

| Address | What it is |
|---|---|
| `/` (`index.html`) | **The guide**: one menu of pages (System guide, Features, and any page the Owner adds), each made of blocks. Visitors who are not logged in are sent to the login page. |
| `/login.html` | Log in. On a new database it shows **First setup** instead. |
| `/admin/` | **Admin portal** (Owner only): add, edit, reorder, hide and delete pages, blocks and feature cards in a **visual editor** (like Word), with a preview of the final page; manage users. |

The pages hold no content themselves: everything is loaded from the API after login, so nothing can be read without an account.

## Roles

| | QA | Developer | Manager | Owner |
|---|:-:|:-:|:-:|:-:|
| Log in and read every page | ✓ | ✓ | ✓ | ✓ |
| Change their own password | ✓ | ✓ | ✓ | ✓ |
| Edit pages, blocks and cards in the admin portal | | | | ✓ |
| Add people, set their role, reset passwords, remove them | | | | ✓ |

The person created at first setup is the **Owner**; there is always at least one. The server checks the role on every request. To change the rules, edit `lib/roles.js`.

## Pages and blocks

Each page has an address (`index.html?p=features`), a title, an optional introduction and blocks. Each block has a link name (`index.html?p=features#cashier`) and one of three kinds:

| Kind | What it shows |
|---|---|
| **Text** | Markdown: `## headings`, `- lists`, `**bold**`, `` `code` ``, `[links](index.html#hosting)`, `\| tables \|`, ` ```sql ` code (with a Copy button), ` ```mermaid ` diagrams, `> notes`. |
| **Cards** | An introduction and a grid of feature cards (title, tag, page address in the POS, Markdown text). |
| **Generated** | A part made from the POS code: the 51 database tables, how data flows, value lists. It cannot be edited here; the Owner can hide it, move it and write a note above it. |

In the admin portal every text is edited in a **visual editor** (Toast UI Editor): a toolbar for headings, bold, italic, lists, tables (add rows and columns with a click), links, code and quotes (shown as notes), and what you type looks like the final page. The **Markdown** tab (bottom right) shows the raw text for exact control. For a diagram, add a code block and type `mermaid` as its language; the preview under the editor draws it. Only real edits count as unsaved changes.

Tags: **in use** (used with real store data), **ready** (built, not yet used with real data), **new**, **planned**.

On first use the database is filled with the **System guide** (BRD, SDD, data flow diagrams, hosting, how the server works, getting started, database, data flows, value lists, queries, technology terms) and **Features**. A database from the earlier portal keeps its Features content.

A **How to use** page (42 parts: cashier screen, marketing, menu and stores, back office; each with who, where, steps, what happens, good to know) is added once to every database, new or existing, as a **content pack** (`lib/packs/`). It is recorded in the `guide_meta` table, so it is never added twice, and if the Owner deletes or renames it, it does not come back. To ship another page the same way, add a pack to `lib/packs/index.js`.

## Set it up (Neon + Vercel)

1. **Neon** ([neon.tech](https://neon.tech), the free plan is enough): create a project, then **Connect** → copy the connection string (`postgresql://…neon.tech/neondb?sslmode=require`).
2. **Vercel**: **Add New → Project → Import** this repository. Framework preset: **Other**, no build command. Under **Environment Variables** add:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string |
   | `SESSION_SECRET` | 32+ random characters (signs the login cookie) |
   | `SETUP_KEY` | 12+ characters you choose; asked once, on the first setup |

   Then **Deploy**.
3. Open the site. It shows **First setup**: enter the setup key, your name, email and a password (10+ characters). This creates the tables, fills the pages and logs you in as the **Owner**.
4. Add people under **Admin → Users**, each with a role.

Random characters for `SESSION_SECRET` and `SETUP_KEY` (works on Windows, Mac and Linux):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> Keep the Neon connection string, `SESSION_SECRET` and `SETUP_KEY` only in Vercel's settings and your own `.env`. Never put them in this repository or in a chat.

> This repository is **public** on GitHub, and `lib/seed-guide.js` holds the starting text of the guide. It is the public edition (no passwords, keys or tokens), but if the guide should only be readable after login, make the repository private (GitHub → Settings → General → Danger Zone → Change visibility). Vercel keeps working.

## Run it on your computer

Install [Node.js 22](https://nodejs.org), then:

```bash
npm install
```

```bash
cp .env.example .env
```

(On Windows: `copy .env.example .env`.) Fill in `DATABASE_URL`, `SESSION_SECRET` and `SETUP_KEY` in `.env`, then:

```bash
npm run dev
```

Open http://localhost:3000 (the guide) and http://localhost:3000/admin/ (the portal). With the Neon connection string in `.env`, your local copy uses the same database as the live site. If `npm run dev` fails on an old Node version, run `node --env-file=.env scripts/dev.mjs`.

## How it is built

| Part | Files |
|---|---|
| Pages | `index.html` (guide), `login.html`, `admin/index.html`, `features.html` (old link, redirects) |
| Look and drawing | `assets/site.css` (the System guide's styles), `assets/render.js` (Markdown, tables, code, diagrams, cards), `assets/vendor/` (marked 12.0.2, DOMPurify 3.1.6, Mermaid 10.9.1, Toast UI Editor 3.2.2 bundled into one file; all MIT licensed) |
| API (Vercel functions) | `api/site.js`, `api/page.js` (read, any role), `api/setup.js`, `api/login.js`, `api/logout.js`, `api/me.js`, `api/admin/pages.js`, `api/admin/blocks.js`, `api/admin/cards.js`, `api/admin/admins.js` (Owner) |
| Shared code | `lib/db.js` (Neon, tables), `lib/auth.js` (passwords, session), `lib/roles.js`, `lib/content.js` (first content), `lib/seed-guide.js`, `lib/seed.js`, `lib/generated/` (generated parts) |
| Local server | `scripts/dev.mjs` (`npm run dev`) |

Security: passwords are stored as scrypt hashes; the session is a signed, HTTP-only cookie (7 days) and every request checks that the person still exists; changes must come from the portal itself (JSON with an `X-Guide` header); wrong logins are slowed down; Markdown is cleaned by DOMPurify, so scripts in the text never run; database errors are never shown to visitors.

The generated parts in `lib/generated/` come from the backend's database design (`prisma/schema.prisma`). When the database changes, they are rebuilt from it and committed here.
