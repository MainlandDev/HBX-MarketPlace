# Tailwind conversion progress

Plan: `docs/superpowers/plans/2026-11-24-tailwind-programme.md` (task numbers below). Regenerate the live numbers with `npm run tw-inventory`.
Status: `todo`, `done`, or `blocked: <reason>` (login or live-cart state needed: skipped and reported, never worked around). Update the row in the same change as the conversion.

Start: 126 non-empty partials, 6550 lines (components + layouts + common), measured 2026-11-24.

| Task | Partial (under `assets/scss/`) | Lines at start | Status | Notes |
| --- | --- | ---: | --- | --- |
| 4 | `components/stencil/cart/_cart.scss` | 792 | blocked: needs a cart with items; adding to the live store's cart is not done without the user's say | |
| 5 | `components/stencil/productView/_productView.scss` | 376 | todo | |
| 5 | `components/stencil/productView/_component.scss` | 1 | todo | |
| 6 | `components/stencil/navPages/_navPages.scss` | 362 | todo | |
| 6 | `components/stencil/navPages/_component.scss` | 1 | todo | |
| 7 | `components/stencil/account/_account.scss` | 336 | blocked: account pages need the user to sign in in Edge | |
| 7 | `components/stencil/account/_component.scss` | 1 | todo | |
| 8 | `components/citadel/forms/_forms.scss` | 306 | todo | |
| 8 | `components/citadel/forms/_component.scss` | 1 | todo | |
| 9 | `components/stencil/navUser/_navUser.scss` | 274 | todo | |
| 9 | `components/stencil/navUser/_component.scss` | 1 | todo | |
| 10 | `layouts/header/_header.scss` | 210 | todo | |
| 11 | `components/vendor/slick/_slick.scss` | 203 | todo | |
| 11 | `components/vendor/slick/_tools.scss` | 15 | todo | |
| 11 | `components/vendor/slick/_component.scss` | 4 | todo | |
| 12 | `components/stencil/paymentMethods/_paymentMethods.scss` | 198 | todo | |
| 12 | `components/stencil/paymentMethods/_component.scss` | 1 | todo | |
| 13 | `components/stencil/heroCarousel/_heroCarousel.scss` | 181 | todo | |
| 13 | `components/stencil/heroCarousel/_component.scss` | 1 | todo | |
| 14 | `components/foundation/modal/_modal.scss` | 179 | todo | |
| 14 | `components/foundation/modal/_component.scss` | 1 | todo | |
| 15 | `layouts/products/_productList.scss` | 177 | todo | |
| 16 | `layouts/products/_productSaleBadges.scss` | 158 | todo | |
| 17 | `layouts/footer/_footer.scss` | 131 | todo | |
| 18 | `components/citadel/cards/_cards.scss` | 120 | todo | |
| 18 | `components/citadel/cards/_component.scss` | 1 | todo | |
| 19 | `components/foundation/dropdown/_dropdown.scss` | 116 | todo | |
| 19 | `components/foundation/dropdown/_component.scss` | 1 | todo | |
| 20 | `components/foundation/accordion/_accordion.scss` | 112 | todo | |
| 20 | `components/foundation/accordion/_component.scss` | 1 | todo | |
| 21 | `components/stencil/addReturn/_addReturn.scss` | 103 | todo | |
| 21 | `components/stencil/addressBox/_addressBox.scss` | 99 | todo | |
| 21 | `components/stencil/addressBox/_component.scss` | 1 | todo | |
| 21 | `components/stencil/addReturn/_component.scss` | 1 | todo | |
| 22 | `components/citadel/nav/_nav.scss` | 91 | todo | |
| 22 | `components/foundation/tables/_tables.scss` | 85 | todo | |
| 22 | `components/foundation/tables/_component.scss` | 1 | todo | |
| 23 | `components/stencil/compare/_compare.scss` | 83 | todo | |
| 23 | `layouts/products/_productGrid.scss` | 83 | todo | |
| 23 | `components/stencil/compare/_component.scss` | 1 | todo | |
| 24 | `components/stencil/facetedSearch/_facetedSearch.scss` | 82 | todo | |
| 24 | `components/stencil/previewCart/_previewCart.scss` | 81 | todo | |
| 24 | `components/stencil/facetedSearch/_component.scss` | 1 | todo | |
| 24 | `components/stencil/previewCart/_component.scss` | 1 | todo | |
| 25 | `components/foundation/pagination/_pagination.scss` | 79 | todo | |
| 25 | `components/stencil/search/_search.scss` | 74 | todo | |
| 25 | `components/foundation/pagination/_component.scss` | 1 | todo | |
| 26 | `layouts/products/_variantSelector.scss` | 128 | todo | |
| 26 | `layouts/blog/_blog.scss` | 72 | todo | |
| 26 | `layouts/products/_productView.scss` | 67 | todo | |
| 26 | `layouts/account/_account.scss` | 55 | todo | |
| 26 | `layouts/body/_body.scss` | 45 | todo | |
| 26 | `layouts/products/_productSwatch.scss` | 45 | todo | |
| 26 | `layouts/products/_promotionCallout.scss` | 45 | todo | |
| 26 | `layouts/brands/_brandGrid.scss` | 21 | todo | |
| 26 | `layouts/sidebar/_block.scss` | 17 | todo | |
| 26 | `layouts/brands/_brand.scss` | 14 | todo | |
| 26 | `layouts/container/_container.scss` | 11 | todo | |
| 27 | `components/foundation/tabs/_tabs.scss` | 62 | todo | |
| 27 | `components/foundation/type/_type.scss` | 58 | todo | |
| 27 | `components/foundation/breadcrumbs/_breadcrumbs.scss` | 28 | todo | |
| 27 | `components/foundation/lazyLoad/_lazyLoad.scss` | 28 | todo | |
| 27 | `components/foundation/forms/_forms.scss` | 26 | todo | |
| 27 | `components/foundation/global/_global.scss` | 24 | todo | |
| 27 | `components/foundation/alerts/_alerts.scss` | 18 | todo | |
| 27 | `components/foundation/buttons/_buttons.scss` | 18 | todo | |
| 27 | `components/foundation/inlineList/_inlineList.scss` | 12 | todo | |
| 27 | `components/foundation/panels/_panels.scss` | 9 | todo | |
| 27 | `components/foundation/alerts/_component.scss` | 1 | todo | |
| 27 | `components/foundation/breadcrumbs/_component.scss` | 1 | todo | |
| 27 | `components/foundation/buttons/_component.scss` | 1 | todo | |
| 27 | `components/foundation/forms/_component.scss` | 1 | todo | |
| 27 | `components/foundation/global/_component.scss` | 1 | todo | |
| 27 | `components/foundation/inlineList/_component.scss` | 1 | todo | |
| 27 | `components/foundation/lazyLoad/_component.scss` | 1 | todo | |
| 27 | `components/foundation/panels/_component.scss` | 1 | todo | |
| 27 | `components/foundation/tabs/_component.scss` | 1 | todo | |
| 27 | `components/foundation/type/_component.scss` | 1 | todo | |
| 28 | `components/stencil/socialLinks/_socialLinks.scss` | 54 | todo | |
| 28 | `components/stencil/videoGallery/_videoGallery.scss` | 47 | todo | |
| 28 | `components/stencil/toggleLink/_toggleLink.scss` | 43 | todo | |
| 28 | `components/stencil/productReviews/_productReviews.scss` | 33 | todo | |
| 28 | `components/stencil/writeReview/_writeReview.scss` | 27 | todo | |
| 28 | `components/stencil/productCarousel/_productCarousel.scss` | 26 | todo | |
| 28 | `components/stencil/productCarousel/_component.scss` | 1 | todo | |
| 28 | `components/stencil/productReviews/_component.scss` | 1 | todo | |
| 28 | `components/stencil/socialLinks/_component.scss` | 1 | todo | |
| 28 | `components/stencil/toggleLink/_component.scss` | 1 | todo | |
| 28 | `components/stencil/videoGallery/_component.scss` | 1 | todo | |
| 28 | `components/stencil/writeReview/_component.scss` | 1 | todo | |
| 29 | `components/stencil/_login.scss` | 32 | todo | |
| 29 | `components/stencil/_wishlists.scss` | 27 | todo | |
| 29 | `components/stencil/textTruncate/_textTruncate.scss` | 19 | todo | |
| 29 | `components/stencil/banners/_banners.scss` | 18 | todo | |
| 29 | `components/stencil/tags/_tags.scss` | 18 | todo | |
| 29 | `components/stencil/rating/_rating.scss` | 17 | todo | |
| 29 | `components/stencil/ribbon/_ribbon.scss` | 16 | todo | |
| 29 | `components/stencil/facetLabel/_facetLabel.scss` | 13 | todo | |
| 29 | `components/stencil/blocker/_blocker.scss` | 12 | todo | |
| 29 | `components/stencil/contact/_captcha.scss` | 11 | todo | |
| 29 | `components/stencil/price/_price.scss` | 8 | todo | |
| 29 | `components/stencil/category/_category.scss` | 3 | todo | |
| 29 | `components/stencil/quickView/_quickView.scss` | 3 | todo | |
| 29 | `components/stencil/banners/_component.scss` | 1 | todo | |
| 29 | `components/stencil/blocker/_component.scss` | 1 | todo | |
| 29 | `components/stencil/cart/_component.scss` | 1 | todo | |
| 29 | `components/stencil/category/_component.scss` | 1 | todo | |
| 29 | `components/stencil/contact/_component.scss` | 1 | todo | |
| 29 | `components/stencil/facetLabel/_component.scss` | 1 | todo | |
| 29 | `components/stencil/price/_component.scss` | 1 | todo | |
| 29 | `components/stencil/quickView/_component.scss` | 1 | todo | |
| 29 | `components/stencil/rating/_component.scss` | 1 | todo | |
| 29 | `components/stencil/ribbon/_component.scss` | 1 | todo | |
| 29 | `components/stencil/tags/_component.scss` | 1 | todo | |
| 29 | `components/stencil/textTruncate/_component.scss` | 1 | todo | |
| 30 | `common/_focus-tooltip.scss` | 34 | todo | |
| 30 | `components/citadel/actionBar/_actionBar.scss` | 32 | todo | |
| 30 | `common/_aria.scss` | 11 | todo | |
| 30 | `components/citadel/icons/_icons.scss` | 7 | todo | |
| 30 | `components/citadel/loading/_loading.scss` | 5 | todo | |
| 30 | `common/index.scss` | 2 | todo | |
| 30 | `components/citadel/actionBar/_component.scss` | 1 | todo | |
| 30 | `components/citadel/icons/_component.scss` | 1 | todo | |
| 30 | `components/citadel/loading/_component.scss` | 1 | todo | |
| 31 | `components/_components.scss` | 54 | todo | |
| 31 | `layouts/_layouts.scss` | 16 | todo | |

Tasks 32-34 (retire Citadel, Foundation, the temporary Tailwind settings) have no partial rows; track them in the plan.
