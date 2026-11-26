# Cornerstone sync reference: `components/products/`

Where each Cornerstone partial under `templates/components/products/` lives in this theme now, so an upstream Cornerstone change can be applied to the right file. Written after the `products/` regroup and the `product-view` split (2026-11-26).

## How to find a moved file with git
- The regroup used `git mv`, so history follows: `git log --follow -- src/templates/components/products/listing/card.tsx`.
- The hand-written originals for the moved names were deleted in the same change as the moves. Read one back from the commit before it: `git show <regroup-commit>^:templates/components/products/card.html` (find the commit with `git log --diff-filter=D --oneline -- templates/components/products/card.html`).
- Not moved, so still on disk as the Cornerstone reference: `templates/components/products/quick-view.html`, `options/*.html`, `modals/*.html`.
- Other hand-written files under `templates/` that have a JSX twin stay as the reference too. The plugin warning for them is off (`warnOnShadow: false` in `vite.config.ts`).

## Moved one-to-one
| Cornerstone original (deleted) | JSX source now | Partial name now |
|---|---|---|
| `templates/components/products/product-view.html` | `src/templates/components/products/detail/product-view.tsx` | `components/products/detail/product-view` |
| `templates/components/products/add-to-cart.html` | `src/templates/components/products/detail/add-to-cart.tsx` | `components/products/detail/add-to-cart` |
| `templates/components/products/description.html` | `src/templates/components/products/detail/description.tsx` | `components/products/detail/description` |
| `templates/components/products/description-tabs.html` | `src/templates/components/products/detail/description-tabs.tsx` | `components/products/detail/description-tabs` |
| `templates/components/products/custom-fields.html` | `src/templates/components/products/detail/custom-fields.tsx` | `components/products/detail/custom-fields` |
| `templates/components/products/reviews.html` | `src/templates/components/products/detail/reviews.tsx` | `components/products/detail/reviews` |
| `templates/components/products/videos.html` | `src/templates/components/products/detail/videos.tsx` | `components/products/detail/videos` |
| `templates/components/products/tabs.html` | `src/templates/components/products/detail/tabs.tsx` | `components/products/detail/tabs` |
| `templates/components/products/schema.html` | `src/templates/components/products/detail/schema.tsx` | `components/products/detail/schema` |
| `templates/components/products/card.html` | `src/templates/components/products/listing/card.tsx` | `components/products/listing/card` |
| `templates/components/products/list-item.html` | `src/templates/components/products/listing/list-item.tsx` | `components/products/listing/list-item` |
| `templates/components/products/grid.html` | `src/templates/components/products/listing/grid.tsx` | `components/products/listing/grid` |
| `templates/components/products/list.html` | `src/templates/components/products/listing/list.tsx` | `components/products/listing/list` |
| `templates/components/products/filter.html` | `src/templates/components/products/listing/filter.tsx` | `components/products/listing/filter` |
| `templates/components/products/featured.html` | `src/templates/components/products/listing/featured.tsx` | `components/products/listing/featured` |
| `templates/components/products/top.html` | `src/templates/components/products/listing/top.tsx` | `components/products/listing/top` |
| `templates/components/products/new.html` | `src/templates/components/products/listing/new.tsx` | `components/products/listing/new` |
| `templates/components/products/related.html` | `src/templates/components/products/listing/related.tsx` | `components/products/listing/related` |
| `templates/components/products/carousel.html` | `src/templates/components/products/listing/carousel.tsx` | `components/products/listing/carousel` |
| `templates/components/products/product-info.html` | `src/templates/components/products/listing/product-info.tsx` | `components/products/listing/product-info` |
| `templates/components/products/product-aria-label.html` | `src/templates/components/products/listing/product-aria-label.tsx` | `components/products/listing/product-aria-label` |
| `templates/components/products/product-badge.html` | `src/templates/components/products/listing/product-badge.tsx` | `components/products/listing/product-badge` |
| `templates/components/products/price.html` | `src/templates/components/products/pricing/price.tsx` | `components/products/pricing/price` |
| `templates/components/products/price-range.html` | `src/templates/components/products/pricing/price-range.tsx` | `components/products/pricing/price-range` |
| `templates/components/products/price-label.html` | `src/templates/components/products/pricing/price-label.tsx` | `components/products/pricing/price-label` |
| `templates/components/products/bulk-discount-rates.html` | `src/templates/components/products/pricing/bulk-discount-rates.tsx` | `components/products/pricing/bulk-discount-rates` |
| `templates/components/products/promotion-callout.html` | `src/templates/components/products/pricing/promotion-callout.tsx` | `components/products/pricing/promotion-callout` |
| `templates/components/products/ratings.html` | `src/templates/components/products/shared/ratings.tsx` | `components/products/shared/ratings` |

## Not moved (names are resolved at runtime)
| Cornerstone original | JSX source | Why it stays |
|---|---|---|
| `templates/components/products/quick-view.html` | `products/quick-view.tsx` | `assets/js/theme/global/quick-view.js` requests `products/quick-view` |
| `templates/components/products/options/*.html` | `products/options/*.tsx` | `{{dynamicComponent "components/products/options"}}` builds `options/<option.partial>` at render time; a miss prints nothing |
| `templates/components/products/modals/*.html` | `products/modals/*.tsx` | kept with `options/`; only `product-view` uses it |

## `product-view.html` was split
One Cornerstone file is now a composer plus eight pieces in `products/detail/`. Apply an upstream edit to the piece that owns that region:

| Region of Cornerstone `product-view.html` | JSX source now |
|---|---|
| `{{inject ...}}` stock and backorder keys at the top | `detail/runtime-config.tsx` |
| review alert messages, the outer `.productView` div, description tabs, the closing markup | `detail/product-view.tsx` (composer) |
| `.productView-images` (main image, thumbnails) | `detail/gallery.tsx` |
| title, brand, price, promotion callout, rating and review links, `detail_messages` | `detail/summary.tsx` |
| the `<dl class="productView-info">` list | `detail/info-list.tsx` |
| width / height / depth rows | `detail/info-dimensions.tsx` |
| shipping rows | `detail/info-shipping.tsx` |
| the add-to-cart `<form>`: options flag pass, options, wishlist, share | `detail/purchase-form.tsx` |
| the `form-field--stock` block, backorder messages | `detail/stock-message.tsx` |
| `#previewModal` | `detail/preview-modal.tsx` |

Context types for these pieces are in `src/server/productViewTypes.ts`.

## Other moves in this change
- `$partial("components/products/listing/product-info")` in `listing/card.tsx` and `listing/list-item.tsx` is a string (it sits in an attribute), so it needs a manual update if `product-info` moves again.
- `scripts/check-variant-selector.mjs` reads the option flag pass from `detail/purchase-form.html`.
- `docs/design/legacy-hooks.md` file references were remapped to these paths.
