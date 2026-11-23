# Design Bible Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the HTML+CSS design bible (web + print, live samples) driven by one `tokens.json`, with generated SCSS/config defaults and a WCAG contrast check.

**Architecture:** `docs/design/tokens.json` is the only place token values live. `scripts/design-tokens/*.mjs` validate it, run contrast checks, and generate SCSS custom properties plus config.json defaults. `scripts/build-bible.mjs` stitches `docs/design/bible/sections/*.html` and generated swatch markup into one self-contained `docs/design/bible/dist/design-bible.html` styled by `bible.css`.

**Tech Stack:** Node ESM scripts (`.mjs`), Vitest (existing, 5.x), plain HTML/CSS. No new packages.

**Spec:** `docs/superpowers/specs/2026-11-23-design-bible-design.md`

## Global Constraints

- No new npm packages; tooling is Node scripts in `scripts/`, run with `node`.
- No runtime CDN or external URL anywhere in bible output (`http(s)://` only allowed in visible link text/citations, never `src`/`href`/`@import`/`url()`).
- Baseline WCAG 2.2 AA; AAA reported where cheap (contrast report marks AAA pass/fail, only AA fails the build).
- Brand red `#EE0700` kept exactly. Measured: black on it 4.67:1, white on it 4.50:1 (AA pass by 0.0008, AAA fails both). Prefer black text; white only for large/bold text because the margin is fragile.
- Themes: light, dark (`prefers-color-scheme`), manual toggle (`data-theme` attribute), `prefers-reduced-motion` respected, print stylesheet (A4).
- Bible document: exactly one `<h1>`, `<main>` landmark, skip link, every `<img>` has `alt`, icons are inline SVG with `aria-hidden="true"` unless meaningful.
- Live-site brand values: bg `#F2F2F2`, text `#000`, amber `#FBBE24`, blue `#1F4FFF`, navy `#0023A3`, tint `#E5EBFF`, greys `#9C9C9C #E5E7EB #DDD #454545 #333`.
- Font: Poppins self-hosted as interim brand font with system fallback stack; final choice deferred.
- Out of scope: decoration/branding flow, marketing/tracking, Tailwind. Components and pages carry a visible "Decoration flow: second pass" placeholder where relevant.
- Do not commit unless the user asks; commit steps below are for when they do. Commit style: Conventional Commits, subject ≤ 50 chars.

## Review Focus

- Token with a missing `dark` value: generator/check must fail with the token name, not emit `undefined`.
- Contrast pair referencing an unknown token name: fail with a clear error.
- Translucent or 3-digit hex (`#fff`, `#ffffff80`): parser handles 3/6 digits, rejects alpha with a clear message.
- Section file missing or out of the manifest order: build fails naming the file; no silent skip.
- Bible opened with JS disabled: theme follows OS `prefers-color-scheme`, all content visible, TOC works via anchors.

---

### Task 1: Contrast maths

**Files:**
- Create: `scripts/design-tokens/contrast.mjs`
- Test: `scripts/design-tokens/contrast.test.mjs`
- Modify: `vitest.config.ts` (add `"scripts/**/*.test.mjs"` to `test.include`)

**Interfaces:**
- Produces: `parseHex(hex: string): {r:number,g:number,b:number}` (3 or 6 hex digits; throws `Error("alpha not supported: <hex>")` for 4/8 digits), `luminance(hex): number`, `contrastRatio(fg: string, bg: string): number`, `grade(ratio: number, size: "normal"|"large"): {aa: boolean, aaa: boolean}`.

- [ ] **Step 1: Write failing tests** in `contrast.test.mjs`: `contrastRatio("#000","#fff")` equals `21`; `contrastRatio("#fff","#EE0700")` is in `[4.5, 4.51)`; `contrastRatio("#000","#EE0700")` > 4.6; `parseHex("#fff")` equals `{r:255,g:255,b:255}`; `parseHex("#ffffff80")` throws `/alpha not supported/`; `grade(4.0,"normal")` is `{aa:false,aaa:false}`; `grade(4.0,"large")` is `{aa:true,aaa:false}`; `grade(7,"normal")` is `{aa:true,aaa:true}`.
- [ ] **Step 2: Run** `npx vitest run scripts/design-tokens/contrast.test.mjs` — Expected: FAIL (module missing).
- [ ] **Step 3: Implement** the four functions per WCAG 2.x relative luminance; thresholds normal AA 4.5 / AAA 7, large AA 3 / AAA 4.5.
- [ ] **Step 4: Run** same command — Expected: PASS.
- [ ] **Step 5: Commit** `feat: add wcag contrast helpers`

### Task 2: tokens.json and validation

**Files:**
- Create: `docs/design/tokens.json`, `scripts/design-tokens/load.mjs`
- Test: `scripts/design-tokens/load.test.mjs`

**Interfaces:**
- Consumes: Task 1 `parseHex`.
- Produces: `loadTokens(path?: string): Tokens` where `Tokens = {colors: Record<string,{light:string,dark:string,configKey?:string}>, pairs: {fg:string,bg:string,size:"normal"|"large",label:string}[], type, space, radius, motion}`; `loadTokens` throws `Error("token <name>: missing dark")` / `"unknown token in pair: <name>"` on invalid data.

- [ ] **Step 1: Write failing tests**: `loadTokens()` of the real file returns colors including `brand`, `onBrand`, `bg`, `text`, `accent-amber`, `accent-blue`, `accent-navy`, `tint`; `brand.light` equals `#EE0700` exactly; every colour has both `light` and `dark`; a fixture with a missing `dark` throws `/token brand: missing dark/`; a fixture whose pair names `nope` throws `/unknown token in pair: nope/`.
- [ ] **Step 2: Run** `npx vitest run scripts/design-tokens/load.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Author `tokens.json`**: light values from Global Constraints (`onBrand.light` `#000000`); invent dark values (builder's call; dark `bg` near `#121212`, brand stays `#EE0700` in both themes); `configKey` maps to existing config.json keys (`color-primary` ↔ `brand`, `color-textBase` ↔ `text`, etc., read `config.json` `settings` to pick); pairs cover text/bg, onBrand/brand, link/bg, focus ring/bg in both themes; type scale (base 16/24, h2 28), space, radius, motion durations. Implement `loadTokens` with the validation above.
- [ ] **Step 4: Run** same command — Expected: PASS.
- [ ] **Step 5: Commit** `feat: add design tokens source`

### Task 3: Contrast report and failing check

**Files:**
- Create: `scripts/design-tokens/report.mjs`, `scripts/check-design-tokens.mjs`
- Test: `scripts/design-tokens/report.test.mjs`

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces: `buildReport(tokens: Tokens): {theme:"light"|"dark", label:string, ratio:number, size:string, aa:boolean, aaa:boolean}[]` (one row per pair per theme); `check-design-tokens.mjs` exits 1 and prints failing rows when any `aa` is false.

- [ ] **Step 1: Write failing tests**: `buildReport(loadTokens())` has `pairs.length * 2` rows; every row for the shipped tokens has `aa === true`; the row labelled for `onBrand/brand` (light) reports `aa: true`; a mutated copy with `onBrand.light = "#777777"` at size `normal` yields a row with `aa: false`.
- [ ] **Step 2: Run** `npx vitest run scripts/design-tokens/report.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Implement** `buildReport` and the CLI (prints a table; exit code 1 on any AA failure). Add `"check-design-tokens": "node scripts/check-design-tokens.mjs"` to `package.json` scripts (matches `check-islands` pattern).
- [ ] **Step 4: Run** `npx vitest run scripts/design-tokens` then `npm run check-design-tokens` — Expected: tests PASS, CLI exit 0.
- [ ] **Step 5: Commit** `feat: add token contrast check`

### Task 4: SCSS and config generator

**Files:**
- Create: `scripts/design-tokens/generate.mjs`, `scripts/generate-design-tokens.mjs`
- Create (generated): `assets/scss/settings/global/color/_design-tokens.scss`
- Test: `scripts/design-tokens/generate.test.mjs`

**Interfaces:**
- Consumes: Task 2 `Tokens`.
- Produces: `renderScss(tokens): string` emitting `:root{--color-<name>:<light>}`, `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){…}}`, `:root[data-theme="dark"]{…}`, `:root[data-theme="light"]{…}`, and `@media (prefers-reduced-motion: reduce)` zeroing motion durations; `configDrift(tokens, config): {key:string,expected:string,actual:string}[]` comparing `configKey` colours against `config.settings`; CLI `--write` writes the SCSS file, `--check` exits 1 on SCSS or config drift.

- [ ] **Step 1: Write failing tests**: `renderScss` output contains `--color-brand: #EE0700;` in the `:root` block and in the `[data-theme="dark"]` block; contains `prefers-reduced-motion`; contains no `undefined`; `configDrift` returns `[]` for matching data and one entry naming `color-primary` when the config value differs.
- [ ] **Step 2: Run** `npx vitest run scripts/design-tokens/generate.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Implement** generator + CLI. Drift reports only; it never rewrites `config.json`. Report drift to the user and update `config.json` defaults by hand once, after reviewing the diff. Import the generated partial from the theme's existing SCSS entry (find where `settings/global/color` is imported in `assets/scss/theme.scss` chain).
- [ ] **Step 4: Run** tests, then `node scripts/generate-design-tokens.mjs --write` and `--check` — Expected: PASS, exit 0.
- [ ] **Step 5: Commit** `feat: generate scss custom properties from tokens`

### Task 5: Bible shell, CSS and build script

**Files:**
- Create: `docs/design/bible/bible.css`, `docs/design/bible/manifest.json`, `docs/design/bible/sections/00-cover.html`, `scripts/build-bible.mjs`, `scripts/design-tokens/bible.mjs`
- Output: `docs/design/bible/dist/design-bible.html` (gitignored? ask the user; default: committed)
- Test: `scripts/design-tokens/bible.test.mjs`

**Interfaces:**
- Consumes: Task 2 tokens, Task 3 report.
- Produces: `assembleBible({manifest: string[], readSection: (name:string)=>string, tokens: Tokens, report: ReportRow[], css: string}): string` returning a single HTML document with inlined CSS, a skip link, `<main>`, one `<h1>`, generated TOC from section `<h2 id>`s, and generated token swatch + contrast tables injected where a section contains `<!--tokens-->` / `<!--contrast-->`. Throws `Error("section missing: <name>")` for a manifest entry with no file.

- [ ] **Step 1: Write failing tests**: output has exactly one `<h1`, one `<main`, a `href="#main"` skip link, theme toggle control with `data-theme-toggle`, `@media print` and `prefers-reduced-motion` in the CSS; output has no `src="http`, `href="http`, `@import`, or `url(http`; a manifest entry with no file throws `/section missing: 99-nope/`; `<!--tokens-->` is replaced with swatches including the text `#EE0700`; contrast table row for white-on-brand shows a "fragile pass: large/bold only" note.
- [ ] **Step 2: Run** `npx vitest run scripts/design-tokens/bible.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Implement** `assembleBible`, `build-bible.mjs` CLI, and `bible.css`: CSS custom properties consumed from the generated token block (inline the same output of `renderScss` so the bible and theme share values), A4 `@page`, `break-inside: avoid` on sample cards, `a[href^="http"]::after` printing URLs, visible focus ring, dark/light/auto via `data-theme`. Toggle is a progressive enhancement (a tiny inline script setting `data-theme`; without JS it follows OS). Add `"build-bible": "node scripts/build-bible.mjs"` to `package.json`. Self-host Poppins woff2 under `docs/design/bible/fonts/` and inline as base64 `@font-face` (user to supply files or confirm licence; if absent use the system stack and note it in the cover).
- [ ] **Step 4: Run** tests and `npm run build-bible`; open the output in Chrome, screenshot light/dark/print preview — Expected: PASS and visual check.
- [ ] **Step 5: Commit** `feat: add design bible shell and build`

### Task 6: Structural lint for content sections

**Files:**
- Create: `scripts/check-bible.mjs`
- Test: `scripts/design-tokens/checkBible.test.mjs`

**Interfaces:**
- Produces: `lintBible(html: string): string[]` returning problem strings: images without `alt`, `<svg>` lacking `aria-hidden` and `role="img"`, external `src`/`href`/`url(`, more than one `<h1>`, component entries (`<article class="component">`) missing any of `data-kind` (`static|island`), a `.no-js` block, `.states` block, `.a11y` block, `.tokens-used` block.

- [ ] **Step 1: Write failing tests** with fixtures: `<img src="x">` → problem containing `alt`; `<article class="component" data-kind="island">` with no `.no-js` → problem containing `no-js`; a clean fixture returns `[]`.
- [ ] **Step 2: Run** `npx vitest run scripts/design-tokens/checkBible.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Implement** `lintBible` via regex/lightweight parsing (no new dependency); CLI runs it on `dist/design-bible.html`, exit 1 on any problem; add `"check-bible"` npm script.
- [ ] **Step 4: Run** tests and `npm run build-bible && npm run check-bible` — Expected: PASS, exit 0.
- [ ] **Step 5: Commit** `feat: lint design bible structure`

### Task 7: Foundations sections (tokens, a11y, assets, perf, voice)

**Files:**
- Create: `docs/design/bible/sections/10-tokens.html`, `20-a11y.html`, `30-assets.html`, `40-perf.html`, `50-voice.html`; update `manifest.json`.

**Interfaces:**
- Consumes: Task 5 section injection markers; Task 6 lint.

- [ ] **Step 1: Write sections** (each starts `<h2 id="…">`). `10-tokens`: `<!--tokens-->`, `<!--contrast-->`, type scale sample, spacing/radius/motion samples, brand-red usage rules (black on red; large-only white). `20-a11y`: WCAG 2.2 AA + AAA-where-cheap playbook: landmarks (`header`, `nav`, `main`, `footer`), skip link, single `h1`, focus not obscured, target size ≥ 24px (44px preferred), forms/labels/errors, motion, dark/light/toggle, testing checklist (keyboard, screen reader, zoom 400%, no-JS). `30-assets`: self-host rules for icons (Lucide/Heroicons/Font Awesome as static inline SVG, licence log table), fonts, JS libs, images (formats, `srcset`, `alt` rules); replace PapaThemes/CDN list from the live-site findings. `40-perf`: page weight, LCP/CLS/INP targets, JS budget per page type (builder proposes numbers, marked as proposals). `50-voice`: tone, copy rules, imagery style, derived from live-site copy.
- [ ] **Step 2: Build and lint** `npm run build-bible && npm run check-bible` — Expected: exit 0.
- [ ] **Step 3: Visual check** in Chrome (light, dark, print preview) — Expected: swatches show real colours, no overflow at 375px width.
- [ ] **Step 4: Commit** `docs: add design bible foundations`

### Task 8: Components catalogue

**Files:**
- Create: `docs/design/bible/sections/60-components.html`; update `manifest.json`.

- [ ] **Step 1: Write entries** as `<article class="component" data-kind="static|island">`, each with: live sample in light and dark, `.no-js` behaviour, `.states` (default/hover/focus/disabled/loading/error/empty where relevant), `.a11y` notes, `.tokens-used`, and a "Decoration flow: second pass" placeholder where relevant. Entries: site header + skip link + landmarks, mega/mobile nav (`<details>`/CSS only), search form, buttons, form controls, product card, price, badge (sale/new), breadcrumbs, pagination, facet filter (links/forms; island enhancement), variant selector (existing `src/client/variantSelector`: static markup + `VariantEnhancer` island, link to its files), gallery, quantity + add-to-cart (form POST fallback), mini-cart (island), FAQ accordion (`<details>`), promo/spend-and-save banner, reviews block (static quotes), theme toggle (island), footer. Icons used are inline SVG.
- [ ] **Step 2: Build and lint** — Expected: exit 0.
- [ ] **Step 3: Visual check** (light/dark/print/375px) — Expected: no clipped samples, all focus rings visible via keyboard.
- [ ] **Step 4: Commit** `docs: add design bible components`

### Task 9: Page specs and islands/data map

**Files:**
- Create: `docs/design/bible/sections/70-pages-home.html`, `71-pages-category-search.html`, `72-pages-product.html`, `73-pages-cart.html`, `80-islands-data.html`; update `manifest.json`.

- [ ] **Step 1: Write page specs**: for each of Home, Category/search, Product, Cart/checkout entry: wireframe sample (HTML/CSS) at mobile and desktop, section order, components used (link to catalogue), data needs (front matter vs batched GraphQL), no-JS behaviour, a11y notes, perf notes, decoration placeholder. Home follows the live-site order (promo bar → hero → embroidery banner → categories → brands → featured/new → copy → trust → FAQ → reviews).
- [ ] **Step 2: Write `80-islands-data`**: table of every island (name, page, data, fallback, loading/error/empty states); the contract "server-prefetch via front matter, one batched and deduped GraphQL request per page"; request budget per page.
- [ ] **Step 3: Build and lint** — Expected: exit 0.
- [ ] **Step 4: Visual check** — Expected: wireframes readable at 375px and in print.
- [ ] **Step 5: Commit** `docs: add design bible page specs`

### Task 10: Wiring and docs

**Files:**
- Create: `docs/design/README.md`
- Modify: `package.json` (scripts already added in Tasks 3, 5, 6; add `"design": "npm run generate-design-tokens && npm run check-design-tokens && npm run build-bible && npm run check-bible"`), `CHANGELOG.md` (entry).

- [ ] **Step 1: Write `docs/design/README.md`**: how to edit tokens, run `npm run design`, where output lands, how to extend a section, the second-pass placeholders.
- [ ] **Step 2: Run full verification** `npm run test:unit && npm run design` — Expected: all PASS, exit 0.
- [ ] **Step 3: Confirm drift** `node scripts/generate-design-tokens.mjs --check` and review `configDrift` output with the user.
- [ ] **Step 4: Commit** `docs: document design bible workflow`

---

## Self-review notes

- Spec coverage: tokens (T2), contrast (T1, T3), generated SCSS/config (T4), web + print bible (T5), lint of a11y/no-CDN rules (T6), sections for tokens/a11y/assets/perf/voice (T7), components (T8), four pages + islands/data (T9), README/wiring (T10). Dark/light/toggle/reduced-motion in T4 and T5. Live-site gaps (landmarks, skip link, h1, CDN, PapaThemes) in T5–T7 and Global Constraints.
- Open for builder: dark palette values, perf numbers, final font, whether `dist/` is committed.
