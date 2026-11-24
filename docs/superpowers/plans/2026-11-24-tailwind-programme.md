# Tailwind Programme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert every theme-owned SCSS rule under `assets/scss/components` and `assets/scss/layouts` to Tailwind utilities in the TSX markup, then retire the Citadel/Foundation imports.

**Architecture:** Tasks 1-3 add an inventory tool (which classes each partial defines, who uses them), a generated in-page parity helper, and playbook updates. Tasks 4-31 each convert one SCSS partial (or a batch of tiny ones) with one shared procedure, biggest partial first. Tasks 32-34 retire the legacy CSS.

**Tech Stack:** Node ESM `.mjs` + Vitest (`scripts/**/*.test.mjs`), Tailwind v4 via `_tailwind.scss`, the claude-in-chrome driver in the user's open Microsoft Edge.

**Spec:** `docs/superpowers/specs/2026-11-24-tailwind-programme-design.md` (and `2026-11-23-tailwind-conversion-design.md`). Playbook: `docs/design/tailwind-playbook.md`.

## Global Constraints

- Tests in Edge only, via the claude-in-chrome tools. Confirm `navigator.userAgentData.brands` lists "Microsoft Edge" and the UA has no "Headless". Never headless Chrome.
- Edge cannot resize its viewport: capture widths 375/768/1280 in same-origin iframes. Keep "before" snapshots in `sessionStorage`; confirm the baseline is styled (the component's computed background/size is not the unstyled default).
- Never enter passwords. Never add to the live store's cart or post forms without the user's say. A row whose page needs either is marked `blocked: <reason>` in `docs/design/tailwind-progress.md`, skipped, and reported in the final message.
- A SCSS rule is deleted only when `npm run tw-inventory -- --classes <partial>` shows no consumer outside the markup being converted in this task.
- About 10 utilities per element, then extract a TSX component. No `@apply`. No new npm packages. `1rem` = 14px: use `[12px]`/named theme entries when the original was px; promote an arbitrary value used at 2+ sites to `@theme` in `assets/scss/_tailwind.scss`.
- Add every converted folder to `@source` in `assets/scss/_tailwind.scss`; `npx vitest run scripts/tailwind/theme.test.mjs` must pass (no stray utilities).
- One commit per task, Conventional Commits, subject at most 50 chars, only when the user has asked for commits (global rule); otherwise leave the tree dirty and say so. CRLF files (`CHANGELOG.md`, `theme.scss`, `_tailwind.scss`): edit CRLF-aware, check `git diff`. In this shell use Write/Edit for regexes (heredocs strip backslashes).
- Parity bar per row: zero unexplained computed-style differences at 375/768/1280 and no-JS, plus focus states checked on interactive elements, plus a screenshot pair compared by eye.

## Review Focus

1. A deleted rule's class is still used elsewhere (other TSX, hand-written `templates/**/*.html`, `assets/js` selectors/`addClass`, Foundation JS): the inventory must report that as a consumer and block deletion.
2. State classes added by JS (`is-open`, `active`, `is-focused`, Foundation data attributes) must keep working after the static classes are converted; test by driving the interaction in Edge.
3. Pseudo-elements, adjacent-sibling, `:has()` and container-query rules cannot be utilities: they stay in SCSS with a recorded reason, not silently dropped.
4. Responsive rules in `@media` must map to the same breakpoints; check the theme's `$screen-*` values against Tailwind's defaults and add `@theme` breakpoints if they differ.
5. Hand-written `.html` templates not shadowed by TSX keep legacy classes; the inventory must list them so rules are not deleted under them.

---

### Task 1: Inventory tool

**Files:**
- Create: `scripts/tailwind/inventory.mjs`, `scripts/tailwind/inventory.test.mjs`, `scripts/tailwind-inventory.mjs`
- Modify: `package.json` (script `tw-inventory`)

**Interfaces:**
- Produces:
  - `classSelectors(scss: string): string[]`: unique class names from selector lines (lines ending in `{` or `,`), comments stripped, ignoring `#{}` interpolations and numbers like `.5`.
  - `meaningfulLines(scss: string): number`: non-blank, non-comment lines.
  - `findConsumers(classes: string[], files: {path: string; text: string}[]): Map<string, string[]>`: for each class the file paths containing it as a whole word (`(?<![\w-])name(?![\w-])`).
  - `buildInventory({scssFiles, sourceFiles}): {partial: string; lines: number; classes: string[]; consumers: Map<string, string[]>}[]`, sorted by `lines` descending.
- CLI: `npm run tw-inventory` prints a table (lines, partial, classes, classes still used in markup); `npm run tw-inventory -- --classes <substring>` lists each class of the matching partial with its consumer files. Scans SCSS under `assets/scss/components` and `layouts`; consumers from `src/**`, `templates/**`, `assets/js/**` excluding `*.scss`, `*.test.*`, `node_modules`, `dist`.

- [ ] **Step 1: Write failing tests** in `inventory.test.mjs`: `classSelectors(".a, .b-c > .d { x: 1 }\n.e:hover { }\n// .skip {\n}")` returns `["a","b-c","d","e"]`; declaration values (`margin: .5rem`) and `#{$x}` yield nothing; `meaningfulLines` ignores blanks and both comment styles; `findConsumers` matches `class="btn btn--big"` for `btn` and `btn--big` but not for `btn--bi`; `buildInventory` sorts by size.
- [ ] **Step 2: Run to verify failure.** `npx vitest run scripts/tailwind/inventory.test.mjs`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement** the four functions in `inventory.mjs` and the CLI.
- [ ] **Step 4: Run tests.** Expected: PASS. Then `npm run tw-inventory`; Expected: top row `stencil/cart/_cart` (about 792 lines), exit 0.
- [ ] **Step 5: Run `npx vitest run` (green); commit** `feat: add SCSS to markup inventory tool`.

---

### Task 2: Parity helper generator

**Files:**
- Create: `scripts/tailwind/page-helper.mjs`, `scripts/tailwind/page-helper.test.mjs`, `scripts/tailwind-helper.mjs`
- Modify: `package.json` (script `tw-helper`)

**Interfaces:**
- Consumes: `DEFAULT_PROPS` from `scripts/tailwind/snapshot.mjs`.
- Produces: `buildPageHelper({root: string}): string`: JavaScript source that defines `window.__tw(label, mode)` (mode `"save"` stores the structural-path snapshot of `root` in `sessionStorage` key `tw-<label>`; otherwise diffs against it and returns `{w, diffCount, byProp, rest}` with `rest` the first 6 non-radius differences), `window.__twFrame(width, label, mode, nojs)` (same-origin hidden iframe of `location.pathname` at that width; waits 3s; `nojs` swaps `js` for `no-js` on its `<html>`) and `window.__twFocus(selector)` (focuses the element, returns outline/border/shadow of it and its parent). CLI `npm run tw-helper -- "<root selector>"` prints the source.

- [ ] **Step 1: Write failing tests:** the returned source parses (`new vm.Script`); evaluated in `node:vm` against the same stub DOM used in `snapshot.test.mjs`, `__tw("x","save")` stores a snapshot in a stub `sessionStorage` and a second call with an unchanged stub returns `diffCount: 0`; changing one stub style value yields `diffCount: 1` naming that property.
- [ ] **Step 2: Run to verify failure.** Expected: FAIL, module not found.
- [ ] **Step 3: Implement** `buildPageHelper` reusing `buildCaptureExpression` for the capture body.
- [ ] **Step 4: Run tests.** Expected: PASS. Run `npx vitest run` (green); commit `feat: generate the in-page parity helper`.

---

### Task 3: Playbook, progress file and Edge rule

**Files:**
- Modify: `docs/design/tailwind-playbook.md`, `docs/design/README.md`, `CHANGELOG.md` (CRLF)
- Create: `docs/design/tailwind-progress.md`

**Interfaces:** consumes Tasks 1-2 commands.

- [ ] **Step 1: Playbook:** replace the hand-written capture steps with `npm run tw-helper`; add the Edge rule, the deletion-safety rule (`tw-inventory -- --classes`), the blocked-row rule (auth/cart), the JS-state rule (data/aria variants) and the focus-state check; fix the contradictory first bullets of section 3 (utilities already win under `important`).
- [ ] **Step 2: Progress file:** a table row per partial from `npm run tw-inventory` (partial, lines at start, status `todo`/`done`/`blocked: reason`, commit). Seed it with every partial of 20+ lines (Tasks 4-31) and one row per tail batch.
- [ ] **Step 3: README and CHANGELOG** entries for `tw-inventory` and `tw-helper`; confirm the CHANGELOG diff is +1 line with `git diff CHANGELOG.md`.
- [ ] **Step 4: Run `npx vitest run` (green); commit** `docs: playbook for the full conversion`.

---

### Task 3b: Scale mapping (added during execution)

Found while scoping Task 5: partials use `spacing("base")`, `fontSize("small")` and `breakpoint("medium")`, whose values come from Citadel settings in `node_modules` (not bridged), and the theme's breakpoints (small 551, medium 801, large 1261) differ from Tailwind's defaults.

**Files:** Modify `scripts/generate-bridge.mjs`, `assets/scss/_tailwind.scss`, `docs/design/tailwind-playbook.md`; regenerate `assets/scss/settings/global/_css-vars.scss`; Test `scripts/tailwind/scales.test.mjs` (create).

- [ ] **Step 1:** The bridge also scans `node_modules/@bigcommerce/citadel/dist/settings/global/**` (theme settings first, so the theme's value for a duplicate name wins as in Sass). Regenerate; libsass stub-harness compile exits 0.
- [ ] **Step 2: Failing tests** in `scales.test.mjs`: compiling `_tailwind.scss` with candidates `medium:flex`, `p-single`, `mt-half`, `text-small` gives `@media (width >= 801px)`, `padding: var(--sv-spacing-single)`, `margin-top: var(--sv-spacing-half)`, `font-size: var(--sv-fontSize-small)` (no line-height); a drift test reads `$screen-*` from the theme's `_screensizes.scss` (theme wins) and Citadel's, and fails when an `@theme` breakpoint differs; `md:flex` (a Tailwind default name) is not generated.
- [ ] **Step 3:** `@theme` block: `--breakpoint-*: initial;` then `--breakpoint-<name>` literals for xxsmall..xxxlarge; `--spacing-<key>: var(--sv-spacing-<key>)` for base, single, double, half, third, quarter, fifth, sixth, eighth; `--text-<key>: var(--sv-fontSize-<key>)` for hero..tiny. Tests green; full suite green; commit `feat: map theme scales into Tailwind`.

### Conversion procedure (applies to Tasks 4-31)

Each task converts the one partial (or batch) named in its row.

- [ ] **P1: Scope.** `npm run tw-inventory -- --classes <partial>`. Note consumers outside the task's markup. Open the TSX files that use the classes; confirm which page URL renders them (see the row). If it needs login or cart state, mark the row `blocked`, stop the task and take the next.
- [ ] **P2: Dev server and Edge.** `npm run vite-dev` (port 5173) and confirm theme CSS compiles (`curl` the stencil theme CSS URL: about 490 KB, not 22 bytes). Navigate Edge to the page; check the UA is Edge.
- [ ] **P3: Baseline.** `npm run tw-helper -- "<root>"`, run it in the tab, then `__twFrame` for 375/768/1280 and no-JS with `save`; check the baseline is styled. Screenshot the component (`save_to_disk`) for the eye comparison.
- [ ] **P4: Classify** every declaration of the partial: utility, bridged token, or stays (reason). Write the table in the commit body.
- [ ] **P5: Convert.** Add utilities to the TSX (extract a component past about 10 per element); add the folder to `@source`; delete only the SCSS rules whose classes have no remaining consumer; keep state/pseudo/container rules in SCSS with a one-line reason comment. If the partial becomes empty, delete the file and its `@import`.
- [ ] **P6: Verify in Edge.** Reload; run `__twFrame` compare for all four states; run `__twFocus` on each interactive element; drive any JS interaction (open, close, toggle) and re-check. Screenshot after. Expected: no unexplained differences. Fix or explain each.
- [ ] **P7: Gates.** `npx vitest run`, `npm run vite-build`, any `check-*` script for the component, `npm run check-bridge`. Expected: all pass.
- [ ] **P8: Record.** Update the row in `docs/design/tailwind-progress.md` (lines before/after, status). Commit `refactor: convert <component> to utilities` when commits are requested.

### Tasks 4-31 (one row each, biggest first)

| Task | Partial (under `assets/scss/`) | Lines | Page to test in Edge | Notes |
|---|---|---|---|---|
| 4 | `components/stencil/cart/_cart.scss` | 792 | `/cart.php` with items | likely blocked: needs a cart (ask first) |
| 5 | `components/stencil/productView/_productView.scss` | 376 | `/p405ms-biz-collection/` | gallery/tabs JS; overlaps product page folders |
| 6 | `components/stencil/navPages/_navPages.scss` | 362 | any page (header/mobile nav) | Foundation dropdown JS |
| 7 | `components/stencil/account/_account.scss` | 336 | `/account.php` | blocked: login (user must sign in in Edge) |
| 8 | `components/citadel/forms/_forms.scss` | 306 | `/contact-us/`, search | shared by every form |
| 9 | `components/stencil/navUser/_navUser.scss` | 274 | any page (header) | |
| 10 | `layouts/header/_header.scss` | 210 | any page | |
| 11 | `components/vendor/slick/_slick.scss` | 203 | home carousel | third-party; likely stays |
| 12 | `components/stencil/paymentMethods/_paymentMethods.scss` | 198 | account/checkout | likely blocked |
| 13 | `components/stencil/heroCarousel/_heroCarousel.scss` | 181 | `/` | |
| 14 | `components/foundation/modal/_modal.scss` | 179 | product quick view | Foundation JS |
| 15 | `layouts/products/_productList.scss` | 177 | `/fashion-biz/` | |
| 16 | `layouts/products/_productSaleBadges.scss` | 158 | listing with a sale item | |
| 17 | `layouts/footer/_footer.scss` | 131 | any page | |
| 18 | `components/citadel/cards/_cards.scss` | 120 | `/fashion-biz/` | |
| 19 | `components/foundation/dropdown/_dropdown.scss` | 116 | header menus | Foundation JS |
| 20 | `components/foundation/accordion/_accordion.scss` | 112 | footer/pages | Foundation JS |
| 21 | `components/stencil/addReturn/_addReturn.scss`, `addressBox/_addressBox.scss` | 103 + 99 | account | blocked: login |
| 22 | `components/citadel/nav/_nav.scss`, `foundation/tables/_tables.scss` | 91 + 85 | listing, compare | |
| 23 | `components/stencil/compare/_compare.scss`, `layouts/products/_productGrid.scss` | 83 + 83 | `/compare/`, listing | |
| 24 | `components/stencil/facetedSearch/_facetedSearch.scss`, `previewCart/_previewCart.scss` | 82 + 81 | `/fashion-biz/` | preview cart needs a cart |
| 25 | `components/foundation/pagination/_pagination.scss`, `stencil/search/_search.scss` | 79 + 74 | listing, `/search.php?search_query=polo` | |
| 26 | blog and remaining layouts: `layouts/blog`, `layouts/products` (rest), `layouts/body`, `layouts/account`, `layouts/brands`, `layouts/sidebar`, `layouts/container` | about 300 | blog, brands, sidebar pages | batch by folder |
| 27 | `components/foundation/tabs`, `foundation/type`, `foundation/breadcrumbs`, `foundation/lazyLoad`, `foundation/forms`, `foundation/global`, `foundation/alerts`, `foundation/buttons`, `foundation/inlineList`, `foundation/panels` | about 280 | product, forms, any page | theme copies of Foundation overrides |
| 28 | `components/stencil/socialLinks`, `videoGallery`, `toggleLink`, `productReviews`, `writeReview`, `productCarousel` | about 220 | product page | |
| 29 | `components/stencil/textTruncate`, `banners`, `tags`, `rating`, `ribbon`, `facetLabel`, `blocker`, `contact`, `price`, `category`, `quickView` | about 150 | listing, product, contact | |
| 30 | `components/citadel/actionBar`, `icons`, `loading`, `common/**` | about 80 | listing | |
| 31 | `layouts/_layouts.scss`, `components/_components.scss`, empty partial shells | about 70 | n/a | remove emptied imports; `tw-inventory` shows all theme partials at 0 |

### Task 32: Retire Citadel components and utilities

**Files:** `assets/scss/theme.scss`, `docs/design/tailwind-progress.md`.

- [ ] **Step 1:** Extend `tw-inventory` (small change, with a test in `inventory.test.mjs`) to accept Citadel `dist/components` and `dist/utilities` SCSS as inputs behind a `--citadel` flag; run it. Expected: a list of Citadel classes still used by markup.
- [ ] **Step 2:** Convert every remaining use (apply the Conversion procedure to the markup, no SCSS to delete) until the list is empty.
- [ ] **Step 3:** Remove the `citadel/dist/components/components` and `utilities/utilities` imports from `theme.scss`; build and run the Edge parity checks on one page of each template type (home, category, product, cart or its blocked note, blog, contact, search). Expected: no unexplained differences.

### Task 33: Retire Foundation

**Files:** `assets/scss/theme.scss`, `docs/design/tailwind-progress.md`.

- [ ] **Step 1:** Run the inventory against Foundation's `dist/vendor/foundation` SCSS (same flag). List the Foundation JS widgets still initialised (`assets/js`, `foundation.dropdown`, `reveal`, `tabs`, `accordion`) and which classes/attributes each needs.
- [ ] **Step 2:** For each widget, either verify it works without Foundation's CSS (drive it in Edge) or replace its styling with utilities; record any widget that must keep CSS and keep only those rules in a single small partial.
- [ ] **Step 3:** Remove the Foundation and normalize imports from `theme.scss`; run `npx vitest run`, `npm run vite-build`, and Edge parity on one page per template type. Expected: all pass.

### Task 34: Retire the temporary Tailwind settings

**Files:** `assets/scss/_tailwind.scss`, `docs/design/tailwind-playbook.md`, `CHANGELOG.md`.

- [ ] **Step 1:** With no legacy CSS left, remove `important` from the import and replace `source(none)` + the `@source` list with automatic detection (keep the explicit `@source not inline(...)` exclusions that the stray-utility test needs, or adjust the test to the new setup).
- [ ] **Step 2:** `npx vitest run` (the stray-utility test must pass or be updated for auto-detection with a reason), `npm run vite-build`, Edge parity on one page per template type. Expected: no unexplained differences.
- [ ] **Step 3:** Update the playbook (remove the `important`/`@source` rules), add the CHANGELOG entry (CRLF), commit.
