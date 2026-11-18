# BROWN POS Guide

Documentation for the BROWN POS, the point-of-sale system for BROWN Coffee stores. These are plain web pages with nothing to install: open them in a browser, or host them anywhere that serves static files.

| Page | What it covers |
|---|---|
| [`index.html`](index.html) | **System guide**: business requirements (BRD), software design (SDD), data flow diagrams, hosting, how the server works, getting started, every database table with its columns, how data flows, value lists, ready-made queries and technology terms |
| [`features.html`](features.html) | **Features**: everything the system can do, by screen (cashier, kitchen, online ordering, admin portal, BROWN menu sync, server), with a search box |

## Open it

- **On your computer:** download the repository (Code → Download ZIP), unzip it, and double-click `index.html`. Everything is inside the files, including the diagram library, so it also works offline.
- **On the web:** any static host works. On GitHub Pages, go to Settings → Pages, set Source to the `main` branch and the `/ (root)` folder; the guide then opens at `https://<user>.github.io/pos-guide/`. Vercel or Netlify also work by importing the repository with no build step.

## What the system is

| Part | Technology |
|---|---|
| Web app (cashier screen, admin portal, customer display, kitchen, online ordering, member app) | Vue 3, PrimeVue, Vite |
| API | NestJS, Prisma |
| Database and cache | PostgreSQL, Redis |
| Hosting | Docker Compose on a cloud server, Cloudflare tunnel |

The menu, categories and each store's size prices come from the BROWN system through the **BROWN menu sync** (one store, or all stores at once).

## About this edition

This is the **public edition**. Passwords, PINs, server keys, tokens and request-signing details have been removed. Test accounts and secrets are kept with the people who run the system, never in this repository.

## Keeping it up to date

The database part of the guide is generated from the API's database design (`prisma/schema.prisma` in the backend), so table and column lists match the code. When the system changes, rebuild the guide and replace `index.html`, then update `features.html` by hand.
