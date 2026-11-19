// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// "How to troubleshoot" page: what to do when something goes wrong with the BROWN POS, with the real messages, written from the POS code (Nov 2026).
// Added once to every guide database (see lib/packs/index.js); the Owner edits it later in the admin portal.
export default {
 "slug": "troubleshoot",
 "title": "How to troubleshoot",
 "intro": "What to do when something goes wrong with the BROWN POS. Find the problem in the menu, or **type the message you see** in the search box: each part lists the messages the POS really shows, **why** they happen and **what to do**. The **Server** parts are for the developer or the Owner.",
 "blocks": [
  {
   "kind": "text",
   "anchor": "start",
   "title": "Start here: first checks",
   "body": "**Who:** everyone · **When:** something does not work and you don't know why\n\n**User flow**\n\n```mermaid\nflowchart TD\n  A[\"Something does not work\"] --> B[\"Read the red message: search it on this page\"]\n  B --> C{\"Only one till, or every till?\"}\n  C -->|One till| D[\"Check its internet, press F5 to reload\"]\n  C -->|Every till| E[\"Server or internet problem: call the manager\"]\n  D --> F{\"Fixed?\"}\n  F -->|Yes| G[\"Carry on\"]\n  F -->|No| H[\"Write down time, store, receipt no., message\"]\n  E --> H\n  H --> I[\"Manager, then developer\"]\n```\n\n1. **Read the message.** The POS almost always says what is wrong in a red box. Type a few words of it in **Search this page**.\n2. **One till or all?** If only one till has the problem, it is that device or its internet. If every till and the admin pages fail, it is the server or the shop's internet.\n3. **Check the top bar.** **Offline** means no internet: cash and card sales still work (see *Cashier: offline*).\n4. **Reload** the page (**F5**). Do **not** log out or clear the browser data while sales are waiting to upload.\n5. Still stuck? Write down the **time**, **store**, **receipt number**, the **exact message** (a phone photo is best), and call the manager.\n\n**Good to know:** never send a password, access token or PIN in a chat or photo. The developer never needs them to help."
  },
  {
   "kind": "text",
   "anchor": "login",
   "title": "Cashier: cannot log in, or logged out",
   "body": "**Who:** everyone · **Where:** the login page\n\n| Message | Why | What to do |\n| --- | --- | --- |\n| **Invalid email or password** | wrong email or password (passwords are case-sensitive) | check Caps Lock and try again; a manager can set a new password in **Users** |\n| **User is inactive** | the account was switched off | a manager switches **Active** on in **Users** |\n| **Please log in again** / back on the login page | the login expired, or the account was used somewhere else in a way that looks unsafe | log in again; sales waiting to upload are kept on the device |\n| **You do not have access to this store** | the user is not linked to this store | a manager adds the store to the user in **Users** |\n| **Too Many Requests** | too many tries in one minute | wait one minute, then try once |\n\n**Good to know:** a cashier always opens the POS of their own store. If they work in two stores, they choose the store at the top."
  },
  {
   "kind": "text",
   "anchor": "offline",
   "title": "Cashier: offline, sales waiting to upload",
   "body": "**Who:** everyone on the POS · **Where:** the top bar shows **Offline** and a number of waiting sales\n\n**User flow**\n\n```mermaid\nflowchart LR\n  A[\"Internet lost\"] --> B[\"Keep selling: cash and card\"]\n  B --> C[\"Sales wait on this device (OFF-…)\"]\n  C --> D{\"Internet back\"}\n  D --> E[\"Uploaded by themselves\"]\n  D --> F{\"Rejected?\"}\n  F -->|Yes| G[\"Open the queue: read why → Retry or Delete\"]\n```\n\n- **Works offline:** products, options, promotions, **cash** and **card** payments, receipts. Receipts get a temporary number **OFF-…**.\n- **Needs internet:** KHQR, coupons, gift vouchers, wallet cards, members and points, online orders, discounts above the cashier limit, top-ups.\n- When the internet is back the sales upload by themselves (every 30 seconds), or press **Upload now** in the waiting list.\n\n| Message | What to do |\n| --- | --- |\n| **… sale(s) were rejected. Open the queue to see why.** | open the waiting list; each rejected sale shows **Rejected: reason**. Fix the reason (e.g. the product was switched off) and press **Retry**. **Delete** only after a manager agrees; that sale is then lost |\n| **Discounts above …% need a manager PIN and cannot be given offline** | give the discount when the internet is back, or give a smaller one |\n| **Coupons / Vouchers / Wallet card payments need a connection…** | ask the customer to pay another way, or wait for the internet |\n| **offlineCreatedAt must be within the last 7 days** | the sale waited on the device more than 7 days: tell the manager, it must be entered again |\n\n**Good to know:** waiting sales live **only on that device**. Don't log out, clear the browser or reset the device until the waiting number is 0 (the POS warns you)."
  },
  {
   "kind": "text",
   "anchor": "products",
   "title": "Cashier: a product cannot be sold",
   "body": "**Who:** everyone on the POS\n\n| Message | Why | What to do |\n| --- | --- | --- |\n| **Not enough stock for … : available 0, needed 1** | the product has **Track stock** on and the store's stock is 0 | a manager receives the stock (**Inventory → Receive goods** or **Adjust stock**), or switches **Track stock** off for drinks |\n| **… is not sold in this store** | the product is not on sale in this store | a manager switches **Sold in …** on in **Products** (the store chosen at the top) |\n| **No product with barcode or SKU \"…\"** / **Nothing found for \"…\"** | the barcode is not saved on any product | type the name instead; a manager adds the barcode to the product |\n| **Product … is not for sale** | the product is switched off, or is an ingredient | a manager checks **Active** / **Ingredient** on the product |\n| **Choose … for …** / **Choose at most …** | a required option (e.g. size) is missing, or too many add-ons | pick the option; remove extra add-ons |\n| **Unknown size for this product** / **\"…\" is not an option of … in this store** | the size or option is not offered in this store (often after a BROWN sync) | choose another size; a manager checks the size prices for this store |"
  },
  {
   "kind": "text",
   "anchor": "payments",
   "title": "Cashier: a payment is refused",
   "body": "**Who:** everyone on the POS · **Where:** the payment window\n\n| Message | Why | What to do |\n| --- | --- | --- |\n| **Payment … is less than amount due …** | the payments do not cover the total | add another payment for the rest |\n| **Card / KHQR / transfer payments cannot be more than the amount due** | only cash can be more than the total (to give change) | type the exact amount for card, KHQR or transfer |\n| **Riel cash must be in steps of 100** | riel notes start at 100 ៛ | round the riel amount |\n| **Riel cash is not set up for this store** / **Only cash can be paid in riel** | riel is switched off, or used with a non-cash method | pay in dollars; a super admin switches riel on in **Stores** |\n| **The exchange rate is now … riel per dollar; enter the riel again** | the rate was changed while the window was open | type the riel amount again |\n| **Points can pay part of the order, not all of it** / **Customer has only … points** | points are limited | use fewer points, pay the rest another way |"
  },
  {
   "kind": "text",
   "anchor": "khqr",
   "title": "Cashier: KHQR problems",
   "body": "**Who:** everyone on the POS · **Where:** **Pay → KHQR**\n\n| What you see | What to do |\n| --- | --- |\n| **KHQR is not set up for this store. Add the Bakong account on the Stores page.** | a super admin types the **Bakong account ID** in **Stores → edit** |\n| the QR **expired** before the customer paid | press **New QR**. A QR is valid a few minutes (5 by default) |\n| **Payments are confirmed automatically. Ask a manager to confirm by hand.** | the store checks KHQR automatically; if the bank app shows the payment but the POS does not, a manager confirms it |\n| the customer paid but the POS does not move on | look at the store's **bank app or phone**: if the money is there, press **Customer has paid** (manual checking) or wait a few seconds (automatic checking) |\n| **This KHQR has not been paid yet** | the payment is not in the bank yet: check the bank app, don't hand over the order |\n| **KHQR paid …, less than …** | the customer paid a different amount: take the rest another way |\n| **This KHQR payment was already used for another sale** | the same payment was used twice: check the bank app, take the payment again |\n| **This KHQR belongs to another store** | the QR was made in another store: make a new one here |\n| **KHQR supports USD and KHR only** | the store currency is not USD: a super admin checks **Stores → Currency** |\n\n**Good to know:** KHQR needs internet. When in doubt, the **bank app** is the truth: never complete a sale on the customer's screenshot alone."
  },
  {
   "kind": "text",
   "anchor": "codes",
   "title": "Cashier: coupon, voucher or wallet card refused",
   "body": "**Who:** everyone on the POS\n\n**Coupons**\n\n| Message | What to do |\n| --- | --- |\n| **Coupon code not found** | check the spelling (letters and digits) |\n| **This coupon is not active / is not valid yet / has expired** | the coupon is off or outside its dates: no discount |\n| **This coupon cannot be used in this store** | it is for other stores |\n| **This coupon is for members only: add the customer first** / **Add the customer: this coupon is limited per customer** | press **Add member (F4)**, then the coupon again |\n| **This coupon code has already been used** / **This customer has already used this coupon** / **This coupon campaign is fully used** | the limit is reached: no discount |\n| **Spend at least … to use this coupon** | add items until the total reaches the minimum |\n\n**Gift vouchers**\n\n| Message | What to do |\n| --- | --- |\n| **Voucher not found** / **Voucher not found or already used/void** | check the code; a manager checks it in **Gift vouchers → Check voucher** |\n| **This voucher was not sold yet** | sell it first (scan it → **Sell voucher**), or it is a fake |\n| **This voucher has expired** / **Voucher is void** | it cannot be used: tell a manager |\n| **Voucher balance is …, not enough for …** | use the balance, pay the rest another way |\n\n**Wallet cards**\n\n| Message | What to do |\n| --- | --- |\n| **Wallet card not found** | scan again or type the number; it may be a card of another system |\n| **This card needs its PIN** | the customer types their PIN |\n| **Wallet card is INACTIVE / BLOCKED / CLOSED** | inactive: not given to a customer yet, activate it when selling. Blocked: lost or suspicious, a manager checks **Wallet cards**. Closed: replaced by a new card |\n| **Wallet balance is …, not enough for …** | top up, or pay the rest another way |\n| **Serial number does not match this card** | type the serial printed on the back of **this** card |"
  },
  {
   "kind": "text",
   "anchor": "approvals",
   "title": "Cashier: manager PIN problems",
   "body": "**Who:** cashiers and managers · **Where:** the **Manager approval** window on the POS\n\n| Message | Why | What to do |\n| --- | --- | --- |\n| **A manager PIN is needed for this …** | the store asks for approval (discount above the limit, refund, void, cash out) | a manager types their PIN on the cashier's screen |\n| **Only managers have an approval PIN** / no PIN set | the manager has not set a PIN yet | the manager logs in and sets it with the **key** button in the top bar |\n| **Too many wrong PINs. Try again in … minutes.** | protection against guessing | wait, then type it carefully |\n| **The manager approval has expired; ask again** / **was already used** / **does not cover this …** | an approval is for one action, a short time, and the amount approved | ask the manager again for this exact action |\n| **You cannot approve your own request** | a manager cannot approve themselves | another manager approves, or do it from the manager's own login |\n| **Another manager uses this PIN; choose a different one** / **Choose a PIN that is harder to guess** | PINs must be unique and not simple (1234…) | choose another PIN |"
  },
  {
   "kind": "text",
   "anchor": "refund",
   "title": "Cashier: refund or void refused",
   "body": "**Who:** everyone (their store), managers · **Where:** **Sales** → the sale\n\n| Message | What to do |\n| --- | --- |\n| **Only sales from today can be voided; use Refund** | older sales are **refunded**, not voided |\n| **This sale was paid in more than one way; use Refund** | split payments are refunded, not voided |\n| **Only untouched sales can be voided (this one is …); use Refund** | part of it was refunded already: refund the rest |\n| **Only … of … can still be refunded** | some of that item was refunded before |\n| **Sale is already VOIDED / REFUNDED** | nothing more to do |\n| **The voucher that paid is void; refund another way** / **The wallet card that paid is closed; refund another way** | give the money back in cash (or another way) |\n\n**Good to know:** refunds and voids by cashiers can need a **manager PIN** (store setting). Every refund and void is in the **Audit log**."
  },
  {
   "kind": "text",
   "anchor": "shifts",
   "title": "Cashier: shift and cash drawer problems",
   "body": "**Who:** cashiers and managers · **Where:** the POS, **Shifts**\n\n| Message / problem | What to do |\n| --- | --- |\n| **You already have an open shift in this store** | carry on with it, or close it first in **Shifts** |\n| **The shift is closed** / **Shift is already closed** | open a new shift to keep selling |\n| **Not your shift** | only that cashier or a manager can close it |\n| the drawer is **short** or **over** at closing | count again (USD and riel separately), check **cash in/out** and the **X report**; type the counted amount and a **note**: the manager sees the difference |\n| **The drawer should only have …** (cash out) | you tried to take out more cash than the drawer holds: check the amount |\n\n**Good to know:** a difference of more than $1 is also written to the server log, so the developer and monitoring see it. Never \"fix\" a difference by changing sales."
  },
  {
   "kind": "text",
   "anchor": "devices",
   "title": "Cashier: printer, scanner and customer display",
   "body": "**Who:** everyone on the POS, with IT help\n\n| Problem | What to do |\n| --- | --- |\n| nothing prints | is the printer on, with paper, and the **default printer**? Print a test page from the computer. Reprint the receipt from **Sales** |\n| receipt is tiny, cut off, or blank paper after it | in the print window: the **receipt printer**, **Margins: None**, **Headers and footers off**, paper **80 mm** |\n| the print window appears every time | ask IT to start Chrome with `--kiosk-printing` |\n| scanner does nothing | click once on the POS window so it is active, then scan. Test the scanner in Notepad: it should type the code and Enter |\n| scanner types wrong characters | the scanner's keyboard language must match the computer's (English US) |\n| customer display does not open | allow **pop-ups** for the POS address in the browser, then press **Customer display** again |\n| customer display shows on the wrong screen | drag it to the customer's screen and press **F11** |"
  },
  {
   "kind": "text",
   "anchor": "sync",
   "title": "Menu: BROWN sync errors",
   "body": "**Who:** super admins · **Where:** **Stores → Sync** / **Sync all stores**\n\n| Message | Why | What to do |\n| --- | --- | --- |\n| **Cannot reach the BROWN API (…)** | the POS server cannot connect to BROWN (company network or IT allow-list) | use **Paste a response**: run the request in Postman on the company network and paste the answer. Long term: IT allows the server's IP |\n| a red message from BROWN, e.g. **code 202 … fail** for every store | the **access token** expired, or the **dev_kid** is wrong | get a **fresh token**, paste it, sync one store first |\n| it works on one computer but not another | the **API URL** and **group ids** are remembered **in each browser** | on the failing browser, empty **API URL** and **BROWN group ids** (empty = default) |\n| **The BROWN menu has no items for this store** | wrong **BROWN store id**, or the store has no menu in BROWN | check the store's id (*idoutlet*) with the BROWN team |\n| **BROWN store id … already belongs to store …** | two POS stores have the same BROWN id | fix the id on one of them in **Stores → edit** |\n| **No active store has a BROWN store id yet** | **Sync all stores** has nothing to do | add the BROWN store ids first |\n| **This sync run is not known (the server may have restarted). Start it again.** | the server restarted during **Sync all** | press **Sync all stores** again: finished stores are simply updated |\n| **API URL cannot point at …** / **API URL is not a valid address** | a wrong address was typed | empty the **API URL** field |\n\n**Good to know:** a run stops early if every store gets the same error, so one expired token does not cost an hour. Never paste the token in a chat or a screenshot."
  },
  {
   "kind": "text",
   "anchor": "menu-wrong",
   "title": "Menu: prices or items look wrong",
   "body": "**Who:** super admins and managers · **Where:** **Products** (store chosen at the top)\n\n| Problem | Why | What to do |\n| --- | --- | --- |\n| a price changed by itself | the **BROWN sync** sets BROWN prices again | change BROWN prices in BROWN, then sync |\n| a size is missing in one store | that size has no price in this store | add the S / M / L price in **Products → edit** (this store) |\n| a product shows in one store but not another | **Sold in …** is off in the other store | switch it on with that store chosen |\n| a category is missing on the POS | the category has no products on sale in this store, or is inactive | check **Categories** and the products' store switches |\n| the cost or margin is empty | no cost or recipe | add the **cost**, or a **recipe** |"
  },
  {
   "kind": "text",
   "anchor": "online",
   "title": "Online: orders and table QR codes",
   "body": "**Who:** super admins (settings), everyone on the POS (orders)\n\n| Problem / message | What to do |\n| --- | --- |\n| **This store does not take online orders** | a super admin switches **Online ordering** on in **Stores → edit** |\n| an item is missing from the online menu | switch **Sell online** on for the product, and check it is on sale in this store |\n| **… cannot be ordered online** | the product's **Sell online** is off |\n| the **table QR codes stopped working** | the POS web address changed (temporary Cloudflare address): print the codes again from **Stores → Print table QR codes**. For good: get a fixed domain (see the System guide) |\n| no **Online** button on the POS | online ordering is off for this store |\n| an order paid by KHQR is not on the POS list | paid orders go straight to the **barista screen**, not the list |\n| **This online order was already paid or cancelled** | someone else handled it: refresh the list |\n| **KHQR is not available in this store; choose pay at counter** (customer side) | the store has no Bakong account: the customer pays at the counter |"
  },
  {
   "kind": "text",
   "anchor": "z-report",
   "title": "Back office: end of day (Z report)",
   "body": "**Who:** managers · **Where:** **End of day (Z)**\n\n| Message | What to do |\n| --- | --- |\n| **Close these shifts first: …** | the named cashiers' shifts are still open: close them in **Shifts**, then run the Z report |\n| **The Z report for … was already run; reprint it from the list** | a day has one Z report: open it in the list and **Print** |\n| **That day has not started yet** | choose today or an earlier day |"
  },
  {
   "kind": "text",
   "anchor": "stock",
   "title": "Back office: stock looks wrong",
   "body": "**Who:** managers and super admins · **Where:** **Inventory**\n\n| Problem | Why | What to do |\n| --- | --- | --- |\n| stock is **negative** | offline sales are always accepted, even without stock | count the item and **Adjust stock** with a reason |\n| stock never changes | **Track stock** is off for the product | switch **Track stock** on (then count and **Adjust stock**) |\n| an ingredient (milk, beans) never goes down | the drinks that use it have no **recipe** | add the recipes in **Recipes** |\n| stock is wrong after a delivery | the delivery was not received, or received twice | look at **History** for the item, then **Adjust stock** |\n| a transfer did not arrive | the receiving store has not pressed **Receive** | the receiving manager opens **Transfers → Receive** |"
  },
  {
   "kind": "text",
   "anchor": "access",
   "title": "Back office: cannot see a page or a store",
   "body": "**Who:** everyone\n\n| Message / problem | Why | What to do |\n| --- | --- | --- |\n| a menu item is missing (e.g. **Stores**, **Categories**) | that page is for super admins only | ask a super admin |\n| **Your role cannot perform this action** | the role does not allow it | ask a manager or super admin |\n| **You do not have access to this store** | the user is not linked to that store | add the store to the user in **Users** |\n| **Store managers can only manage cashiers** / **Assign the user to at least one of your stores** | managers create cashiers for their own stores | a super admin creates managers |\n| **You cannot deactivate yourself or change your own role** | safety rule | another super admin does it |"
  },
  {
   "kind": "text",
   "anchor": "server-down",
   "title": "Server: the POS address does not open",
   "body": "**Who:** the developer or the Owner · **Where:** the server (connect with SSH first)\n\n**User flow**\n\n```mermaid\nflowchart TD\n  A[\"POS address does not open\"] --> B{\"What do you see?\"}\n  B -->|\"Cloudflare error 502 / 1033, or the page is gone\"| C[\"Tunnel problem\"]\n  B -->|\"POS page, but every action fails\"| D[\"Server problem\"]\n  C --> E[\"Restart quicktunnel → NEW address\"] --> F[\"Send the new address to the stores\"]\n  D --> G[\"docker compose ps → logs api\"]\n```\n\nConnect from PowerShell: `ssh -i PATH\\TO\\YOUR-KEY.pem ubuntu@SERVER_IP`, then:\n\n**1. Is everything running?**\n\n```bash\ncd ~/pos-backend/deploy && docker compose ps\n```\n\napi, web, postgres, redis and backup should be **Up (healthy)**. If one is not:\n\n```bash\ncd ~/pos-backend/deploy && docker compose up -d\n```\n\n**2. Does the POS answer on the server itself?**\n\n```bash\ncurl -s http://127.0.0.1:8088/health\n```\n\n`{\"status\":\"ok\",\"database\":\"ok\",\"redis\":\"ok\"}` means the POS is fine and the problem is the tunnel.\n\n**3. Fix the tunnel (502 Bad gateway, Cloudflare error, address gone)**\n\n```bash\ndocker network connect pos_default quicktunnel\n```\n\n```bash\ndocker restart quicktunnel\n```\n\n```bash\ndocker logs quicktunnel 2>&1 | grep trycloudflare | tail -1\n```\n\n> Restarting the quick tunnel gives a **new address**: send it to the stores, and print the **table QR codes** again.\n\n**Good to know:** the quick tunnel address changes on every restart (also when the server restarts). A **fixed domain** with the named tunnel ends this problem (see *System guide → Hosting*)."
  },
  {
   "kind": "text",
   "anchor": "server-errors",
   "title": "Server: errors, slowness, after an update",
   "body": "**Who:** the developer · **Where:** the server, and **System monitor** in the admin (super admins)\n\n**See what went wrong**\n\n```bash\ncd ~/pos-backend/deploy && docker compose logs api --tail 50\n```\n\n| Problem | What to do |\n| --- | --- |\n| errors started right after an update | read the api log; if needed go back to the previous version (`git checkout` the last good commit in both repositories) and rebuild |\n| the new screens don't show after an update | the web app was not rebuilt: `docker compose up -d --build web`; then **Ctrl+Shift+R** in the browser |\n| the POS is slow | **System monitor**: requests per minute, error rate, p95 response time. Restart the api if it is stuck |\n| a Telegram alert arrived | open **System monitor → Recent alerts**: the suspected problem and example log lines |\n\n**Restart only the api** (sales on the tills keep waiting and upload when it is back):\n\n```bash\ncd ~/pos-backend/deploy && docker compose restart api\n```\n\n**Rebuild after pulling new code:**\n\n```bash\ncd ~/pos-backend/deploy && docker compose up -d --build\n```\n\n> Database changes (migrations) run by themselves when the api starts."
  },
  {
   "kind": "text",
   "anchor": "server-disk",
   "title": "Server: disk full and backups",
   "body": "**Who:** the developer\n\n**Check the disk**\n\n```bash\ndf -h /\n```\n\nAbove about 85 % used, free space:\n\n```bash\ndocker image prune -f\n```\n\n```bash\nls -lh ~/pos-backend/deploy/backups | tail\n```\n\nOld backups are removed by themselves after the number of days set in the server settings; copy the ones you need elsewhere before deleting any by hand.\n\n**Make a backup now** (before any risky change):\n\n```bash\ncd ~/pos-backend/deploy && docker compose exec -T postgres pg_dump -U pos pos > ~/pos-backup-$(date +%F).sql\n```\n\n**Never run these on the real server**\n\n| Command | Why |\n| --- | --- |\n| `docker compose down -v` | **deletes the database** (all sales, products, users) |\n| `npm run db:seed` / demo data | creates a demo admin with a password everyone knows |\n| `docker volume prune` | can delete the database volume |\n\n**Restore** a backup only when something went really wrong, with the tills stopped: see *System guide → Hosting → Restore a backup*."
  },
  {
   "kind": "text",
   "anchor": "report",
   "title": "When you call the developer",
   "body": "**Who:** managers, super admins\n\nSend this, so the problem can be found quickly:\n\n1. **When:** the date and time (to the minute).\n2. **Where:** the store, the till (which computer), the user.\n3. **What:** what you tried to do, and the **exact message** (a photo of the screen).\n4. **Which sale:** the receipt number (e.g. `B001-00001234`, or `OFF-…` for an offline sale).\n5. **How many:** one till, one store, or every store? Since when?\n\n**Never send:** passwords, PINs, the BROWN access token, or the server's `.env` settings. Nobody needs them to help you."
  }
 ]
};
