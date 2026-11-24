# Tailwind conversion: live handoff

Maintained by the lead after every merged work package (WP). Workers: read `docs/design/tailwind-worker-brief.md` first, then this file at the start of your WP. Last updated: 2026-11-24 (before WP1).

## Goal and standard

Convert the theme's remaining SCSS (`assets/scss/components`, `assets/scss/layouts`) to Tailwind utilities in the TSX under `src/templates`. Standard chosen by the user: about 10 utilities per element; leaf styling converts, heavy responsive layout/pseudo-elements/JS state/third-party styling stays in SCSS with a recorded reason; order by leaf yield; parity verified in the user's Edge; Citadel/Foundation imports are retired last, only when unused. Measured ceiling: about 20-30% of SCSS lines can convert under the cap (leaf rules are 16% of lines).

## Environment facts

- Dev server: `npm run vite-dev`, `http://localhost:5173/` (proxies the live store; the user is signed in to Edge on localhost:5173; signed-in cart has 1 item). Never add to the cart or submit anything.
- Edge is the browser (claude-in-chrome driver). Viewport cannot be resized: measure widths 375/768/1280 in same-origin iframes via the helper.
- Known test pages: product `/p405ms-biz-collection/` (root `[data-variant-selector]` or `.page`), category `/fashion-biz/`, cart `/cart.php`, search `/search.php?search_query=polo`, login `/login.php` (public), account `/account.php` (signed in) and its sub-actions (`?action=order_status`, `address_book`, `wishlists`, `inbox`, `returns`), contact `/contact-us/`, home `/`, brands `/brands/`.
- `rem` is 14px. Breakpoints: xxsmall 320, xsmall 481, small 551, medium 801, large 1261, xlarge 1441. `important` is on, `source(none)` is on, each converted folder is listed with `@source` in `assets/scss/_tailwind.scss`, and `theme.scss` imports `_tailwind` bare.

## Existing theme names (reuse; add only by the promotion rule)

- Colours (merchant): `primary`, `primary-dark|darker|light`, `secondary(-dark|-darker)`, `highlight(-dark|-darker)`, `grey`, `grey-darkest..lightest`, `text-base`, `text-secondary`, `fill-dark`, `icon`; design tokens: `brand`, `white`, `on-brand`, `brand-text`, `bg`, `surface`, `text`, `text-muted`, `border`, `link`, `focus`, `accent-amber|blue|navy`, `tint`, `on-amber`, `success`, `error`. Use as `bg-primary`, `text-text-base`, `border-border`, etc. Anything else: `text-(--sv-color-<name>)`, `bg-(--sv-<var>)`.
- Spacing: `base single double half third quarter fifth sixth eighth` (`p-half`, `mt-single`, `gap-quarter`); text: `hero largest larger large small smaller smallest tiny` (`text-small`, font-size only); radius `rounded-card` (12px).
- Container border: `container("border")` is `1px solid <--sv-container-border-global-color-base>`: write `border border-(--sv-container-border-global-color-base)` (promote to a name when used at 2+ sites).

## Lessons (read these)

- Keep a class name on an element if JS or Jest specs select it; only delete the SCSS rule.
- Template-literal classNames (`className={`a ${$If(...)}`}`) are missed by simple scripts: patch by hand and grep for `className={`.
- Legacy unlayered CSS beats Tailwind layers; that is why `important` is on. A utility named like a legacy class (`.table`, `.hidden`, `.container`, `.block`) would restyle every legacy element: use arbitrary properties (`[display:table]`). `text-left|center|right` are allow-listed (same meaning in Foundation).
- `remCalc(18px)` computes to 17.9875px; px utilities give 18px: harmless. PayPal and other third-party iframes cause nondeterministic differences: exclude, do not chase.
- Image lazy-load timing can change an `img` height by about 0.3px between captures at 375px.
- `sessionStorage` snapshots survive a reload in the same tab only; the helper functions do not (paste again).
- Jest (`npx jest assets/js/test-unit/...`) cannot load its config in this environment: do not rely on it.

## Work packages (sequential; the lead merges and commits each)

| WP | Scope (SCSS under `assets/scss/`) | TSX owned (under `src/templates/`) | Status |
| --- | --- | --- | --- |
| 0 | cart slice A, variant selector, tooling | cart (partial), products/options | merged (`31c354d1`, `32e8a01c`) |
| 1 | `components/stencil/{account,addressBox,addReturn,paymentMethods,_wishlists,_login}`, `layouts/account` | `components/account`, `pages/account`, `pages/auth` | merged, partial (see report) |
| 2 | `components/stencil/{productView,productReviews,writeReview,productCarousel,quickView,price,rating,ribbon,tags,toggleLink,videoGallery,socialLinks}`, `layouts/products/*` (incl. the rest of `_variantSelector`) | `components/products` (not `options`), `pages/product.tsx` | merged, small (see report) |
| 3 | `components/stencil/{navUser,navPages,heroCarousel,banners}`, `layouts/{header,footer,body,container,sidebar}` | `layout`, `components/common`, `components/carousel*.tsx`, `pages/home.tsx` | merged, small (see report) |
| 4 | `components/stencil/{search,category,compare,facetedSearch,facetLabel,contact,blocker,textTruncate}`, `layouts/{blog,brands}` | `components/{search,category,brand,blog,faceted-search,sitemap,page}`, `pages/{search,category,brand,brands,blog,blog-post,compare,contact-us,page,sitemap}.tsx` | merged (see report) |
| 5 | rest of `components/stencil/cart/_cart.scss`, `previewCart` | `components/cart`, `pages/cart.tsx`, `components/common/cart-preview.tsx` | merged, small (see report) |
| 6 | theme copies of Citadel/Foundation: `components/{citadel,foundation,vendor,common}` and `common/*` | any (global); verify on several page types | todo |
| L | Tasks 32-34 (retire Citadel/Foundation imports, drop `important`/`source(none)`) | lead | todo |

## Merge log

- WP5 merged by the lead (cart rest, small): `_cart.scss` 732 -> 675; no new `@source`/theme entries.
- WP4 merged by the lead (listings/content): SCSS lines 6170 -> 5992 (122 partials; compare and facetLabel partials deleted); `@source` adds blog, search, faceted-search, category, brand, compare.tsx, brands.tsx; stray list now `block hidden table fixed container visible grid`.
- WP3 merged by the lead (header/footer/nav, small): SCSS lines 6300 -> see `npm run tw-inventory`; `@source` adds `components/common` and `layout`; stray list is `block hidden table fixed container visible`.
- WP2 merged by the lead (product family, small): SCSS lines 6353 -> 6300; vitest 119/119, vite-build ok. `@source` now lists `components/products`; stray list is `block hidden table fixed`.
- WP1 merged by the lead (account family, partial): theme CSS 6490 -> 6353 SCSS lines in `tw-inventory`; vitest 119/119, vite-build ok.

## Lessons added by WP1

- **The live store injects inline CSS that targets theme class names** (e.g. `nav.navBar--account a[href*="/account.php?action=inbox"]`, and rules for `account-sidebar-block`, `account-listItem`, `account-product-checkItem`, `account-product--alignMiddle`, `.button[data-print-invoice]`). Never remove a class name from markup without checking the page's non-theme stylesheets; keep the name as a hook and add utilities beside it.
- Helper root: account/login pages have no `.page`; use `#main-content`. Clear finished `tw-*` keys: sessionStorage (about 5 MB) overflows after a few pages.
- `translate-*` utilities set the `translate` property, not `transform`: use `[transform:translateX(-50%)_translateY(-55%)]` for parity.
- `fontSize("base")` is `text-(length:--sv-fontSize-base)`; container width is `max-w-(--sv-layout-widthMax)`; Citadel `color("greys","light")` is merchant `text-grey-light`; `stencilColor("label-*")` is not bridged (blocks `account-orderStatus-label`).
- `table` is now in `@source not inline("block hidden table")` because `table table--line` markup made the stray-utility test fail; add other stray names the same way (the test comment says so).
- `--color-container-border` now exists: use `border-container-border`.
- Passing collision test: `inline-block`, `float-left|right`, `group`, `list-none`.
- Reachability: orders list (10 orders), order details (id 141539), address book (3 addresses), wishlist page (table, no rows) and login render; returns list (`view_returns` redirects), inbox (0 messages), add-return, completed orders, download items and backorder/discount/payment states do NOT render with the user's data. Rules whose consumers include these stay in SCSS (rule 4).

## Worker reports

### WP1 (account family): summary
Converted and Edge-verified (0 diffs at 375/768/1280/no-JS except sub-pixel width noise of at most 0.013px and invisible zero-width border colours): navBar--account, listShipping(+title), product-price, product-refundQty, orderTotal(+key/value), reorder-form (order list/details), addressBox (address list), login intro/fact list, wishlists-table; deleted the UNUSED `account-product-subtitle`. Stayed in SCSS: shared classes with unreachable consumers (heading, list, listItem, product-title, detail-heading, orderStatus*, product-description, backorder prompts, orderTotal-discount, download*, payment description), layout/mixin rules (product, figure, body, details, alignMiddle, order-address, downloadsList), sidebar sibling rule, pagination, panel--address descendants, login-row/form/new-customer, wishlist-header/form/share, layouts/account, addReturn, paymentMethods. Follow-up: giving the worker returns/inbox data would unlock most shared account rules; the user decided not to convert unverified.

## Lessons added by WP2

- Product, account and login pages have no `.page`: root `#main-content`. A full snapshot of the product page is about 850 KB per state; sessionStorage (5 MB) overflows with four states, so keep snapshots compact (arrays joined by a separator) or store only the subtree you changed (a narrower root such as `.productView` or `.productView-details` is better). Do not return full diff lines from `javascript_tool`: the tool blocks results containing query strings or cookie-like data (`[BLOCKED: Cookie/query string data]`); return counts and short fields.
- Edge screenshots (`Page.captureScreenshot`) often time out on heavy pages (product page, address book); retry on a lighter scroll position or rely on computed-style diffs and say so.
- The Edge tab group can disappear mid-session, wiping sessionStorage baselines: redo the baseline in a new tab.
- The live store's inline stylesheet targets `.productView-details`, `.price.price--rrp`, `.productView-price`, `.price-section--saving`, `.productView-info-name--availability`, `.productView-price + div`: keep those class names as hooks.
- `sr-only` adds a -1px margin; use explicit `absolute size-px overflow-hidden border-0 p-0 [clip:rect(1px,1px,1px,1px)]` when matching an older visually-hidden mixin. The hover variable is `--sv-color-textSecondary-hover`. Stray list additions go in `@source not inline(...)`.
- Reachability limits for product partials: no promotion callouts render (no featured promotion), list view needs the theme setting `product_list_display_mode = list` (it is grid), no video gallery, write-review/quick-view modals not driven. `productView-title|brand|price|info*|details|image|img-container` are shared with the cart preview modal (`components/cart/preview.tsx`, WP5): convert them together once that modal is reachable.

### WP2 (product family): summary
Converted and Edge-verified on the product page (4-5 explained differences per state: harmless border-style/zero-width border colour): productView-product, -images, -reviewLink(+--new), -stock-message, -picklist-backorder (ul); productReview title/author/rating/ratingNumber; price--rrp, price--non-sale, price-section--minor (also spot-checked on category cards, no baseline). Stayed in SCSS: promotion callouts and product list (unreachable states), shared productView rules (cart preview), thumbnails/slick, options descendants, JS-created backorder items, grid/clearfix/pseudo partials (productGrid, saleBadges, swatch), toggleLink, videoGallery, socialLinks, writeReview, quickView, carousel, ribbon/tags. UNUSED safe-delete candidates (not deleted, live store injects markup): ribbon, shareProduct, productMasonry, productGrid--maxCol*.

## Lessons added by WP3

- `scripts/tailwind/theme.test.mjs` collects only double-quoted `className="..."` literals. Utilities held in TSX constants or template literals fail the "only emits used classes" test: inline them as literals (a utility that appears only inside a template literal needs a literal sibling using it).
- A null SCSS variable (`$footer-heading-fontColor`, `navUser-color` are unset in config.json) emits nothing: nothing to convert. Working bridge vars: `--sv-footer-background`, `--sv-header-bg`, `--sv-header-height`, `--sv-header-logo-marginVertical`, `--sv-fontSize-base`.
- Header/footer roots: `header` and `footer` (the home page is about 48,000 px tall; top-of-page screenshots time out, screenshot a smaller region). Frame helper tip: `__twFrame` uses `location.pathname`; to test another page pass a path (edit the helper) instead of navigating.
- Colour utilities with Foundation `.is-open` state: leave the colours in SCSS (an important utility would beat the JS-toggled state) until a data/aria attribute replaces the class.
- `border-b border-container-border` sets all four border colours; the old rule set only the bottom: a harmless top-colour diff on a zero-width border.
- `.container` collides with the utility name (site-wide class): it stays. `.sidebarBlock*` is shared with category/brand/faceted-search (WP4).

### WP3 (header/footer/nav): summary
Converted and Edge-verified on / and /fashion-biz/ (footer, body, navUser, main: 0 diffs; header: one zero-width border colour and sub-pixel logo sizes): footer (footer, title-sr-only, info-heading, info-list + links, copyright, powered-by, payment icons, newsletter summary, info-col leaf styles), navUser (action weight/padding/uppercase, section position, cartLabel, quickSearch padding), header (background/border, logo image), body margins. Mobile menu toggle and desktop cart preview dropdown interactions checked. Stayed in SCSS: footer-info/info-col grid mixins, social column (unrendered), navUser colours/dropdowns/pseudo/JS state/unrendered states, countPill, header position/is-open/fixed/logo variants/mobileMenu/skip link, sidebar block (WP4), container, body .page* grid mixins, navPages (Foundation JS), heroCarousel and banners (not rendered).

## Lessons added by WP4

- **Important utilities beat higher-specificity legacy rules that used to win.** Example: Citadel `.panel-body > :last-child { margin-bottom: 0 }` beat `.search-suggestion`; after conversion the last item gained a 28px bottom margin until `last:mb-0` was added. Diff each converted element and expect this in WP5/6.
- **True baseline after editing:** `git show HEAD:<file>` into a scratch copy, swap the HEAD versions of your files in, baseline, swap your converted files back, diff. (Never use git commands that change state; reading with `git show` is fine.)
- A file edit triggers an HMR reload that wipes page globals and aborts a running `javascript_tool` call; `javascript_tool` times out at 45 s: run frames in the background and poll. Keep the helper in sessionStorage and `eval` it after a reload.
- New theme entries: `--spacing-single-third` (mb-single-third), `--spacing-base-sixth` (py-base-sixth, top-base-sixth, pb-base-sixth).
- Use `[display:block]`, `[display:none]`, `[text-transform:inherit]` instead of `block`/`hidden` utilities. Font family: `font-(family-name:--sv-fontFamily-headings)` (`fontFamily("headingSans")`).
- `_tailwind.scss` must stay CRLF: workers that script-edit it normalise it to LF; the lead restores CRLF before committing. Prefer the Edit tool and check `file assets/scss/_tailwind.scss`.
- Content pages (`pages/page.tsx`, `contact-us`, `sitemap`, `components/page`, `components/sitemap`) use none of the WP4 partials' classes: nothing to convert there.

### WP4 (listings/content): summary
Converted and Edge-verified (0 diffs at 375/768/1280/no-JS except sub-pixel remCalc noise and zero-width border styles): blog title/date/post/figure/body/tags (deleted unused blog-author); search-suggestion/suggestion-title/search-refine/search-nav/quickSearchMessage (a real 28px margin diff found and fixed with last:mb-0); facetedSearch-refineFilters; facetLabel (partial deleted); sidebarBlock-heading; brands card-title; the whole compare table (partial deleted). Stayed in SCSS: .blog root/sibling, socialLinks/addthis, blog-thumbnail, category-suggestion grid mixins, advancedSearch (not rendered), quickSearchResults/modal-close (WP3 files), facetedSearch toggle/navList/is-open/show-more (JS state), reset-filters/blocker (JS display), sidebar sibling rule, shop-by-price heading, brandGrid mixins, category-header-image, captcha, textTruncate (JS). Unverified: quickSearchMessage in its real dropdown context, blog post (value check only, no baseline).

## Lessons added by WP5

- **The live store injects `!important` CSS on `.previewCartList`** (display flex, flex-direction column, overflow-y scroll, max-height): never add display/overflow/max-height utilities there (an important utility beat it and broke the dropdown). Keep the class name.
- `optimizedCheckout-*` (e.g. `optimizedCheckout-link-color`) and other merchant settings are NOT bridged to `--sv-*`: `text-(--sv-color-optimizedCheckout-link-color)` silently falls back to the inherited colour. Rules using them stay in SCSS (the bridge could be extended to `stencilColor()` settings read from config.json later).
- The cart page with the user's cart renders only Subtotal, Total and the coupon trigger (enhanced multi-coupon mode); estimator, gift certificate, coupon list, discounts, non-enhanced totals and the add-to-cart preview modal are unreachable. The header cart dropdown is reachable: click `[data-cart-preview]` (state-neutral), root `#cart-preview-dropdown`, ajax-loaded.
- A template-literal className on a row (cart-with-savings) blocks a literal-only utility under the stray test.
- Remaining PayPal third-party iframes (6 in the dropdown, buttons on the cart page) produce nondeterministic diffs: ignore.

### WP5 (cart rest): summary
Converted and Edge-verified (cart page and header dropdown; only zero-width border colour, PayPal frames and lazy-load noise): cart-total-with-savings label/grandTotal/amount (enhanced branch), cart-coupons container and coupon-link layout (colour stays: unbridged optimizedCheckout colour), header dropdown wrapper/list/item name/brand/price. Stayed in SCSS: all productView-* (cart preview modal unreachable; the live store and JS select them), cart table layout, base totals rules, estimator/gift-certificate/coupon forms and list, discount toggle, additional checkout buttons, previewCart modal and grid-mixin rules.
