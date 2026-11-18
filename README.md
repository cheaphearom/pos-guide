# BROWN POS Guide

Documentation for the BROWN POS, the point-of-sale system for BROWN Coffee stores, and a small **admin portal** to edit it. The content is stored in a **Neon** (PostgreSQL) database.

| Page | What it is |
|---|---|
| [`index.html`](index.html) | **System guide**: business requirements (BRD), software design (SDD), data flow diagrams, hosting, how the server works, getting started, every database table, how data flows, value lists, queries and technology terms. Generated from the backend's database design. |
| [`features.html`](features.html) | **Features**: everything the system can do, by screen. Its sections and cards come from the database, so they are edited in the admin portal. Opened as a plain file (no server), it shows the text built into the page. |
| [`admin/`](admin/) | **Admin portal**: log in and add, edit, reorder, hide or delete sections and cards (with a live preview), and manage who can edit. |

## Set it up (Neon + Vercel)

1. **Neon** ([neon.tech](https://neon.tech), free plan is enough): create a project, then **Connect** → copy the connection string (`postgresql://…neon.tech/neondb?sslmode=require`).
2. **Vercel**: **Add New → Project → Import** this repository. Framework preset: **Other**, no build command. Under **Environment Variables** add:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string |
   | `SESSION_SECRET` | 32+ random characters (signs the login cookie) |
   | `SETUP_KEY` | 12+ characters you choose; asked once, on the first setup |

   Then **Deploy**.
3. Open `https://YOUR-PROJECT.vercel.app/admin/`. It shows **First setup**: enter the setup key, your name, email and a password (10+ characters). This creates the tables in Neon, fills them with the current Features content and logs you in as the **Owner**.
4. Edit. Changes appear on `features.html` as soon as you save.

The tables (`guide_admins`, `guide_sections`, `guide_cards`) are created automatically; no SQL to run by hand. After the first setup, the setup page is closed for good; more people are added under **Users**, each with a role.

> Keep the Neon connection string, `SESSION_SECRET` and `SETUP_KEY` only in Vercel's settings (and in your own `.env` for local testing). Never put them in this repository or in a chat.

## Users and roles

Everyone logs in with their own email and password. The first person, created at setup, is the **Owner**.

| What they can do | Simple User | QA | Developer | Manager | Owner |
|---|:-:|:-:|:-:|:-:|:-:|
| Log in and see everything, including hidden drafts | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit a card's title, text, tag and page address | | ✓ | ✓ | ✓ | ✓ |
| Add, move, hide and delete cards | | | ✓ | ✓ | ✓ |
| Add, edit, move, hide and delete sections | | | ✓ | ✓ | ✓ |
| Add users, change their role or password, remove them | | | | ✓ | ✓ |
| Add, change or remove Owners, give the Owner role | | | | | ✓ |
| Change their own password (**My password**) | ✓ | ✓ | ✓ | ✓ | ✓ |

There is always at least one Owner. The server checks the role on every change, so hiding a button is not the only protection. To change the rules, edit `lib/roles.js`.

## Writing text

Cards use simple Markdown:

```
- One point per line, starting with "- "
- **bold**, `code`, [a link](index.html#hosting)
## A small heading
```

Tags: **in use** (used with real store data), **ready** (built, not yet used with real data), **new**, **planned**.

## Run it on your computer

```bash
npm install
cp .env.example .env    # then fill in DATABASE_URL, SESSION_SECRET and SETUP_KEY
npm run dev             # http://localhost:3000 and http://localhost:3000/admin/
```

## How it is built

| Part | Files |
|---|---|
| Pages | `index.html`, `features.html`, `admin/index.html`, `assets/md.js` (safe Markdown: everything is escaped first) |
| API (Vercel functions) | `api/content.js` (public), `api/setup.js`, `api/login.js`, `api/logout.js`, `api/me.js`, `api/admin/sections.js`, `api/admin/cards.js`, `api/admin/admins.js` |
| Shared code | `lib/db.js` (Neon connection, tables), `lib/auth.js` (scrypt password hashes, signed HTTP-only session cookie), `lib/roles.js` (who can do what), `lib/http.js`, `lib/order.js`, `lib/seed.js` (starting content) |

Security: passwords are stored as scrypt hashes; the session is a signed, HTTP-only cookie (7 days); every change must come from the admin page itself (JSON with an `X-Guide` header, so other sites cannot send changes); wrong logins are slowed down; database errors are never shown to visitors.

This is the **public edition** of the guide: passwords, PINs, server keys, tokens and request-signing details are not in it.

GitHub Pages can show the pages but cannot run the API, so the admin portal needs Vercel (or another host with Node functions).
