# Tailwind conversion progress

Plan: `docs/superpowers/plans/2026-11-24-tailwind-programme.md` (task numbers below). Regenerate the live numbers with `npm run tw-inventory`.

Start: 126 non-empty partials, 6550 lines (components + layouts + common), measured 2026-11-24.

The per-partial table that was kept during the conversion (126 rows, all started as `todo`) has been removed because it was stale: every row it listed is now deleted. Per-partial history is in git; the blocked and partial entries it held are recorded under 'Open gaps' in `tailwind-handoff.md`. Live numbers: `npm run tw-inventory` (0 lines in 0 partials, checked 2026-11-26). `assets/scss` now holds only `tailwind/`, `settings/`, `tools/`, `vendor/`, and the entry files (`theme.scss`, `checkout.scss`, `invoice.scss`, `maintenance.scss`, `optimized-checkout.scss`).

## Expected yield under the ~10-utilities cap (measured 2026-11-24)

"Leaf" = a top-level rule on plain classes whose body is only declarations (plus `@include breakpoint`), with no mixins, pseudo-elements, combinators or nesting. Only about 982 of about 6,110 lines (16%) in the partials of 20+ lines qualify; nested descendant rules convertible with arbitrary variants add some more. So "convert everything" is not reachable under the cap: expect roughly 20-30% of the SCSS to become utilities, and the rest to stay with a recorded reason. Highest leaf yield (lines, of the partial): cart 148/732, account 104/336, productView 77/376, citadel forms 60/306, footer 49/131, addressBox 48/99, navUser 47/274, productList 41/177, layouts/account 31/55, blog 31/72, promotionCallout 31/45. Work in that order (the user chose yield over size on 2026-11-24).

Tasks 32-34 (retire Citadel, Foundation, the temporary Tailwind settings) have no partial rows; track them in the plan.

## Final status (2026-11-24)

The partial rows above are historical. All theme-owned SCSS partials under components, layouts, common and utilities are deleted; `npm run tw-inventory` reports 0 lines in 0 partials. Styling now lives in utilities in `src/templates` plus layered rules in `assets/scss/tailwind/_tailwind.scss`. See `docs/design/tailwind-handoff.md` for what stays and the unverified-by-equivalence lists.
