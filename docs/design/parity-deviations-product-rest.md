# Parity deviations: product page remainder (tabs, related)

Reference: https://www.onlineworkwear.com.au/p405ms-biz-collection/

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Description tabs | Uppercase 15px bold titles, red active title, thin grey rule under the tab bar | Same (`description-tabs.tsx`); active state is an inset 2px underline in the title colour, via the `is-active` class set by the tab script | Keeps `role`/`href` tab markup and no-JS stacking |
| Description body | Poppins 400, h3 22px `#444` | Same sizes; weight 400 is requested but the Poppins 400 `@font-face` is not loaded (only 600/700), so text looks heavier than live. Needs a lead fix in the shared font setup | No runtime CDN |
| Related products | "Related Products" heading at 25px normal weight with a 2px underline, on the grey page background, white cards below | Same: the tab list in `tabs.tsx` is restyled as a heading, cards reuse the shared product card (white, 10px radius) | Tabs kept for the "Customers also viewed" variant |
| Related card content | Three cards with a "Super Saver" badge, feature chips and "inc. GST" | Store data decides the list (five items here, includes variants of the same product, no badges/chips from the store). Card markup is the lead's `card.tsx` | Store content |
| Reviews | Separate "4 Reviews" tab | Same tab; review list markup untouched | Semantic markup |
