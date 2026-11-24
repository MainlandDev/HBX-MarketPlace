# Tailwind conversion: live handoff

Maintained by the lead after every merged work package (WP). Workers: read `docs/design/tailwind-worker-brief.md` first, then this file at the start of your WP. Last updated: 2026-11-24 (round 2 started).

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
| 6 | theme copies of Citadel/Foundation: `components/{citadel,foundation,vendor,common}` and `common/*` | any (global); verify on several page types | merged, small (see report) |
| 7 | shared pool: `.page-heading` (43 consumers), `.form-label/.form-field/.form-input` | any | scoped, nothing converted (blocked by rule 4: consumers on unreachable or unsubmittable pages) |
| L | Tasks 32-34 (retire Citadel/Foundation imports, drop `important`/`source(none)`) | lead | todo |

## Merge log

- WP6 merged by the lead (shared Citadel/Foundation copies, small): card-body/title/text, panel-title, inlineList--labels, ol.breadcrumbs converted; see report.
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

## Lessons added by WP6

- Safe-to-convert shared Citadel classes are those whose consumers are a small, reachable set (`.card-body`, `.card-title`, `.card-text` only in card.tsx/brands.tsx/compare.tsx). `.card` (22 consumers), `.page-heading` (43), `form-*` and `.button` (30-70 each, many page types incl. unsubmittable contact/checkout modals) need a dedicated form-focused WP with per-page verification.
- A converted shared margin can hit a context where a hidden legacy rule won before: on /brands/ the `.card-title` margin-bottom was 0 in the baseline (legacy rule beat the 4px base rule); an important `mb-sixth` changed it. Match the computed baseline per page type (here `m-0` in brands.tsx), not the SCSS source.
- A root-narrowed, selector-filtered snapshot of about 35 properties plus `::before` is about 150 KB per state; `__twFrame` accepting a path lets one session baseline several pages; 28 frames take about 6 minutes.
- Template-literal classNames (breadcrumb li with `$If`) cannot take utilities (stray test): their rules stay.
- `.container`, `citadel/icons` (global `transition: all`), `foundation/buttons` sibling rule, alerts (not rendered), accordion/navList/is-open (JS), modal/dropdown/tabs/slick/nav/tables, pagination (JS selects its classes) all stay.

### WP6 (shared copies): summary
Converted and Edge-verified (0 computed-style diffs on category, filtered category, brands, login, product, cart, compare): card-body, card-title (font-size, margin), card-text margin, panel-title font-size, inlineList--labels, ol.breadcrumbs. Everything else in WP6 stays with the reasons above.

## Status after WP7 (lead)

Theme SCSS under components+layouts: 6,550 -> 5,906 non-empty code lines (about 10% converted; 126 -> 122 partials; 2 partials deleted: compare, facetLabel). That is below the 20-30% estimate because rule 4 (delete a rule only when every consumer is converted and verified in Edge) keeps every shared class whose consumers render only for data the user's account does not have.

Unlockers, in order of yield (each needs a user decision or data):
1. **Relax rule 4 for mechanically identical shared classes** (for example `.page-heading` = `margin: 0 0 double; text-align: center`, 43 consumers, about 20 on unreachable pages): convert all consumers with the same utilities and delete the rule after verifying the reachable page types. Risk is low; the unverified pages are covered by identical utilities.
2. **Test data**: an account with returns, inbox messages, downloads, a wishlist, a coupon, a gift certificate; a promotion product; a category in list mode; and one add-to-cart so the cart preview modal can render. This unlocks account/returns/messages/downloads, promotion callouts, product list, productView-* shared with the cart preview modal, estimator/coupon/gift-certificate totals.
3. **Bridge more merchant settings** (`optimizedCheckout-*`, `label-*`, promotion colours, footer/nav colours that are set) so colour rules that use `stencilColor()` of unbridged settings can be converted.
4. **Replace JS-state classes** (`is-open`, `active`) with data/aria attributes in the JS to let Foundation dropdown/accordion/navList colours convert.
5. Safe-delete candidates (UNUSED in the repo, kept because the live store injects markup/CSS): ribbon, shareProduct, productMasonry, productGrid--maxCol*, FloatRight, cart-item-discount, blocker-container, facetedSearch-content--rating.

Tasks 32-34 (retire Citadel/Foundation imports, drop `important` and `source(none)`) are NOT possible yet: the theme still uses Citadel/Foundation classes site-wide (forms, buttons, cards, modal, dropdown, tabs, grid mixins).

## ROUND 2 (started; the user's goal is to COMPLETE the conversion)

Round 1 stopped at about 10% because of the strict delete rule and the 10-utility cap. Round 2 uses the standard in the brief (rules 4 and 5): convert everything in every consumer, identical utilities where a page cannot be rendered (listed as "Unverified by equivalence" in each report), cap about 16 with TSX component extraction, mixins/pseudo-elements/descendant/sibling rules expanded to utilities and arbitrary variants, JS state via the new `is-open:` and `is-active:` variants, merchant settings via `--sv-setting-<key>` (216 settings bridged: `optimizedCheckout-*`, `label-*`, promotion colours, footer/nav colours, etc.). Only third-party widget CSS and proven-impossible items stay.

New tooling (lead): `generate-bridge` also bridges every `stencilColor/Number/String/FontFamily/FontWeight("key")` read in the SCSS; `@custom-variant is-open (&:is(.is-open))` and `is-active`. 124 tests green.

| R2 WP | Scope | Status |
| --- | --- | --- |
| R2-1 | account family incl. all shared account classes, layouts/account, addReturn, paymentMethods, login/wishlist rest, pagination in account | merged: all account-family SCSS deleted (999 lines) |
| R2-2 | product + cart: productView-* (incl. cart preview modal markup), cart table layout and the rest of _cart.scss, previewCart, productList/Grid/SaleBadges/Swatch/promotionCallout, remaining product partials | merged: SCSS 5182 -> 3326 lines; stayed: price, toggleLink, toggle-content, variantSelector, swatch sizing |
| R2-3 | header/footer/nav and Foundation JS widgets: navUser, navPages, header, footer rest, heroCarousel, banners, modal, dropdown, accordion, tabs, sidebar, body, container | merged: SCSS 3326 -> 2379 lines; left: navPages, heroCarousel, slick, tabs, container, modal keyframes |
| R2-4 | navPages, facetedSearch, toggleLink, search, variantSelector, heroCarousel, blog, brandGrid, captcha, blocker, price | merged: SCSS 2379 -> 1478 lines; left: slick, setting-size rules, JS-created/unused classes |
| R2-5 | shared pool: page-heading, form-*, button, card, pagination, tables, type, alerts, icons, lazyLoad, actionBar, loading, global, slick-adjacent theme rules, common/* | merged: SCSS 1478 -> 703 lines; left: slick, buttons, form states, element rules, keyframes, JS-created |
| R2-L | lead: unused-class sweep, retire Citadel/Foundation imports if inventory shows zero used, drop `important`/`source(none)` if possible | todo |

## R2-1 report (account family, complete)

All account, addressBox, addReturn, paymentMethods, wishlists, login and layouts/account SCSS converted and deleted (8 partials, 999 lines; their @imports removed). Edge computed-style diffs on 7 reachable pages (account, order_status, view_order, address_book, wishlist, payment_methods, login) show only explained differences (clearfix -> flow-root, zero-width border colours, sub-pixel grid fractions). New theme entries: `--spacing-double-third`, `--spacing-single-double`, `--spacing-gutter-half`, `--color-backorder`; `@source` adds components/gift-certificate and pages/gift-certificate.

**Unverified by equivalence (user spot-check list):** returns-list.tsx and add-return.tsx (whole addReturn table, detail variants, orderStatus-label variants); messages-list.tsx (account-message `[&_.is-read]`, product-title); order-contents.tsx and orders/details.tsx (download button, backorder prompts x6, order-backorder-expectation, order-payments-description, orderTotal-discount, pickup/multi-address order-address); download-item.tsx (all downloads* classes); payment-methods-list, add-payment-method, edit-payment-method (paymentMethod*, methodHeader/Details, newPaymentMethod*, paymentMethodForm*); add-wishlist.tsx (wishlist-header incl. in-modal override, wishlist-form); wishlist-details.tsx (share-wishlist, pagination under .account); never-rendered pages: orders/completed, recent-items, return-saved, create-account, forgot-password, new-password, account-created, edit, add-address, gift-certificate balance/purchase/redeem (wrapper and layout utilities only). Check at 375 and 1280.

## Lessons added by R2-1

- **Layered `!important` utilities beat the live store's unlayered `!important` inline CSS regardless of specificity.** That inline CSS hides `.account-listItem .account-product-checkItem` and the last `.account-sidebar-block`, and sets `left: unset` on `.account-product--alignMiddle .account-product-figure`; converting the SCSS (display: table-cell, left: -2rem) un-hid them until those utilities were dropped. For any element the store's inline CSS targets, never set the properties it sets. Other injected rules: `nav.navBar--account a[href*=inbox]`, `.button[data-print-invoice]`, `#account-contact-us div.container div.account`.
- `[.modal_&]` is rejected by the collision test (emits a `.modal` selector): use `[[class~=modal]_&]:...`. `[&+&]` only matches siblings with the same utility; for a different class use `[.other-class+&]`.
- `lazy-loaded-padding("productthumb_size")` became `after:pb-[100%]`: correct for 100x100 only; it will not follow a change of the merchant image-size setting.
- Bridged settings in use: `--sv-setting-label-backgroundColor`, `--sv-setting-label-color`, `--sv-setting-color-textSecondary--hover`, `--sv-setting-color-primary`.
- `javascript_tool` blocks results containing `?`, `&` or `=` (treated as cookie/query data): return counts and short fields. Gzip-stored compact snapshots in sessionStorage work.
- `components/_components.scss` and `layouts/_layouts.scss` are LF in the tree (git warns on touch): harmless.

## R2-2 report (product and cart)

Converted: the whole cart (table-to-list layout, totals, coupon/gift-certificate/estimator forms, dropdown), productView (images, thumbnails with slick and is-active:, details, info, options descendants, backorder, picklist list), productGrid/productList/list-item/promotionCallout/sale badges (product-badge.tsx rebuilt as layout-transparent wrappers), swatch popup/image/none, reviews, writeReview, carousel, quickView, rating, tags, videos, socialLinks. Deleted partials: previewCart, productList, productSaleBadges, promotionCallout, productReviews, writeReview, productCarousel, quickView, rating, tags, videoGallery. Edge: product 0 diffs at 375/1280 (1 at 768, 3 no-JS: PayPal async node, 0.1px ancestor height), category 0 at 375/768 and 0.1px grid width/height at 1280/no-JS (40), cart 0 in all four states, header dropdown 0 at 375/768/no-JS (PayPal frames nondeterministic at 1280). tsc clean, 126 tests, build ok.

**Stayed in SCSS:** `price/_price.scss` and `.cart-item-value.price--discounted` (template-literal/inline-built classes); `.cart-total .form-inlineMessage` (JS-created); `.productView-picklist-backorder-item/-name` (created by picklist-backorder.js); `.shareProduct`, `.ribbon`, `.productMasonry` (unused, kept: the live store may render them); `.pin_it_iframe_widget` (third party); `.js [data-product-option-change]` (jQuery inline display); `.toggleLink*` (faceted-search files, R2-4); `.toggle-content` (is-open collapsible: a utility version changed reviews-in-tabs rendering, root cause not found); `.form-option-variant--color/--pattern` sizing (store's `:not(#pseudoID)`); `_variantSelector.scss` (container queries, `--vs-*`, `!important`, `:not(#pseudoID)`).

**Unverified by equivalence (spot-check at 375 and 1280):** cart non-enhanced totals, estimator (shipping-estimator.tsx, shipping-quotes.tsx), gift-certificate(.tsx/-input), coupons form/list/pills, discount list, gift-certificate list items, item-giftwrap, backorder paragraphs, empty cart, additional checkout buttons; cart/preview.tsx modal (previewCartCheckout, subtotal, price, productView modal, suggestiveCart); dropdown viewCart--sole, checkoutMultiple, emptyBody; product page pre-order and wallet buttons, bulk pricing, custom fields, description-tabs title, quick-view overrides, productOptions-list, backorder before:content pieces; sale badges (sash/topleft/burst, sale and sold-out, hover), list view (list.tsx, list-item.tsx), promotion callouts, productGrid in wishlist-item-list/quick-results/featured/top and the sidebar variant, write-review modal, videos.tsx, carousel/slides, swatch popup and none-swatch, blog tags, share/social-links focus tooltips, `rating--small` in faceted-search/facets/rating.tsx, `[&_svg]:fill-(--sv-setting-icon-rating*)` on ratings.tsx.

## Lessons added by R2-2

- A double quote inside a `className="..."` literal (for example `[font-family:"object-fit:_contain;"]`) breaks the JSX parse and the dev server silently serves the previous render: use single quotes in arbitrary values and run `npx tsc -p tsconfig.app.json --noEmit` after batch edits.
- Conditional/template-literal classes: wrap in a literal-class element and use ancestor variants. Enhanced cart marker is `data-enhanced` on the totals `ul` (via dangerouslyInlineAttributes): descendants use `[[data-enhanced]_&]:...`, non-enhanced `[ul:not([data-enhanced])_&]:...`. Conditional hook classes with no remaining consumer were dropped (cart-total-enhanced, cart-total-with-savings, cart-total-gift-certificate, cart-total-shipping-estimator, productGrid--maxColN).
- The live store injects non-important rules that beat the old SCSS (`.previewCart-additionalCheckoutButtons {display; padding}`) and `!important` ones (`.previewCartItem {display:flex !important}`, `.form-option-variant--color:not(#pseudoID)` sizing): always diff against the baseline, not the SCSS source. Guards that worked: `[&:not([style*=width])]` for slick inline widths, `[&:not([style*=none])]` for jQuery inline display.
- `[[class~=x]_&]` sidesteps the legacy-class collision test. A stray word like "contents" in a comment fails the stray test. Use `[visibility:visible]` and `[display:block]`.
- Citadel `.tab-content .productReviews { border-top: 0 }` and `.tab-content .productReview { width: 50% }` beat plain utilities: reproduced with `[[class~=tab-content]_&]` variants.
- New entries: `--spacing-single-half`, `--spacing-single-quarter`. Some elements exceed the cap (productView-options wrapper, share.tsx ul, swatch popup, product-badge wrappers, cart figure/info cells); no children-taking component precedent exists in the repo yet.
- The bridge scans TSX for `--sv-setting-<key>`, so deleting SCSS does not drop a setting that utilities still read; run `npm run generate-bridge` then `npm run check-bridge` after large deletions.

## R2-3 report (header, footer, nav, widgets)

Converted and Edge-checked (45 page/state compares plus driven interactions: mobile menu and sub-menu at 375, desktop category, cart dropdown, quick search, product tabs, faceted accordion, write-review modal, wishlist dropdown): footer (65 -> 6 lines), navUser, header (incl. checkout/order-confirmation/invoice logos), body `.page*`, sidebar, banners, dropdown, accordion, modal (220 -> 49: keyframes and .hide-content stay). Deleted: navUser, header, body, sidebar, banners, dropdown, accordion partials.

**Stayed in SCSS:** navPages (template-literal classNames in navigation-list/-alternate/-dropdown/-menu need `$If` literal pairs plus is-open/subMenu-is-open variants), heroCarousel (slick-added classes, compat-object-fit, `url(../img/...)`, carouselOpaqueBackgrounds mixin; not rendered here), slick (third-party), tabs (a merchant "inline-tabs" widget on the home page uses `.tab-title`: the TSX carries identical utilities and the SCSS still coexists), `.container` (collision and the store injects `div.container` CSS), `.hide-content` (cart.js adds it), `@keyframes animate-icon*`, `.header.fixed` rules (dead: no JS adds .fixed).

**Unverified by equivalence:** footer social column (bottom_left/bottom_right); language/currency/channel selectors, store-credit dropdown, navUser divider/social/compare items, `navUser-item--cart__hidden-s`; header logo-text variants and --left/--right positioning, `header-logo-image-unknown-size`, checkout/order-confirmation/invoice logos (logo container `medium:min-h-[100px]` is hard-coded from logo_size 250x100); alert modal (icons, lines, confirm button states); bulk-pricing, configure-product, gift-wrapping-form, cart preview, quick-view body and show-more-facets modals; dropdown is-loading overlay, wishlist is-open overrides, button--has-items; banners; search page hidden sidebar branch; 403/generic/hibernation/subscribed/unsubscribe/account-created/brand/compare pages (page and page-content only); accordion in rating.tsx, range.tsx, hierarchy.tsx.

## Lessons added by R2-3

- `stencilFontWeight("headings-font")` and `stencilFontFamily("headings-font")` share a key: the bridge now names them `--sv-setting-weight-<key>` and `--sv-setting-family-<key>` (other setting kinds stay `--sv-setting-<key>`). `scanMarkupSettings` only keeps keys that exist in config.json, so a TSX utility on `--sv-setting-family-x` is kept only if the SCSS still reads it: run `npm run generate-bridge` and `check-bridge` after SCSS deletions and re-check font utilities.
- Cold-load baselines can capture the page before Foundation JS binds, so click-driven states come out "closed": warm the page (wait, then click) before baselining interactions.
- Merchant widget markup injected into the pages (home "inline-tabs" with `.tab-title`) depends on Foundation class rules: check the home page's non-theme markup before deleting a Foundation class rule.
- A rule that exists only inside conditional template literals: use `$If`/`$else` pairs of literal elements (done for the accordion button and the search sidebar). `[&_:where(.dropdown-menu.is-open)]:before:...` keeps a skin at base specificity. Guard jQuery inline styles with `[&:not([style*=none])]` / `[&:not([style*=max-width])]`. Longhand border width/style/colour beats shorthand clobbering of pseudo-element triangles. `[.sidebarBlock+&]` is rejected by the collision test: use `[[class~=sidebarBlock]+&]`.
- `@source` now also lists the checkout, order-confirmation, invoice, blog, brand, category, contact-us, errors, page, subscribed, unavailable, unsubscribe and home pages.
- Open drift to re-check: `/p405ms-biz-collection/` first nav link colour (117 -> 51) and some breadcrumb widths on a late re-run (likely hover/live data).

## R2-4 report (navPages, carousels, listings)

Converted and deleted: navPages (362), facetedSearch (76), search (53), variantSelector (128), heroCarousel (181), brandGrid, captcha, price; toggleLink 32 -> 6, blocker 12 -> 3, blog 26 -> 8, cart 6 -> 3. New file `src/server/navParts.tsx` (helpers `navLink(kind, active, attrs, children)` and `moreIcon(kind)` returning literal-className JSX in activePage/not-activePage pairs; outside `src/templates` because HBX builds every export there as a template; listed with a single-file `@source`). Edge: nav on a warmed page at 375 (0 diffs), 768 (mid-transition values only), 1280 (flow-root display, mid-transition svg fill); faceted search accordion/toggle/show-more (flow-root only); variant selector 0 diffs at 375/768/1280/no-JS plus hand checks of halo, active copy, grid, scrollbar, pattern background. `/brands/` and `/blog/` value assertions only.

**Stayed in SCSS:** `slick/_slick.scss` (203) and `_tools.scss` (slick generates the arrows/dots/slides on three hosts; arrow icons are data: SVG URIs built with str-replace from merchant colours, which cannot take var(); play/pause uses the addFocusTooltip mixin; a follow-up could use mask-image plus a colour variable); `.blog-thumbnail`, `.brand-image-container`, `.brand .card-img-container` (max-width and lazy-load padding come from blog_size/thumb_size/brand_size settings); `_productSwatch.scss` (the store's `:not(#pseudoID)` sizing); JS-created `.productView-picklist-backorder-*` and `.cart-total .form-inlineMessage`; `.textTruncate*` (classes exist only in JS/merchant markup); `.ribbon`, `.has-ribbon`, `.shareProduct`, `.productMasonry`, `.blocker-container` (unused in templates; kept in case the store renders them); `.toggle-content` (JS is-open collapsible). `#currencySelection2` was a dead rule and is gone.

**Unverified by equivalence:** depth-max navigation (navigation-list-alternate.tsx, navigation-dropdown.tsx, navLink kinds maxLeaf/maxParent/maxRoot, moreIcon max/maxRoot/maxNested, is-hidden and subMenu-is-open variants, navPage-subMenu-horizontal; the "view all" action lost the `navPages-action-depth-max` hook class); language/channel/currency sub-menus, store credit, compare in the mobile user list; the whole hero carousel (host variants, four slide divs, image wrapper, content, `bg-[url('../img/hero-carousel-image-load-error.svg')]` path not checked to resolve); facet extras (.reset-filters guard, optionColumns, facet-quick-heading, navList--inner, first accordion-block radius in rating/range, accordion--navList); advanced-search form, category-suggestion(-list), toggleLink in search.tsx, quickSearchResults modal-close; variant selector sizes wrapper (out-of-stock, touch 44px rule, [hidden]) since no sizes load on the test product; captcha; blog socialLinks/addthis descendants and post.tsx on a post page; price--discounted pairs in cart/content.tsx, shipping-estimator.tsx, shipping-quotes.tsx, cart-preview.tsx; reviews/videos toggleLink.

## Lessons added by R2-4

- Helpers returning JSX with literal classNames must live outside `src/templates`; add the file with `@source`. `group` with `group-hover:`/`group-is-open:` works with the custom variants; `[[class~=a][class~=b]_&]`, `[...+&]`, `bg-(--sv-x)/50`, `@min-[260px]:` (container queries) and comma lists in arbitrary at-rule variants (`[@media(pointer:coarse),(max-width:800px)]:`) all compile.
- A shorthand arbitrary property (`[border:var(...)]`) can sort after the width and reset it: use longhands. The store injects `:not(#pseudoID)` rules on `.facetedSearch-navList` margin-top and the swatch sizes: never set those properties there.
- Transitions run late in hidden iframes: poll for the state class, then wait about 500 ms. The compare helper does not capture box-shadow, outline or background-image: hand-check those.
- The variant selector card/sizes/root carry about 40/15/1 utilities (over the cap; splitting would add wrapper markup VariantEnhancer may depend on). New entry: `--spacing-half-quarter`.

## R2-5 report (shared pool)

Converted and deleted: cards, tables, pagination, panels, alerts, breadcrumbs, actionBar, inlineList; type `.page-heading` (46 elements) and `.definitionList*`; nav (`navBar--sub`, `navBar-action`, `navList`, `navList-action`, `-close`); forms (306 -> 38: hiddenLabels, label variants, select/input small/date/short, file, field-group, column, minMaxRow, row--half, increment, prefixPostfix, actions (18 consumers), option/option-variant/option-wrapper, unavailable states, checkbox/radio label offsets); `.icons-svg-sprite`. About 125 TSX files changed. Edge: 9 pages x 4 states baselined at HEAD (login, contact (not submitted), product, cart, orders, search, home, category, brands): flow-root, zero-width border and transition noise only; a product breadcrumb difference (4 vs 5 items) looks like live data, unproven.

**Stayed in SCSS:** slick (203) + _tools (15) + focus-tooltip (34) (slick generates arrows/dots/track on three hosts; arrow icons are data: SVG URIs built from merchant colours; a conversion needs ~45 utilities per host or a children-taking component, mask-image arrows with a bridged colour); `foundation/buttons` (`.button`: 74 consumers, JS and merchant-injected markup, the store injects `.button:not(#pseudoID)`); `layouts/container` (the account page has a merchant-injected `<div class="container">`; removing the rule gave a measured diff); `citadel/forms` residue (`.form-inlineMessage`, `.form-field--error/--success`: nod.js creates them at runtime, data: SVG icons); `foundation/forms` (select arrow data: SVG from `select-arrow-color`); `citadel/nav` (`.navList-action--checkbox`); `foundation/tabs` (`.tab`, `.tab-title` for the merchant inline-tabs widget); `foundation/type` and `global` (element selectors with no class); `foundation/modal` (keyframes and `.hide-content`); `foundation/lazyLoad` (mixins used by `.brand-image-container`); `citadel/loading` (`.loadingOverlay` created by JS with inline display); `citadel/icons` (global `transition: all`); `common/_aria.scss` (`.aria-description--hidden` created in search.js).

**Unverified by equivalence:** compare.tsx cards, card--alternate branch (quick-results dropdown, alternate brand cards) and its focus-within reveal; prev/next pagination on multi-page lists, small-paginator.tsx; wishlist-list.tsx data rows and add-return.tsx tables; error/generic/success alerts and the store-credit alert (only alert-info seen); the search.tsx panel; gift-certificate/navigation.tsx and the page/contact-us sub navigation, shop-by-price, show-more-facets is-active, navList-action-close hover, brand sidebar navList; content-sort-box.tsx and the sort-box hover border; form-actions on every page except login (contact, edit-account, add-address, payment methods, create-account, new-password, messages-form, add-wishlist, wishlists, advanced-search, configure-product, gift-wrapping-form, add-return, address-list), form-row--half everywhere, gift-certificate purchase/balance, forgot-password, coupon and gift-certificate hiddenLabels, form-file, date selects, set-select, set-rectangle, input-checkbox, swatch --none, unavailable states, checkbox/radio offsets except on the product page, page-heading on never-rendered pages (add-address, add-payment-method, add-return, add-wishlist, download-item, edit, inbox, returns, return-saved, wishlist-details, account-created, create-account, forgot-password, new-password, errors, gift-certificate, hibernation, subscribed, unsubscribe), definitionList in order-contents/returns-list/order details.

## Lessons added by R2-5

- Merchant-injected markup depends on theme classes (`div.container` > `.account` banner on the account page): scan the live HTML for elements using a class that are not ours before deleting any class rule.
- The store's non-important `:not(#pseudoID)` rules (`.form-option[for*=rectangle] > span { padding }`, `.button:not(#pseudoID)`) lose to important utilities: never set properties the store sets on an element.
- `p-0` is a shorthand and loses to `px-*`/`py-*` longhands on the same element: do not combine them. Citadel `.card-figcaption-body > :first-child` beat the old rule: `first:mt-0`.
- `$If`/`$else` pairs are easiest with a shared JSX const for the inner content; spreading shared attributes works. Utilities inside attribute strings (`class="form-radio ..."`) pass the stray test if the same tokens appear in a literal `className`.
- Cold-loaded iframes can fail with `document.body` null while HMR reloads: re-run the batch.
