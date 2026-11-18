// "How to use" page: step-by-step help for every feature of the BROWN POS, written from the POS code (Nov 2026).
// Added once to every guide database (see lib/packs/index.js); the Owner edits it later in the admin portal.
export default {
 "slug": "how-to",
 "title": "How to use",
 "intro": "Step-by-step help for every feature of the BROWN POS, one part per feature: **who** can use it, **where** to find it, the **steps**, **what happens** after, and **good to know**. Use the search box on the left to find a feature.",
 "blocks": [
  {
   "kind": "text",
   "anchor": "cashier-start",
   "title": "Cashier: log in and open a shift",
   "body": "**Who:** cashiers, managers, super admins · **Where:** the POS screen (`/pos`)\n\n1. Log in with your email and password. A cashier goes straight to the POS screen of their store.\n2. Before the first payment the POS asks you to **Open your shift**.\n3. Count the cash in the drawer and type the **opening cash** in USD (and in riel if the store takes riel). On a touch screen, use the number pad.\n4. Press **Open shift**.\n\n**What happens:** every sale, refund, cash in/out and top-up is counted in this shift, so the system knows how much cash should be in the drawer.\n\n**Good to know**\n- One open shift per cashier per store. If you log out without closing it, it stays open and you continue it next time.\n- The top bar shows **Shift since 7:02 AM**: tap it to see your open shift.\n- The shift is closed on the **Shifts** page (see *Close a shift*)."
  },
  {
   "kind": "text",
   "anchor": "sell",
   "title": "Cashier: sell an item",
   "body": "**Who:** everyone on the POS · **Where:** `/pos`, left side\n\n1. Find the item:\n   - tap a **group** button (e.g. **Beverages**), then a **category** in the second row (e.g. **Hot Drinks**), then the tile; or\n   - type a few letters of the name or the SKU in the search box (**F2**) and press **Enter**; or\n   - **scan the barcode**. Typing `3*8850000001` adds **3** at once.\n2. The item goes into the cart on the right. Tap it again to add one more.\n3. If the item has drink options, a window opens first (see *Sizes, drink options and add-ons*).\n\n**Good to know**\n- Tiles show the price in **this store**. A tag icon on a product means the store has its own price.\n- Products with stock tracking show as faded when out of stock.\n- The search box also finds **member cards, wallet cards, gift vouchers and coupons**: scan or type the code and press Enter."
  },
  {
   "kind": "text",
   "anchor": "options",
   "title": "Cashier: sizes, drink options and add-ons",
   "body": "**Who:** everyone on the POS · **Where:** the window that opens when you tap a drink\n\n1. Choose the **Size** (S, M, L). The button shows how much more the size costs, for example **M +$0.50**.\n2. Choose the options: **Coffee level**, **Sweetness**, **Ice**, **Milk**…\n3. Tick the **add-ons** (e.g. *Extra espresso shot +$0.50*). Some groups allow several, for example *up to 3*.\n4. Set the quantity and a note if needed (e.g. *less hot*), then **Add**.\n\n**What happens:** the line shows the drink with its options and the full price, e.g. *Americano (L, Extra espresso shot) $4.05*. The barista screen shows the same options.\n\n**Good to know**\n- **Required** groups must be chosen before Add works.\n- Each store can have its **own size prices and its own options** (from the BROWN sync or Edit product), so the same drink can cost more at another store.\n- Only the options that drink offers are shown."
  },
  {
   "kind": "text",
   "anchor": "cart",
   "title": "Cashier: change the cart (quantity, line discount, note)",
   "body": "**Who:** everyone on the POS · **Where:** the cart on the right\n\n- **More or less:** use **+** and **−** on the line.\n- **Edit line:** tap the line to change the quantity or give a **discount on that line** (amount). Quantity 0 removes it.\n- **Note on a drink:** type it in the options window (e.g. *less hot*); it shows under the line and on the barista screen.\n- **Clear:** empties the cart at once (to keep the sale for later, use **Hold** instead).\n\n**Good to know:** a line discount and a promotion do not add up beyond the line price; the total is never below zero."
  },
  {
   "kind": "text",
   "anchor": "order-type",
   "title": "Cashier: takeaway and dine-in",
   "body": "**Who:** everyone on the POS · **Where:** top of the cart, **[Takeaway] [Dine-in]** (only in stores with **Café** switched on)\n\n1. New orders start as **Takeaway**.\n2. For a customer who stays, tap **Dine-in** and type the **table number** (e.g. `5`).\n3. Take the payment as usual.\n\n**What happens**\n\n| | Takeaway | Dine-in |\n| --- | --- | --- |\n| Order number | daily number per store: A001, A002… | the same |\n| Barista screen (`/kitchen`) | shows **Takeaway** | shows **Dine-in · T5** so staff know where to bring it |\n| Order board (`/board`) | customers see their number when ready | the same |\n| Sales → receipt panel | order number and Takeaway | order number and Dine-in, table 5 |\n| Price and tax | normal | **the same** (no separate dine-in price or service charge) |\n\n**Good to know:** orders from a **table QR code** arrive as Dine-in with the table number; **order ahead** online arrives as Pickup."
  },
  {
   "kind": "text",
   "anchor": "discount",
   "title": "Cashier: discount on the whole sale",
   "body": "**Who:** everyone on the POS · **Where:** **Discount** button under the cart\n\n1. Press **Discount**.\n2. Choose **amount** ($) or **percent** (%) and type the value, then **Apply**.\n3. When you press **Pay**: if a cashier gives more than the store's limit (e.g. **10%**), the POS asks for a **manager PIN**. The manager types their PIN on the cashier's screen.\n\n**What happens:** the discount shows on the receipt; discounts above the limit are recorded in the **Audit log** with the manager who approved.\n\n**Good to know**\n- The limit is set per store: **Stores → edit → Cashier max discount %**.\n- Managers and super admins are not limited.\n- Above the limit while **offline**: not possible (the PIN check needs internet)."
  },
  {
   "kind": "text",
   "anchor": "hold",
   "title": "Cashier: hold and recall a sale",
   "body": "**Who:** everyone on the POS · **Where:** **Hold** and **Held (n)** under the cart\n\n1. A customer is not ready to pay: press **Hold**. The cart empties and the sale is kept.\n2. Serve the next customer.\n3. Press **Held (1)** and choose the sale to **Recall** it.\n\n**Good to know:** held sales are kept on this device (not shared with other tills). Recalling while another sale is in the cart holds that one first."
  },
  {
   "kind": "text",
   "anchor": "member",
   "title": "Cashier: add a member, points",
   "body": "**Who:** everyone on the POS · **Where:** **Add member (F4)** above the cart\n\n1. Press **Add member** (**F4**), or scan the member card.\n2. Type the **phone number** or **card number**, then **Find**.\n3. Not found? The POS offers to **register** a new member: type the name (the phone is filled in) and save.\n4. The member's name and points show on the cart.\n\n**What happens:** the member **earns points** on the sale (by default 1 point per $1). Points can pay part of a sale: by default **1 point = $0.01**.\n\n**Good to know**\n- Members are shared by all stores.\n- Using points needs internet.\n- A **wallet card** that belongs to a member also adds the member."
  },
  {
   "kind": "text",
   "anchor": "pay-cash",
   "title": "Cashier: pay by cash (USD and riel)",
   "body": "**Who:** everyone on the POS · **Where:** **Pay** (**F9**)\n\n1. Press **Pay**. The window shows the amount due in $ (and in ៛ when the store takes riel).\n2. Choose **Cash $** or **Cash ៛**.\n3. Tap a **quick amount** (e.g. $5, $10, $20 or 20,000 ៛) or type what the customer gives.\n4. Choose how to give **change**: **$ + ៛** (dollars and riel), **All ៛** or **All $**.\n5. Press **Complete sale**.\n\n**What happens:** the receipt opens with the change to give back, and the cash is counted in your shift.\n\n**Good to know**\n- The riel rate is set per store (**Stores → edit → riel rate**, e.g. 4,100).\n- A customer can pay part in $ and part in ៛."
  },
  {
   "kind": "text",
   "anchor": "pay-khqr",
   "title": "Cashier: pay by KHQR",
   "body": "**Who:** everyone on the POS · **Where:** **Pay → KHQR** (stores with a KHQR account)\n\n1. In the payment window choose **KHQR**.\n2. Press **Show KHQR for $x.xx**. A QR code for the **exact amount** appears, with a countdown.\n3. The customer scans it with their banking app and pays.\n4. The POS checks every few seconds and shows **KHQR payment received** by itself. If the store's KHQR is set to manual checking, press **Customer has paid** after you see the payment.\n\n**Good to know**\n- A QR expires: press **New QR** if it runs out.\n- KHQR needs internet.\n- The KHQR account is set per store (**Stores → edit → KHQR**)."
  },
  {
   "kind": "text",
   "anchor": "pay-other",
   "title": "Cashier: card, bank transfer, e-wallet, split payment",
   "body": "**Who:** everyone on the POS · **Where:** **Pay**\n\n- **Card / Bank transfer / E-wallet:** choose the method, check the amount, press **Pay** (you can add a reference). Take the payment on the bank's terminal or app first.\n- **Split payment:** pay part with one method, then choose another method for the rest, e.g. $5 cash + the rest by card. Each part shows in the list; remove one with **Remove payment**.\n- **Complete sale** is possible when the full amount is paid."
  },
  {
   "kind": "text",
   "anchor": "pay-wallet",
   "title": "Cashier: wallet cards (pay, activate, top up)",
   "body": "**Who:** everyone on the POS · **Where:** scan the card, or **Top up** in the top bar, or **Pay → Wallet**\n\n**Pay with a card**\n1. Scan the card (or **Pay → Wallet → scan / type the card number → Find**).\n2. The balance shows. If the card has a PIN, the **customer types the PIN**.\n3. **Pay from card**. If the balance is not enough, pay the rest another way.\n\n**Activate a new card** (sold to a customer)\n1. Scan the new card: the POS opens **Activate card**.\n2. Type the **serial number** on the back, the customer's **name** and **phone**, and an optional **PIN** (4–6 digits).\n3. **Activate**. The POS then opens **Top up**.\n\n**Top up**\n1. **Top up** (top bar) → scan the card.\n2. Type the amount and how the customer pays (cash, KHQR…), then **Top up**.\n\n**Good to know:** wallet cards need internet. The top-up money is counted in your shift. Lost cards are replaced in **Wallet cards** (admin)."
  },
  {
   "kind": "text",
   "anchor": "pay-voucher",
   "title": "Cashier: gift vouchers and coupons",
   "body": "**Who:** everyone on the POS · **Where:** scan or type the code in the search box, or **Pay → Voucher**\n\n**Sell a gift voucher**\n1. Scan a voucher that has **not been sold** yet. The POS opens **Sell voucher**.\n2. Choose how the customer pays, then confirm. The voucher becomes **active**.\n\n**Pay with a gift voucher**\n1. Scan the voucher (or **Pay → Voucher → code → Find**). The balance shows.\n2. **Use voucher**. If the voucher is worth more than the sale, the rest stays on it for next time.\n\n**Use a coupon**\n1. Scan or type the coupon code (e.g. `SAVE10`).\n2. The discount shows on the cart. Some coupons need a **minimum spend** or that the **member is added**.\n3. **Remove coupon** to take it off.\n\n**Good to know:** vouchers and coupons need internet."
  },
  {
   "kind": "text",
   "anchor": "receipt",
   "title": "Cashier: receipt and next sale",
   "body": "**Who:** everyone on the POS · **Where:** the window after **Complete sale**\n\n1. The receipt shows the items, options, discounts, payments, change and the **order number**.\n2. **Print** sends it to the 80 mm receipt printer.\n3. Press **New sale** (or **Enter**) for the next customer.\n\n**Good to know**\n- Reprint any receipt later from **Sales** (admin).\n- Receipts can show product names in **Khmer** (switch the language with the ខ្មែរ button)."
  },
  {
   "kind": "text",
   "anchor": "display",
   "title": "Cashier: customer display",
   "body": "**Who:** everyone on the POS · **Where:** **Customer display** in the top bar\n\n1. Press **Customer display**. A new window opens.\n2. Move it to the screen that faces the customer and make it full screen.\n\n**What happens:** the customer sees each item, options, promotions, the total in $ and ៛, and a thank-you after payment.\n\n**Good to know:** allow pop-ups for the site if the browser blocks the window."
  },
  {
   "kind": "text",
   "anchor": "online-orders",
   "title": "Cashier: online and table-QR orders",
   "body": "**Who:** everyone on the POS · **Where:** the online orders button in the top bar (shows how many are waiting), stores with **Online ordering** on\n\n1. Customers order from their phone: **order ahead** (pickup) or by scanning the **table QR** (dine-in).\n2. The POS shows the number of waiting orders. Open the list.\n3. **Confirm** an order to accept it, or **Cancel** it.\n4. **Take** it to load it into the cart, then take the payment as usual.\n\n**Good to know:** online orders need internet. The customer can follow the order on its status page."
  },
  {
   "kind": "text",
   "anchor": "offline",
   "title": "Cashier: working without internet",
   "body": "**Who:** everyone on the POS · **Where:** automatic; the top bar shows **Online** or **Offline**\n\n**What still works offline:** finding products, sizes and options, promotions, cash and card payments, receipts.\n\n**What needs internet:** members and points, coupons, gift vouchers, wallet cards, KHQR, online orders, discounts above the limit (manager PIN), top-ups.\n\n**What happens:** sales made offline get a temporary receipt number (**OFF-…**) and wait on the device. When the internet is back they are uploaded by themselves. The waiting list shows how many are not uploaded yet; **Upload now** tries again.\n\n**Good to know:** do not clear the browser data or log out while sales are waiting: they are only on this device until uploaded (the POS warns before log out)."
  },
  {
   "kind": "text",
   "anchor": "cash-in-out",
   "title": "Cashier: cash in, cash out and X report",
   "body": "**Who:** everyone on the POS · **Where:** **Cash in/out** and **X report** in the top bar\n\n**Cash in / out** (e.g. change from the bank, buying milk)\n1. **Cash in/out** → choose **In** or **Out**, the currency ($ or ៛), the amount and a **reason**.\n2. **Save**. A **cash out** by a cashier needs a **manager PIN** if the store asks for it.\n\n**X report** (the shift so far, does not close anything)\n1. Press **X report**: sales, payments by method, cash in/out and the **expected cash** in the drawer.\n2. **Print** it if needed."
  },
  {
   "kind": "text",
   "anchor": "close-shift",
   "title": "Cashier: close a shift",
   "body": "**Who:** the cashier of the shift, or a manager · **Where:** **Shifts** page → the open shift → **Close shift**\n\n1. Count the cash in the drawer (USD and riel).\n2. Type the **counted** amounts and a note if something is off.\n3. **Close shift**.\n\n**What happens:** the shift shows **Expected**, **Counted** and the **Difference** (over or short). Then the day can be closed with the **Z report**."
  },
  {
   "kind": "text",
   "anchor": "shortcuts",
   "title": "Cashier: shortcuts, big mode and Khmer",
   "body": "| Key | What it does |\n| --- | --- |\n| **F2** | search box |\n| **F4** | add a member |\n| **F9** or **Ctrl+Enter** | pay |\n| **Enter** (after payment) | new sale |\n\n- **Big:** bigger buttons and text for touch screens.\n- **ខ្មែរ:** switches the screen (and product names) to Khmer.\n- **Keyboard:** an on-screen keyboard for touch screens.\n- A barcode scanner works anywhere on the screen: it types into the search box by itself."
  },
  {
   "kind": "text",
   "anchor": "promotions",
   "title": "Marketing: promotions",
   "body": "**Who:** super admins (create), managers (view) · **Where:** **Marketing → Promotions → New promotion**\n\n1. **Name** (shown on the receipt), e.g. *Happy Hour Frappe 15%*, and a description for staff.\n2. **Type:** **Percent off**, **Amount off each unit**, or **Buy X get Y free**. The **Preview** line shows the deal in words.\n3. **Applies to:** **all products**, or pick **Categories** and/or **Products**. Picking a group (e.g. Beverages) includes all its categories.\n4. **Stores:** pick stores, or none for **all stores**.\n5. **When** (optional): **Starts / Ends**, **Days of the week**, **Only at certain hours** (e.g. 14:00–17:00; 22:00–02:00 continues past midnight). Times use the Phnom Penh clock.\n6. **Priority**, **Active**, then **Save**.\n\n**What happens:** at the POS the discount appears by itself on the matching items, also offline and on the customer display.\n\n**Good to know**\n- Each item gets the **single best deal**; with the same discount, the higher **Priority** wins.\n- The list shows **Running now**, **Scheduled**, **Ended** or **Off**. Switch a promotion off to stop it; its history stays in **Reports**."
  },
  {
   "kind": "text",
   "anchor": "coupons",
   "title": "Marketing: coupons",
   "body": "**Who:** super admins · **Where:** **Marketing → Coupons → New coupon**\n\n1. **Name** (shown on the receipt) and **Type**: **Percent** or **Amount** off the sale.\n2. **Codes:**\n   - **one shared code** that everyone types (e.g. `SAVE10`), or\n   - **many unique codes** (e.g. 100 codes with prefix `NOV`, like `NOV-7KQ2M9XP`), each used once. A **CSV** with the codes downloads when you save.\n3. **Limits** (optional): **Minimum spend**, **Maximum discount** (for percent), **Total uses allowed**, **Uses per customer**, **Members only** (the member must be added at the POS).\n4. **Stores** and **Valid from / until**, then **Create**.\n\n**At the POS:** scan or type the code; the discount shows on the cart.\n\n**Good to know:** the list shows **Active**, **Scheduled**, **Used up**, **Expired** or **Off**, how many times it was used and the discount given. **Add codes** makes more unique codes later."
  },
  {
   "kind": "text",
   "anchor": "vouchers",
   "title": "Marketing: gift vouchers",
   "body": "**Who:** super admins · **Where:** **Marketing → Gift vouchers → Create vouchers**\n\n1. **Name** (e.g. *$10 gift voucher*), **Value of each voucher**, **How many**, and an optional **expiry**.\n2. **Create and download CSV**: print the codes on cards or paper.\n3. The vouchers start as **Not sold**.\n\n**At the POS:** scanning a not-sold voucher **sells** it (the customer pays its value) and makes it **active**. An active voucher **pays** for a sale; what is not spent stays on it.\n\n**Good to know:** **Check voucher** shows a code's status and balance. A voucher can be **voided**. The list shows sold, used and **unspent value**."
  },
  {
   "kind": "text",
   "anchor": "wallet-cards",
   "title": "Marketing: wallet cards (store-value cards)",
   "body": "**Who:** super admins and managers · **Where:** **Wallet cards**\n\n- **Generate cards:** how many → **Generate and download CSV** (card numbers and serials for printing).\n- **Find a card:** by card number, serial, customer name or phone.\n- **On a card:** **Top up** (amount, paid by), **Adjust balance** (with a reason; negative removes money), **Set / Change PIN** (4–6 digits; empty = no PIN), **Block / Unblock**, **History** of every top-up and payment.\n- **Replace a lost card:** **Replace (lost card)** → scan the new card and its serial → **Move to new card**. The balance moves; the old card stops working.\n\n**At the POS:** activate, top up and pay (see *Wallet cards* in the cashier part)."
  },
  {
   "kind": "text",
   "anchor": "customers",
   "title": "Marketing: customers and points",
   "body": "**Who:** everyone (view, add), managers (points) · **Where:** **Customers**\n\n1. **New customer:** name, phone, email, and the **member card number** (leave empty to generate one).\n2. Open a customer to see **points**, **total spent**, **visits** and their **receipts**.\n3. **Adjust points:** type the points (negative to remove) and a **reason** (e.g. *promotion*, *complaint*).\n\n**Good to know:** members are shared by all stores. By default customers earn 1 point per $1 and 1 point is worth $0.01 when used."
  },
  {
   "kind": "text",
   "anchor": "products",
   "title": "Menu: products",
   "body": "**Who:** super admins (edit), managers (sold in their store) · **Where:** **Products**\n\n- **List:** photo, category (with its group), price in the chosen store, margin, stock, and the **Sold in B001** switch. Filter by **group chips**, category, sold / not sold here, for sale / ingredients.\n- **New product / Edit:** SKU, barcode, name and **Khmer name**, **category**, unit, **cost**, **selling price**, **drink options**, photo URL, and switches: **Ingredient**, **Taxable**, **Track stock**, **Sell online**, **Made here (bakery)**, **Active**.\n- **Ingredients:** cost per unit, or from a pack price (e.g. 1,000 g for $1.60).\n\n**Good to know:** a new product is sold in the store chosen at the top. BROWN items are created and updated by the **BROWN sync**."
  },
  {
   "kind": "text",
   "anchor": "size-prices",
   "title": "Menu: prices per store and per size",
   "body": "**Who:** super admins · **Where:** **Products → Edit product**, store chosen at the top\n\n- **Drinks with sizes:** the **S / M / L** boxes under **Selling price** are the **full prices in the chosen store** (empty = not offered there). Change them and **Save**.\n- **Items without sizes:** the **Selling price** is the price. If the chosen store has its **own price** (e.g. from BROWN), a note shows it with **Use the selling price** to remove it.\n- To see another store, change the store at the top and open the product again.\n\n**Good to know:** the next **BROWN sync** sets the BROWN prices again for BROWN items."
  },
  {
   "kind": "text",
   "anchor": "categories",
   "title": "Menu: categories and groups",
   "body": "**Who:** super admins · **Where:** **Categories**\n\n- The list shows each **group** (e.g. **Beverages**) followed by its **categories** (Hot Drinks, Tea…), with how many products each has. **Search** and **Hide empty** help in long lists.\n- **New category:** name, **Khmer name**, and **Parent category** (the group). Leave the parent empty for a top-level group or category.\n- **+** on a group adds a category inside it.\n\n**What happens:** the cashier screen shows the groups as the first row of buttons and the chosen group's categories as the second row; promotions on a group include its categories.\n\n**Good to know:** the BROWN sync creates the groups and categories from BROWN and moves older flat categories under their group."
  },
  {
   "kind": "text",
   "anchor": "drink-options",
   "title": "Menu: drink options",
   "body": "**Who:** super admins · **Where:** **Drink options → New option group**\n\n1. **Name** (e.g. *Sweetness*), **Required** or optional, and **choose one** or **up to N** (e.g. add-ons up to 3).\n2. Add the **options** with their **extra price** (e.g. *Oat milk +0.60*) and mark the **default**.\n3. **Save**, then attach the group to drinks in **Products → Edit → Drink options**.\n\n**Good to know:** BROWN drinks get their own options and add-ons per store from the sync (sizes S/M/L with each store's prices)."
  },
  {
   "kind": "text",
   "anchor": "stores",
   "title": "Stores: store settings",
   "body": "**Who:** super admins · **Where:** **Stores** → a store card → edit\n\n| Setting | What it does |\n| --- | --- |\n| Code, name, address, phone | shown on receipts and in lists |\n| **BROWN store id** | links the store to BROWN for the menu sync |\n| Currency, **tax %** | tax added to taxable items |\n| **Riel rate** | cash in riel and change in riel |\n| **KHQR** account | KHQR payments |\n| **Café** | Takeaway / Dine-in, order numbers, barista screen |\n| **Online ordering** | order ahead and table QR |\n| **Cashier max discount %** | above it a manager PIN is needed |\n| **Refund / Void / Cash out need approval** | a manager PIN is needed for cashiers |\n\n**New store:** **Copy products from** another store to start with the same menu and prices."
  },
  {
   "kind": "text",
   "anchor": "brown-sync",
   "title": "Stores: BROWN menu sync",
   "body": "**Who:** super admins · **Where:** **Stores** → **Sync** on a store, or **Sync all stores**\n\n1. Open the Sync panel. Check the **API URL** (empty = the default BROWN address), **dev_kid** and paste a fresh **access token**. Leave **data_encryption** empty (the POS calculates it). **BROWN group ids** can stay empty.\n2. **Sync**. For one store it takes a few seconds; **Sync all stores** shows progress per store.\n\n**What happens:** groups and categories, items (matched by BROWN item id = SKU), pictures, **S/M/L prices of that store**, options and add-ons are created or updated. Items are listed in the store.\n\n**Good to know**\n- If the server cannot reach BROWN, use **Paste a response**: run the request in Postman on the company network and paste the answer.\n- A run stops early if every store gets the same error (e.g. an expired token). The red message says what BROWN answered."
  },
  {
   "kind": "text",
   "anchor": "users",
   "title": "Stores: users, roles and approval PIN",
   "body": "**Who:** super admins (all users), managers (their stores) · **Where:** **Users**\n\n1. **New user:** full name, email, phone, **role**, **stores** they work in, password (8+ characters).\n2. **Roles:** **Super admin** (all stores and settings), **Store manager** (their stores: staff, stock, shifts, reports; approves with a PIN), **Cashier** (the POS of their store).\n\n**Approval PIN:** each manager sets their own PIN with the **key** button in the top bar. When a cashier needs approval (discount above the limit, refund, void, cash out), the manager types the PIN on the cashier's screen. Every approval is in the **Audit log**."
  },
  {
   "kind": "text",
   "anchor": "sales",
   "title": "Back office: sales, refunds and voids",
   "body": "**Who:** everyone (their store), managers, super admins · **Where:** **Sales**\n\n1. Find a sale by date, receipt number, store or cashier. Click it: the **receipt panel** opens on the right.\n2. **Print** reprints the receipt.\n3. **Refund:** choose the items and quantities (or **Refund everything**), **Give money back by** (cash, card…), whether to **put the items back in stock**, and a reason. A cashier needs a **manager PIN** if the store asks for it.\n4. **Void sale:** cancels a sale completely. Only for **today's** sales, paid **one way**, with no refund yet (otherwise use Refund). A cashier needs a manager PIN if the store asks for it.\n\n**What happens:** refunds and voids are taken out of the shift and the reports, and recorded in the **Audit log**."
  },
  {
   "kind": "text",
   "anchor": "shifts-review",
   "title": "Back office: shifts",
   "body": "**Who:** managers and super admins (all shifts), cashiers (their own) · **Where:** **Shifts**\n\n- Every shift with its cashier, open and close time, **expected cash**, **counted cash** and the **difference** (red when short).\n- Open a shift for the details: sales by payment method, cash in/out, refunds, and **Close shift** while it is open."
  },
  {
   "kind": "text",
   "anchor": "z-report",
   "title": "Back office: end of day (Z report)",
   "body": "**Who:** managers and super admins · **Where:** **End of day (Z)**\n\n1. Make sure **every shift of the day is closed**.\n2. Choose the **business day** and look at the **Preview**: sales, net, payments, shifts and **over / short**.\n3. **Run Z report**: it gets a **Z number** and closes the business day. **Print** it if needed.\n\n**Good to know:** run it once per store per day; earlier Z reports stay in the list."
  },
  {
   "kind": "text",
   "anchor": "reports",
   "title": "Back office: reports",
   "body": "**Who:** managers (their stores), super admins (all stores) · **Where:** **Reports**\n\n1. Choose the **period** and **this store** or **all my stores**.\n2. Read the sections: sales and revenue (with and without tax), **products sold**, **payments by method**, **cashier / channel**, **refunds**, **discounts**, **promotions** and **coupons** used, **top customers** and **points**, **profit and margin** (when costs are set), **bakery** made and wasted.\n3. **CSV** downloads a section for Excel."
  },
  {
   "kind": "text",
   "anchor": "inventory",
   "title": "Back office: inventory",
   "body": "**Who:** managers and super admins · **Where:** **Inventory** (the store chosen at the top)\n\n- The list shows every product's **stock**, **reorder level** and **stock value** at cost.\n- **Edit:** reorder level (low-stock alert at or below; 0 = no alert) and the **store price**.\n- **Adjust stock:** a count, damage or loss: quantity (+ or −) and a reason.\n- **Receive goods:** stock that arrived without a purchase order, with the supplier invoice number.\n- **History:** every change: sales, refunds, receipts, transfers, adjustments.\n\n**Good to know:** only products with **Track stock** switched on count stock."
  },
  {
   "kind": "text",
   "anchor": "transfers",
   "title": "Back office: transfers between stores",
   "body": "**Who:** managers and super admins · **Where:** **Transfers**\n\n1. **Send stock:** choose the **To** store, add products and quantities (the available stock shows), then **Send**.\n2. The receiving store opens the transfer and presses **Receive** when the goods arrive.\n3. A transfer that is not received yet can be **cancelled**.\n\n**What happens:** the stock leaves the sending store when sent and arrives in the receiving store when received."
  },
  {
   "kind": "text",
   "anchor": "purchasing",
   "title": "Back office: suppliers and purchase orders",
   "body": "**Who:** managers and super admins · **Where:** **Suppliers**, **Purchase orders**\n\n1. Add the **supplier** once (name, contact).\n2. **New order:** supplier, expected delivery, products with **quantity** and **unit cost**. **Reorder low stock** adds everything below its reorder level.\n3. **Save draft**, then **Mark as ordered** when you send it to the supplier (**Print** it if needed).\n4. When goods arrive: **Receive delivery**, type what came (**Received now**) and the supplier's invoice number. Part deliveries are fine; the rest shows as **Still to come**.\n\n**What happens:** received goods are added to stock at their cost."
  },
  {
   "kind": "text",
   "anchor": "recipes",
   "title": "Back office: recipes",
   "body": "**Who:** managers and super admins · **Where:** **Recipes**\n\n1. Choose a product and add its **ingredients** with the quantity per item (e.g. 18 g coffee, 200 ml milk).\n2. Add **option effects** if an option changes the recipe (e.g. *L* adds 100 ml milk, *Oat milk* replaces milk).\n3. **Save recipe**: the page shows the **cost** and **margin** per item.\n\n**What happens:** every sale takes the ingredients out of stock and records the real cost per cup."
  },
  {
   "kind": "text",
   "anchor": "production",
   "title": "Back office: bakery production",
   "body": "**Who:** managers and super admins · **Where:** **Bakery production** (products with **Made here (bakery)**)\n\n1. **Bake:** choose the item and the number of batches (the ingredient cost shows), then **Plan batch**.\n2. When it comes out of the oven: type the **good pieces made** (burnt or broken pieces are not counted) and **Put in stock**.\n3. At the end of the day: **Write off** what is left (or expired), with the number of pieces.\n\n**What happens:** baking uses the recipe's ingredients and adds pieces to stock; selling takes pieces from stock; items expire after their **fresh for (hours)**. Reports show made, sold and wasted."
  },
  {
   "kind": "text",
   "anchor": "audit",
   "title": "Back office: audit log",
   "body": "**Who:** managers and super admins · **Where:** **Audit log**\n\nWho did what and when: discounts above the limit, refunds, voids, **manager PIN approvals**, price and stock changes, menu syncs, logins. Open a line for the details (what changed from → to, who approved). Secrets such as tokens are never written in it."
  }
 ]
};
