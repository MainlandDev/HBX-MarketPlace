# Tailwind conversion playbook

How to replace a named SCSS class with utilities in the TSX markup, safely and repeatably. Design and reasoning: `docs/superpowers/specs/2026-11-23-tailwind-conversion-design.md`.

## 1. What to convert, what to leave

Convert: box model, spacing, flex/grid layout, typography, colours, borders, radius, shadows, simple responsive and `hover:`/`focus-visible:` states, and `no-js:` / `js:` visibility.

Leave in SCSS (and say why in the commit): selectors that depend on structure or siblings (`~`, `+`, `:has()`), pseudo-elements with generated content, container queries and `--vs-*` style local custom properties, animation keyframes, and anything JS toggles by class that is not a state variant.

## 2. The loop (one component per commit)

1. **Baseline.** Open a page that renders the component (`npm run vite-dev`, port 5173). For each width in 375, 768, 1280 and once under `html.no-js`, run the expression from `buildCaptureExpression({root: "<css selector of the component root>"})` (`scripts/tailwind/snapshot.mjs`) through the claude-in-chrome `javascript_tool` and save the JSON in the session scratchpad as `<name>-<width>.before.json`.
2. **Classify** every declaration of the component's SCSS using the table in section 6.
3. **Convert.** Put utilities on the elements in the `.tsx`, and delete the SCSS rule in the same change. Keep the old class name on the element only if JS or tests select by it.
4. **Verify.** Re-capture to `.after.json` and run `npm run tw-diff -- <before> <after>`. Expect `identical`. Every remaining difference is either fixed or explained in the commit body. Also run `npx vitest run` and any `check-*` script for the component.
5. **Commit** one component: `refactor: convert <component> to utilities`, with the classification table in the body.

Capture keys are structural paths, not classes, so renaming classes does not change them. If you change the element structure the diff reports `(element)` lines: that is a real change, review it.

## 2a. Capturing in practice (learned in the variant selector pilot)

- The browser window cannot be resized to change the viewport. Capture each width in a same-origin `<iframe style="width:375px">` of the same page and evaluate `buildCaptureExpression` inside `iframe.contentWindow`. For the no-JS state, replace `js` with `no-js` on the iframe's `<html>`.
- A full snapshot is far too large to return through the tool. Save the "before" snapshots in `sessionStorage` (same tab, same origin, survives a reload), then reload after converting and diff in the page, returning only counts and a few differences.
- Check the baseline is styled (for example, the card's computed `background-color` is not transparent). A baseline of an unstyled page diffs clean against anything.
- `rem` is 14px on this theme (`1rem` = 14px), so `rounded-xl` is 10.5px, not 12px. Use `rounded-[12px]` or a named theme entry when the original was in px.
- Expected, harmless differences: `999px` radius becomes `calc(infinity * 1px)` with `rounded-full`, and an input with `border-0` reports `border-top-style: solid` and a five-part transparent `box-shadow` with `shadow-none`.

## 3. The cascade rule

Tailwind output is in `@layer`s; the legacy SCSS (Foundation, Citadel, Stencil) is unlayered and always wins. So:

- A utility only takes effect once the legacy rule for the same property on that element is gone.
- Bare-element rules (`button`, `a`, `ul`, `input`) from Foundation/Citadel also win. When a utility seems ignored, inspect matched rules in DevTools before adding `!`.
- Legacy element resets (`div { padding: 0 }`, `h3 { margin }`) are not rules you can delete per component, so `_tailwind.scss` imports Tailwind with `important` (every utility is `!important`). This is temporary: drop it once the legacy element rules are gone or moved into a lower layer.
- `important` is only safe with automatic source detection off. With it on, Tailwind scanned every file, saw legacy class names that are also utility names (`container`, `table`, `hidden`, `block`, `flex`) and emitted them, so they overrode the legacy CSS site-wide (the pilot diff showed the product column change width). `_tailwind.scss` therefore uses `source(none)` and lists each converted folder with `@source`. **When you convert a folder, add it to `@source` in `assets/scss/_tailwind.scss`.**
- The dev server only serves the transformed Tailwind file if `theme.scss` imports it as `@import "_tailwind";` (bare, with the underscore). `./tailwind` or `./_tailwind` fall back to the raw file on disk and the theme CSS fails to compile.

## 4. SCSS variables in Tailwind (the bridge)

- `npm run generate-bridge` emits every top-level `$variable` in `assets/scss/settings/**` that has a value (not `null`, boolean, map, empty) as `--sv-<name>` on `:root`. `npm run check-bridge` fails when the file is stale: run it after adding or renaming a settings variable.
- Raw access: `bg-(--sv-color-primary)`, `p-(--sv-gutter)`.
- Readable names live in the `@theme inline reference` block in `assets/scss/_tailwind.scss`. **Promotion rule:** an arbitrary `x-(--sv-foo)` used at 2 or more sites gets a named entry there (kebab-case name, value `var(--sv-foo)`).
- Variables declared in component partials (not settings) are not bridged. Convert such a value to a literal utility or a local custom property.
- Design tokens (`docs/design/tokens.json`) are already `--color-*` properties and have utilities (`bg-brand`, `text-text-muted`).

## 5. Verbosity

About 10 utilities per element. Past that, or when the same structure repeats, extract a TSX component. Do not add `@apply` classes: only `_tailwind.scss` is processed by Tailwind, so `@apply` elsewhere does nothing.

## 6. Classification table (paste into the commit body)

| SCSS rule / declaration | Decision | Utility, token or reason |
| --- | --- | --- |
| `.x { padding: 1rem }` | utility | `p-4` |
| `.x { background: $color-primary }` | bridged token | `bg-primary` |
| `.x:has(:checked) { ... }` | stay in SCSS | structural selector |
