# Tailwind programme: convert all remaining theme SCSS

Status: approved by the user's answers on 2026-11-24. Extends `2026-11-23-tailwind-conversion-design.md` (bridge, theme layer, playbook, variant selector pilot, all done).

## Intent

Replace every theme-owned SCSS rule in `assets/scss/components` and `assets/scss/layouts` with Tailwind utilities in the TSX markup, then retire the Citadel and Foundation CSS that the theme imports from `node_modules`. End state: `theme.scss` contains settings, the bridge, Tailwind, and nothing that styles markup.

## Decisions (from the user)

- **Scope:** theme SCSS first; Citadel/Foundation imports are removed last, only when no markup uses their classes (this reverses the earlier non-goal).
- **Bundles:** `theme.scss` only. `checkout.scss`, `optimized-checkout.scss`, `invoice.scss`, `maintenance.scss` are out.
- **Order:** biggest SCSS partial first (the user chose this over the safer page-by-page order).
- **Verification:** computed-style parity in the user's open Edge (the claude-in-chrome driver) at 375/768/1280 px plus no-JS, one commit per partial.

## Measured scale (non-empty, non-comment lines)

126 non-empty partials, about 6,500 lines in `components` + `layouts` (about 70 partials hold nearly all of it). Largest: `stencil/cart/_cart` 792, `stencil/productView` 376, `stencil/navPages` 362, `stencil/account` 336, `citadel/forms` 306, `stencil/navUser` 274, `layouts/header` 210, `vendor/slick` 203, `stencil/paymentMethods` 198, `stencil/heroCarousel` 181, `foundation/modal` 179, `layouts/products/_productList` 177. Citadel/Foundation in `node_modules` add about 18,000 lines (components 5.7k, vendor 11.4k, utilities 1k). Markup: 211 TSX templates; 209 hand-written `templates/**/*.html` also exist (a TSX template shadows its `.html`).

## Constraints and risks

- Citadel/Foundation SCSS cannot be edited (node_modules). Utilities override it via `important`; the legacy rules only disappear when the import is dropped in the final phase.
- A class's SCSS rule may only be deleted when nothing else uses the class: other TSX, hand-written HTML, `assets/js` (jQuery selectors, `addClass`), Foundation JS. An inventory tool must prove this; "unused" is judged by whole-word match anywhere outside SCSS, which over-approximates on purpose.
- JS-toggled state classes (`is-open`, `active`, Foundation `[data-*]`) cannot become static utilities: use `data-*`/`aria-*` variants, or keep a small SCSS rule and record why.
- Foundation JS (dropdown, modal, tabs, accordion) depends on its CSS and markup; its CSS stays until the widget is replaced or verified without it.
- Auth- and state-gated pages (account, cart with items, wishlists) cannot be reached without the user's session. The agent never enters passwords and never adds to a live store's cart without the user's say: such rows are marked blocked, skipped, and reported.
- Each converted folder must be added to `@source` in `_tailwind.scss`; the emitted-utility test fails on strays.
- `important` and `source(none)` are temporary; revisit when Citadel/Foundation are gone.

## Approaches considered

| | A. Per-partial loop (chosen) | B. Global replace by script | C. Layered legacy |
|---|---|---|---|
| How | Inventory picks the partial; convert markup, delete rules, parity-check in Edge, commit | Codemod maps declarations to utilities automatically | Wrap legacy in `@layer` below utilities and migrate gradually |
| Risk | Slow but each step verified | Unreadable class soup, wrong on state/JS/pseudo selectors | Large architectural change before any conversion |

Chosen: A, with the inventory tool making "what is safe to delete" mechanical.

## Done means

`npm run tw-inventory` reports zero used classes in the theme partials and in the Citadel/Foundation imports, those imports are gone from `theme.scss`, `important`/`source(none)` are reviewed, and every converted page passed Edge parity.
