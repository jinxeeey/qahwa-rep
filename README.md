# QAHWA digital flagship prototype

A standalone Next.js prototype for QAHWA in Hydra. It preserves the current photographic brand language and adds ordering, matcha customisation, merchandise, loyalty and operations concepts.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Included

- Replica-inspired public homepage using the current QAHWA image assets
- Searchable menu with dine-in, pickup and delivery entry modes
- Matcha powder selection for daily, ceremonial Uji and rare single-origin grades
- Working client-side cart and guest-name demo checkout
- Merchandise and proposed QAHWA Circle loyalty routes
- Admin concept covering order queue, sales, inventory, recipe forecasting, guest frequency, staff attendance and QR access
- Zone-based QR codes that remain useful when tables are moved
- Responsive desktop and mobile layouts, reduced motion and system dark mode

## Production boundary

This is an interactive product prototype. It does not process real payments or persist real orders. Dashboard values are explicitly marked as demonstration data.

A production release should add a transactional database, authenticated role-based admin access, real payment and delivery integrations, order notifications, audit logs, backups and consent-aware analytics. Recommended core records are locations, zones, products, product variants, recipes, ingredients, stock movements, orders, order lines, guests, loyalty ledger entries, staff, shifts and attendance corrections.

## QR model for movable tables

Codes represent service zones such as Indoor, Terrace and Counter instead of permanent table numbers. The guest enters a name and receives an order number. Staff can call the guest or deliver within the zone even after furniture moves. Fixed-table codes can still be enabled for banquettes or private rooms.
