# Parity deviations: product page

Reference: https://www.onlineworkwear.com.au/p405ms-biz-collection/

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Card | White 12px-radius card holds gallery, details and tabs | Same (`productView` is the card, light-only tokens `bg-white text-ink`, so it stays light in Edge dark mode) | Contrast kept AA |
| Title / brand | Brand label (grey, uppercase, bold) above a 35px bold title | Brand `order-first` in a flex column, same sizes; the DOM order stays h1 then brand (heading order unchanged) | Semantic heading order |
| Price | 35px price, grey struck RRP, "You save" bold, "inc. GST" | Same sizes and colours. "MSRP:" label comes from the store setting `pdp-retail-price-label`; "inc. GST" is not rendered locally because the store tax label is empty here | Real store content |
| Promo badges | "Super Saver" badge and PayPal text | Not drawn by the theme: they are store regions/widgets (PayPal message is third party) | Store content |
| Features | Custom field "Features" shown as pill badges, "__note" as a text block, other custom fields not shown on top | Same via `custom-fields.tsx`; other fields get `.cf-hidden`, hidden only inside the info list, still listed when the Custom Fields tab is on | No data loss |
| Variant selector | Matrix: one row per colour with a quantity box per size | Colour tile grid plus size select (the island, untouched) | User's own design |
| Add to cart | Full-width red pill, wish list below as outlined pill | Same (full width at every breakpoint, uppercase bold). Wish list dropdown width is set in the shared `wishlist-dropdown.tsx` and is not full width | Shared file |
| Fonts | Poppins | `--font-stack` applied on the card, but Poppins `@font-face` is not loaded on the page (only Karla and Montserrat load), so text falls back to Arial. Needs a lead fix in the shared font setup | No runtime CDN |
| Not done | Sticky quote cards (logos, heat transfers), "Find the right fit", "Need assistance" blocks | Store content, not in this template | Store content |
