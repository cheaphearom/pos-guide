// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// "Training checklist" page: what each role must be able to do before working alone, with tick boxes, written from the POS code (Nov 2026).
// Added once to every guide database (see lib/packs/index.js); the Owner edits it later in the admin portal.
export default {
 "slug": "training",
 "title": "Training checklist",
 "intro": "What each person must be able to do on the BROWN POS before working alone, role by role. **Tick each item** when the trainee has done it on the POS (not only watched it): your ticks are kept in this browser, and each part shows how many are done. Press **Print** for a paper copy to sign. Each item links to the step-by-step help in **How to use**.",
 "blocks": [
  {
   "kind": "text",
   "anchor": "how",
   "title": "Start here: how to train",
   "body": "**Who:** the trainer (a store manager or a super admin) and the trainee\n\n**User flow**\n\n```mermaid\nflowchart LR\n  A[\"Trainer shows it once\"] --> B[\"Trainee does it on the POS\"]\n  B --> C{\"Done alone, without help?\"}\n  C -->|Yes| D[\"Tick it\"]\n  C -->|No| A\n  D --> E{\"All parts of the role ticked?\"}\n  E -->|Yes| F[\"Sign-off sheet: trainee + trainer sign\"]\n```\n\n1. **Practise on a test store or before opening.** Void the practice sales the same day so they don't count (a void only works on today's sales).\n2. Go **part by part**, in order. Day 1 for a cashier is about selling and money; day 2 is everything else.\n3. The trainer shows a task once, then the **trainee does it alone**. Tick it only when they could do it without help.\n4. Each trainee uses their **own login**, never the trainer's.\n5. When every part of the role is ticked, both sign the **sign-off sheet** at the bottom (print the page).\n\n**Good to know:** ticks are saved in **this browser** only. Train on one computer, or print the page and tick on paper. **Clear my ticks** starts again for the next trainee."
  },
  {
   "kind": "text",
   "anchor": "cashier-day1",
   "title": "Cashier: day 1 · selling and money",
   "body": "**Who:** every new cashier · **Time:** about 2 hours\n\n- [ ] Log in with my own account and **open my shift** with the counted opening cash in $ and ៛ ([how](index.html?p=how-to#cashier-start))\n- [ ] Find a product by **group and category** buttons, by **search (F2)** and by **scanning** a barcode ([how](index.html?p=how-to#sell))\n- [ ] Choose a **size**, **sweetness**, **milk** and **add-ons** for a drink ([how](index.html?p=how-to#options))\n- [ ] Change the **quantity**, add a **note**, remove a line ([how](index.html?p=how-to#cart))\n- [ ] Choose **Takeaway** or **Dine-in** with a table number ([how](index.html?p=how-to#order-type))\n- [ ] Take **cash in dollars** and give the right change ([how](index.html?p=how-to#pay-cash))\n- [ ] Take **cash in riel** and give change in **$ + ៛** ([how](index.html?p=how-to#pay-cash))\n- [ ] Take a **KHQR** payment and check it in the bank app ([how](index.html?p=how-to#pay-khqr))\n- [ ] Take a **card** payment and a **split payment** (part cash, part card) ([how](index.html?p=how-to#pay-other))\n- [ ] **Print** the receipt and start the **next sale** ([how](index.html?p=how-to#receipt))\n- [ ] **Hold** a sale, serve someone else, then **recall** it ([how](index.html?p=how-to#hold))\n- [ ] Open the **customer display** on the second screen ([how](index.html?p=how-to#display))\n- [ ] Print the **X report** during the shift ([how](index.html?p=how-to#cash-in-out))\n- [ ] **Close my shift**: count the drawer and type the counted cash ([how](index.html?p=how-to#close-shift))"
  },
  {
   "kind": "text",
   "anchor": "cashier-day2",
   "title": "Cashier: day 2 · customers, codes and special cases",
   "body": "**Who:** every new cashier · **Time:** about 2 hours\n\n- [ ] **Add a member** by phone or card (**F4**), and **register** a new one ([how](index.html?p=how-to#member))\n- [ ] Let a member **pay part with points** ([how](index.html?p=how-to#member))\n- [ ] **Activate** and **top up** a wallet card, then **pay** with it ([how](index.html?p=how-to#pay-wallet))\n- [ ] **Sell** a gift voucher and **pay** with one ([how](index.html?p=how-to#pay-voucher))\n- [ ] Use a **coupon** code, and explain to the customer why one is refused ([how](index.html?p=how-to#pay-voucher))\n- [ ] Give a **discount** on a line and on the whole sale; ask a manager for the **PIN** above my limit ([how](index.html?p=how-to#discount))\n- [ ] Handle an **online order**: Take payment, Payment received, cancel ([how](index.html?p=how-to#online-orders))\n- [ ] Keep selling when the POS shows **Offline**, and see the sales upload after ([how](index.html?p=how-to#offline))\n- [ ] Do a **cash in** and a **cash out** with a reason ([how](index.html?p=how-to#cash-in-out))\n- [ ] Use the **shortcuts** (F2, F4, F9, Enter), **Big** mode and the **ខ្មែរ** button ([how](index.html?p=how-to#shortcuts))\n- [ ] Find the **message** of a problem in **How to troubleshoot** with the search box ([how](index.html?p=troubleshoot#start))"
  },
  {
   "kind": "text",
   "anchor": "barista",
   "title": "Barista: the barista screen",
   "body": "**Who:** baristas and kitchen staff (café stores) · **Time:** 30 minutes\n\n- [ ] Open the **Barista screen**, keep it open all day, and switch **Sound on** to hear new orders ([how](index.html?p=how-to#order-type))\n- [ ] Read an order: **queue number**, **Takeaway / Dine-in · table**, sizes and options\n- [ ] Move an order along: **Start** → **Ready** (it shows on the **order board**) → **Picked up**\n- [ ] Bring back an order closed by mistake with **Show done** → **Recall**\n- [ ] Know that **online orders** paid by KHQR or wallet arrive here by themselves ([how](index.html?p=how-to#online-orders))"
  },
  {
   "kind": "text",
   "anchor": "manager",
   "title": "Store manager",
   "body": "**Who:** store managers (after the cashier parts) · **Time:** about half a day\n\n- [ ] Set my **approval PIN** with the key button, and approve a cashier's discount on their screen ([how](index.html?p=how-to#users))\n- [ ] **Void** today's sale and **refund** part of an older sale ([how](index.html?p=how-to#sales))\n- [ ] Check the **shifts**: expected, counted and difference ([how](index.html?p=how-to#shifts-review))\n- [ ] Run and print the **Z report** at the end of the day ([how](index.html?p=how-to#z-report))\n- [ ] Read the **reports** for my store and download a **CSV** ([how](index.html?p=how-to#reports))\n- [ ] Add a **cashier**, reset a **password**, switch a leaver to **inactive** ([how](index.html?p=how-to#users))\n- [ ] **Adjust stock** after a count and **receive goods** ([how](index.html?p=how-to#inventory))\n- [ ] **Send** and **receive** a transfer between stores ([how](index.html?p=how-to#transfers))\n- [ ] Make a **purchase order** and receive the delivery ([how](index.html?p=how-to#purchasing))\n- [ ] **Adjust points** for a customer, and **replace** a lost wallet card ([how](index.html?p=how-to#wallet-cards))\n- [ ] **Check** and **void** a gift voucher ([how](index.html?p=how-to#vouchers))\n- [ ] Read the **audit log** for a refund and its approval ([how](index.html?p=how-to#audit))\n- [ ] Do the **first checks** when something goes wrong, and know what to send to the developer ([how](index.html?p=troubleshoot#report))"
  },
  {
   "kind": "text",
   "anchor": "admin",
   "title": "Super admin",
   "body": "**Who:** head office · **Time:** about a day (see also **How to set up**)\n\n- [ ] Create and edit a **store**: tax, riel, KHQR, café mode, cashier controls ([how](index.html?p=how-to#stores))\n- [ ] Add **managers** and link users to their **stores** ([how](index.html?p=how-to#users))\n- [ ] Run the **BROWN sync** for one store and for **all stores**, and read its errors ([how](index.html?p=how-to#brown-sync))\n- [ ] Edit a product and its **S / M / L prices** in one store ([how](index.html?p=how-to#size-prices))\n- [ ] Add a **category** under a group and a **drink option** group ([how](index.html?p=how-to#categories))\n- [ ] Create a **promotion** with dates, hours and priority ([how](index.html?p=how-to#promotions))\n- [ ] Create a **coupon** (shared and unique codes) ([how](index.html?p=how-to#coupons))\n- [ ] Create a **gift voucher** batch of each type and download the CSV ([how](index.html?p=how-to#vouchers))\n- [ ] Switch on **online ordering** and print **table QR codes** ([how](index.html?p=setup#online))\n- [ ] Add a **recipe** with option effects ([how](index.html?p=how-to#recipes))\n- [ ] Read the **System monitor** and its alerts ([how](index.html?p=troubleshoot#server-errors))"
  },
  {
   "kind": "text",
   "anchor": "sign-off",
   "title": "Sign-off sheet",
   "body": "Print this page (**Print** at the top), then fill in one line per trainee.\n\n| Trainee | Role | Parts completed | Date | Trainee signature | Trainer signature |\n| --- | --- | --- | --- | --- | --- |\n| | | | | | |\n| | | | | | |\n| | | | | | |\n| | | | | | |\n\n**Good to know:** a trainee who works alone signs only after **every item** of their role is ticked. Keep the signed sheet in the store."
  }
 ]
};
