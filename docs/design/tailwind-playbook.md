# Tailwind conversion playbook

How to replace a named SCSS class with utilities in the TSX markup, safely and repeatably. Designs: `docs/superpowers/specs/2026-11-23-tailwind-conversion-design.md` and `2026-11-24-tailwind-programme-design.md`. Progress: `docs/design/tailwind-progress.md`. Work plan: `docs/superpowers/plans/2026-11-24-tailwind-programme.md`.

## 1. What to convert, what to leave

Convert: box model, spacing, flex/grid layout, typography, colours, borders, radius, shadows, simple responsive and `hover:`/`focus-visible:` states, and `no-js:` / `js:` visibility.

Leave in SCSS (and say why in a one-line comment and the commit): structure-dependent selectors (`~`, `+`, `:has()`), pseudo-elements with generated content, container queries and local custom properties such as `--vs-*`, animation keyframes, and third-party widget styling you do not control.

**State classes added by JS** (`is-open`, `active`, Foundation `[data-*]`) cannot become static utilities. Use a `data-*`/`aria-*` variant (`data-[state=open]:block`, `aria-expanded:...`) only if you also change the JS to set that attribute; otherwise keep the rule in SCSS. Drive the interaction in Edge after converting.

## 2. Tools

| Command | Use |
| --- | --- |
| `npm run tw-inventory` | Partials by size: classes defined, how many are still used by markup/JS |
| `npm run tw-inventory -- --classes <partial substring>` | Every class of that partial with the files using it, or `UNUSED`. `&-suffix` selectors cannot be resolved: read the file |
| `npm run tw-helper -- "<root selector>"` | Prints the in-page parity helper (`__tw`, `__twFrame`, `__twFocus`) |
| `npm run tw-diff -- a.json b.json` | Compares two snapshot files (the in-page helper normally does this for you) |
| `npm run generate-bridge` / `check-bridge` | SCSS settings variables as `--sv-*` |

## 3. Testing happens in Edge

Run parity checks in the user's open **Microsoft Edge**, through the claude-in-chrome tools. Never headless Chrome: a real user must see what you see. First check `navigator.userAgentData.brands` lists "Microsoft Edge" and the user agent has no "Headless".

- Edge cannot resize its viewport. `__twFrame(width, label, mode, nojs)` measures the same page inside a same-origin iframe at that width. For no-JS it swaps `js` for `no-js` on the iframe's `<html>`.
- Snapshots are far too big to return through the tool. `__tw(label, "save")` keeps them in `sessionStorage` (same tab, survives a reload); after converting, reload and call `__tw(label)` to get only counts and the first differences.
- Confirm the baseline is styled (the component's computed background or size is not the unstyled default). A baseline of an unstyled page diffs clean against anything.
- Take a screenshot pair (`save_to_disk`) and compare by eye: the test is subjective as well as computed.
- Never enter passwords, and never add to the live store's cart or submit forms. Pages that need either (account, cart with items, wishlists) are marked `blocked: <reason>` in the progress file and the user is told.

## 4. The loop (one SCSS partial or batch per commit)

1. **Scope.** `npm run tw-inventory -- --classes <partial>`. Find the page that renders it. Blocked page: mark the row, take the next.
2. **Baseline.** `npm run vite-dev` (port 5173); confirm the theme CSS compiles (the stencil theme CSS URL returns about 490 KB, not 22 bytes). Run the helper; `__twFrame` at 375/768/1280 and no-JS with `save`; screenshot.
3. **Classify** every declaration: utility, bridged token, or stays (reason). Put the table in the commit body.
4. **Convert.** Utilities in the TSX (extract a component past about 10 per element); add the folder to `@source` in `assets/scss/tailwind/_tailwind.scss`; delete only SCSS rules whose classes show no consumer outside this markup; delete the partial and its `@import` when empty.
5. **Verify in Edge.** Reload; compare all four states; `__twFocus` every interactive element; drive any JS interaction; screenshot. Every difference is fixed or explained.
6. **Gates.** `npx vitest run` (includes the stray-utility test), `npm run vite-build`, any `check-*` script for the component, `npm run check-bridge`.
7. **Record** the row in `tailwind-progress.md`, then commit one component: `refactor: convert <component> to utilities`.

Capture keys are structural paths, not classes, so renaming classes does not change them. Changing the element structure shows up as `(element)` differences: that is a real change, review it.

Expected harmless differences: `999px` radius becomes `calc(infinity * 1px)` with `rounded-full`; an input with `border-0` reports `border-top-style: solid`; `shadow-none` reports a five-part transparent `box-shadow`.

## 5. Cascade and Tailwind setup

- Tailwind output is in `@layer`s and the legacy SCSS (Foundation, Citadel, Stencil) is unlayered, so legacy would win. `_tailwind.scss` therefore imports Tailwind with `important`: every utility is `!important` and beats the legacy rules, including its element resets (`div { padding: 0 }`). Temporary: drop it once the legacy CSS is gone (programme Task 34).
- `important` is only safe with automatic source detection off. With detection on, Tailwind saw legacy class names that are also utility names (`container`, `table`, `hidden`, `block`) in any file and emitted them site-wide. `_tailwind.scss` therefore uses `source(none)` and lists each converted folder with `@source`. **When you convert a folder, add it to `@source`.** Words in attributes and comments of a listed folder (`type="hidden"`) can still be picked up: `scripts/tailwind/theme.test.mjs` fails when a utility is emitted that no `className` uses; add the stray name to `@source not inline("...")`.
- Citadel and Foundation SCSS lives in `node_modules` and cannot be edited. Converting their classes means putting utilities in your markup; the old rules only disappear when the import is dropped (programme Tasks 32-33).
- The dev server only serves the transformed Tailwind file if `theme.scss` imports it from the file named `_tailwind.scss` (the plugin matches on that name; `theme.scss` imports it as `@import "tailwind/_tailwind";`; keep the underscore, without it the importer falls back to the raw file on disk and skips the Tailwind transform).
- **Theme scales have utilities.** `spacing("half")` is `p-half`/`mt-half`/`gap-half`; `fontSize("small")` is `text-small` (font-size only); `breakpoint("medium")` is the `medium:` variant (min-width 801px). Names: spacing base/single/double/half/third/quarter/fifth/sixth/eighth, text hero/largest/larger/large/small/smaller/smallest/tiny, breakpoints xxsmall/xsmall/small/medium/large/xlarge/xxlarge/xxxlarge. Tailwind's `sm/md/lg/xl/2xl` do not exist. `max-width` queries: use `max-[800px]:` (medium - 1px) or restructure mobile-first. Breakpoint literals must match `$screen-*`; `scripts/tailwind/scales.test.mjs` fails on drift.
- `rem` is 14px on this theme, so `rounded-xl` is 10.5px. Use `rounded-[12px]` or a named theme entry when the original was in px.

## 6. SCSS variables in Tailwind (the bridge)

- `npm run generate-bridge` emits every top-level `$variable` in `assets/scss/settings/_settings-global.scss` and `_settings.scss` and Citadel's `settings/global/**` that has a value (not `null`, boolean, map, empty) as `--sv-<name>` on `:root`. `npm run check-bridge` fails when the file is stale: run it after adding or renaming a settings variable.
- Raw access: `bg-(--sv-color-primary)`, `p-(--sv-gutter)`.
- Readable names live in the `@theme inline reference` block in `assets/scss/tailwind/_tailwind.scss`. **Promotion rule:** an arbitrary `x-(--sv-foo)` used at 2 or more sites gets a named entry there (kebab-case name, value `var(--sv-foo)`).
- Variables declared in component partials (not settings) are not bridged. Convert such a value to a literal utility or a local custom property.
- Design tokens (`docs/design/tokens.json`) are `--color-*` properties with utilities (`bg-brand`, `text-text-muted`).

## 7. Verbosity

About 10 utilities per element. Past that, or when the same structure repeats, extract a TSX component. Do not add `@apply` classes: only `_tailwind.scss` is processed by Tailwind, so `@apply` elsewhere does nothing.

## 8. Classification table (paste into the commit body)

| SCSS rule / declaration | Decision | Utility, token or reason |
| --- | --- | --- |
| `.x { padding: 1rem }` | utility | `p-4` |
| `.x { background: $color-primary }` | bridged token | `bg-primary` |
| `.x:has(:checked) { ... }` | stays in SCSS | structural selector |
