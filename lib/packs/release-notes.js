// "Release notes" page: what changed in the BROWN POS, newest first, from the merged changes, written from the POS code (Nov 2026).
// Added once to every guide database (see lib/packs/index.js); the Owner edits it later in the admin portal.
export default {
 "slug": "release-notes",
 "title": "Release notes",
 "intro": "What changed in the BROWN POS, newest first. Each release says what is **new**, what was **improved** and what was **fixed**, and who it matters to. Technical changes for the developer are at the end of each release. For every new release the Owner adds a part in the portal (**Edit in the portal → Release notes → + Block**), titled like *December 2026: 1 Dec · What changed*, then presses **⤒ Move to the top**.",
 "blocks": [
  {
   "kind": "text",
   "anchor": "2026-11-18",
   "title": "November 2026: 18 Nov · Categories and drink options lists",
   "body": "**Who it matters to:** super admins\n\n**Improved**\n- **Categories** is a simple list again: each group (e.g. *Beverages*) with its categories under it and how many products each has, with **search** and **Hide empty**.\n- **Drink options** keeps its colourful cards: each option group shows its options, extra prices, whether it is required, and how many products use it."
  },
  {
   "kind": "text",
   "anchor": "2026-11-17",
   "title": "November 2026: 17 Nov · BROWN groups, size prices, new admin look",
   "body": "**Who it matters to:** everyone\n\n**New**\n- **Groups and categories on the POS:** the first row of buttons shows the groups from BROWN (e.g. *Beverages*, *Food*), the second row the chosen group's categories.\n- **Size prices per store:** in **Products → Edit**, the **S / M / L** boxes right under **Selling price** are the full prices in the chosen store. Items without sizes simply use the **Selling price**.\n- **Edit product** shows only the prices of the store chosen at the top.\n- **New admin look:** products with photos, category colours, quick filters and price badges; stores as cards with their features and a **Sync** button; promotions as coupon-style cards; coupons as ticket cards with how much they are used.\n- **Panels on the right:** forms in the admin (new product, edit store…) open as a panel that slides in from the right; click outside it to close it.\n\n**Improved**\n- The **BROWN sync** creates BROWN's groups as parent categories and moves older categories under their group. Promotions on a group include all its categories.\n- The admin menu header stays at the top, and the dark sidebar is now a neutral charcoal.\n- The admin top bar fits on phones.\n\n**Fixed**\n- **Receipts** print alone on 80 mm printers: no blank page and no wasted paper after the receipt.\n- When the server is unreachable, a clear message shows instead of a page of code.\n- BROWN sync errors now show BROWN's real message (before, some showed only \"Bad gateway\"), and every failed sync is written to the server log."
  },
  {
   "kind": "text",
   "anchor": "2026-11-16",
   "title": "November 2026: 16 Nov · Sizes and options from BROWN, Sync all stores",
   "body": "**Who it matters to:** super admins, cashiers\n\n**New**\n- The BROWN sync brings each drink's **sizes (S / M / L) with each store's own prices**, and the drink's **options and add-ons** from BROWN.\n- **Sync all stores:** one button syncs every store that has a BROWN store id, one after the other, with progress per store.\n- **BROWN group ids** field: sync only some groups (optional).\n\n**Improved**\n- Sizes are read from BROWN's size code (1 = S, 2 = M, 3 = L)."
  },
  {
   "kind": "text",
   "anchor": "2026-11-14",
   "title": "November 2026: 14 Nov · BROWN menu sync",
   "body": "**Who it matters to:** super admins, cashiers\n\n**New**\n- **BROWN menu sync:** **Stores → Sync** copies a store's menu from the BROWN system: categories, items (matched by SKU), pictures and prices. Each store has a **BROWN store id**.\n- The **API URL** can be changed in the Sync window, and **Paste a response** works when the server cannot reach BROWN.\n\n**Improved**\n- POS tiles with a picture show their **price**; a broken picture shows the product's initials instead.\n\n**Technical**\n- The web app can run on the same server as the API (Docker + nginx), behind one address."
  },
  {
   "kind": "text",
   "anchor": "2026-11-13",
   "title": "November 2026: 12–13 Nov · Touch screens, products per store, System monitor",
   "body": "**Who it matters to:** everyone\n\n**New**\n- **Big mode:** everything larger on the POS for touch screens (the cashier's choice).\n- **On-screen keyboard and number pad** for tills without a keyboard: for search, money received and opening cash.\n- **Products per store:** each store sells only its own products, at its own price; choose which stores sell a product.\n- **System monitor** (super admins): server health, requests, errors and response time, sales per minute, and **alerts** (also by Telegram) when something looks wrong.\n\n**Improved**\n- Light café look for the login page and the customer display, with a dark mode.\n\n**Technical**\n- `/health` reports the database and Redis; logs are structured for the anomaly detector (now in its own repository).\n- Scripts to import stores from the BROWN outlet list and to load a starter café menu."
  },
  {
   "kind": "text",
   "anchor": "2026-11-06",
   "title": "November 2026: 6–7 Nov · Khmer, cash drawer, coffee theme",
   "body": "**Who it matters to:** everyone\n\n**New**\n- **Khmer interface:** the **ខ្មែរ / EN** button switches the screens; products and categories can have a **Khmer name**.\n- **Cash drawer:** **cash in / cash out** with a reason, the **X report** (shift so far) and the **Z report** (end of day).\n\n**Improved**\n- Warm **coffee theme** for the POS till, the admin, the barista screen, the order board and the customer display; screens work on phones.\n- Admin pages use the full screen width.\n\n**Technical**\n- Runs on one server with Docker and a Cloudflare tunnel, with a **nightly backup** and the first super admin created on the first start.\n- The backend and the web app are now two separate repositories."
  },
  {
   "kind": "text",
   "anchor": "2026-11-05",
   "title": "November 2026: 5 Nov · First version",
   "body": "**Who it matters to:** everyone\n\nThe first version of the BROWN POS, for many stores:\n\n- **POS till** with **offline mode** (keeps selling cash and card without internet), hold and recall, discounts, receipts and a **customer display**.\n- **Payments:** cash in **USD and riel** (change in $ and ៛), **KHQR**, card, bank transfer, e-wallet, split payments.\n- **Café mode:** drink options, queue numbers, takeaway and dine-in, **barista screen** and **order board**.\n- **Customers:** members and **points**, **wallet cards** (store-value cards with PIN), and a **member app** for customers.\n- **Marketing:** **promotions**, **coupons** and **gift vouchers**.\n- **Online ordering:** order ahead and **table QR codes**, paid by KHQR, at the counter or by wallet.\n- **Stock:** inventory, **recipes** with ingredient stock, suppliers and **purchase orders**, transfers between stores, **bakery production**.\n- **Control:** cashier discount limit, **manager PIN** for refunds, voids and cash outs, and the **audit log**.\n- **Admin:** stores, users and roles, products and categories, sales, shifts and reports."
  }
 ]
};
