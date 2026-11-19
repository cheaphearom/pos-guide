// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Starting content for the first setup (taken from the Features page). Edited later in the admin portal.
export default {
 "sections": [
  {
   "slug": "cashier",
   "title": "Cashier screen",
   "lead": "What the cashier uses all day, at `/pos`. Works on a PC, a tablet or a touch screen.",
   "tag": "",
   "cards": [
    {
     "title": "Shift and sign-in",
     "tag": "in use",
     "path": "",
     "body": "- Each cashier logs in and sees only their own store(s)\n- Open a shift with the opening cash; close it with a cash count\n- **X report**: the shift so far, any time\n- **Cash in / out** during the shift (manager PIN when the store requires it)"
    },
    {
     "title": "Finding products",
     "tag": "in use",
     "path": "",
     "body": "- Search by name or SKU, or scan a barcode\n- Type `3*8850000001` to add 3 at once\n- Group buttons (Beverages, Food…) with their categories in a second row\n- Product tiles with photos, coloured by category\n- On-screen keyboard and **Big mode** for touch screens"
    },
    {
     "title": "Drink options and sizes",
     "tag": "in use",
     "path": "",
     "body": "- Size S / M / L with **each store's own prices** from BROWN\n- Sugar, ice, milk, coffee level, and add-ons with prices\n- Each drink offers only its own options\n- Required options must be chosen before adding"
    },
    {
     "title": "The order",
     "tag": "in use",
     "path": "",
     "body": "- Change quantity, edit a line, add a note\n- **Discount** (cashiers are limited to the store's maximum)\n- **Hold** an order and **Recall** it later\n- Takeaway or Dine-in\n- **Promotions** apply by themselves: % off, amount off, buy X get Y, by day and time"
    },
    {
     "title": "Payment",
     "tag": "in use",
     "path": "",
     "body": "- Cash in USD or riel (at the store's rate), with change\n- Card, **KHQR** (QR to scan), bank transfer, e-wallet\n- The store's own **Wallet card**, gift **vouchers**, **coupons**\n- Split one sale over several payments"
    },
    {
     "title": "Receipt and customer",
     "tag": "in use",
     "path": "",
     "body": "- Print on an 80 mm receipt printer, in English or Khmer\n- **Member (F4)**: add a customer to the sale, or register a new member\n- **Top up** a wallet card\n- **Customer display**: a second screen shows the order, total and promotions"
    },
    {
     "title": "Works offline",
     "tag": "ready",
     "path": "",
     "body": "- Products and prices are kept on the device\n- Sales made without internet are saved and sent when it comes back\n- Only changed products are downloaded on each update"
    },
    {
     "title": "Shortcuts",
     "tag": "",
     "path": "",
     "body": "- **F2** search · **F4** member · **F9** pay\n- **Enter** new sale after payment"
    }
   ]
  },
  {
   "slug": "kitchen",
   "title": "Kitchen and order board",
   "lead": "For stores with a café (barista bar).",
   "tag": "",
   "cards": [
    {
     "title": "Barista screen",
     "tag": "",
     "path": "/kitchen",
     "body": "- New orders appear with their options\n- Mark each order as making, then done"
    },
    {
     "title": "Order board",
     "tag": "",
     "path": "/board",
     "body": "- A public screen for customers: order numbers being prepared and ready"
    }
   ]
  },
  {
   "slug": "online",
   "title": "Online ordering and members",
   "lead": "For customers, on their own phone.",
   "tag": "ready",
   "cards": [
    {
     "title": "Order online",
     "tag": "",
     "path": "/order/B001",
     "body": "- The store's menu with sizes and options\n- Place an order for pickup\n- A status page to follow the order"
    },
    {
     "title": "Member app",
     "tag": "",
     "path": "/m",
     "body": "- Log in, see wallet balance and history\n- Order from any store, see past orders\n- Points and profile"
    }
   ]
  },
  {
   "slug": "admin",
   "title": "Admin portal",
   "lead": "For managers and head office. Super admins see every store; store managers see their own. Pop-ups open as a panel on the right; click outside to close.",
   "tag": "",
   "cards": [
    {
     "title": "Overview",
     "tag": "in use",
     "path": "",
     "body": "- **Dashboard**: today's and recent sales\n- **Reports**: sales by store, cashier and channel; products sold; payments by method; refunds; discounts; promotions and coupons used; top customers; points; bakery production and waste; profit and margin; CSV export"
    },
    {
     "title": "Selling",
     "tag": "in use",
     "path": "",
     "body": "- **Sales**: every receipt in a side panel; print, **refund** (part or all) and **void**, with manager approval when required\n- **Shifts**: expected vs counted cash\n- **End of day (Z report)** per store and day\n- **Customers**: find, add, edit, adjust points\n- **Wallet cards**: generate (CSV), activate, top up, block, replace a lost card, history"
    },
    {
     "title": "Catalogue",
     "tag": "in use",
     "path": "",
     "body": "- **Products**: one list for all stores, photo, category colour, price, margin and stock badges, \"sold in this store\" switch, Khmer name, tax\n- **Size prices**: S / M / L boxes under Selling price for the chosen store\n- **Categories**: groups with their categories (Beverages › Hot Drinks)\n- **Drink options**: option groups with prices and defaults\n- **Ingredients** with cost per unit or from a pack price"
    },
    {
     "title": "Stock and production",
     "tag": "ready",
     "path": "",
     "body": "- **Recipes**: ingredients per product; selling uses them up\n- **Bakery production**: bake a batch (uses ingredients, adds pieces), freshness hours, waste\n- **Inventory**: stock per store, adjust stock, reorder levels\n- **Transfers** between stores\n- **Suppliers** and **purchase orders**, then **receive goods** into stock"
    },
    {
     "title": "Marketing",
     "tag": "in use",
     "path": "",
     "body": "- **Promotions**: automatic deals by product, category or group, store, dates, days and hours\n- **Coupons**: one shared code or many unique codes (CSV), minimum spend, maximum discount, usage limits, members only\n- **Gift vouchers**: batches of codes, used as a payment"
    },
    {
     "title": "Administration",
     "tag": "in use",
     "path": "",
     "body": "- **Users**: super admin, store manager, cashier, with store access per user; managers set an approval PIN\n- **Stores**: tax, currency, riel rate, KHQR, café, online ordering, approval rules (refund, void, cash-out, cashier discount)\n- **Audit log**: who changed what and when (prices, refunds, syncs…), never secrets\n- **Integrations**: API keys and webhooks for other systems\n- **System monitor**: server health and Telegram alerts"
    }
   ]
  },
  {
   "slug": "brown",
   "title": "BROWN menu sync",
   "lead": "Brings the menu from the BROWN system into the POS, per store.",
   "tag": "in use",
   "cards": [
    {
     "title": "What is synced",
     "tag": "",
     "path": "",
     "body": "- BROWN **groups** become parent categories, with their **categories** under them\n- **Items** are matched by SKU (BROWN item id): new ones are created, existing ones updated\n- **Sizes** from the item detail (S, M, L) with **this store's prices**\n- Each drink's own **options** and priced **add-ons**"
    },
    {
     "title": "How to run it",
     "tag": "",
     "path": "",
     "body": "- **Sync** on one store, or **Sync all stores** with a progress list\n- A run stops early if every store gets the same error (for example an expired token)\n- **Paste a response** when the server cannot reach BROWN\n- A clear message when it fails, and the reason in the server log"
    }
   ]
  },
  {
   "slug": "server",
   "title": "Server and hosting",
   "lead": "See [Hosting](index.html#hosting) and [How the server works](index.html#server) in the System guide for the details.",
   "tag": "",
   "cards": [
    {
     "title": "Running",
     "tag": "",
     "path": "",
     "body": "- Docker Compose on a cloud server: web app, API, PostgreSQL, Redis\n- Public link through a Cloudflare tunnel\n- Database backed up automatically"
    },
    {
     "title": "Safety",
     "tag": "",
     "path": "",
     "body": "- Passwords and PINs stored as hashes\n- Logins limited to 10 tries a minute\n- Each request is logged; tokens never are"
    }
   ]
  }
 ]
};
