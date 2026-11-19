// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// "How to set up" page: setting up the BROWN POS for business, from an empty system to the first sale, written from the POS code (Nov 2026).
// Added once to every guide database (see lib/packs/index.js); the Owner edits it later in the admin portal.
export default {
 "slug": "setup",
 "title": "How to set up",
 "intro": "How to set up the BROWN POS for business, from an empty system to the first real sale. Do the parts **in this order**: each part says **who** does it, **where**, the **steps**, how to **check** it worked, and **good to know**. Installing the server itself (AWS, Docker, Cloudflare) is in the **System guide**.",
 "blocks": [
  {
   "kind": "text",
   "anchor": "checklist",
   "title": "Start here: the set-up order",
   "body": "**Who:** the Owner or a super admin, with a manager for the store checks · **Time:** about half a day for the first store, less for each next store\n\n**User flow**\n\n```mermaid\nflowchart TD\n  A[\"1 First super admin logs in\"] --> B[\"2 Create the stores\"]\n  B --> C[\"3 Add managers and cashiers\"]\n  C --> D{\"Menu from BROWN?\"}\n  D -->|Yes| E[\"4 BROWN menu sync\"]\n  D -->|No| F[\"5 Build the menu by hand\"]\n  E --> G[\"6 Check prices per store\"]\n  F --> G\n  G --> H[\"7 Payments: cash, riel, KHQR\"]\n  H --> I[\"8 Cashier controls\"]\n  I --> J[\"9 Café mode, 10 counter devices\"]\n  J --> K[\"11 Online ordering (optional)\"]\n  K --> L[\"12-14 Members, marketing, stock (optional)\"]\n  L --> M[\"15 Test day, then go live\"]\n```\n\n| # | Part | Needed? |\n| --- | --- | --- |\n| 1 | First super admin | yes |\n| 2 | Stores | yes |\n| 3 | Users and approval PINs | yes |\n| 4 or 5 | Menu (BROWN sync or by hand) | yes |\n| 6 | Prices per store and size | yes |\n| 7 | Payments | yes |\n| 8 | Cashier controls | yes |\n| 9 | Café mode and barista screen | for cafés |\n| 10 | Counter devices: printer, scanner, customer display | yes |\n| 11 | Online ordering and table QR | optional |\n| 12 | Members, points and wallet cards | optional |\n| 13 | Promotions, coupons, gift vouchers | optional |\n| 14 | Stock, recipes and suppliers | optional |\n| 15 | Test day and go live | yes |"
  },
  {
   "kind": "text",
   "anchor": "first-admin",
   "title": "1. The first super admin",
   "body": "**Who:** the developer who installs the server, then the Owner · **Where:** the server's `.env`, then the POS login page\n\n1. Before the first start, the developer puts **ADMIN_EMAIL**, **ADMIN_NAME** and **ADMIN_PASSWORD** (10+ characters) in the server's `.env`.\n2. On its first start the server creates this person as **Super admin**. If any user already exists it does nothing, so it is safe on every restart.\n3. Log in on the POS with that email and password.\n4. Change the password: **Users** → open yourself → **New password** → **Save**.\n5. Ask the developer to remove **ADMIN_PASSWORD** from the `.env`; it is not needed any more.\n\n**Check:** you see the full admin menu, including **Stores** and **Integrations**.\n\n**Good to know**\n- Never load the **demo data** (`db:seed`) on the real server: it creates a demo admin with a password everyone knows.\n- Keep at least two super admins later, so one person being away never blocks the business."
  },
  {
   "kind": "text",
   "anchor": "stores",
   "title": "2. Create the stores",
   "body": "**Who:** super admins · **Where:** **Stores → New store**\n\n1. **Code** (e.g. `B001`): short, capital letters and digits. It is in every receipt number and cannot be changed later.\n2. **Name**, **address** and **phone**: printed on receipts.\n3. **BROWN store id**: the store's id in BROWN (*idoutlet*). Needed for the BROWN menu sync; leave empty if the store does not use BROWN.\n4. **Currency** (`USD`) and **Tax rate (%)**: tax is added to products marked **Taxable**.\n5. **Products** (new stores only): **Same products and prices as …** copies the menu and prices of an existing store. Empty = every active product.\n6. The other switches (café mode, online ordering, riel, cashier controls, KHQR) are explained in parts 7 to 11. **Save**.\n\n**Many stores at once:** a developer can import the BROWN outlet list with `scripts/import-stores.mjs` (see the POS backend). Stores that already exist are skipped, and `DRY_RUN=1` shows what would be created first.\n\n**Check:** the store card shows under **Active**. A store without a BROWN store id shows under **Not linked**."
  },
  {
   "kind": "text",
   "anchor": "users",
   "title": "3. Add managers and cashiers",
   "body": "**Who:** super admins (all stores), managers (their own stores) · **Where:** **Users → New user**\n\n1. **Full name**, **email** (used to log in), **phone**.\n2. **Role**:\n   - **Super admin:** all stores and all settings (head office only).\n   - **Store manager:** their stores: staff, stock, shifts, reports, approvals.\n   - **Cashier:** the POS of their store.\n3. **Stores**: the stores this person works in.\n4. A first **password** (8+ characters). Give it to the person privately.\n5. **Save**.\n\n**Approval PIN (every manager):** log in, press the **key** button in the top bar and set a PIN. Without it, a manager cannot approve a cashier's refund, void, cash out or big discount on the POS.\n\n**Check:** log in as the new cashier on the POS computer: it opens the POS screen of their store.\n\n**Good to know:** to stop someone from logging in, open the user and switch **Active** off. Their past sales stay."
  },
  {
   "kind": "text",
   "anchor": "menu-brown",
   "title": "4. Menu: the BROWN sync",
   "body": "**Who:** super admins · **Where:** **Stores → Sync** on one store, or **Sync all stores**\n\n1. Every store needs its **BROWN store id** (part 2).\n2. Get a fresh **access token** and the **dev_kid** from the BROWN team. Treat the token like a password: don't send it in chats or emails.\n3. Open **Sync** on one store first. Leave **API URL**, **BROWN group ids** and **data_encryption** empty. Paste the token, type the dev_kid, press **Sync**.\n4. When the first store works, use **Sync all stores**. It shows each store's progress.\n\n**What happens:** the sync creates the **groups and categories**, the **items** (BROWN item id = SKU), their pictures, the **S / M / L prices of each store**, and the options and add-ons. Each item is put on sale in that store.\n\n**Check:** **Products** with the store chosen at the top lists the BROWN items with their prices. On the POS the groups show as the first row of buttons.\n\n**Good to know**\n- Run the sync again whenever BROWN changes the menu or prices. It updates what exists and adds what is new.\n- If the server cannot reach BROWN, use **Paste a response** (see [Stores: BROWN menu sync](index.html?p=how-to#brown-sync)).\n- BROWN items are created with **Track stock** off and **Sell online** off. Switch **Sell online** on for the items you want on the online menu (part 11)."
  },
  {
   "kind": "text",
   "anchor": "menu-manual",
   "title": "5. Menu: build it by hand",
   "body": "**Who:** super admins · **Where:** **Categories**, **Drink options**, **Products**\n\nDo this when a store does not use BROWN, or for extra items (e.g. local bakery).\n\n1. **Categories:** first the **groups** (e.g. *Beverages*, *Food*) with no parent, then the categories inside them (*Hot Drinks*, *Tea*…) with the group as **Parent category**. Add the **Khmer name** if receipts are printed in Khmer.\n2. **Drink options:** the option groups before the products, e.g. *Size* (required, choose one: S, M +0.50, L +1.00), *Sweetness*, *Milk* (*Oat milk* +0.60), *Add-ons* (up to 3).\n3. **Products → New product:** SKU, barcode (if packed), name and Khmer name, category, **cost**, **selling price**, the **drink options**, photo URL. Switches:\n   - **Taxable:** tax is added.\n   - **Track stock:** sales take it out of stock. **A tracked product with 0 in stock cannot be sold**, so switch it off for drinks, or receive stock first (part 14).\n   - **Sell online:** shows on the online menu.\n   - **Ingredient:** for milk, beans, cups (not sold on the POS).\n4. Products are created in the store chosen at the top. Other stores get them through **Copy products from** (new stores) or the **Sold in** switch on the Products list.\n\n**Faster start:** a developer can load a starter café menu (categories, options, 20 drinks with recipes, promotions) with `scripts/import-starter-menu.mjs`, then you change names and prices.\n\n**Check:** on the POS every category has its products, and a drink asks for its size and options."
  },
  {
   "kind": "text",
   "anchor": "prices",
   "title": "6. Check the prices in each store",
   "body": "**Who:** super admins · **Where:** **Products**, the store chosen at the top\n\n1. Choose the store at the top of the page.\n2. Open a few products of each category:\n   - **Drinks with sizes:** the **S / M / L** boxes under **Selling price** are the full prices in this store. Empty = this size is not sold here.\n   - **Items without sizes:** the **Selling price** is the price, unless the store has its **own price** (a note shows it).\n3. Fix anything wrong and **Save**, then repeat for the next store.\n\n**Check:** on the POS of that store, the price on each product tile matches the price list.\n\n**Good to know:** the next BROWN sync sets the BROWN prices again for BROWN items, so price changes for BROWN items should be made in BROWN."
  },
  {
   "kind": "text",
   "anchor": "payments",
   "title": "7. Payments: cash, riel and KHQR",
   "body": "**Who:** super admins (store settings), the developer (server settings) · **Where:** **Stores → edit a store**\n\n**Cash in riel**\n1. Switch on **Take cash in riel and give change in riel**.\n2. Set the **Exchange rate** (e.g. 4,100 ៛ = $1). Prices stay in dollars; riel amounts are rounded.\n\n**KHQR (Bakong)**\n1. Type the store's **Bakong account ID** (e.g. `myshop@aclb`). Empty = no KHQR in this store.\n2. **Name shown to customers** (up to 25 characters), **City**, **Bank**, and the **Merchant ID** only for Bakong merchant accounts. **Save**.\n3. How the payment is confirmed is a **server setting** (`KHQR_MODE`):\n   - **manual** (default): the cashier checks the payment on their phone or the bank app and presses **Customer has paid**.\n   - **bakong**: the POS sees the payment by itself. Needs a Bakong API token from the National Bank, set by the developer.\n\n**Card, bank transfer, e-wallet:** nothing to set up. The cashier takes the payment on the bank's terminal or app, then records it on the POS.\n\n**Check:** on the POS, **Pay → KHQR** shows a QR for the exact amount. Pay a small test sale from a real banking app before opening."
  },
  {
   "kind": "text",
   "anchor": "cashier-controls",
   "title": "8. Cashier controls and approvals",
   "body": "**Who:** super admins · **Where:** **Stores → edit a store → Cashier controls**\n\n| Setting | Suggested start | What it does |\n| --- | --- | --- |\n| **Cashier discount limit** | 10 % | a bigger manual discount needs a manager PIN |\n| **Cashier refunds need a manager PIN** | on | |\n| **Cashier voids need a manager PIN** | on | |\n| **Cashier cash-outs need a manager PIN** | on | taking money out of the drawer |\n\n**Check:** as a cashier, give a 20 % discount: the POS asks for a manager PIN. Every approval is written in the **Audit log**.\n\n**Good to know:** managers and super admins never need a PIN for their own actions."
  },
  {
   "kind": "text",
   "anchor": "cafe",
   "title": "9. Café mode and the barista screen",
   "body": "**Who:** super admins · **Where:** **Stores → edit → Café mode**\n\n1. Switch on **Café mode: queue numbers, dine-in / takeaway, barista screen**. **Save**.\n2. On the tablet or screen at the bar, log in and open **Barista screen** (admin menu). Leave it open all day.\n\n**What happens:** the cashier chooses **Takeaway** or **Dine-in** for each sale, every order gets a **queue number** on the receipt, and the order appears on the barista screen until the barista marks it done.\n\n**Check:** make a test sale: its number appears on the barista screen within a few seconds."
  },
  {
   "kind": "text",
   "anchor": "devices",
   "title": "10. Counter devices: computer, printer, scanner, customer display",
   "body": "**Who:** the store manager, with IT help · **Where:** at the counter\n\n**Computer or tablet**\n1. Open the POS address in **Chrome** (or Edge) and log in as the cashier. Add it to the home screen or bookmarks.\n2. Use a fixed internet connection if you can. The POS keeps selling without internet (cash and card), but KHQR, coupons, vouchers, points, wallet cards and online orders need it.\n\n**Receipt printer (80 mm thermal)**\n1. Install the printer's driver on the computer and set it as the **default printer**, paper **80 mm**.\n2. Make a test sale and press **Print**. In the print window choose the receipt printer, **Margins: None**, and switch off **Headers and footers**. Chrome remembers this.\n3. For printing with no print window, start Chrome with `--kiosk-printing` (ask IT).\n\n**Barcode and card scanner:** any USB scanner that types like a keyboard. Scan a product barcode on the POS: it goes into the cart. Wallet and member cards are scanned the same way.\n\n**Customer display (second screen)**\n1. Connect the second screen and choose **Extend** in the computer's display settings.\n2. On the POS press **Customer display**, drag the window to the customer's screen and make it full screen (**F11**).\n3. If nothing opens, **allow pop-ups** for the POS address.\n\n**Check:** a test sale prints a clean receipt with no blank paper after it, and the customer screen shows the items and the total in $ and ៛."
  },
  {
   "kind": "text",
   "anchor": "online",
   "title": "11. Online ordering and table QR codes (optional)",
   "body": "**Who:** super admins · **Where:** **Stores → edit → Online ordering**, and **Products**\n\n1. Switch on **Online ordering (order ahead and table QR codes)** and **Save**.\n2. The order page address shows under the switch: `…/order/B001`. Open it on your phone to see the menu customers will see.\n3. Choose what is on it: **Products → edit → Sell online** for each item. Only items with **Sell online** on and on sale in this store appear (BROWN items start with it off).\n4. **Print table QR codes**: type how many tables, check the codes, **Print**. Each table's QR opens the menu for that table. The first QR (**Order ahead**) is for pickup orders, e.g. on a poster or social media.\n5. Stick each QR on its table.\n\n**What happens:** orders appear on the POS under the online orders button. The cashier takes payment and the order goes to the barista screen (see [Cashier: online orders](index.html?p=how-to#online-orders)).\n\n**Good to know:** the QR codes hold the POS address. **Print them only once the POS has its final web address**: with a temporary address (e.g. a Cloudflare quick tunnel, which changes when it restarts) the printed codes stop working."
  },
  {
   "kind": "text",
   "anchor": "members",
   "title": "12. Members, points and wallet cards (optional)",
   "body": "**Who:** the developer (point rates), managers and super admins · **Where:** the server's `.env`, **Customers**, **Wallet cards**\n\n**Points**\n- The rates are server settings: **LOYALTY_EARN_RATE** (points per $1, default **1**) and **LOYALTY_POINT_VALUE** (what 1 point is worth, default **$0.01**). Decide them before the first sale and ask the developer to set them.\n- Members are added on the POS (**Add member**, F4) or in **Customers**, and are shared by all stores.\n\n**Wallet cards (stored-value cards)**\n1. **Wallet cards → Generate**: how many, then **Generate and download CSV**.\n2. Send the CSV (card numbers and serials) to the card printer.\n3. When the cards arrive, the cashier **activates** each one when it is sold and **tops it up** (see [Cashier: wallet cards](index.html?p=how-to#pay-wallet)).\n\n**Check:** add yourself as a member, make a test sale: the points show on the receipt."
  },
  {
   "kind": "text",
   "anchor": "marketing",
   "title": "13. Promotions, coupons and gift vouchers (optional)",
   "body": "**Who:** super admins · **Where:** **Promotions**, **Coupons**, **Gift vouchers**\n\nYou can open without any of these. When you need them:\n\n| You want to… | Set up | Steps |\n| --- | --- | --- |\n| Give a discount to everyone, by itself (happy hour, new drink) | a **promotion** | [Marketing: promotions](index.html?p=how-to#promotions) |\n| Give a discount only with a code (social media, flyers) | a **coupon** | [Marketing: coupons](index.html?p=how-to#coupons) |\n| Sell or give stored money to spend later | **gift vouchers** | [Marketing: gift vouchers](index.html?p=how-to#vouchers) |\n\n**Good to know:** a promotion starts working on the POS as soon as it is active and inside its dates and hours, so set the dates first and test it in one store."
  },
  {
   "kind": "text",
   "anchor": "stock",
   "title": "14. Stock, recipes and suppliers (optional)",
   "body": "**Who:** managers and super admins · **Where:** **Suppliers**, **Inventory**, **Recipes**, **Purchase orders**\n\nDo this when you want to know stock and the real cost of each cup.\n\n1. **Suppliers:** add each supplier once.\n2. **Ingredients:** products with **Ingredient** on (beans, milk, cups), with their cost.\n3. **Recipes:** for each drink, the ingredients per cup and what each option changes (e.g. *L* adds 100 ml milk).\n4. **Opening stock:** count everything, then **Inventory → Receive goods** (or **Adjust stock**) for each item.\n5. **Reorder levels:** in **Inventory → Edit**, so low stock shows an alert.\n\n**What happens:** every sale takes the ingredients out of stock; reports show the cost and margin per item.\n\n**Good to know:** products with **Track stock** on cannot be sold when their stock is 0. Receive the opening stock **before** the first day, or keep **Track stock** off until you are ready."
  },
  {
   "kind": "text",
   "anchor": "go-live",
   "title": "15. Test day, then go live",
   "body": "**Who:** the store manager and a cashier · **Where:** the POS in the store\n\n**Test day** (the day before opening)\n1. Log in as the cashier and **open a shift** with the real opening cash.\n2. Make one sale with **each payment** the store takes: cash in $, cash in ៛ with change, KHQR, card.\n3. Try a **dine-in** and a **takeaway** order; check the barista screen and the printed receipt.\n4. Add a **member**, use a **promotion** or **coupon** if you have them.\n5. **Refund** one sale (the manager types the PIN).\n6. Turn off the internet for a minute, make a cash sale, turn it back on: the sale is sent by itself.\n7. **Close the shift**: count the cash; the difference should be 0.\n8. As manager, look at **Sales**, **Shifts** and the **End of day (Z)** report.\n\n**Go live**\n- **Void the test sales the same day** (a void only works on today's sales; later it has to be a refund), so they don't count in the first real day.\n- Write down who to call when something stops working (manager, IT, developer).\n- On the first days, the manager checks the **Z report** every evening.\n\n**Good to know:** each next store only needs parts 2, 3, 6 to 11 and this test, because the menu, members and marketing are shared."
  }
 ]
};
