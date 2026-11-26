# Visual Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make header, footer and Home look like https://www.onlineworkwear.com.au/ while following the design bible.

**Architecture:** Retune `docs/design/tokens.json` to live-site values, then rebuild each section's TSX with Tailwind (existing theme names) and verify side by side in Edge. The pulled theme at `D:\webstorm\@beren\onlineworkwear\test-marketplace\OWW-Theme-Marketplace` is read-only reference; nothing is ported from it.

**Tech Stack:** HBX TSX (`src/templates`), Tailwind 4, `tokens.json` -> generated SCSS, Vite dev server (`npm run vite-dev`, `http://localhost:5173/`), claude-in-chrome driver in the user's Edge, `npm run design`, `npm run tw-helper`, `npm run tw-diff`.

**Spec:** `docs/superpowers/specs/2026-11-26-visual-parity-design.md`

## Global Constraints

- Conflict rule: bible wins on structure, a11y, self-hosted assets, no-JS; live site wins on colours, spacing, layout, imagery.
- Brand red `#EE0700` exact; `npm run design` (WCAG AA contrast) must stay green after every change.
- Work in a git worktree (`superpowers:using-git-worktrees`). No commits/pushes beyond the per-section commits below; no new packages; no secrets printed.
- Reuse existing Tailwind names (`docs/design/tailwind-handoff.md`: `bg-brand`, `text-on-brand`, `p-half`, `rounded-card`, ...). `rem` = 14px. Breakpoints: 320/481/551/801/1261/1441.
- No CDN assets at runtime; Poppins self-hosted (interim brand font). Icons: inline SVG, `aria-hidden` unless meaningful. All images get `alt`.
- Exactly one `<h1>` per page, `<main>` landmark, skip link, one footer. No-JS browse and buy works.
- Edge only (never headless Chrome); never add to cart or submit forms; widths 375/768/1280 via same-origin iframe helper.
- Keep class names that JS or specs select; do not delete selector hooks (`docs/design/legacy-hooks.md`).
- Scratch files go in the session scratchpad, not the repo.

## Review Focus

- Live site changes between inspection and build: re-snapshot before each section, never rely on 2026-11-23 findings alone.
- Missing/undownloadable live imagery: section renders with a sized placeholder and `alt`, no layout shift, and is listed in deviations.
- Dark mode (`prefers-color-scheme`): every restyled section stays legible (pairs in `tokens.json`).
- 375px overflow: no horizontal scroll on any converted section.
- Reduced motion: no autoplay carousel; hover/transition effects respect `prefers-reduced-motion`.

---

### Task 0: Worktree and baseline

**Files:**
- Create: `docs/design/parity-deviations.md` (table header: Section | Live behaviour | Ours | Bible rule)

**Interfaces:**
- Produces: worktree branch `parity/visual`; empty deviations log used by Tasks 1-4.

- [ ] **Step 1:** Create worktree `parity/visual` from `hbx-conversion` via `superpowers:using-git-worktrees`; run `npm install` only if `node_modules` is absent (junction/link otherwise).
- [ ] **Step 2:** Run `npm run design` and `npx vitest run scripts`; Expected: both pass (baseline recorded in the deviations file's top note).
- [ ] **Step 3:** Start `npm run vite-dev`; in Edge open `http://localhost:5173/`, confirm Home renders and the helper from `npm run tw-helper -- "body"` runs in the page.
- [ ] **Step 4:** Create the deviations file with the header row. Commit `docs: add parity deviations log`.

### Task 1: Token pass (phase 0)

**Files:**
- Modify: `docs/design/tokens.json`, `config.json` (colour defaults only if drift report says so)
- Regenerates: `assets/scss/settings/global/color/_design-tokens.scss`, `_css-vars.scss`
- Create: `docs/design/live-snapshot-2026-11-26.md` (measured live values)

**Interfaces:**
- Consumes: Task 0 worktree.
- Produces: token names used by Tasks 2-4. Any new token must be added to `tokens.json` with `light` and `dark` and listed in `pairs` if used as text/background.

- [ ] **Step 1:** In Edge on the live site, via `javascript_tool`, collect computed styles for: body (bg, colour, font-family, size/line-height), h1-h3, header bar, primary button, link, card, footer. Write values to the snapshot file.
- [ ] **Step 2:** Diff snapshot against `tokens.json` (colours, type scale, radius, spacing). Edit `tokens.json` for differences; brand red stays `#EE0700`.
- [ ] **Step 3:** Run `node scripts/generate-design-tokens.mjs --check`; resolve each reported `config.json` drift by hand after review (list decisions in the snapshot file).
- [ ] **Step 4:** Run `npm run design`; Expected: tokens generated, contrast check passes (AA), bible builds and lints. If a new pair fails AA, adjust the derived colour, not the brand red.
- [ ] **Step 5:** Self-host Poppins (weights 400/500/600/700, woff2, latin) under `assets/fonts/`, `font-display: swap`, wired through the existing font setting; verify Network tab shows no request to fonts.googleapis.com/gstatic.
- [ ] **Step 6:** Commit `feat: retune design tokens to live site`.

### Task 2: Header (phase 1a)

**Files:**
- Modify: `src/templates/components/common/header.tsx`, `quick-search.tsx`, `store-logo.tsx`, `navigation*.tsx`, `src/templates/layout/base.tsx` (skip link, `<main>`)
- Modify: `docs/design/parity-deviations.md`

**Interfaces:**
- Consumes: Task 1 tokens.
- Produces: `header.tsx` default export unchanged (props contract preserved); landmarks `header`, `nav`, `main`.

- [ ] **Step 1:** Snapshot the live header (promo/spend-and-save bar, logo, search, account, cart, nav; also open menu state) at 375/768/1280: screenshots plus computed styles into the scratchpad.
- [ ] **Step 2:** Snapshot the local header the same way; list differences.
- [ ] **Step 3:** Rebuild `header.tsx` (+ search/logo/nav) with Tailwind and tokens to match. Mobile menu uses `<details>` or existing no-JS pattern; promo bar content from theme settings, not hard-coded. Keep selector-hook class names.
- [ ] **Step 4:** Verify in Edge: at each width, header height, colours (`bg-brand`, `text-on-brand`), font sizes and spacing within 1px of live (`npm run tw-diff -- before.json after.json` for local-before/local-after; live comparison by eye plus measured values). No horizontal scroll at 375; keyboard tab order matches visual; focus visible; dark mode legible.
- [ ] **Step 5:** Log deviations; run `npm run design`; commit `feat: header visual parity`. **Stop for user review.**

### Task 3: Footer (phase 1b)

**Files:**
- Modify: `src/templates/components/common/footer.tsx`, `social-links.tsx`, `payment-icons.tsx`, `subscription-form.tsx`
- Modify: `docs/design/parity-deviations.md`

**Interfaces:**
- Consumes: Tasks 1-2. Produces: single `<footer>` landmark used by every page.

- [ ] **Step 1-2:** Snapshot live and local footer (columns, links, newsletter, payment icons, social, legal) at 375/768/1280.
- [ ] **Step 3:** Rebuild `footer.tsx` and children to match; exactly one `<footer>`; newsletter form posts without JS and each control has a label; icons inline SVG.
- [ ] **Step 4:** Verify in Edge as Task 2 step 4 (do not submit the newsletter form). Commit `feat: footer visual parity`. **Stop for user review.**

### Task 4: Home sections (phase 2)

One sub-task per section, in live order; each follows the same loop (snapshot live, snapshot local, rebuild, verify, log, commit, stop for review). One commit per section: `feat: home <section> visual parity`.

**Files:**
- Modify: `src/templates/pages/home.tsx`; create section components under `src/templates/components/home/<section>.tsx` where `home.tsx` would otherwise exceed one screen of markup per section; reuse `carousel*.tsx`, `components/brand`, `components/products` card.
- Modify: `docs/design/parity-deviations.md`

**Interfaces:**
- Consumes: Tasks 1-3. Each section component takes its data from existing home page context/front matter (no new client requests).

Sections, in order:
- [ ] **4a Hero** (the page's only `<h1>`, real text over image, `fetchpriority="high"`, sized, no autoplay).
- [ ] **4b Embroidery banner and spend-and-save promo.**
- [ ] **4c Category tiles** (Mens/Womens groups; 6 per row desktop).
- [ ] **4d Brand grid** (8 per row desktop, links with `alt`).
- [ ] **4e Featured/new products tabs** (anchor-linked sections without JS; product card parity).
- [ ] **4f Copy blocks and trust points.**
- [ ] **4g FAQ** (`<details>`, 7 questions) **and reviews.**
- [ ] **4h Home-wide pass:** Lighthouse via `lighthouse-config.js` for performance/a11y (target: a11y 100 on Home, no CLS from images); Organization JSON-LD retained; `npm run design` green.

Per-section verification (every sub-task): widths 375/768/1280 match live within 1px for layout boxes and exact for colours/font sizes; no horizontal scroll; dark mode legible; reduced motion respected; images have `alt`; undownloadable imagery uses a sized placeholder and is logged.

### Task 5: Wrap-up

- [ ] **Step 1:** Update `docs/design/README.md` (parity status, new files) and `CHANGELOG.md` (user-visible look changes).
- [ ] **Step 2:** Re-run `npm run design`, `npx vitest run scripts`, `npm run build`-equivalent theme build (per `package.json`); Expected: all pass. Report any failure verbatim.
- [ ] **Step 3:** Summarise deviations and open items (imagery, Category/Product/Cart phases) for the user; offer HANDOFF.md.
