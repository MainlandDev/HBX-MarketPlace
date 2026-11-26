# Legacy hook classes

Audit of legacy class names in `src/templates` and `src/server` that have no Tailwind utility styling of their own. Generated 2026-11-26 by a scratchpad node script; nothing was removed from TSX.

## Summary

| Verdict | Count | Meaning |
| --- | --- | --- |
| REQUIRED | 255 | a consumer exists in this repo (JS selector, SCSS rule, Tailwind arbitrary-variant selector in TSX) or in the store CSS visible on the live pages |
| REQUIRED-store-risk | 2 | no repo or visible consumer, but the handoff documents store/merchant CSS or markup that targets it on pages I could not fetch |
| DEAD | 415 | no consumer found anywhere I could look; candidate to remove (see caveats) |

Tokens examined: 672 class names (plus 9 dynamic prefixes and 7 extractor-noise strings, listed below).

## Method

1. Class tokens extracted from every `className=` and `class=` value (string, template-literal and nested-expression literals) in `src/templates` and `src/server` (212 TSX files), plus `class="..."` inside `dangerouslyInlineAttributes`. Only plain identifier tokens are kept; anything with a variant colon, brackets, parentheses, a leading `!` or `-` is a Tailwind utility by construction.
2. A plain token is a Tailwind utility when it is the leading class of a rule inside `@layer utilities` of the compiled theme CSS (`http://localhost:5173/stencil/.../theme-....css`, 1806 utility names). The remaining tokens are the legacy names: no token in the remainder looks like a Tailwind utility (checked by pattern), except the `group` marker which is excluded.
3. Consumers searched for each remaining token: `assets/js/**` (including `assets/js/test-unit`, shown as JEST) for `.token` selectors and for `token` inside quoted strings on lines that use `classList`/`addClass`/`removeClass`/`toggleClass`/`hasClass`/`className`/`class`; `assets/scss/**` (`.token` in non-comment lines; nearly all hits are in `assets/scss/tailwind/_tailwind.scss`); `src/**` for `.token` used as a selector (Tailwind arbitrary variants such as `[&_.token]:...`, `group-[.token]`, `querySelector`), shown as TSX-variant; and the store CSS below.
4. Store CSS: I fetched 20 URLs from the running dev server with curl (home, a category, two products, cart, login, create-account, reset-password, brands, a brand, search, services, compare, blog, sitemap, gift-certificates, help; `account.php` and `wishlist.php` redirect to the login page and `contact-us` returned 404) and collected every inline `<style>` block (33 distinct blocks). The theme emits none of them, so they are store/merchant injected. A token with a `.token` selector in one of them is REQUIRED (shown as `STORE <style>#N`). Block 3 is the 26 KB `/* JR */` block (previewCart, alertBox, navUser, navPages, form-*, price, productView, account-sidebar*, ...), block 15 is the merchant inline-tabs component, block 5 and 19-20 are product/customer-service widgets that use their own `__pdp-*` names.
5. The curated store-risk list comes from `docs/design/tailwind-handoff.md` (Lessons, WP1, R2-x and R3-x notes about store-injected CSS).

## Caveats (what could not be verified)

- DEAD means "no consumer in this repo and none in the inline CSS of the pages I could fetch". The store can also inject CSS on pages and states I could not load: signed-in account pages (account, orders, returns, inbox, wishlist), order confirmation, checkout, and states that need data (empty cart only, no coupons, no gift wrapping, no reviews, no compare list). Many DEAD names are stock Stencil/Cornerstone vocabulary that merchant CSS is likely to use; the notes column flags DEAD tokens that live only on pages I could not load.
- External stylesheets added through the BigCommerce Script Manager or the control panel (a `<link>` or a script that writes CSS) were not found in the HTML, but scripts that inject CSS at runtime would not show up in a curl fetch.
- JS evidence is textual, not executed. Classes built with string concatenation or template strings in `assets/js` (for example `giftWrapping-image-N`, `alertBox-*`, `icon--${service}`) are covered by the dynamic-prefix table only. Generic words (`header`, `body`, `title`, `price`, `product`, `form`) can match a different element than the one in TSX: such rows carry a note.
- JEST-only rows are held by a spec fixture. The handoff says Jest cannot load its config in this environment, so I did not run the specs.
- `templates/**` (compiled HTML) and `dist/` are generated from the TSX and were not treated as consumers. Fixture strings in `scripts/**` tests were ignored.
- REQUIRED rows whose only consumer is a Tailwind arbitrary variant (`TSX-variant`) are required only as long as that variant stays; if the variant is rewritten to target another element, the class becomes DEAD.
- Extractor noise removed (variant strings compared in code, not classes): `group`, `generic`, `default`, `class`, `checkbox`, `radio`, `primary`.
- Names from the task brief that are not literal class tokens in the TSX any more: `row`, `form-radio` (built as `form-${kind}` in `src/server/formParts.tsx:73`), `form-margin` (a CSS variable, `--sv-form-margin`). `_tailwind.scss` and `assets/scss/settings/_settings-global.scss` were being edited by another session while this audit ran, so SCSS line numbers can drift.

## Dynamic class prefixes (built at render time)

| prefix | where | siblings | note |
| --- | --- | --- | --- |
| `alertBox-` | src/server/componentParts.tsx:70 | 2 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `alertBox--` | src/server/componentParts.tsx:59 | 1 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `button--` | src/server/formParts.tsx:29 | 3 literal siblings (2 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `facetedSearch-content--` | t/components/faceted-search/facets/rating.tsx:24 | 0 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `form-` | src/server/formParts.tsx:73 | 42 literal siblings (20 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `giftWrapping-image-` | t/components/cart/modals/gift-wrapping-form.tsx:144 | 1 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `header-logo--` | t/components/common/header.tsx:57 | 0 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `icon--` | t/components/common/share.tsx:39 | 3 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |
| `socialLinks-item--` | t/components/common/share.tsx:32 | 0 literal siblings (0 required) | classes are built at render time; the produced names are covered by the literal rows when they appear in TSX, otherwise unverified |

## Tokens

Sorted by verdict, then token. File paths in the consumers column are relative to the theme root; `t/` in notes is `src/templates/`.

| token | verdict | consumers (file:line) | notes |
| --- | --- | --- | --- |
| `accordion-block` | REQUIRED | STORE <style>#3: `.facetedSearch-navList.blocker-container .accordion-block:not(#pseudoI` | store-injected CSS visible on the live pages; 4 TSX sites, first t/components/faceted-search/facets/hierarchy.tsx:22 |
| `accordion-content` | REQUIRED | JS assets/js/theme/common/faceted-search.js:21; TSX-variant src/templates/components/faceted-search/facets/hierarchy.tsx:22, src/templates/components/faceted-search/facets/multi.tsx:20, src/templates/components/faceted-search/facets/range.tsx:8 (+2) | 4 TSX sites, first t/components/faceted-search/facets/hierarchy.tsx:27 |
| `accordion-navigation` | REQUIRED | JS assets/js/theme/common/faceted-search.js:11; TSX-variant src/templates/components/faceted-search/facets/hierarchy.tsx:22, src/templates/components/faceted-search/facets/multi.tsx:20, src/templates/components/faceted-search/facets/range.tsx:8 (+1) | 2 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:13 |
| `account-listItem` | REQUIRED | JS assets/js/theme/account.js:208; STORE <style>#3: `.account-sidebar .account-sidebar-block:last-child:not(#pseudoID), .ac` | store-injected CSS visible on the live pages; 4 TSX sites, first t/components/account/messages-list.tsx:23 |
| `account-product--alignMiddle` | REQUIRED | STORE <style>#3: `.account-product--alignMiddle .account-product-figure:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/account/order-contents.tsx:82 |
| `account-product-checkItem` | REQUIRED | STORE <style>#3: `.account-sidebar .account-sidebar-block:last-child:not(#pseudoID), .ac` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/account/order-contents.tsx:83 |
| `account-product-figure` | REQUIRED | STORE <style>#3: `.account-product--alignMiddle .account-product-figure:not(#pseudoID)` | store-injected CSS visible on the live pages; 3 TSX sites, first t/components/account/order-contents.tsx:101 |
| `account-product-image` | REQUIRED | TSX-variant src/templates/components/account/order-contents.tsx:81, src/templates/components/account/orders-list.tsx:28, src/templates/components/account/returns-list.tsx:37 | 2 TSX sites, first t/components/account/order-contents.tsx:114 |
| `account-sidebar` | REQUIRED | STORE <style>#3: `.account-sidebar .account-sidebar-block:last-child:not(#pseudoID), .ac` | store-injected CSS visible on the live pages; 2 TSX sites, first t/pages/account/download-item.tsx:19 |
| `account-sidebar-block` | REQUIRED | STORE <style>#3: `.account-sidebar .account-sidebar-block:last-child:not(#pseudoID), .ac` | store-injected CSS visible on the live pages; 8 TSX sites, first t/pages/account/orders/details.tsx:150 |
| `activePage` | REQUIRED | TSX-variant src/server/navParts.tsx:13, src/server/navParts.tsx:18 | 8 TSX sites, first src/server/navParts.tsx:70 |
| `add-to-cart-buttons` | REQUIRED | TSX-variant src/templates/components/products/product-view.tsx:513 | 1 TSX site, first t/components/products/add-to-cart.tsx:109 |
| `add-to-cart-wrapper` | REQUIRED | TSX-variant src/templates/components/products/product-view.tsx:513 | 1 TSX site, first t/components/products/add-to-cart.tsx:26 |
| `AddressRow` | REQUIRED | SCSS assets/scss/invoice.scss:49, assets/scss/invoice.scss:97 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:166 |
| `alert-icon` | REQUIRED | JS assets/js/theme/global/modal.js:317 | 2 TSX sites, first t/components/common/alert/alert-modal.tsx:9 |
| `alertBox` | REQUIRED | JEST assets/js/test-unit/theme/common/product-details-base.spec.js:56; TSX-variant src/templates/pages/account/orders/all.tsx:23; STORE <style>#3: `[data-cart-status] .alertBox.alertBox--info` | store-injected CSS visible on the live pages; 1 TSX site, first src/server/componentParts.tsx:59 |
| `alertMessageBox` | REQUIRED | JS assets/js/theme/cart.js:176 | 1 TSX site, first t/components/cart/modals/configure-product.tsx:16 |
| `BillingAddress` | REQUIRED | SCSS assets/scss/invoice.scss:105 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:167 |
| `blocker` | REQUIRED | JS assets/js/theme/common/faceted-search.js:12 | generic word: confirm the JS hit targets this element; 1 TSX site, first t/components/faceted-search/index.tsx:79 |
| `body` | REQUIRED | JS assets/js/theme/global/modal.js:227, assets/js/theme/global/modal.js:241; JEST assets/js/test-unit/theme/common/product-details-base.spec.js:63, assets/js/test-unit/theme/common/product-details-base.spec.js:151 (+10) | generic word: confirm the JS hit targets this element; 1 TSX site, first t/components/common/body.tsx:9 |
| `brand` | REQUIRED | TSX-variant src/templates/components/products/product-view.tsx:153 | 1 TSX site, first t/pages/brands.tsx:34 |
| `brand-image-container` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:798, assets/scss/tailwind/_tailwind.scss:799; STORE <style>#3: `.brand-image-container:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first t/pages/brand.tsx:54 |
| `button` | REQUIRED | JS assets/js/theme/cart.js:175; JEST assets/js/test-unit/theme/carousel.spec.js:16, assets/js/test-unit/theme/carousel.spec.js:50 (+3); SCSS assets/scss/tailwind/_tailwind.scss:619, assets/scss/tailwind/_tailwind.scss:631, assets/scss/tailwind/_tailwind.scss:632 (+5); TSX-variant src/server/formParts.tsx:16, src/templates/components/account/add-wishlist.tsx:68, src/templates/components/account/address-list.tsx:70 (+36); STORE <style>#3: `.button:not(#pseudoID, .button--icon)` | store-injected CSS visible on the live pages; 1 TSX site, first src/server/formParts.tsx:29 |
| `button--has-items` | REQUIRED | TSX-variant src/templates/components/common/wishlist-dropdown.tsx:24 | 1 TSX site, first t/components/common/wishlist-dropdown.tsx:34 |
| `button--primary` | REQUIRED | JEST assets/js/test-unit/theme/carousel.spec.js:16, assets/js/test-unit/theme/carousel.spec.js:50; SCSS assets/scss/tailwind/_tailwind.scss:642, assets/scss/tailwind/_tailwind.scss:646, assets/scss/tailwind/_tailwind.scss:647 (+3); TSX-variant src/templates/components/cart/shipping-estimator.tsx:50 | 1 TSX site, first src/server/formParts.tsx:29 |
| `cancel` | REQUIRED | JS assets/js/theme/global/modal.js:303 | generic word: confirm the JS hit targets this element; 1 TSX site, first t/components/common/alert/alert-modal.tsx:26 |
| `card` | REQUIRED | TSX-variant src/templates/components/products/carousel.tsx:19 | 1 TSX site, first src/server/componentParts.tsx:108 |
| `card-body` | REQUIRED | TSX-variant src/templates/components/products/card.tsx:54, src/templates/pages/brands.tsx:38 | 1 TSX site, first src/server/componentParts.tsx:132 |
| `card-image` | REQUIRED | TSX-variant src/server/carouselParts.ts:4, src/templates/components/products/card.tsx:101, src/templates/components/products/card.tsx:271 (+3) | 5 TSX sites, first t/components/products/card.tsx:102 |
| `card-text` | REQUIRED | TSX-variant src/server/componentParts.tsx:126, src/server/componentParts.tsx:132, src/templates/components/products/card.tsx:54 (+1) | 7 TSX sites, first t/components/products/card.tsx:186 |
| `card-title` | REQUIRED | TSX-variant src/templates/components/products/card.tsx:54, src/templates/components/products/carousel.tsx:19, src/templates/pages/brands.tsx:38 | 5 TSX sites, first t/components/products/card.tsx:201 |
| `cart` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:38 | jest-only: no production consumer, only the spec fixture; generic word: confirm the JS hit targets this element; 1 TSX site, first t/components/cart/content.tsx:68 |
| `cart-discount-icon` | REQUIRED | JS assets/js/theme/cart.js:489 | 1 TSX site, first t/components/cart/totals.tsx:113 |
| `cart-gift-certificate-form` | REQUIRED | JS assets/js/theme/cart.js:363 | 1 TSX site, first t/components/cart/gift-certificate-input.tsx:13 |
| `cart-header` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:39 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:69 |
| `cart-header-item` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:41, assets/js/test-unit/theme/cart.spec.js:42 (+2) | jest-only: no production consumer, only the spec fixture; 4 TSX sites, first t/components/cart/content.tsx:71 |
| `cart-header-quantity` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:43 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:77 |
| `cart-item` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:48 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:89 |
| `cart-item-block` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:49, assets/js/test-unit/theme/cart.spec.js:52 (+3) | jest-only: no production consumer, only the spec fixture; 5 TSX sites, first t/components/cart/content.tsx:90 |
| `cart-item-figure` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:49 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:90 |
| `cart-item-image` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:50; TSX-variant src/templates/components/cart/content.tsx:90 | 1 TSX site, first t/components/cart/content.tsx:107 |
| `cart-item-label` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:67, assets/js/test-unit/theme/cart.spec.js:71 (+1) | jest-only: no production consumer, only the spec fixture; 3 TSX sites, first t/components/cart/content.tsx:191 |
| `cart-item-name` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:53 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:114 |
| `cart-item-option-remove` | REQUIRED | JS assets/js/theme/cart.js:423 | 1 TSX site, first t/components/cart/item-giftwrap.tsx:25 |
| `cart-item-qty-input` | REQUIRED | JS assets/js/theme/cart.js:270; JEST assets/js/test-unit/theme/cart.spec.js:77 | 1 TSX site, first t/components/cart/content.tsx:219 |
| `cart-item-quantity` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:70 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:198 |
| `cart-item-title` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:52 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:112 |
| `cart-item-value` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:68, assets/js/test-unit/theme/cart.spec.js:86 | jest-only: no production consumer, only the spec fixture; 4 TSX sites, first t/components/cart/content.tsx:194 |
| `cart-list` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:47 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/cart/content.tsx:85 |
| `cart-quantity` | REQUIRED | JS assets/js/theme/global/cart-preview.js:32 | 1 TSX site, first t/components/common/navigation.tsx:138 |
| `cart-remove` | REQUIRED | JS assets/js/theme/cart.js:283; JEST assets/js/test-unit/theme/cart.spec.js:87 | 1 TSX site, first t/components/cart/content.tsx:361 |
| `cart-total` | REQUIRED | TSX-variant src/templates/components/cart/totals.tsx:91, src/templates/components/cart/totals.tsx:218, src/templates/components/cart/totals.tsx:237 (+9) | 14 TSX sites, first t/components/cart/totals.tsx:91 |
| `ConfigurableProductRow` | REQUIRED | SCSS assets/scss/invoice.scss:138, assets/scss/invoice.scss:145, assets/scss/invoice.scss:156 (+1) | SCSS rule only (compat leftover or legacy styling); 4 TSX sites, first t/pages/account/orders/invoice.tsx:367 |
| `confirm` | REQUIRED | JS assets/js/theme/global/modal.js:304; TSX-variant src/templates/components/common/alert/alert-modal.tsx:22 | 1 TSX site, first t/components/common/alert/alert-modal.tsx:23 |
| `container` | REQUIRED | JS assets/js/theme/common/product-details.js:583; SCSS assets/scss/tailwind/_tailwind.scss:793 | 1 TSX site, first src/server/componentParts.tsx:168 |
| `countPill` | REQUIRED | JS assets/js/theme/global/compare-products.js:21 | 3 TSX sites, first t/components/common/navigation-menu.tsx:167 |
| `countPill--positive` | REQUIRED | JS assets/js/theme/global/cart-preview.js:34; TSX-variant src/templates/components/common/navigation.tsx:138 | 2 TSX sites, first t/components/common/navigation-menu.tsx:167 |
| `coupon-code` | REQUIRED | JS assets/js/theme/cart.js:307 | 1 TSX site, first t/components/cart/coupon-input.tsx:31 |
| `coupon-code-add` | REQUIRED | JS assets/js/theme/cart.js:321, assets/js/theme/cart.js:337 | 1 TSX site, first t/components/cart/coupon-input.tsx:10 |
| `coupon-code-cancel` | REQUIRED | JS assets/js/theme/cart.js:327, assets/js/theme/cart.js:331, assets/js/theme/cart.js:336 | 1 TSX site, first t/components/cart/coupon-input.tsx:19 |
| `coupon-form` | REQUIRED | JS assets/js/theme/cart.js:308 | 2 TSX sites, first t/components/cart/coupon-input.tsx:35 |
| `definitionList` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:54; TSX-variant src/templates/components/account/messages-list.tsx:29, src/templates/components/account/order-contents.tsx:138, src/templates/components/account/order-contents.tsx:140 (+13) | 10 TSX sites, first t/components/account/order-contents.tsx:172 |
| `definitionList-key` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:55, assets/js/test-unit/theme/cart.spec.js:59 | jest-only: no production consumer, only the spec fixture; 15 TSX sites, first t/components/account/order-contents.tsx:177 |
| `definitionList-value` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:56, assets/js/test-unit/theme/cart.spec.js:60 | jest-only: no production consumer, only the spec fixture; 18 TSX sites, first t/components/account/order-contents.tsx:178 |
| `DetailRow` | REQUIRED | SCSS assets/scss/invoice.scss:137, assets/scss/invoice.scss:144, assets/scss/invoice.scss:155 (+2) | SCSS rule only (compat leftover or legacy styling); 4 TSX sites, first t/pages/account/orders/invoice.tsx:237 |
| `dropdown` | REQUIRED | JS assets/js/theme/global/cart-preview.js:2, assets/js/theme/global/cart-preview.js:7, assets/js/theme/global/cart-preview.js:8 (+4) | generic word: confirm the JS hit targets this element; 1 TSX site, first t/components/common/navigation.tsx:144 |
| `dropdown-menu` | REQUIRED | JS assets/js/theme/global/quick-view.js:33; TSX-variant src/templates/components/common/navigation.tsx:14 | 6 TSX sites, first t/components/common/channel-selector.tsx:38 |
| `dropdown-menu-button` | REQUIRED | JS assets/js/theme/global/modal.js:124 | 1 TSX site, first t/components/common/wishlist-dropdown.tsx:14 |
| `error-icon` | REQUIRED | JS assets/js/theme/global/modal.js:320 | 1 TSX site, first t/components/common/alert/alert-modal.tsx:9 |
| `estimator-form` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:169 | 1 TSX site, first t/components/cart/shipping-estimator.tsx:50 |
| `estimator-form--default` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:104 | 1 TSX site, first t/components/cart/shipping-quotes.tsx:32 |
| `estimator-form--ups` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:103 | 1 TSX site, first t/components/cart/shipping-quotes.tsx:92 |
| `estimator-form-toggleUPSRate` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:100 | 2 TSX sites, first t/components/cart/shipping-quotes.tsx:79 |
| `facetedSearch` | REQUIRED | STORE <style>#3: `.facetedSearch.sidebarBlock .navList` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/faceted-search/index.tsx:13 |
| `facetedSearch-clearLink` | REQUIRED | JS assets/js/theme/common/faceted-search.js:13; JEST assets/js/test-unit/theme/common/faceted-search.spec.js:41 | 1 TSX site, first t/components/faceted-search/faceted-search-navigation.tsx:52 |
| `facetedSearch-navList` | REQUIRED | STORE <style>#3: `.facetedSearch-toggle + .facetedSearch-navList:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/faceted-search/index.tsx:66 |
| `facetedSearch-toggle` | REQUIRED | JS assets/js/theme/common/faceted-search.js:11; STORE <style>#3: `.facetedSearch-toggle + .facetedSearch-navList:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/faceted-search/index.tsx:16 |
| `forgot-password-form` | REQUIRED | JS assets/js/theme/auth.js:64, assets/js/theme/auth.js:70, assets/js/theme/auth.js:207 | 1 TSX site, first t/pages/auth/forgot-password.tsx:25 |
| `form` | REQUIRED | TSX-variant src/templates/components/account/wishlist-list.tsx:53, src/templates/components/common/navigation.tsx:144, src/templates/components/faceted-search/index.tsx:67 (+1); STORE <style>#3: `.form.form--addToCart div.form-field:not(:first-child, .form-field--in` | store-injected CSS visible on the live pages; 29 TSX sites, first t/components/account/add-wishlist.tsx:36 |
| `form-field` | REQUIRED | JS assets/js/theme/account.js:316, assets/js/theme/account.js:317, assets/js/theme/account.js:318 (+7); JEST assets/js/test-unit/theme/common/picklist-backorder.spec.js:29, assets/js/test-unit/theme/common/picklist-backorder.spec.js:38 (+2); SCSS assets/scss/maintenance.scss:175; TSX-variant src/templates/components/account/add-wishlist.tsx:36, src/templates/components/account/edit-account.tsx:13, src/templates/components/category/sort-box.tsx:7 (+24); STORE <style>#3: `form[action*="/search.php"] .form-field:not(#pseudoID)::before` | store-injected CSS visible on the live pages; 1 TSX site, first src/server/formParts.tsx:79 |
| `form-field--increments` | REQUIRED | JS assets/js/theme/common/product-details-base.js:388; STORE <style>#3: `.form.form--addToCart div.form-field:not(:first-child, .form-field--in` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/products/add-to-cart.tsx:34 |
| `form-field--stock` | REQUIRED | JS assets/js/theme/common/product-details-base.js:393; JEST assets/js/test-unit/theme/common/picklist-backorder.spec.js:38 | 1 TSX site, first t/components/products/product-view.tsx:546 |
| `form-fieldset` | REQUIRED | JS assets/js/theme/common/faceted-search.js:17; SCSS assets/scss/tailwind/_tailwind.scss:683; STORE <style>#3: `footer form[action*="/subscribe.php"] .form-fieldset:not(#pseudoID)` | store-injected CSS visible on the live pages; 21 TSX sites, first t/components/account/edit-account.tsx:12 |
| `form-increment` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:72; STORE <style>#3: `@media (min-width: 801px) { html .mqpo-productsTable ._row ._col .form` | store-injected CSS visible on the live pages; 2 TSX sites, first t/components/cart/content.tsx:202 |
| `form-inlineMessage` | REQUIRED | JS assets/js/theme/account.js:497, assets/js/theme/account.js:549, assets/js/theme/auth.js:192 (+2); SCSS assets/scss/maintenance.scss:123, assets/scss/maintenance.scss:180, assets/scss/optimized-checkout.scss:216; TSX-variant src/server/formParts.tsx:76, src/templates/components/common/search-box.tsx:13, src/templates/components/common/subscription-form.tsx:24 (+4) | 1 TSX site, first t/components/faceted-search/range-form.tsx:56 |
| `form-input` | REQUIRED | JS assets/js/theme/common/faceted-search.js:22, assets/js/theme/common/form-classes.js:4; JEST assets/js/test-unit/theme/cart.spec.js:77; SCSS assets/scss/tailwind/_tailwind.scss:678; TSX-variant src/templates/components/common/navigation.tsx:144, src/templates/components/common/search-box.tsx:13, src/templates/components/common/subscription-form.tsx:24 (+3); STORE <style>#3: `form[action*="/search.php"] .form-input:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first src/server/formParts.tsx:41 |
| `form-input--incrementTotal` | REQUIRED | JS assets/js/theme/common/product-details.js:152, assets/js/theme/common/product-details.js:429, assets/js/theme/common/product-details.js:438; JEST assets/js/test-unit/theme/cart.spec.js:77, assets/js/test-unit/theme/common/product-details-base.spec.js:60 (+2) | 2 TSX sites, first t/components/cart/content.tsx:219 |
| `form-label` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:71, assets/js/test-unit/theme/common/picklist-backorder.spec.js:26 (+2); SCSS assets/scss/optimized-checkout.scss:319, assets/scss/optimized-checkout.scss:320, assets/scss/optimized-checkout.scss:325 (+2); TSX-variant src/templates/components/account/add-wishlist.tsx:58, src/templates/components/account/order-contents.tsx:83, src/templates/components/account/order-contents.tsx:89 (+35) | 1 TSX site, first src/server/formParts.tsx:63 |
| `form-label--alternate` | REQUIRED | JEST assets/js/test-unit/theme/common/picklist-backorder.spec.js:30 | jest-only: no production consumer, only the spec fixture; 14 TSX sites, first t/components/products/add-to-cart.tsx:35 |
| `form-label--inlineSmall` | REQUIRED | JEST assets/js/test-unit/theme/common/picklist-backorder.spec.js:30 | jest-only: no production consumer, only the spec fixture; 11 TSX sites, first t/components/products/options/date.tsx:13 |
| `form-option` | REQUIRED | STORE <style>#3: `.form-option.form-option-swatch:not(#pseudoID)` | store-injected CSS visible on the live pages; 4 TSX sites, first t/components/products/options/set-rectangle.tsx:36 |
| `form-option-expanded` | REQUIRED | JS assets/js/theme/common/product-details.js:49; STORE <style>#3: `div.mqpo-productsTable ._ow_label + ._text:not(#pseudoID), div.mqpo-pr` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/products/options/swatch.tsx:139 |
| `form-option-swatch` | REQUIRED | JS assets/js/theme/common/product-details.js:47; STORE <style>#3: `.form-option.form-option-swatch:not(#pseudoID)` | store-injected CSS visible on the live pages; 2 TSX sites, first t/components/products/options/swatch.tsx:114 |
| `form-option-variant` | REQUIRED | TSX-variant src/client/variantSelector/dom.ts:21 | 10 TSX sites, first t/components/products/options/set-rectangle.tsx:37 |
| `form-option-variant--color` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:804; STORE <style>#3: `.form-option-variant--color:not(#pseudoID)` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/products/options/swatch.tsx:37 |
| `form-option-variant--pattern` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:804; STORE <style>#3: `.mqpo-swal-popup .form-option-variant--pattern:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/products/options/swatch.tsx:26 |
| `form-option-wrapper` | REQUIRED | TSX-variant src/client/variantSelector/dom.ts:26 | 3 TSX sites, first t/components/products/options/input-checkbox.tsx:14 |
| `form-prefixPostfix-button--postfix` | REQUIRED | TSX-variant src/templates/pages/auth/forgot-password.tsx:27 | 4 TSX sites, first t/components/common/search-box.tsx:16 |
| `form-select` | REQUIRED | JS assets/js/theme/common/form-classes.js:3; JEST assets/js/test-unit/theme/common/state-country.spec.js:17, assets/js/test-unit/theme/common/state-country.spec.js:25; TSX-variant src/templates/components/category/sort-box.tsx:7, src/templates/components/search/content-sort-box.tsx:8 | 1 TSX site, first src/server/formParts.tsx:50 |
| `gift-certificate-add` | REQUIRED | JS assets/js/theme/cart.js:366, assets/js/theme/cart.js:378 | 1 TSX site, first t/components/cart/gift-certificate.tsx:8 |
| `gift-certificate-cancel` | REQUIRED | JS assets/js/theme/cart.js:371, assets/js/theme/cart.js:374, assets/js/theme/cart.js:379 | 1 TSX site, first t/components/cart/gift-certificate.tsx:20 |
| `gift-certificate-code` | REQUIRED | JS assets/js/theme/cart.js:362 | 1 TSX site, first t/components/cart/gift-certificate-input.tsx:9 |
| `giftWrapping-multiple` | REQUIRED | JS assets/js/theme/cart.js:455 | 1 TSX site, first t/components/cart/modals/gift-wrapping-form.tsx:123 |
| `giftWrapping-select` | REQUIRED | JS assets/js/theme/cart.js:429, assets/js/theme/cart.js:450 | 2 TSX sites, first t/components/cart/modals/gift-wrapping-form.tsx:86 |
| `giftWrapping-single` | REQUIRED | JS assets/js/theme/cart.js:454 | 1 TSX site, first t/components/cart/modals/gift-wrapping-form.tsx:64 |
| `header` | REQUIRED | JS assets/js/theme/global/mobile-menu-toggle.js:29; JEST assets/js/test-unit/theme/global/mobile-menu-toggle.spec.js:12, assets/js/test-unit/theme/global/mobile-menu-toggle.spec.js:51 (+1) | generic word: confirm the JS hit targets this element; 1 TSX site, first t/components/common/header.tsx:46 |
| `header-logo` | REQUIRED | TSX-variant src/templates/components/common/header.tsx:46 | 2 TSX sites, first t/components/common/header.tsx:57 |
| `header-logo-image` | REQUIRED | TSX-variant src/templates/components/common/header.tsx:46 | 2 TSX sites, first t/components/common/store-logo.tsx:25 |
| `header-logo-text` | REQUIRED | TSX-variant src/templates/components/common/header.tsx:46 | 4 TSX sites, first t/components/common/store-logo.tsx:36 |
| `heroCarousel` | REQUIRED | JS assets/js/theme/common/carousel/index.js:64; JEST assets/js/test-unit/theme/carousel.spec.js:7, assets/js/test-unit/theme/carousel.spec.js:41 | 1 TSX site, first t/components/carousel.tsx:21 |
| `heroCarousel-action` | REQUIRED | JEST assets/js/test-unit/theme/carousel.spec.js:16, assets/js/test-unit/theme/carousel.spec.js:50 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/carousel-content.tsx:29 |
| `heroCarousel-content` | REQUIRED | JS assets/js/theme/common/carousel/utils/handleImageAspectRatio.js:40; JEST assets/js/test-unit/theme/carousel.spec.js:13, assets/js/test-unit/theme/carousel.spec.js:47 | 2 TSX sites, first t/components/carousel-content.tsx:42 |
| `heroCarousel-description` | REQUIRED | JEST assets/js/test-unit/theme/carousel.spec.js:15, assets/js/test-unit/theme/carousel.spec.js:49 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/carousel-content.tsx:15 |
| `heroCarousel-image` | REQUIRED | JS assets/js/theme/common/carousel/utils/getActiveSlideInfo.js:7; JEST assets/js/test-unit/theme/carousel.spec.js:11, assets/js/test-unit/theme/carousel.spec.js:23 (+1); TSX-variant src/server/carouselParts.ts:4, src/templates/components/carousel.tsx:63, src/templates/components/carousel.tsx:64 (+2) | 2 TSX sites, first t/components/carousel.tsx:35 |
| `heroCarousel-image-wrapper` | REQUIRED | JEST assets/js/test-unit/theme/carousel.spec.js:10, assets/js/test-unit/theme/carousel.spec.js:22 (+1); TSX-variant src/templates/components/carousel.tsx:21 | 2 TSX sites, first t/components/carousel.tsx:46 |
| `heroCarousel-slide` | REQUIRED | JS assets/js/theme/common/carousel/index.js:71; JEST assets/js/test-unit/theme/carousel.spec.js:9, assets/js/test-unit/theme/carousel.spec.js:21 (+1); TSX-variant src/templates/components/carousel.tsx:21 | 4 TSX sites, first t/components/carousel.tsx:63 |
| `heroCarousel-slide--first` | REQUIRED | JEST assets/js/test-unit/theme/carousel.spec.js:9, assets/js/test-unit/theme/carousel.spec.js:43; TSX-variant src/templates/components/carousel.tsx:21 | 2 TSX sites, first t/components/carousel.tsx:63 |
| `heroCarousel-title` | REQUIRED | JEST assets/js/test-unit/theme/carousel.spec.js:14, assets/js/test-unit/theme/carousel.spec.js:48 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/carousel-content.tsx:11 |
| `icon` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:75, assets/js/test-unit/theme/cart.spec.js:80 (+1); TSX-variant src/templates/components/account/order-contents.tsx:123, src/templates/components/cart/totals.tsx:417, src/templates/components/common/alert/alert-error.tsx:9 (+16) | 1 TSX site, first src/server/formParts.tsx:89 |
| `Invoice` | REQUIRED | SCSS assets/scss/invoice.scss:20 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:119 |
| `InvoiceDetails` | REQUIRED | SCSS assets/scss/invoice.scss:51, assets/scss/invoice.scss:98, assets/scss/invoice.scss:160 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:235 |
| `InvoiceDetailsLeft` | REQUIRED | SCSS assets/scss/invoice.scss:106 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:236 |
| `InvoiceDetailsRight` | REQUIRED | SCSS assets/scss/invoice.scss:107 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:252 |
| `InvoiceHeading` | REQUIRED | SCSS assets/scss/invoice.scss:41 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/account/orders/invoice.tsx:274 |
| `InvoiceItemList` | REQUIRED | SCSS assets/scss/invoice.scss:128 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:305 |
| `InvoiceItems` | REQUIRED | SCSS assets/scss/invoice.scss:50, assets/scss/invoice.scss:122 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:273 |
| `InvoiceTable` | REQUIRED | SCSS assets/scss/invoice.scss:61, assets/scss/invoice.scss:67, assets/scss/invoice.scss:75 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:277 |
| `InvoiceTitle` | REQUIRED | SCSS assets/scss/invoice.scss:26 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:158 |
| `InvoiceTotalRow` | REQUIRED | SCSS assets/scss/invoice.scss:89, assets/scss/invoice.scss:93 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/account/orders/invoice.tsx:428 |
| `InvoiceTotals` | REQUIRED | SCSS assets/scss/invoice.scss:88, assets/scss/invoice.scss:170 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:423 |
| `is-active` | REQUIRED | JS assets/js/theme/category.js:23, assets/js/theme/category.js:24, assets/js/theme/common/product-details-base.js:334 (+7); SCSS assets/scss/optimized-checkout.scss:109, assets/scss/optimized-checkout.scss:150, assets/scss/tailwind/_tailwind.scss:478 (+6); TSX-variant src/server/componentParts.tsx:185, src/server/componentParts.tsx:193, src/server/formParts.tsx:17 (+11); STORE <style>#15: `@media (min-width: 551px) { .tab.is-active` | store-injected CSS visible on the live pages; 8 TSX sites, first t/components/common/breadcrumbs.tsx:26 |
| `is-open` | REQUIRED | JS assets/js/theme/cart.js:494, assets/js/theme/common/product-details.js:601, assets/js/theme/common/product-details.js:602 (+14); JEST assets/js/test-unit/theme/common/collapsible.spec.js:41, assets/js/test-unit/theme/common/collapsible.spec.js:49 (+16); SCSS assets/scss/tailwind/_tailwind.scss:477; TSX-variant src/templates/components/common/navigation.tsx:14, src/templates/components/faceted-search/facets/hierarchy.tsx:22, src/templates/components/faceted-search/facets/multi.tsx:20 (+6) | 5 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:32 |
| `Label` | REQUIRED | SCSS assets/scss/invoice.scss:144, assets/scss/invoice.scss:145, assets/scss/invoice.scss:160 (+1) | SCSS rule only (compat leftover or legacy styling); 8 TSX sites, first t/pages/account/orders/invoice.tsx:238 |
| `lazyload` | REQUIRED | JS assets/js/theme/product/video-gallery.js:70 | generic word: confirm the JS hit targets this element; 4 TSX sites, first t/components/cart/shipping-quotes.tsx:115 |
| `listItem-figureBody` | REQUIRED | TSX-variant src/templates/components/products/list-item.tsx:47 | 1 TSX site, first t/components/products/list-item.tsx:100 |
| `listItem-image` | REQUIRED | TSX-variant src/templates/components/products/list-item.tsx:60 | 1 TSX site, first t/components/products/list-item.tsx:92 |
| `login-form` | REQUIRED | JS assets/js/theme/auth.js:26, assets/js/theme/auth.js:32, assets/js/theme/auth.js:41 (+1) | 1 TSX site, first t/pages/auth/login.tsx:26 |
| `modal` | REQUIRED | JEST assets/js/test-unit/theme/common/state-country.spec.js:44, assets/js/test-unit/theme/global/modal.spec.js:18 (+1) | jest-only: no production consumer, only the spec fixture; generic word: confirm the JS hit targets this element; 1 TSX site, first src/server/componentParts.tsx:21 |
| `modal--alert` | REQUIRED | JEST assets/js/test-unit/theme/common/state-country.spec.js:44 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/common/alert/alert-modal.tsx:8 |
| `modal--large` | REQUIRED | JEST assets/js/test-unit/theme/global/modal.spec.js:283, assets/js/test-unit/theme/global/modal.spec.js:286; TSX-variant src/server/componentParts.tsx:17 | 1 TSX site, first t/components/products/product-view.tsx:584 |
| `modal--small` | REQUIRED | TSX-variant src/server/componentParts.tsx:17 | 2 TSX sites, first t/components/common/alert/alert-modal.tsx:8 |
| `modal-body` | REQUIRED | JEST assets/js/test-unit/theme/global/modal.spec.js:54, assets/js/test-unit/theme/global/modal.spec.js:137 (+1) | jest-only: no production consumer, only the spec fixture; 1 TSX site, first src/server/componentParts.tsx:43 |
| `modal-close` | REQUIRED | JS assets/js/theme/common/product-details.js:581; JEST assets/js/test-unit/theme/global/modal.spec.js:19 | 1 TSX site, first t/components/common/modal/modal-close-btn.tsx:7 |
| `modal-content` | REQUIRED | JS assets/js/theme/cart.js:137, assets/js/theme/common/cart-item-details.js:142; JEST assets/js/test-unit/theme/common/state-country.spec.js:45, assets/js/test-unit/theme/global/modal.spec.js:22 (+1) | 3 TSX sites, first t/components/common/alert/alert-modal.tsx:20 |
| `modal-header` | REQUIRED | JEST assets/js/test-unit/theme/global/modal.spec.js:136, assets/js/test-unit/theme/global/modal.spec.js:149 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first src/server/componentParts.tsx:28 |
| `modal-header-title` | REQUIRED | JS assets/js/theme/common/cart-item-details.js:121 | 1 TSX site, first src/server/componentParts.tsx:36 |
| `navBar--account` | REQUIRED | STORE <style>#3: `nav.navBar--account a[href*="/account.php?action=inbox"]:not(#pseudoID` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/account/navigation.tsx:6 |
| `navBar-action` | REQUIRED | JS assets/js/theme/search.js:47, assets/js/theme/search.js:49, assets/js/theme/search.js:72 (+1); TSX-variant src/templates/components/account/navigation.tsx:7, src/templates/components/gift-certificate/navigation.tsx:7, src/templates/pages/contact-us.tsx:29 (+2) | 16 TSX sites, first t/components/account/navigation.tsx:9 |
| `navBar-item` | REQUIRED | TSX-variant src/templates/components/account/navigation.tsx:7, src/templates/components/gift-certificate/navigation.tsx:7, src/templates/pages/contact-us.tsx:29 (+2) | 19 TSX sites, first t/components/account/navigation.tsx:8 |
| `navBar-item--separate` | REQUIRED | TSX-variant src/templates/components/account/navigation.tsx:7, src/templates/components/gift-certificate/navigation.tsx:7, src/templates/pages/contact-us.tsx:29 (+2) | 1 TSX site, first t/pages/search.tsx:122 |
| `navList` | REQUIRED | JS assets/js/theme/common/faceted-search.js:15; JEST assets/js/test-unit/theme/common/faceted-search.spec.js:43; TSX-variant src/templates/components/faceted-search/index.tsx:67; STORE <style>#3: `.facetedSearch.sidebarBlock .navList` | store-injected CSS visible on the live pages; 1 TSX site, first src/server/componentParts.tsx:159 |
| `navList-action` | REQUIRED | JS assets/js/theme/category.js:23, assets/js/theme/category.js:24, assets/js/theme/category.js:27; TSX-variant src/server/componentParts.tsx:155, src/templates/components/faceted-search/facets/hierarchy-children.tsx:22, src/templates/components/faceted-search/facets/hierarchy.tsx:38 (+3) | 7 TSX sites, first t/components/brand/sidebar.tsx:30 |
| `navList-action--checkbox` | REQUIRED | TSX-variant src/server/componentParts.tsx:155 | 1 TSX site, first src/server/componentParts.tsx:178 |
| `navList-item` | REQUIRED | JS assets/js/theme/common/faceted-search.js:206; TSX-variant src/server/componentParts.tsx:155 | 8 TSX sites, first t/components/brand/sidebar.tsx:29 |
| `navPage-childList-item` | REQUIRED | STORE <style>#3: `.emthemesModez-verticalCategories .navPages-item:not(:last-child), .em` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/common/navigation-list.tsx:105 |
| `navPage-subMenu-horizontal` | REQUIRED | JS assets/js/theme/global/mobile-menu-toggle.js:174 | 1 TSX site, first t/components/common/navigation-dropdown.tsx:16 |
| `navPage-subMenu-item` | REQUIRED | STORE <style>#3: `.emthemesModez-verticalCategories .navPages-item:not(:last-child), .em` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/common/channel-selector-mobile.tsx:45 |
| `navPage-subMenu-list` | REQUIRED | STORE <style>#3: `.emthemesModez-verticalCategories .navPages-item:not(:last-child), .em` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/common/channel-selector-mobile.tsx:41 |
| `navPages` | REQUIRED | JS assets/js/theme/global/mobile-menu-toggle.js:31 | 1 TSX site, first t/components/common/navigation-menu.tsx:82 |
| `navPages-action` | REQUIRED | JS assets/js/theme/global/mobile-menu-toggle.js:38, assets/js/theme/global/mobile-menu-toggle.js:172, assets/js/theme/global/mobile-menu-toggle.js:174 | 18 TSX sites, first t/components/common/navigation-menu.tsx:153 |
| `navPages-item` | REQUIRED | STORE <style>#3: `.emthemesModez-verticalCategories .navPages-item:not(:last-child), .em` | store-injected CSS visible on the live pages; 12 TSX sites, first t/components/common/navigation-menu.tsx:44 |
| `navPages-list` | REQUIRED | JS assets/js/theme/global/menu.js:14, assets/js/theme/global/mobile-menu-toggle.js:35; STORE <style>#3: `.emthemesModez-verticalCategories .navPages-item:not(:last-child), .em` | store-injected CSS visible on the live pages; 3 TSX sites, first t/components/common/navigation-menu.tsx:88 |
| `navPages-list-depth-max` | REQUIRED | JS assets/js/theme/global/menu.js:14, assets/js/theme/global/mobile-menu-toggle.js:35 | 1 TSX site, first t/components/common/navigation-menu.tsx:88 |
| `navUser-action--currencySelector` | REQUIRED | JS assets/js/theme/global/currency-selector.js:43 | 1 TSX site, first t/components/common/currency-selector.tsx:23 |
| `navUser-action--storeCredit` | REQUIRED | STORE <style>#3: `.navUser-action.navUser-action--storeCredit > span:not(#pseudoID)` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/common/navigation.tsx:29 |
| `new-password-form` | REQUIRED | JS assets/js/theme/auth.js:93, assets/js/theme/auth.js:208 | 1 TSX site, first t/pages/auth/new-password.tsx:22 |
| `NewAddress` | REQUIRED | SCSS assets/scss/invoice.scss:118 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:309 |
| `no-js` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:463, assets/scss/tailwind/_tailwind.scss:471, assets/scss/tailwind/_tailwind.scss:743; TSX-variant src/server/componentParts.tsx:193 | 1 TSX site, first t/layout/base.tsx:31 |
| `non-sale-price--withoutTax` | REQUIRED | JS assets/js/theme/common/product-details-base.js:374 | 2 TSX sites, first t/components/products/price-range.tsx:134 |
| `non-sale-price--withTax` | REQUIRED | JS assets/js/theme/common/product-details-base.js:370 | 2 TSX sites, first t/components/products/price-range.tsx:70 |
| `optimizedCheckout-header` | REQUIRED | SCSS assets/scss/optimized-checkout.scss:14 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/checkout.tsx:38 |
| `page` | REQUIRED | STORE <style>#3: `@media (min-width: 801px) { main.page .page-content--centered:not(#pse` | store-injected CSS visible on the live pages; 17 TSX sites, first t/components/search/advanced-search.tsx:12 |
| `page-content` | REQUIRED | TSX-variant src/templates/pages/subscribed.tsx:33 | 15 TSX sites, first t/components/search/advanced-search.tsx:13 |
| `page-content--centered` | REQUIRED | STORE <style>#3: `@media (min-width: 801px) { main.page .page-content--centered:not(#pse` | store-injected CSS visible on the live pages; 9 TSX sites, first t/components/search/advanced-search.tsx:13 |
| `page-heading` | REQUIRED | TSX-variant src/templates/pages/subscribed.tsx:33 | 44 TSX sites, first t/components/cart/page-title.tsx:6 |
| `pagination` | REQUIRED | TSX-variant src/templates/pages/account/orders/all.tsx:22, src/templates/pages/account/orders/completed.tsx:13, src/templates/pages/account/wishlist-details.tsx:13 | 2 TSX sites, first t/components/common/paginator.tsx:13 |
| `pagination-item--next` | REQUIRED | JS assets/js/theme/common/utils/pagination-utils.js:18, assets/js/theme/product/reviews.js:70 | 2 TSX sites, first t/components/common/paginator.tsx:64 |
| `pagination-item--previous` | REQUIRED | JS assets/js/theme/common/utils/pagination-utils.js:19, assets/js/theme/product/reviews.js:71 | 2 TSX sites, first t/components/common/paginator.tsx:18 |
| `pagination-link` | REQUIRED | JS assets/js/theme/common/utils/pagination-utils.js:2, assets/js/theme/product/reviews.js:70, assets/js/theme/product/reviews.js:71 | 6 TSX sites, first t/components/common/paginator.tsx:20 |
| `pagination-list` | REQUIRED | JS assets/js/theme/common/utils/pagination-utils.js:14 | 1 TSX site, first src/server/componentParts.tsx:139 |
| `powered-by` | REQUIRED | SCSS assets/scss/maintenance.scss:129, assets/scss/maintenance.scss:136, assets/scss/maintenance.scss:145 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/components/common/footer.tsx:202 |
| `previewCartAction-viewCart` | REQUIRED | TSX-variant src/templates/components/common/cart-preview.tsx:99 | 1 TSX site, first t/components/common/cart-preview.tsx:115 |
| `previewCartCheckout` | REQUIRED | JS assets/js/theme/common/product-details.js:580 | 1 TSX site, first t/components/cart/preview.tsx:29 |
| `previewCartList` | REQUIRED | STORE <style>#3: `.previewCartList` | store-injected CSS visible on the live pages; 1 TSX site, first t/components/common/cart-preview.tsx:41 |
| `price` | REQUIRED | STORE <style>#3: `.price.price--withTax.price--main.price--sale:not(#pseudoID)` | store-injected CSS visible on the live pages; 22 TSX sites, first t/components/products/price-range.tsx:45 |
| `price--discounted` | REQUIRED | TSX-variant src/templates/components/cart/shipping-estimator.tsx:20 | 7 TSX sites, first t/components/cart/content.tsx:194 |
| `price--rrp` | REQUIRED | STORE <style>#3: `.productView-details .price.price--rrp:not(#pseudoID)` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/products/price-range.tsx:45 |
| `price--withoutTax` | REQUIRED | JS assets/js/theme/common/product-details-base.js:358 | 2 TSX sites, first t/components/products/price-range.tsx:143 |
| `price--withTax` | REQUIRED | JS assets/js/theme/common/product-details-base.js:354; STORE <style>#3: `.price.price--withTax.price--main.price--sale:not(#pseudoID)` | store-injected CSS visible on the live pages; 2 TSX sites, first t/components/products/price-range.tsx:76 |
| `price-label` | REQUIRED | JS assets/js/theme/common/product-details-base.js:385 | 4 TSX sites, first t/components/products/price-range.tsx:77 |
| `price-now-label` | REQUIRED | JS assets/js/theme/common/product-details-base.js:382 | 4 TSX sites, first t/components/products/price-range.tsx:78 |
| `price-section--saving` | REQUIRED | JS assets/js/theme/common/product-details-base.js:378; TSX-variant src/templates/components/cart/preview.tsx:90, src/templates/components/products/product-view.tsx:247, src/templates/components/products/product-view.tsx:252; STORE <style>#3: `.productView-details .productView-price .price-section--saving:not(#ps` | store-injected CSS visible on the live pages; 2 TSX sites, first t/components/products/price-range.tsx:171 |
| `product` | REQUIRED | JS assets/js/theme/global/quick-search.js:57, assets/js/theme/search.js:172; JEST assets/js/test-unit/theme/cart.spec.js:50; TSX-variant src/client/variantSelector/fetchVariants.ts:43, src/client/variantSelector/fetchVariants.ts:45, src/templates/components/products/list.tsx:7 | 7 TSX sites, first t/components/account/wishlist-item-list.tsx:19 |
| `product-list` | REQUIRED | JEST assets/js/test-unit/theme/common/picklist-backorder.spec.js:29 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/products/related.tsx:11 |
| `productAttributes-message` | REQUIRED | JS assets/js/theme/common/product-details-base.js:500, assets/js/theme/common/product-details-base.js:758, assets/js/theme/common/product-details-base.js:759 (+2); JEST assets/js/test-unit/theme/common/product-details-base.spec.js:56, assets/js/test-unit/theme/common/product-details-base.spec.js:96 (+2) | 1 TSX site, first t/components/products/add-to-cart.tsx:99 |
| `ProductCost` | REQUIRED | SCSS assets/scss/invoice.scss:84, assets/scss/invoice.scss:85, assets/scss/invoice.scss:178 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/account/orders/invoice.tsx:297 |
| `productGrid` | REQUIRED | TSX-variant src/templates/components/common/navigation.tsx:144 | 6 TSX sites, first t/components/account/wishlist-item-list.tsx:15 |
| `ProductPreOrder` | REQUIRED | SCSS assets/scss/invoice.scss:187 | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first t/pages/account/orders/invoice.tsx:406 |
| `ProductQuantity` | REQUIRED | SCSS assets/scss/invoice.scss:82, assets/scss/invoice.scss:83, assets/scss/invoice.scss:174 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/account/orders/invoice.tsx:288 |
| `ProductTotal` | REQUIRED | SCSS assets/scss/invoice.scss:86, assets/scss/invoice.scss:87, assets/scss/invoice.scss:179 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/account/orders/invoice.tsx:300 |
| `productView` | REQUIRED | JS assets/js/theme/common/product-details.js:261, assets/js/theme/common/product-details.js:312, assets/js/theme/global/quick-view.js:34 (+1) | 2 TSX sites, first t/components/cart/preview.tsx:74 |
| `productView-details` | REQUIRED | STORE <style>#3: `.productView-details .price.price--rrp:not(#pseudoID)` | store-injected CSS visible on the live pages; 3 TSX sites, first t/components/cart/preview.tsx:85 |
| `productView-image--cart` | REQUIRED | TSX-variant src/templates/components/cart/preview.tsx:79 | 1 TSX site, first t/components/cart/preview.tsx:81 |
| `productView-images` | REQUIRED | JS assets/js/theme/common/carousel/index.js:24 | 1 TSX site, first t/components/products/product-view.tsx:166 |
| `productView-info` | REQUIRED | JS assets/js/theme/common/product-details-base.js:387, assets/js/theme/common/product-details.js:312 | 3 TSX sites, first t/components/cart/preview.tsx:97 |
| `productView-info-bulkPricing` | REQUIRED | JS assets/js/theme/common/product-details-base.js:412 | 1 TSX site, first t/components/products/product-view.tsx:496 |
| `productView-info-name` | REQUIRED | STORE <style>#3: `.productView-info-name.productView-info-name--availability:not(#pseudo` | store-injected CSS visible on the live pages; 17 TSX sites, first t/components/cart/preview.tsx:98 |
| `productView-info-value` | REQUIRED | STORE <style>#3: `.productView-info-value.productView-info-value--availability:not(#pseu` | store-injected CSS visible on the live pages; 17 TSX sites, first t/components/cart/preview.tsx:99 |
| `productView-picklist-backorder` | REQUIRED | JEST assets/js/test-unit/theme/common/picklist-backorder.spec.js:40 | jest-only: no production consumer, only the spec fixture; 1 TSX site, first t/components/products/product-view.tsx:566 |
| `productView-price` | REQUIRED | STORE <style>#3: `.productView-details .productView-price .price-section--saving:not(#ps` | store-injected CSS visible on the live pages; 3 TSX sites, first t/components/cart/preview.tsx:90 |
| `productView-reviewTabLink` | REQUIRED | JS assets/js/theme/product/reviews.js:17 | 1 TSX site, first t/components/products/description-tabs.tsx:52 |
| `productView-thumbnails` | REQUIRED | JS assets/js/theme/common/carousel/index.js:24 | 1 TSX site, first t/components/products/product-view.tsx:197 |
| `productView-title` | REQUIRED | JS assets/js/theme/common/product-details.js:268 | 4 TSX sites, first t/components/cart/preview.tsx:86 |
| `promotionCallout-item` | REQUIRED | TSX-variant src/templates/components/products/promotion-callout.tsx:34 | 2 TSX sites, first t/components/products/promotion-callout.tsx:19 |
| `quickSearchMessage` | REQUIRED | JS assets/js/theme/global/quick-search.js:46 | 1 TSX site, first t/components/search/quick-results.tsx:26 |
| `quickSearchResults` | REQUIRED | JS assets/js/theme/global/quick-search.js:8 | 1 TSX site, first t/components/common/quick-search.tsx:39 |
| `quickview` | REQUIRED | JS assets/js/theme/global/quick-view.js:13 | generic word: confirm the JS hit targets this element; 3 TSX sites, first t/components/products/card.tsx:116 |
| `quickView` | REQUIRED | JS assets/js/theme/common/product-details.js:348, assets/js/theme/global/quick-view.js:57, assets/js/theme/product/reviews.js:48 | 1 TSX site, first t/components/products/quick-view.tsx:9 |
| `reset-btn` | REQUIRED | JS assets/js/theme/category.js:56 | 1 TSX site, first t/components/category/shop-by-price.tsx:21 |
| `reset-filters` | REQUIRED | JS assets/js/theme/category.js:49, assets/js/theme/common/faceted-search.js:138 | 1 TSX site, first t/components/category/shop-by-price.tsx:20 |
| `reset-message` | REQUIRED | JS assets/js/theme/category.js:56 | 1 TSX site, first t/components/category/shop-by-price.tsx:24 |
| `rrp-price--withoutTax` | REQUIRED | JS assets/js/theme/common/product-details-base.js:366 | 3 TSX sites, first t/components/products/price-range.tsx:102 |
| `rrp-price--withTax` | REQUIRED | JS assets/js/theme/common/product-details-base.js:362 | 3 TSX sites, first t/components/products/price-range.tsx:43 |
| `select-shipping-quote` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:187 | 1 TSX site, first t/components/cart/shipping-quotes.tsx:165 |
| `shipping-estimate-show` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:199; TSX-variant src/templates/components/cart/shipping-estimator.tsx:20 | 1 TSX site, first t/components/cart/shipping-estimator-trigger.tsx:22 |
| `shipping-estimate-show__btn-name` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:201 | 1 TSX site, first t/components/cart/shipping-estimator-trigger.tsx:23 |
| `shipping-estimate-submit` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:27, assets/js/theme/cart/shipping-estimator.js:31 | 1 TSX site, first t/components/cart/shipping-estimator.tsx:151 |
| `shipping-estimator` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:168 | 1 TSX site, first t/components/cart/shipping-estimator.tsx:49 |
| `shipping-quote` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:188 | 2 TSX sites, first t/components/cart/shipping-quotes.tsx:42 |
| `shipping-quotes` | REQUIRED | JS assets/js/theme/cart/shipping-estimator.js:23, assets/js/theme/cart/shipping-estimator.js:184 | 1 TSX site, first t/components/cart/shipping-estimator.tsx:156 |
| `ShippingAddress` | REQUIRED | SCSS assets/scss/invoice.scss:104 | SCSS rule only (compat leftover or legacy styling); 2 TSX sites, first t/pages/account/orders/invoice.tsx:179 |
| `sidebarBlock` | REQUIRED | STORE <style>#3: `.facetedSearch.sidebarBlock .navList` | store-injected CSS visible on the live pages; 5 TSX sites, first t/components/brand/sidebar.tsx:21 |
| `sku-label` | REQUIRED | JS assets/js/theme/common/product-details-base.js:401 | 1 TSX site, first t/components/products/product-view.tsx:308 |
| `socialLinks__link` | REQUIRED | TSX-variant src/templates/components/common/share.tsx:28 | 6 TSX sites, first t/components/common/share.tsx:39 |
| `socialLinks-item` | REQUIRED | TSX-variant src/templates/components/common/share.tsx:28, src/templates/components/common/social-links.tsx:15 | 3 TSX sites, first t/components/common/share.tsx:32 |
| `swatch-option-message` | REQUIRED | JS assets/js/theme/common/product-details.js:26, assets/js/theme/common/product-details.js:167, assets/js/theme/common/product-details.js:333 | 1 TSX site, first t/components/products/options/swatch.tsx:99 |
| `tab` | REQUIRED | JS assets/js/theme/common/product-details-base.js:333, assets/js/theme/global/foundation.js:4; SCSS assets/scss/tailwind/_tailwind.scss:703, assets/scss/tailwind/_tailwind.scss:718, assets/scss/tailwind/_tailwind.scss:763 (+3); TSX-variant src/server/componentParts.tsx:185; STORE <style>#15: `@media (min-width: 551px) { .tab.is-active` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/products/description-tabs.tsx:21 |
| `tab-content` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:735, assets/scss/tailwind/_tailwind.scss:739, assets/scss/tailwind/_tailwind.scss:743; TSX-variant src/server/componentParts.tsx:193; STORE <style>#15: `.tab-content.is-active:not(#pseudoID)` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/products/description-tabs.tsx:63 |
| `tab-title` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:709, assets/scss/tailwind/_tailwind.scss:714, assets/scss/tailwind/_tailwind.scss:718 (+1); TSX-variant src/server/componentParts.tsx:185; STORE <style>#15: `#home-section-categories .tab-title.inline-tabs__tab-title[aria-select` | store-injected CSS visible on the live pages; 6 TSX sites, first t/components/products/description-tabs.tsx:22 |
| `table` | REQUIRED | JEST assets/js/test-unit/theme/cart.spec.js:38 | jest-only: no production consumer, only the spec fixture; generic word: confirm the JS hit targets this element; 2 TSX sites, first t/components/account/wishlist-list.tsx:20 |
| `tabs` | REQUIRED | JS assets/js/theme/common/product-details-base.js:329; SCSS assets/scss/tailwind/_tailwind.scss:688, assets/scss/tailwind/_tailwind.scss:694, assets/scss/tailwind/_tailwind.scss:695 (+1) | 1 TSX site, first src/server/componentParts.tsx:188 |
| `tabs-contents` | REQUIRED | SCSS assets/scss/tailwind/_tailwind.scss:722, assets/scss/tailwind/_tailwind.scss:726, assets/scss/tailwind/_tailwind.scss:727 (+1) | SCSS rule only (compat leftover or legacy styling); 1 TSX site, first src/server/componentParts.tsx:196 |
| `title` | REQUIRED | JS assets/js/theme/common/cart-item-details.js:99, assets/js/theme/common/product-details.js:239; JEST assets/js/test-unit/theme/carousel.spec.js:11, assets/js/test-unit/theme/carousel.spec.js:45 (+1) | generic word: confirm the JS hit targets this element; 2 TSX sites, first t/pages/account/orders/completed.tsx:15 |
| `toggle` | REQUIRED | JEST assets/js/test-unit/theme/common/collapsible.spec.js:103, assets/js/test-unit/theme/common/collapsible.spec.js:135 | jest-only: no production consumer, only the spec fixture; generic word: confirm the JS hit targets this element; 2 TSX sites, first t/components/products/reviews.tsx:20 |
| `toggleLink` | REQUIRED | JS assets/js/theme/common/faceted-search.js:21 | 8 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:13 |
| `upc-label` | REQUIRED | JS assets/js/theme/common/product-details-base.js:405 | 1 TSX site, first t/components/products/product-view.tsx:317 |
| `Value` | REQUIRED | SCSS assets/scss/invoice.scss:155, assets/scss/invoice.scss:156 | SCSS rule only (compat leftover or legacy styling); 11 TSX sites, first t/pages/account/orders/invoice.tsx:241 |
| `video` | REQUIRED | TSX-variant src/templates/components/products/videos.tsx:43 | 1 TSX site, first t/components/products/videos.tsx:44 |
| `video-body` | REQUIRED | TSX-variant src/templates/components/products/videos.tsx:43 | 1 TSX site, first t/components/products/videos.tsx:53 |
| `video-description` | REQUIRED | TSX-variant src/templates/components/products/videos.tsx:43 | 1 TSX site, first t/components/products/videos.tsx:55 |
| `video-figure` | REQUIRED | TSX-variant src/templates/components/products/videos.tsx:43 | 1 TSX site, first t/components/products/videos.tsx:45 |
| `video-title` | REQUIRED | TSX-variant src/templates/components/products/videos.tsx:43 | 1 TSX site, first t/components/products/videos.tsx:54 |
| `warning-icon` | REQUIRED | JS assets/js/theme/global/modal.js:322 | 1 TSX site, first t/components/common/alert/alert-modal.tsx:16 |
| `wishlist-form` | REQUIRED | JS assets/js/theme/wishlist.js:34, assets/js/theme/wishlist.js:40, assets/js/theme/wishlist.js:62 | 1 TSX site, first t/components/account/add-wishlist.tsx:36 |
| `writeReview-form` | REQUIRED | JS assets/js/theme/product/reviews.js:101, assets/js/theme/product.js:41 | 1 TSX site, first t/components/products/modals/writeReview.tsx:32 |
| `account` | REQUIRED-store-risk | DOC handoff.md:243,420: merchant `div.container` > `.account` banner on the account page (signed-in only; not fetchable) | 24 TSX sites, first t/pages/account/add-address.tsx:28 |
| `previewCart-additionalCheckoutButtons` | REQUIRED-store-risk | DOC handoff.md:195: store injects non-important `.previewCart-additionalCheckoutButtons {display; padding}`; not present in the inline CSS I fetched (probably only with an additional checkout provider) | 1 TSX site, first t/components/common/cart-preview.tsx:135 |
| `accordion` | DEAD | - | 1 TSX site, first t/components/faceted-search/index.tsx:67 |
| `accordion--navList` | DEAD | - | 1 TSX site, first t/components/faceted-search/index.tsx:67 |
| `accordion-heading` | DEAD | - | 1 TSX site, first t/components/faceted-search/faceted-search-navigation.tsx:7 |
| `accordion-indicator` | DEAD | - | 4 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:20 |
| `accordion-nav-clear-holder` | DEAD | - | 1 TSX site, first t/components/faceted-search/faceted-search-navigation.tsx:7 |
| `accordion-title` | DEAD | - | 2 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:17 |
| `account--addReturn` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-return.tsx:19 |
| `account--addReturn-column` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-return.tsx:103 |
| `account--addReturn-row` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-return.tsx:102 |
| `account--fixed` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 12 TSX sites, first t/pages/account/add-address.tsx:28 |
| `account--fixedLarge` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 4 TSX sites, first t/pages/account/addresses.tsx:19 |
| `account--fixedSmall` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/auth/forgot-password.tsx:13 |
| `account-body` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 10 TSX sites, first t/pages/account/add-address.tsx:34 |
| `account-content` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 8 TSX sites, first t/pages/account/add-address.tsx:35 |
| `account-content--fixed` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/download-item.tsx:35 |
| `account-downloads-summary` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/download-item.tsx:36 |
| `account-downloadsItem` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/download-item.tsx:45 |
| `account-downloadsItem-accent` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/download-item.tsx:51 |
| `account-downloadsItem-availability` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 3 TSX sites, first t/pages/account/download-item.tsx:53 |
| `account-downloadsItem-description` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/download-item.tsx:66 |
| `account-downloadsItem-title` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/download-item.tsx:50 |
| `account-downloadsList` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/download-item.tsx:41 |
| `account-head` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/all.tsx:23 |
| `account-heading` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 14 TSX sites, first t/components/account/messages-list.tsx:15 |
| `account-list` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 4 TSX sites, first t/components/account/messages-list.tsx:19 |
| `account-message` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/messages-list.tsx:24 |
| `account-navigation` | DEAD | - | 4 TSX sites, first t/components/gift-certificate/navigation.tsx:7 |
| `account-order-address` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 5 TSX sites, first t/pages/account/orders/details.tsx:209 |
| `account-order-backorder-expectation` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/orders/details.tsx:212 |
| `account-orderStatus` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 3 TSX sites, first t/components/account/messages-list.tsx:25 |
| `account-orderStatus-action` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/orders-list.tsx:50 |
| `account-orderStatus-label` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 8 TSX sites, first t/components/account/orders-list.tsx:43 |
| `account-orderTotal-discount` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/details.tsx:136 |
| `account-product` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 3 TSX sites, first t/components/account/order-contents.tsx:82 |
| `account-product-backorder-prompts` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 6 TSX sites, first t/components/account/order-contents.tsx:152 |
| `account-product-body` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 3 TSX sites, first t/components/account/order-contents.tsx:138 |
| `account-product-description` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/orders-list.tsx:64 |
| `account-product-detail--full` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/returns-list.tsx:165 |
| `account-product-detail--large` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/returns-list.tsx:156 |
| `account-product-detail-heading` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 6 TSX sites, first t/components/account/orders-list.tsx:74 |
| `account-product-details` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/orders-list.tsx:72 |
| `account-product-download` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/order-contents.tsx:123 |
| `account-product-title` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 4 TSX sites, first t/components/account/messages-list.tsx:29 |
| `account-row` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/orders/completed.tsx:19 |
| `actionBar` | DEAD | - | 2 TSX sites, first t/components/products/filter.tsx:7 |
| `actionBar-section` | DEAD | - | 2 TSX sites, first t/components/category/sort-box.tsx:7 |
| `add-to-cart-wallet-buttons` | DEAD | - | 1 TSX site, first t/components/products/add-to-cart.tsx:129 |
| `advancedSearch-form` | DEAD | - | 1 TSX site, first t/components/search/advanced-search.tsx:15 |
| `advancedSearch-title` | DEAD | - | 3 TSX sites, first t/components/search/advanced-search.tsx:22 |
| `alertBox--storeCredit` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/all.tsx:30 |
| `alertBox-column` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:70 |
| `aria-description--hidden` | DEAD | - | 19 TSX sites, first t/components/carousel-content-announcement.tsx:4 |
| `banners` | DEAD | - | 2 TSX sites, first t/components/common/footer.tsx:46 |
| `blog` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:16 |
| `blog-date` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:45 |
| `blog-header` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:31 |
| `blog-post` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:59 |
| `blog-post-body` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:30 |
| `blog-post-figure` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:17 |
| `blog-thumbnail` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:21 |
| `blog-title` | DEAD | - | 2 TSX sites, first t/components/blog/post.tsx:35 |
| `brandGrid` | DEAD | - | 1 TSX site, first t/pages/brands.tsx:30 |
| `breadcrumb` | DEAD | - | 2 TSX sites, first t/components/common/breadcrumbs.tsx:26 |
| `breadcrumb-label` | DEAD | - | 2 TSX sites, first t/components/common/breadcrumbs.tsx:28 |
| `breadcrumbs` | DEAD | - | 1 TSX site, first t/components/common/breadcrumbs.tsx:16 |
| `btn` | DEAD | - | 1 TSX site, first t/components/cart/item-options.tsx:14 |
| `btn-success` | DEAD | - | 1 TSX site, first t/components/cart/item-options.tsx:14 |
| `button--action` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:116 |
| `button-container` | DEAD | - | 1 TSX site, first t/components/common/alert/alert-modal.tsx:22 |
| `card--alternate` | DEAD | - | 2 TSX sites, first t/components/products/card.tsx:54 |
| `card-figcaption` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:120 |
| `card-figcaption-body` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:126 |
| `card-figcaption-button` | DEAD | - | 12 TSX sites, first t/components/products/card.tsx:116 |
| `card-figure` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:114 |
| `card-figure__link` | DEAD | - | 5 TSX sites, first t/components/products/card.tsx:97 |
| `card-img-container` | DEAD | - | 5 TSX sites, first t/components/products/card.tsx:101 |
| `carousel-play-pause-button` | DEAD | - | 1 TSX site, first t/components/carousel-play-pause-button.tsx:11 |
| `cart-actions` | DEAD | - | 3 TSX sites, first t/pages/cart.tsx:65 |
| `cart-additionalCheckoutButtons` | DEAD | - | 1 TSX site, first t/pages/cart.tsx:102 |
| `cart-coupon-display` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:44 |
| `cart-coupon-item` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:49 |
| `cart-coupon-limit` | DEAD | - | 2 TSX sites, first t/components/cart/totals.tsx:138 |
| `cart-coupon-link` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:15 |
| `cart-coupon-list` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:45 |
| `cart-coupon-name` | DEAD | - | 5 TSX sites, first t/components/cart/coupons.tsx:58 |
| `cart-coupon-remove` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:64 |
| `cart-coupon-trigger` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:14 |
| `cart-coupons` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:13 |
| `cart-discount-item` | DEAD | - | 3 TSX sites, first t/components/cart/totals.tsx:126 |
| `cart-discount-item-label` | DEAD | - | 3 TSX sites, first t/components/cart/totals.tsx:127 |
| `cart-discount-item-value` | DEAD | - | 3 TSX sites, first t/components/cart/totals.tsx:145 |
| `cart-discount-list` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:122 |
| `cart-form` | DEAD | - | 3 TSX sites, first t/components/cart/coupon-input.tsx:31 |
| `cart-item-backorder-message` | DEAD | - | 7 TSX sites, first t/components/cart/content.tsx:260 |
| `cart-item-fixed-image` | DEAD | - | 1 TSX site, first t/components/cart/content.tsx:98 |
| `cart-item-option-actions` | DEAD | - | 1 TSX site, first t/components/cart/item-giftwrap.tsx:19 |
| `cart-item-option-description` | DEAD | - | 4 TSX sites, first t/components/cart/content.tsx:185 |
| `cart-item-option-stock` | DEAD | - | 1 TSX site, first t/components/cart/content.tsx:316 |
| `cart-item-option-title` | DEAD | - | 3 TSX sites, first t/components/cart/content.tsx:183 |
| `cart-item-options` | DEAD | - | 2 TSX sites, first t/components/cart/content.tsx:182 |
| `cart-item-options--giftWrapping` | DEAD | - | 1 TSX site, first t/components/cart/item-giftwrap.tsx:9 |
| `cart-savings-amount` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:454 |
| `cart-shipping-expectation-message` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:289 |
| `cart-total-amount` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:449 |
| `cart-total-discounts` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:108 |
| `cart-total-gift-certificate-list-item` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:416 |
| `cart-total-grandTotal` | DEAD | - | 2 TSX sites, first t/components/cart/totals.tsx:448 |
| `cart-total-label` | DEAD | - | 15 TSX sites, first t/components/cart/totals.tsx:92 |
| `cart-total-savings` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:453 |
| `cart-total-value` | DEAD | - | 14 TSX sites, first t/components/cart/coupon-input.tsx:8 |
| `cart-total-with-savings` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:438 |
| `cart-totals` | DEAD | - | 1 TSX site, first t/components/cart/totals.tsx:90 |
| `category-header-image` | DEAD | - | 1 TSX site, first t/pages/category.tsx:59 |
| `category-suggestion` | DEAD | - | 1 TSX site, first t/pages/search.tsx:215 |
| `category-suggestion-list` | DEAD | - | 1 TSX site, first t/pages/search.tsx:211 |
| `checkoutHeader` | DEAD | - | 2 TSX sites, first t/pages/checkout.tsx:38 |
| `checkoutHeader-content` | DEAD | - | 2 TSX sites, first t/pages/checkout.tsx:39 |
| `checkoutHeader-heading` | DEAD | - | 2 TSX sites, first t/pages/checkout.tsx:43 |
| `checkoutHeader-link` | DEAD | - | 2 TSX sites, first t/pages/checkout.tsx:44 |
| `checkoutHeader-logo` | DEAD | - | 2 TSX sites, first t/pages/checkout.tsx:50 |
| `checkoutMultiple` | DEAD | - | 1 TSX site, first t/pages/cart.tsx:78 |
| `collapsible-icon-wrapper` | DEAD | - | 2 TSX sites, first t/components/common/navigation-list.tsx:70 |
| `compareTable` | DEAD | - | 1 TSX site, first t/pages/compare.tsx:54 |
| `compareTable-action` | DEAD | - | 1 TSX site, first t/pages/compare.tsx:115 |
| `compareTable-heading` | DEAD | - | 6 TSX sites, first t/pages/compare.tsx:56 |
| `compareTable-headingText` | DEAD | - | 4 TSX sites, first t/pages/compare.tsx:176 |
| `compareTable-item` | DEAD | - | 4 TSX sites, first t/pages/compare.tsx:183 |
| `compareTable-product` | DEAD | - | 1 TSX site, first t/pages/compare.tsx:60 |
| `compareTable-removeProduct` | DEAD | - | 1 TSX site, first t/pages/compare.tsx:74 |
| `compareTable-row` | DEAD | - | 6 TSX sites, first t/pages/compare.tsx:55 |
| `countPill--alt` | DEAD | - | 2 TSX sites, first t/components/common/navigation-menu.tsx:167 |
| `coupon-code-form` | DEAD | - | 1 TSX site, first t/components/cart/coupons.tsx:20 |
| `definitionList-description` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-return.tsx:68 |
| `definitionList-label` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-return.tsx:67 |
| `dropdown--quickSearch` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:144 |
| `dropdown-menu-item` | DEAD | - | 3 TSX sites, first t/components/common/channel-selector.tsx:42 |
| `estimator-form-input` | DEAD | - | 6 TSX sites, first t/components/cart/shipping-estimator.tsx:58 |
| `estimator-form-input--price` | DEAD | - | 2 TSX sites, first t/components/cart/shipping-quotes.tsx:51 |
| `estimator-form-label` | DEAD | - | 6 TSX sites, first t/components/cart/shipping-estimator.tsx:52 |
| `estimator-form-label-text` | DEAD | - | 2 TSX sites, first t/components/cart/shipping-quotes.tsx:47 |
| `estimator-form-row` | DEAD | - | 2 TSX sites, first t/components/cart/shipping-quotes.tsx:37 |
| `facet-quick-heading` | DEAD | - | 1 TSX site, first t/components/faceted-search/show-more-facets.tsx:21 |
| `facetedSearch-optionColumns` | DEAD | - | 1 TSX site, first t/components/faceted-search/show-more-facets.tsx:31 |
| `facetedSearch-refineFilters` | DEAD | - | 1 TSX site, first t/components/faceted-search/selected-facets.tsx:12 |
| `facetedSearch-toggle-indicator` | DEAD | - | 1 TSX site, first t/components/faceted-search/index.tsx:39 |
| `facetedSearch-toggle-text` | DEAD | - | 1 TSX site, first t/components/faceted-search/index.tsx:17 |
| `facetLabel` | DEAD | - | 1 TSX site, first t/components/faceted-search/selected-facets.tsx:25 |
| `footer` | DEAD | - | 1 TSX site, first t/components/common/footer.tsx:63 |
| `footer-copyright` | DEAD | - | 2 TSX sites, first t/components/common/footer.tsx:201 |
| `footer-info` | DEAD | - | 1 TSX site, first t/components/common/footer.tsx:103 |
| `footer-info-col` | DEAD | - | 7 TSX sites, first t/components/common/footer.tsx:79 |
| `footer-info-col--left` | DEAD | - | 1 TSX site, first t/components/common/footer.tsx:79 |
| `footer-info-col--right` | DEAD | - | 1 TSX site, first t/components/common/footer.tsx:90 |
| `footer-info-col--small` | DEAD | - | 4 TSX sites, first t/components/common/footer.tsx:104 |
| `footer-info-col--social` | DEAD | - | 2 TSX sites, first t/components/common/footer.tsx:79 |
| `footer-info-heading` | DEAD | - | 7 TSX sites, first t/components/common/footer.tsx:82 |
| `footer-info-list` | DEAD | - | 3 TSX sites, first t/components/common/footer.tsx:108 |
| `footer-newsletter-summary` | DEAD | - | 1 TSX site, first t/components/common/subscription-form.tsx:44 |
| `footer-payment-icon` | DEAD | - | 1 TSX site, first t/components/common/payment-icons.tsx:31 |
| `footer-payment-icons` | DEAD | - | 1 TSX site, first t/components/common/payment-icons.tsx:25 |
| `footer-title-sr-only` | DEAD | - | 1 TSX site, first t/components/common/footer.tsx:64 |
| `forgot-password` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/auth/login.tsx:43 |
| `form--hiddenLabels` | DEAD | - | 3 TSX sites, first t/components/cart/coupon-input.tsx:35 |
| `form--oneField` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/gift-certificate/balance.tsx:44 |
| `form-action` | DEAD | - | 2 TSX sites, first t/components/common/wishlist-dropdown.tsx:13 |
| `form-actions` | DEAD | - | 18 TSX sites, first t/components/account/add-wishlist.tsx:68 |
| `form-column` | DEAD | - | 4 TSX sites, first t/components/search/advanced-search.tsx:26 |
| `form-field-group` | DEAD | - | 2 TSX sites, first t/components/search/advanced-search.tsx:72 |
| `form-file` | DEAD | - | 1 TSX site, first t/components/products/options/input-file.tsx:14 |
| `form-fileDescription` | DEAD | - | 1 TSX site, first t/components/products/options/input-file.tsx:33 |
| `form-input--small` | DEAD | - | 3 TSX sites, first t/components/faceted-search/range-form.tsx:20 |
| `form-minMaxRow` | DEAD | - | 1 TSX site, first t/components/faceted-search/range-form.tsx:14 |
| `form-option-active-copy` | DEAD | - | 1 TSX site, first t/components/products/options/swatch.tsx:149 |
| `form-option-image` | DEAD | - | 1 TSX site, first t/components/products/options/swatch.tsx:141 |
| `form-option-variant--none` | DEAD | - | 1 TSX site, first t/components/products/options/swatch.tsx:115 |
| `form-prefixPostfix` | DEAD | - | 4 TSX sites, first t/components/common/search-box.tsx:13 |
| `form-prefixPostfix--centeredColumn` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/auth/forgot-password.tsx:27 |
| `form-row` | DEAD | - | 14 TSX sites, first t/components/account/edit-account.tsx:13 |
| `form-row--half` | DEAD | - | 9 TSX sites, first t/components/account/edit-account.tsx:13 |
| `form-row--third` | DEAD | - | 1 TSX site, first t/components/common/forms/date.tsx:14 |
| `form-select--date` | DEAD | - | 3 TSX sites, first t/components/products/options/date.tsx:20 |
| `form-select--short` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-return.tsx:84 |
| `form-select--small` | DEAD | - | 4 TSX sites, first t/components/category/sort-box.tsx:12 |
| `form-wishlist` | DEAD | - | 1 TSX site, first t/components/common/wishlist-dropdown.tsx:13 |
| `full` | DEAD | - | 1 TSX site, first t/pages/home.tsx:81 |
| `gift-certificate-form` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/gift-certificate/purchase.tsx:36 |
| `giftWrapping-form` | DEAD | - | 1 TSX site, first t/components/cart/modals/gift-wrapping-form.tsx:37 |
| `giftWrapping-image-all` | DEAD | - | 1 TSX site, first t/components/cart/modals/gift-wrapping-form.tsx:76 |
| `has-dropdown` | DEAD | - | 3 TSX sites, first t/components/common/channel-selector.tsx:23 |
| `has-jsContent` | DEAD | - | 2 TSX sites, first t/components/products/tabs.tsx:47 |
| `has-subMenu` | DEAD | - | 8 TSX sites, first src/server/navParts.tsx:81 |
| `header-logo__link` | DEAD | - | 1 TSX site, first t/components/common/store-logo.tsx:6 |
| `header-logo-image-container` | DEAD | - | 2 TSX sites, first t/components/common/store-logo.tsx:23 |
| `header-logo-image-unknown-size` | DEAD | - | 2 TSX sites, first t/components/common/store-logo.tsx:16 |
| `heading-price` | DEAD | - | 1 TSX site, first t/components/category/shop-by-price.tsx:14 |
| `heroCarousel-content--empty` | DEAD | - | 1 TSX site, first t/components/carousel-content.tsx:42 |
| `icon--ratingEmpty` | DEAD | - | 1 TSX site, first t/components/products/ratings.tsx:43 |
| `icon--ratingFull` | DEAD | - | 1 TSX site, first t/components/products/ratings.tsx:42 |
| `icon--x` | DEAD | - | 2 TSX sites, first t/components/common/share.tsx:93 |
| `icon-content` | DEAD | - | 2 TSX sites, first t/components/common/alert/alert-modal.tsx:10 |
| `icons-svg-sprite` | DEAD | - | 1 TSX site, first t/layout/base.tsx:98 |
| `inlineList` | DEAD | - | 1 TSX site, first t/components/faceted-search/selected-facets.tsx:20 |
| `inlineList--labels` | DEAD | - | 1 TSX site, first t/components/faceted-search/selected-facets.tsx:20 |
| `InvoiceComments` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 1 TSX site, first t/pages/account/orders/invoice.tsx:457 |
| `is-root` | DEAD | - | 2 TSX sites, first src/server/navParts.tsx:147 |
| `line` | DEAD | - | 2 TSX sites, first t/components/common/alert/alert-modal.tsx:11 |
| `line-left` | DEAD | - | 1 TSX site, first t/components/common/alert/alert-modal.tsx:11 |
| `line-right` | DEAD | - | 1 TSX site, first t/components/common/alert/alert-modal.tsx:12 |
| `listItem` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:47 |
| `listItem-actions` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:132 |
| `listItem-body` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:110 |
| `listItem-brand` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:123 |
| `listItem-button` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:101 |
| `listItem-content` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:111 |
| `listItem-details` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:112 |
| `listItem-figure` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:57 |
| `listItem-figure__link` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:60 |
| `listItem-price` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:137 |
| `listItem-rating` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:116 |
| `listItem-title` | DEAD | - | 1 TSX site, first t/components/products/list-item.tsx:125 |
| `login-row` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/auth/login.tsx:25 |
| `main` | DEAD | - | 1 TSX site, first t/pages/home.tsx:81 |
| `manual-captcha-input-container` | DEAD | - | 1 TSX site, first t/components/page/contact-us-form.tsx:111 |
| `methodActions-button` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/payment-methods-list.tsx:278 |
| `methodDetails` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:249 |
| `methodDetails-description` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:253 |
| `methodDetails-label` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:250 |
| `methodHeader` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:62 |
| `methodHeader-brand` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 7 TSX sites, first t/components/account/payment-methods-list.tsx:86 |
| `methodHeader-default` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:236 |
| `methodHeader-expiry` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:224 |
| `methodHeader-icon` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 7 TSX sites, first t/components/account/payment-methods-list.tsx:79 |
| `methodHeader-meta` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:220 |
| `mobileMenu-toggleIcon` | DEAD | - | 1 TSX site, first t/components/common/header.tsx:48 |
| `nav` | DEAD | - | 1 TSX site, first t/pages/search.tsx:81 |
| `navBar` | DEAD | - | 5 TSX sites, first t/components/account/navigation.tsx:6 |
| `navBar--sub` | DEAD | - | 5 TSX sites, first t/components/account/navigation.tsx:6 |
| `navBar-section` | DEAD | - | 5 TSX sites, first t/components/account/navigation.tsx:7 |
| `navList--inner` | DEAD | - | 1 TSX site, first t/components/faceted-search/facets/hierarchy-children.tsx:18 |
| `navList-action-close` | DEAD | - | 1 TSX site, first t/components/faceted-search/facets/multi.tsx:48 |
| `navPage-childList` | DEAD | - | 1 TSX site, first t/components/common/navigation-list.tsx:99 |
| `navPage-childList-action` | DEAD | - | 2 TSX sites, first src/server/navParts.tsx:114 |
| `navPage-subMenu` | DEAD | - | 6 TSX sites, first t/components/common/channel-selector-mobile.tsx:40 |
| `navPage-subMenu-action` | DEAD | - | 8 TSX sites, first src/server/navParts.tsx:92 |
| `navPage-subMenu-item-child` | DEAD | - | 1 TSX site, first t/components/common/navigation-dropdown.tsx:28 |
| `navPage-subMenu-item-parent` | DEAD | - | 1 TSX site, first t/components/common/navigation-dropdown.tsx:22 |
| `navPages-action--compare` | DEAD | - | 1 TSX site, first t/components/common/navigation-menu.tsx:165 |
| `navPages-action--storeCredit` | DEAD | - | 1 TSX site, first t/components/common/navigation-menu.tsx:153 |
| `navPages-action-depth-max` | DEAD | - | 4 TSX sites, first src/server/navParts.tsx:137 |
| `navPages-action-moreIcon` | DEAD | - | 5 TSX sites, first src/server/navParts.tsx:25 |
| `navPages-container` | DEAD | - | 1 TSX site, first t/components/common/header.tsx:67 |
| `navPages-item-page` | DEAD | - | 1 TSX site, first t/components/common/navigation-menu.tsx:66 |
| `navPages-list--user` | DEAD | - | 1 TSX site, first t/components/common/navigation-menu.tsx:91 |
| `navPages-quickSearch` | DEAD | - | 1 TSX site, first t/components/common/navigation-menu.tsx:83 |
| `navUser` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:14 |
| `navUser-action--channelSelector` | DEAD | - | 1 TSX site, first t/components/common/channel-selector.tsx:23 |
| `navUser-action--languageSelector` | DEAD | - | 1 TSX site, first t/components/common/language-selector.tsx:16 |
| `navUser-action--quickSearch` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:67 |
| `navUser-action-divider` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:35 |
| `navUser-item` | DEAD | - | 11 TSX sites, first t/components/common/channel-selector.tsx:20 |
| `navUser-item--account` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:87 |
| `navUser-item--cart` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:126 |
| `navUser-item--compare` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:48 |
| `navUser-item--divider` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:61 |
| `navUser-item--social` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:60 |
| `navUser-item-cartLabel` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:135 |
| `navUser-section--alt` | DEAD | - | 1 TSX site, first t/components/common/navigation.tsx:21 |
| `new-customer` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/auth/login.tsx:51 |
| `newPaymentMethod` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:303 |
| `newPaymentMethod-icon` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:304 |
| `newPaymentMethod-title` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:305 |
| `order-details-info` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/details.tsx:379 |
| `order-payments-description` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/details.tsx:188 |
| `order-payments-value` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/details.tsx:191 |
| `order-payments-value--long` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/details.tsx:191 |
| `orders` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/completed.tsx:20 |
| `orders-row` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/orders/completed.tsx:19 |
| `page-content--textCenter` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/auth/account-created.tsx:9 |
| `page-region` | DEAD | - | 1 TSX site, first t/pages/category.tsx:84 |
| `pagination-item` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:150 |
| `pagination-item--current` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:150 |
| `pagination-list--small` | DEAD | - | 1 TSX site, first t/components/common/small-paginator.tsx:14 |
| `panel` | DEAD | - | 2 TSX sites, first t/components/account/address-list.tsx:85 |
| `panel--address` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/address-list.tsx:34 |
| `panel--large` | DEAD | - | 1 TSX site, first t/pages/search.tsx:172 |
| `panel--newAddress` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/address-list.tsx:85 |
| `panel-body` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:101 |
| `panel-header` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:83 |
| `panel-title` | DEAD | - | 1 TSX site, first src/server/componentParts.tsx:91 |
| `paymentMethod` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/payment-methods-list.tsx:60 |
| `paymentMethod-row` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 4 TSX sites, first t/components/account/payment-methods-list.tsx:61 |
| `paymentMethodForm` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-payment-method.tsx:81 |
| `paymentMethodForm-cards` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-payment-method.tsx:84 |
| `paymentMethodForm-cards-icon` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-payment-method.tsx:89 |
| `paymentMethodForm-column` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-payment-method.tsx:99 |
| `paymentMethodForm-details` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/edit-payment-method.tsx:50 |
| `paymentMethodForm-details-description` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/edit-payment-method.tsx:54 |
| `paymentMethodForm-details-term` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/edit-payment-method.tsx:51 |
| `paymentMethodForm-heading` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 5 TSX sites, first t/pages/account/add-payment-method.tsx:78 |
| `paymentMethodForm-inputs` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 4 TSX sites, first t/pages/account/add-payment-method.tsx:100 |
| `paymentMethodForm-inputs-icon` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-payment-method.tsx:102 |
| `paymentMethodForm-subheading` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-payment-method.tsx:82 |
| `paymentMethodsGrid` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:55 |
| `paymentMethodsGrid-item` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/payment-methods-list.tsx:59 |
| `paymentMethodsTitle` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/payment-methods-list.tsx:53 |
| `previewCart` | DEAD | - | 2 TSX sites, first t/components/cart/preview.tsx:28 |
| `previewCart-emptyBody` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:146 |
| `previewCartAction` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:99 |
| `previewCartAction-checkout` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:103 |
| `previewCartAction-checkoutMultiple` | DEAD | - | 2 TSX sites, first t/components/cart/preview.tsx:46 |
| `previewCartCheckout-additionalCheckoutButtons` | DEAD | - | 1 TSX site, first t/components/cart/preview.tsx:39 |
| `previewCartCheckout-price` | DEAD | - | 1 TSX site, first t/components/cart/preview.tsx:56 |
| `previewCartCheckout-subtotal` | DEAD | - | 1 TSX site, first t/components/cart/preview.tsx:54 |
| `previewCartItem-brand` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:64 |
| `previewCartItem-content` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:63 |
| `previewCartItem-image` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:46 |
| `previewCartItem-name` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:66 |
| `previewCartItem-price` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:72 |
| `previewCartWrapper` | DEAD | - | 1 TSX site, first t/components/common/cart-preview.tsx:35 |
| `price--non-sale` | DEAD | - | 4 TSX sites, first t/components/products/price-range.tsx:72 |
| `price--saving` | DEAD | - | 2 TSX sites, first t/components/products/price-range.tsx:175 |
| `price-section` | DEAD | - | 16 TSX sites, first t/components/products/price-range.tsx:43 |
| `price-section--withoutTax` | DEAD | - | 7 TSX sites, first t/components/products/price-range.tsx:102 |
| `price-section--withTax` | DEAD | - | 7 TSX sites, first t/components/products/price-range.tsx:43 |
| `product-brand` | DEAD | - | 1 TSX site, first t/components/products/modals/writeReview.tsx:29 |
| `product-card` | DEAD | - | 1 TSX site, first t/components/products/related.tsx:15 |
| `product-data` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:231 |
| `product-options` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:512 |
| `product-status-message` | DEAD | - | 3 TSX sites, first t/components/products/add-to-cart.tsx:122 |
| `product-title` | DEAD | - | 1 TSX site, first t/components/products/modals/writeReview.tsx:30 |
| `ProductAddress` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 2 TSX sites, first t/pages/account/orders/invoice.tsx:283 |
| `ProductAttributes` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 1 TSX site, first t/pages/account/orders/invoice.tsx:363 |
| `productCarousel` | DEAD | - | 1 TSX site, first t/components/products/carousel.tsx:10 |
| `productCarousel-slide` | DEAD | - | 1 TSX site, first t/components/products/carousel.tsx:19 |
| `ProductConfigurableFields` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 1 TSX site, first t/pages/account/orders/invoice.tsx:375 |
| `ProductDetails` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 2 TSX sites, first t/pages/account/orders/invoice.tsx:294 |
| `ProductEventDate` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 1 TSX site, first t/pages/account/orders/invoice.tsx:394 |
| `ProductGiftWrapping` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 1 TSX site, first t/pages/account/orders/invoice.tsx:389 |
| `productList` | DEAD | - | 1 TSX site, first t/components/products/list.tsx:7 |
| `productOptions-list` | DEAD | - | 1 TSX site, first t/components/products/options/product-list.tsx:29 |
| `productOptions-list-item-content` | DEAD | - | 1 TSX site, first t/components/products/options/product-list.tsx:60 |
| `productOptions-list-item-figure` | DEAD | - | 1 TSX site, first t/components/products/options/product-list.tsx:55 |
| `productOptions-list-item-image` | DEAD | - | 1 TSX site, first t/components/products/options/product-list.tsx:56 |
| `productReview` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:42 |
| `productReview-author` | DEAD | - | 2 TSX sites, first t/components/products/reviews.tsx:53 |
| `productReview-body` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:73 |
| `productReview-rating` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:45 |
| `productReview-ratingNumber` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:47 |
| `productReview-title` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:49 |
| `productReviews` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:20 |
| `productReviews-list` | DEAD | - | 1 TSX site, first t/components/products/reviews.tsx:38 |
| `ProductSku` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 2 TSX sites, first t/pages/account/orders/invoice.tsx:291 |
| `productView-backorder-availability-prompt` | DEAD | - | 2 TSX sites, first t/components/products/product-view.tsx:555 |
| `productView-brand` | DEAD | - | 2 TSX sites, first t/components/cart/preview.tsx:88 |
| `productView-description` | DEAD | - | 3 TSX sites, first t/components/products/description.tsx:17 |
| `productView-image--default` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:191 |
| `productView-img-container` | DEAD | - | 2 TSX sites, first t/components/cart/preview.tsx:80 |
| `productView-options` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:513 |
| `productView-product` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:232 |
| `productView-rating` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:262 |
| `productView-reviewLink` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:292 |
| `productView-reviewLink--new` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:292 |
| `productView-stock-message` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:548 |
| `productView-thumbnail` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:213 |
| `productView-thumbnail-link` | DEAD | - | 1 TSX site, first t/components/products/product-view.tsx:215 |
| `promotionCallout` | DEAD | - | 2 TSX sites, first t/components/products/promotion-callout.tsx:18 |
| `promotionCallout--compact` | DEAD | - | 1 TSX site, first t/components/products/promotion-callout.tsx:18 |
| `promotionCallout--full` | DEAD | - | 1 TSX site, first t/components/products/promotion-callout.tsx:34 |
| `promotionCallout-more` | DEAD | - | 1 TSX site, first t/components/products/promotion-callout.tsx:24 |
| `promotionCallout-text` | DEAD | - | 2 TSX sites, first t/components/products/promotion-callout.tsx:20 |
| `question` | DEAD | - | 1 TSX site, first t/components/page/contact-us-form.tsx:112 |
| `rating--small` | DEAD | - | 4 TSX sites, first t/components/faceted-search/facets/rating.tsx:37 |
| `return-itemName` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-return.tsx:41 |
| `return-itemPrice` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-return.tsx:44 |
| `return-itemQuantity` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/pages/account/add-return.tsx:47 |
| `return-itemTitle` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/add-return.tsx:58 |
| `search-nav` | DEAD | - | 1 TSX site, first t/pages/search.tsx:88 |
| `search-price-range` | DEAD | - | 1 TSX site, first t/components/search/advanced-search.tsx:91 |
| `search-refine` | DEAD | - | 1 TSX site, first t/pages/search.tsx:181 |
| `search-suggestion` | DEAD | - | 5 TSX sites, first t/pages/search.tsx:178 |
| `secondary` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/address-list.tsx:74 |
| `share-wishlist` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/pages/account/wishlist-details.tsx:36 |
| `shipping-estimate-value` | DEAD | - | 1 TSX site, first t/components/cart/shipping-estimator.tsx:31 |
| `sidebarBlock-heading` | DEAD | - | 4 TSX sites, first t/components/brand/sidebar.tsx:22 |
| `skip-to-main-link` | DEAD | - | 1 TSX site, first t/components/common/header.tsx:21 |
| `socialLinks` | DEAD | - | 2 TSX sites, first t/components/common/share.tsx:28 |
| `socialLinks--alt` | DEAD | - | 1 TSX site, first t/components/common/social-links.tsx:15 |
| `starwrap` | DEAD | - | 1 TSX site, first t/components/products/product-badge.tsx:40 |
| `stretch` | DEAD | - | 3 TSX sites, first t/components/carousel.tsx:57 |
| `subtotal` | DEAD | - | 1 TSX site, first t/components/cart/shipping-estimator.tsx:21 |
| `suggestion-title` | DEAD | - | 3 TSX sites, first t/pages/search.tsx:208 |
| `suggestiveCart` | DEAD | - | 1 TSX site, first t/components/cart/preview.tsx:113 |
| `table--line` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/wishlist-list.tsx:20 |
| `table-actions` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/wishlist-list.tsx:53 |
| `table-tbody` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/wishlist-list.tsx:37 |
| `table-thead` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 2 TSX sites, first t/components/account/wishlist-list.tsx:21 |
| `tag` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:95 |
| `tags` | DEAD | - | 1 TSX site, first t/components/blog/post.tsx:91 |
| `Title` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 2 TSX sites, first t/pages/account/orders/invoice.tsx:430 |
| `toggle-content` | DEAD | - | 3 TSX sites, first t/components/products/reviews.tsx:37 |
| `toggle-title` | DEAD | - | 2 TSX sites, first t/components/products/reviews.tsx:21 |
| `toggleLink-text` | DEAD | - | 14 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:20 |
| `toggleLink-text--off` | DEAD | - | 8 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:20 |
| `toggleLink-text--on` | DEAD | - | 6 TSX sites, first t/components/faceted-search/faceted-search-navigation.tsx:23 |
| `Total` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; invoice.tsx print entry; 1 TSX site, first t/pages/account/orders/invoice.tsx:435 |
| `videoGallery` | DEAD | - | 1 TSX site, first t/components/products/videos.tsx:12 |
| `videoGallery-item` | DEAD | - | 1 TSX site, first t/components/products/videos.tsx:43 |
| `videoGallery-list` | DEAD | - | 1 TSX site, first t/components/products/videos.tsx:39 |
| `videoGallery-main` | DEAD | - | 1 TSX site, first t/components/products/videos.tsx:26 |
| `widescreen` | DEAD | - | 1 TSX site, first t/components/products/videos.tsx:26 |
| `wishlist-add` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/add-wishlist.tsx:10 |
| `wishlist-header` | DEAD | - | only on signed-in/auth/invoice pages: store CSS there not observable; 1 TSX site, first t/components/account/add-wishlist.tsx:11 |
| `wrap` | DEAD | - | 4 TSX sites, first t/components/common/search-box.tsx:13 |
| `writeReview-productDetails` | DEAD | - | 1 TSX site, first t/components/products/modals/writeReview.tsx:25 |
| `writeReview-productImage-container` | DEAD | - | 1 TSX site, first t/components/products/modals/writeReview.tsx:26 |
