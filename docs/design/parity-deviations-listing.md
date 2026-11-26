# Parity deviations: listing pages (category, search, brand, brands, compare)

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Layout | Sidebar 20%, content 80%; breadcrumb and left-aligned heading sit inside the content column | Same (`w-1/5` / `w-4/5`); breadcrumb and h1 moved into `<main>`; breadcrumb left-aligned via wrapper | Semantics kept (one h1, nav landmarks) |
| Sidebar | White rounded card; facet titles uppercase bold | White `rounded-card` card with fixed `ink` text (stays light in dark mode); facet titles uppercase bold 13px. Facets stay links (no-JS), accordions need the existing JS toggle | No-JS filters as links |
| Category subcategories | Horizontal scroll row of white pill links above the grid | Same row (`nav aria-label="Subcategories"`) in main; removed from sidebar to avoid duplicate links | Real links, keyboard reachable |
| Grid | 4 per row on desktop | 2 / 3 / 3 / 4 (4 from 1261px when a sidebar is present) | Responsive |
| Sort/limit bar | Product filter text box, sort, pagination and "Products per page" in one row | Unchanged: sort select only. Live filter box and per-page select are store JS features, not ported | No-JS first |
| Facet header | Grey "REFINE BY" header band | Plain "Refine by" heading in the card | n/a |
| Search | Opens on the Products tab (`section=product`); brand links line | Platform default view (categories panel plus tabs); heading restyled left | Store content |
| Brands | One white rounded panel with compact logo tiles, no per-brand card chrome | Same: panel (`rounded-card bg-white`), card border/shadow neutralised, logo ratio 40% | Real store content |
| Brand page | Logo (about 200px) under breadcrumb, then heading | Same, logo moved into the content column | Alt text from store |
| Compare | Not compared (needs 2+ products) | Untouched; renders its empty state | n/a |
