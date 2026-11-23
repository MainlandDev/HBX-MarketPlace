# Tailwind conversion: design

Status: draft for approval. Date: 2026-11-23. Builds on `2026-11-23-design-bible-design.md`.

## Intent

Replace named SCSS classes with Tailwind utilities in the TSX/HBX markup, as far as is sensible, so the legacy
Cornerstone/Citadel/Foundation CSS shrinks toward nothing. Make that a repeatable process, not a one-off sweep. Make
SCSS variables (including merchant `config.json` colours resolved by `stencilColor()`) usable from Tailwind.

## Goals

- A playbook anyone can run per component: baseline, classify, convert, verify, commit.
- A generated SCSS to CSS custom property bridge covering every theme-owned SCSS variable that can be emitted.
- A curated `@theme inline` layer so common values have readable names (`bg-primary`, `p-gutter`), with the raw bridge
  reachable by arbitrary-value syntax (`bg-(--sv-color-primary)`) for the long tail.
- Computed-style verification (before/after, three widths, no-JS) so conversion does not change rendering silently.
- A pilot on one component (variant selector) that proves the loop before wider rollout.

## Non-goals

- Converting every rule. Complex selectors, pseudo-elements, container queries and JS-driven state may stay in SCSS.
- Changing the visual design. Conversion is behaviour-preserving; redesign is the design bible's job.
- Removing Citadel/Foundation in this pass (only shrinking dependence on them).
- Embroidery/decoration flow and marketing, both still deferred.

## Anti-goals (would make this a failure even if it technically works)

- Class soup: elements with 20+ utilities and no component boundary.
- Two sources of truth for the same colour (config.json vs tokens.json vs SCSS).
- A converted element that looks right only because a legacy rule still wins (or loses) in the cascade.
- Anything breaking the no-JS path.

## Constraints (verified in the repo)

- Tailwind v4 (`@tailwindcss/postcss`), entry `assets/scss/_tailwind.scss`, imported first by `theme.scss`.
- `vite/tailwind-override-scss.ts` runs Tailwind over `tsx|jsx|ts|js|html|hbs` and passes the CSS through libsass as an
  opaque string. Tailwind input therefore cannot contain `$vars`; it can contain `var(--x)`.
- Only `_tailwind.scss` is processed by Tailwind. `@apply` in other partials does nothing.
- Tailwind output is `@layer`ed; the legacy SCSS is unlayered and always wins. A utility only takes effect once the
  legacy rule for that property is deleted (or lives on a different element).
- libsass (BigCommerce's compiler) has maps, `@each`, `type-of`, `#{}` interpolation. No `@use`.
- Measured: 1,068 theme-owned top-level `$variable` declarations under `assets/scss`. By value: 222 `null`, 33 boolean,
  11 map/list (about 266 cannot be emitted as a custom property); the rest are colours, numbers, `stencil*()` calls,
  aliases and expressions. 4 names are declared twice.
- `_design-tokens.scss` already emits `--color-*` (light/dark). Tailwind's own theme namespace is also `--color-*`.

## Approaches considered

| | A. Curated allowlist | B. Bridge every variable (chosen) | C. Hand-written per use |
|---|---|---|---|
| Coverage | Only listed tokens | Every emittable variable | Only what was needed |
| Cost | Small list to maintain | Generated name list, one guard mixin | None upfront |
| Risk | Long-tail conversions blocked | Larger `:root` (about 800 properties); names nobody uses | Drifts, no single list |

The user chose B. To keep its cost down: the `:root` block is generated, guarded against `null`/boolean/map values, and
the readable utility names come from a small curated `@theme inline` layer, not from the full bridge.

## Design

### 1. Bridge (SCSS to CSS custom properties)

- `scripts/tailwind/gen-bridge.mjs` scans theme-owned `assets/scss/**` for top-level `$name:` declarations and writes
  `assets/scss/settings/global/_css-vars.scss` (generated, header says so, committed).
- The file defines `@mixin sv($name, $value)` that emits `--sv-#{$name}: #{$value};` only when `$value` is not
  `null`, not a boolean, and `type-of` is not `map`/`list`. Then one `@include sv("color-primary", $color-primary);`
  per variable, inside `:root { ... }`.
- Imported in `theme.scss` after the last `settings/*` import (so every variable exists), before components.
- Prefix `--sv-` ("scss variable") keeps it clear of Tailwind's `--color-*` and the design tokens' `--color-*`.
- `npm run check-bridge` fails when the committed file is stale (same pattern as `check-design-tokens`).
- Scope is theme-owned variables. Citadel/Foundation variables in `node_modules` are out of scope (open item).

### 2. Curated theme layer

- `@theme inline` in `_tailwind.scss` maps readable names to bridge vars: colours (`--color-primary: var(--sv-color-primary)`),
  spacing, type scale, radius, breakpoints, z-index.
- `inline` makes utilities emit `var(--sv-...)` directly instead of a second indirection layer.
- Promotion rule: an arbitrary value `x-(--sv-foo)` used at 2+ sites gets a curated name.
- Token ownership (my call, change if wrong): `tokens.json` owns the new design values; `config.json` colours stay
  authoritative for merchant-editable colours. The 6 known drifts get reconciled before the pilot ends.

### 3. The conversion playbook (`docs/design/tailwind-playbook.md`)

Per component (one SCSS partial plus its TSX markup):

1. **Baseline.** A Chrome script records computed styles of the component's elements at 375 / 768 / 1280 px, in default
   state and no-JS, to JSON. Screenshots are kept for human review.
2. **Classify** each declaration: utility, bridged token, or stay-in-SCSS (with a one-line reason). Recorded in a table
   in the commit message or PR, not in a new file.
3. **Convert.** Utilities go in the TSX; delete the SCSS rule in the same change. Use the `no-js:` / `js:` variants
   from `_tailwind.scss` where state depends on JS.
4. **Verify.** Re-record and diff computed styles. Any difference needs a reason or a fix.
5. **Commit** one component, Conventional Commits, no unrelated partials.

Verbosity rule (user-chosen): about 10 utilities per element. Beyond that, or when the same structure repeats, extract a
TSX component. No `@apply` classes.

### 4. Tooling

- `scripts/tailwind/baseline.mjs`: runs the capture against a running local theme page (Chrome DevTools protocol or the
  claude-in-chrome tools; decided at plan time) and `diff.mjs` compares two captures. Unit-tested with fixtures.
- `scripts/tailwind/gen-bridge.mjs` plus tests: null/boolean/map skipped, duplicate names reported, output stable.

### 5. Pilot: variant selector

`assets/scss/layouts/products/_variantSelector.scss` plus `src/templates/components/products/options/colour-size.tsx`.
Chosen because it is recent, small and already uses custom properties and container queries (so it also tests the
"stay in SCSS" path). Success: baseline diff clean, SCSS file reduced to what genuinely cannot be a utility, no-JS still
works.

## What is left to the builder

- Capture mechanism for the baseline (CDP script vs browser tools).
- Exact curated `@theme` entries (derived from which bridged values the pilot actually uses, not guessed up front).
- Handling of the 4 duplicated variable names (report and pick the later definition, as Sass does).

## Open items

- Bridge Citadel/Foundation variables too? (Default: no.)
- Full `theme.scss` compile with the bridge in the real Stencil pipeline is unverified until the pilot builds.
- Production size cost of about 800 extra custom properties on `:root`; measure in the pilot and trim unused names if it
  matters.
