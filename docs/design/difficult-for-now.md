# Difficult for now

Things the Tailwind conversion could not finish or could not prove. They are isolated so the rest of the system can be treated as converted:

- **Code:** `assets/scss/tailwind/_difficult-for-now.scss` holds the plain-CSS rules that stay (the whole former `@layer components` block and the `@layer legacy` focus ring). `_tailwind.scss` pulls it in at the same point, so the compiled CSS is unchanged (verified: theme CSS from the dev server before and after, source map dropped, identical).
- **This file:** why each item is hard, how it was tested, and what would unblock it. Reasons per rule are also in `compat-verdicts.md`.

Nothing here is a regression. Every item matches the pre-conversion output where it could be tested.

## 1. Quarantined rules (`_difficult-for-now.scss`)

| Group | Why it is hard | Unblocked by |
|---|---|---|
| `.button` family (`--primary`, sizes, states, `+ .button`) | Merchant page content has bare `<a class="button">` that cannot carry utilities. | Merchant content using the `Button` helper, or the store no longer rendering bare buttons. |
| `.button` / `.form-input` radius, `.form-fieldset` padding | The store injects non-important `:not(#pseudoID)` rules on the same properties. An `important` utility would beat them. | Store stops injecting CSS, or `important` is dropped. |
| Inline-tabs widget (`.tabs`, `.tab`, `.tab-title`, `.tabs-contents`, `.tab-content`, `.no-js .tab-content`) | Merchant-injected markup that the store also styles. As utilities: `ul.tabs` 147px became 188px, height 30px became 62px. Reverted. | Same as above. |
| `div.container` | Injected on the account page; as utilities width 663px became 1284px. Reverted. | Same as above. |
| `.brand-image-container` max-width | Store injects `max-width: 200px`; an utility shrank the box to 100px. | Same as above. |
| `.form-option-variant--color/--pattern` size | Store injects sizes and backgrounds; swatch sizes changed with `important` off. | Same as above. |
| `a:hover`, `a:hover, a:focus`, `button:active, button:focus` | Element rules. In `base` they would lose to `.tab-title` (components beats base whatever the specificity). Not browser-tested in the other layer. | Tabs widget leaving `components`. |
| Global focus ring (`@layer legacy`) | Layered `!important`: the earlier layer wins, so it must be last to lose to `focus:outline-none` (8 uses). A utility would need a class on every control, including merchant markup. | Nothing short of a design change. |

Order matters: `.tab` and `.tab-title` appear twice, with the element rules between them. Do not reorder.

## 2. Routes tested (13 routes x 4 states = 52)

States: 375px, 768px, 1280px, 1280px with `no-js`. Method: computed style of 59 properties hashed over every element of `body`, in hidden same-origin iframes, signed in. Head is compared with the control `f4bf7937` (the commit before the Citadel/Tailwind cleanup), each served from its own git worktree.

| Key | Route |
|---|---|
| home | `/` |
| cat | `/fashion-biz/` |
| prod | `/p405ms-biz-collection/` |
| cart | `/cart.php` |
| search | `/search.php?search_query=polo` |
| brands | `/brands/` |
| orders | `/account.php?action=order_status` |
| order | `/account.php?action=view_order&order_id=141539` |
| addr | `/account.php?action=address_book` |
| wish | `/wishlist.php` |
| settings | `/account.php?action=account_details` |
| inbox | `/account.php?action=inbox` |
| contact | `/contact-us/` (the store returns "Not Found": this tests the 404 page, not a contact form) |

### Result at `fa06e110` (2026-11-26), one run each

**49 of 52 identical to the control.** Every route on every state except:

| State | What differs | Cause |
|---|---|---|
| prod, 768px | One extra element (`span`, 4th child of the quantity widget) | `assets/js/theme/common/product-details.js:343` injects an `aria-live` span at runtime; it was present in one run and not the other. Every theme-owned bucket is identical. Timing, not CSS. |
| cart, 1280px | One extra body-level `iframe` and shifted `script` positions | Third-party (PayPal) nodes appended to `body`. Every theme-owned bucket (header, main, footer) hashes identically. |
| cart, 1280px no-JS | Hash differs, 1303 vs 1304 elements | Same pattern as the 1280px state (one more node on one side), but not drilled per bucket. |

Earlier at `304fbd97` the cart 375/768/no-JS and brands no-JS states also differed run to run. At `fa06e110` brands matched in all 4 states and cart matched at 375 and 768, so those were the same noise.

Not covered: only one run per side at `fa06e110`, and per-element hashes (not a per-property diff). Two further quarantine checks run once: vitest 129/129, `check-bridge` up to date.

## 3. Not verifiable on the live store

Needs test data the store does not have. Never add to the cart or submit anything on the live store.

- Alert variants, modals (quick view, write review, cart preview), pagination prev/next.
- `wishlist-list` and `add-return` tables, returns list, completed orders, download items, backorder/discount/payment states.
- Most `form-actions` pages (they submit).
- Cart: estimator, gift certificate, coupon list, discounts.
- Product: promotion callouts, list view (needs `product_list_display_mode = list`), video gallery.
- `checkout`, `optimized-checkout`, `invoice`, `maintenance`: separate entry files (about 780 lines of SCSS), not part of the 52 routes.
- Facebook like iframe in `share.tsx` (renders only when the like button is enabled).

## 4. Noise to ignore when re-testing

- PayPal third-party frames on the cart page: nondeterministic.
- Lazy-loaded images on product and brands: element counts and hashes vary run to run.
- Zero-width border colours and sub-pixel `remCalc` widths (at most 0.013px).
- Do not re-run on a dirty tree or while another branch's changes are in the working tree: use a clean worktree of the commit under test.

## 5. Decisions still open

- Keep `important` and `source(none)`? (Both stay while the store injects CSS.)
- The 415 DEAD hook classes in `legacy-hooks.md`: remove none, remove those on theme-owned pages, or fetch more store CSS first.
- Whether the four entry files are in scope.
