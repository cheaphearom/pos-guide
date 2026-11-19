// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// "FAQ" page: short answers to the questions people ask most about the BROWN POS, written from the POS code (Nov 2026).
// Added once to every guide database (see lib/packs/index.js); the Owner edits it later in the admin portal.
export default {
 "slug": "faq",
 "title": "FAQ",
 "intro": "Short answers to the questions people ask most about the BROWN POS. Each answer links to the step-by-step help in **How to use**, **How to set up** or **How to troubleshoot**. Can't find your question? Type a word in the search box.",
 "blocks": [
  {
   "kind": "text",
   "anchor": "selling",
   "title": "Selling at the counter",
   "body": "#### Can I keep selling when the internet is down?\nYes. Products, options, promotions, **cash** and **card** payments and receipts keep working. The sales wait on the till (receipt numbers **OFF-…**) and upload by themselves when the internet is back. KHQR, coupons, vouchers, wallet cards, points and online orders need internet. See [Cashier: working without internet](index.html?p=how-to#offline).\n\n#### Can two cashiers work on the same till?\nYes, one after the other: each cashier logs in with their own account and has **their own shift**, so each drawer count is checked on its own. Log out at the end of your shift.\n\n#### Can I change a sale after it is paid?\nNo, a paid sale is never changed. To correct it, **void** it (same day, one payment method) or **refund** it (all or some items), then ring it up again. See [Back office: sales, refunds and voids](index.html?p=how-to#sales).\n\n#### How do I reprint a receipt?\nOpen **Sales**, search the **receipt number** (or filter by status) and press **Print**.\n\n#### Can I put a sale aside and serve the next customer?\nYes: **Hold** the sale, serve the next customer, then **Recall** it. See [Cashier: hold and recall a sale](index.html?p=how-to#hold).\n\n#### Can the POS and receipts be in Khmer?\nYes. Press the **ខ្មែរ** button on the POS. Products show their **Khmer name** when one is filled in.\n\n#### How big a discount can a cashier give?\nUp to the store's **Cashier discount limit** (set by a super admin in **Stores**). Above it, a manager types their PIN on the cashier's screen. Managers have no limit."
  },
  {
   "kind": "text",
   "anchor": "payments",
   "title": "Payments and cash",
   "body": "#### Which payment methods does the POS take?\nCash in **dollars** and **riel**, **KHQR** (Bakong), **card**, **bank transfer**, **e-wallet**, **wallet cards**, **gift vouchers** and **points**. One sale can be paid in several ways (split payment), e.g. $5 cash + the rest by card.\n\n#### How is change in riel worked out?\nWith the store's **exchange rate** (e.g. 4,100 ៛ = $1, set in **Stores**). Prices stay in dollars; riel amounts are rounded to 100 ៛. The customer can pay in dollars and riel together.\n\n#### Does the POS see KHQR payments by itself?\nIt depends on a server setting. With **automatic checking** (a Bakong API token) the POS sees the payment within seconds. With **manual checking** (the default) the cashier checks the store's bank app and presses **Customer has paid**. Either way, trust the **bank app**, never a screenshot.\n\n#### Can a customer pay part with points?\nYes, a **member** can use points for part of a sale. By default 1 point = **$0.01**. Points need internet.\n\n#### What is the X report, and what is the Z report?\nThe **X report** shows the shift so far (sales, payments, cash in and out, expected cash) and **closes nothing**. Print it any time. The **Z report** closes the **whole day** of a store, after every shift is closed; there is one Z report per day.\n\n#### What happens if the drawer is short or over?\nAt **Close shift** the cashier types the counted cash; the POS shows **Expected**, **Counted** and the **Difference**. The manager sees it in **Shifts**. Nothing is changed in the sales."
  },
  {
   "kind": "text",
   "anchor": "members",
   "title": "Members, points and wallet cards",
   "body": "#### How do customers earn points?\nBy adding the member to the sale (**F4**, phone or card). By default they earn **1 point per $1**. The developer can change the rate.\n\n#### Are members shared between stores?\nYes. A member, their points and their wallet card work in **every store**.\n\n#### What is the difference between a wallet card and a gift voucher?\n| | Wallet card | Gift voucher |\n| --- | --- | --- |\n| What it is | a reloadable card of a **member** | a printed code with a **fixed value** |\n| Top up | yes, any time | no |\n| PIN | optional (4–6 digits) | no |\n| Lost | **Replace**: the balance moves to a new card | can be **voided**; the value is lost |\n\n#### A customer lost their wallet card. Is the money lost?\nNo. A manager opens **Wallet cards**, finds the card (by name or phone), and uses **Replace (lost card)**: the balance moves to a new card and the old one stops working. See [Marketing: wallet cards](index.html?p=how-to#wallet-cards).\n\n#### Can customers see their points themselves?\nYes, in the **member app** (`…/m` on the POS address): points, wallet balance, orders, and order ahead. They log in with their phone number and a one-time code, which needs an **SMS gateway** set up by the developer."
  },
  {
   "kind": "text",
   "anchor": "marketing",
   "title": "Promotions, coupons and gift vouchers",
   "body": "#### Which one should I use?\n| You want to… | Use |\n| --- | --- |\n| give a discount to **everyone**, by itself (happy hour, new drink) | **Promotion** |\n| give a discount **only with a code** (social media, flyers, apology) | **Coupon** |\n| **sell or give stored money** to spend later | **Gift voucher** |\n\n#### Can two promotions add up on one item?\nNo. Each item gets the **single best** promotion; when two give the same, the **priority** decides.\n\n#### Can a customer use a promotion and a coupon together?\nYes. The coupon is worked out on the total **after** promotions (before tax). Only **one coupon** per sale.\n\n#### Do promotions work without internet?\nYes, promotions are on the till. **Coupons** and **vouchers** need internet.\n\n#### Do gift vouchers have to be sold first?\nOnly the type **Sold to customers**: they start **Not sold** and work after a cashier sells them. **Free (promotion)** vouchers work straight away. See [Marketing: gift vouchers](index.html?p=how-to#vouchers).\n\n#### Who can create them?\n**Super admins** create promotions, coupons and vouchers. **Managers** can see them, check vouchers and void them."
  },
  {
   "kind": "text",
   "anchor": "menu",
   "title": "Menu, prices and stock",
   "body": "#### Can each store have its own prices?\nYes. Every product has a price **per store**, and drinks have **S / M / L prices per store**. Choose the store at the top of **Products** to see and change its prices. See [Menu: prices per store and per size](index.html?p=how-to#size-prices).\n\n#### I changed a BROWN item's price and it changed back. Why?\nThe **BROWN sync** sets the BROWN prices again each time it runs. Change prices of BROWN items **in BROWN**, then sync.\n\n#### How do I add a drink for one store only?\nChoose that store at the top of **Products**, then **New product**: it is sold in that store only. Other stores can switch **Sold in …** on later.\n\n#### Why can't I sell an item that is out of stock?\nThe product has **Track stock** on and its stock is 0. Receive the stock, or switch **Track stock** off (most drinks don't need it; their **ingredients** can be tracked with recipes). Sales made **offline** are always accepted.\n\n#### What does a recipe do?\nIt lists the **ingredients per cup** (e.g. 18 g coffee, 200 ml milk) and what options change. Every sale then takes the ingredients out of stock and shows the real **cost and margin** per drink. See [Back office: recipes](index.html?p=how-to#recipes)."
  },
  {
   "kind": "text",
   "anchor": "online",
   "title": "Online orders and table QR",
   "body": "#### How do customers order online?\nFrom the store's **order link** (`…/order/B001`) or by scanning a **table QR code**. They choose drinks, sizes and options, then pay **KHQR now**, **at the counter**, or with their **wallet**. See [Cashier: online orders](index.html?p=how-to#online-orders).\n\n#### Why is a drink missing from the online menu?\nOnly products with **Sell online** switched on (and on sale in that store) appear. BROWN items start with it off.\n\n#### Why did the table QR codes stop working?\nThe codes hold the POS web address. The temporary Cloudflare address changes when the server or tunnel restarts, so the codes must be printed again. A **fixed domain** solves this for good."
  },
  {
   "kind": "text",
   "anchor": "staff",
   "title": "Staff, roles and passwords",
   "body": "#### What can each role do?\n| Role | Can do |\n| --- | --- |\n| **Cashier** | sell on the POS of their store, their own shift, customers |\n| **Store manager** | everything in their stores: staff (cashiers), stock, shifts, reports, refunds; approves with a PIN |\n| **Super admin** | all stores and settings: stores, menu, prices, promotions, coupons, vouchers, BROWN sync |\n\n#### Can a person work in two stores?\nYes. In **Users**, tick every store they work in. On the POS they choose the store at the top.\n\n#### Someone forgot their password. What now?\nA manager (for cashiers) or a super admin opens **Users** → the person → types a **New password** → **Save**. Nobody can see an existing password.\n\n#### How does a manager set or change their approval PIN?\nLog in, press the **key** button in the top bar (**My approval PIN**) and type a PIN of 4 to 8 digits twice. Each manager's PIN must be different and not too simple.\n\n#### Someone left the company. Should I delete them?\nNo: open the user and switch **Active** off. They can no longer log in, and their past sales and shifts stay correct."
  },
  {
   "kind": "text",
   "anchor": "reports",
   "title": "Reports and records",
   "body": "#### Where do I see today's sales?\n**Dashboard** for a quick look; **Reports** for any period, this store or all your stores: sales, payments by method, products sold, cashiers, discounts, refunds, promotions and coupons, profit.\n\n#### Can I get the numbers in Excel?\nYes. Each section of **Reports** has a **CSV** button; CSV files open in Excel.\n\n#### Can I see who did what?\nYes, in the **Audit log**, with the person and the time: logins (also failed ones), refunds, voids, big discounts, cash outs, manager approvals, product and price changes, store and user changes, points and wallet adjustments, Z reports and BROWN syncs."
  },
  {
   "kind": "text",
   "anchor": "system",
   "title": "The system and your data",
   "body": "#### Where is our data kept?\nOn the company's own server at **AWS** (Sydney), in a PostgreSQL database. Staff reach it through a secure Cloudflare address.\n\n#### Is there a backup?\nYes. The server makes a **backup every night** (03:30 Cambodia time) and keeps it for several days. A copy outside the server (Cloudflare R2) can be switched on.\n\n#### What happens if the server goes down?\nThe tills keep selling **cash and card** offline and upload the sales when the server is back. Nothing is lost as long as nobody clears the tills' browser data. See [Server: the POS address does not open](index.html?p=troubleshoot#server-down).\n\n#### Which devices can run the POS?\nAny computer or tablet with a modern browser (**Chrome** or **Edge**). Add an 80 mm receipt printer, a USB barcode scanner and, if you like, a second screen for the **customer display**.\n\n#### Why does the POS address sometimes change?\nThe server uses a free temporary Cloudflare address (`….trycloudflare.com`) that changes when it restarts. A **fixed domain** (e.g. `pos.yourcompany.com`) is the next step; see *System guide → Hosting*."
  },
  {
   "kind": "text",
   "anchor": "guide",
   "title": "This guide",
   "body": "#### Who can read this guide?\nEveryone with a guide account: **QA**, **Developer**, **Manager** and **Owner**. The Owner chooses which roles see each page (the **System guide** is not shown to QA by default).\n\n#### Who can change it?\nOnly the **Owner**, in the admin portal (**Edit in the portal**), with a visual editor like Word.\n\n#### Is the guide the same as the POS?\nNo. The guide is a separate website with its **own logins**. A POS account does not open the guide, and a guide account does not open the POS."
  }
 ]
};
