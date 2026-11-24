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
| 2 | `components/stencil/{productView,productReviews,writeReview,productCarousel,quickView,price,rating,ribbon,tags,toggleLink,videoGallery,socialLinks}`, `layouts/products/*` (incl. the rest of `_variantSelector`) | `components/products` (not `options`), `pages/product.tsx` | todo |
| 3 | `components/stencil/{navUser,navPages,heroCarousel,banners}`, `layouts/{header,footer,body,container,sidebar}` | `layout`, `components/common`, `components/carousel*.tsx`, `pages/home.tsx` | todo |
| 4 | `components/stencil/{search,category,compare,facetedSearch,facetLabel,contact,blocker,textTruncate}`, `layouts/{blog,brands}` | `components/{search,category,brand,blog,faceted-search,sitemap,page}`, `pages/{search,category,brand,brands,blog,blog-post,compare,contact-us,page,sitemap}.tsx` | todo |
| 5 | rest of `components/stencil/cart/_cart.scss`, `previewCart` | `components/cart`, `pages/cart.tsx`, `components/common/cart-preview.tsx` | todo |
| 6 | theme copies of Citadel/Foundation: `components/{citadel,foundation,vendor,common}` and `common/*` | any (global); verify on several page types | todo |
| L | Tasks 32-34 (retire Citadel/Foundation imports, drop `important`/`source(none)`) | lead | todo |

## Merge log

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

