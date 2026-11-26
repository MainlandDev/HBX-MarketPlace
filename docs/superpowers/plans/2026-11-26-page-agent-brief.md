# Page parity brief (for page agents)

Goal: make your pages look like the same pages on https://www.onlineworkwear.com.au/ ("live") while following the design bible. The Home page, header and footer are already done and are your reference for the method and the visual language. Read these first, in order:

1. `docs/superpowers/specs/2026-11-26-visual-parity-design.md` (goals, conflict rule)
2. `docs/design/parity-deviations.md` (what was done and why on header, footer, Home)
3. `docs/design/README.md` and `docs/design/bible/sections/7x-pages-*.html` for your page type (the bible's page specs)
4. `docs/design/tailwind-handoff.md` ("Existing theme names" and "Lessons")

## Conflict rule (decided by the user)

The bible wins on structure, a11y, self-hosted assets and no-JS. The live site wins on colours, spacing, layout and imagery. Log each intentional difference.

## How to work

1. Snapshot the live page in Edge (claude-in-chrome driver; load tools with ToolSearch `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__tabs_close_mcp` in ONE call). Call `tabs_context_mcp` first, then open YOUR OWN tab with `tabs_create_mcp`. Never use or close another agent's tab or tab 1893852051. Close your tab when done.
2. Open the same page locally: `http://localhost:5173/<path>` (signed in as the user) or `http://[::1]:5173/<path>` (separate cookies = signed out/guest). Compare screenshots and measure computed styles (`getComputedStyle`, `getBoundingClientRect`) at desktop (the window is about 1513px wide). For 375/768 use a hidden same-origin iframe of the page and read `contentDocument` (see how horizontal overflow was checked: `scrollWidth` equals `clientWidth`).
3. Edit the TSX under `src/templates/...` with Tailwind classes using existing theme names and tokens. Reuse tokens (`bg-brand`, `bg-brand-dark`, `text-on-brand`, `bg-white`, `text-ink`, `text-ink-muted`, `border-ink-border`, `rounded-card`, spacing names `p-half` etc., `--sv-*` bridge vars). `rem` is 14px. Breakpoints: small 551, medium 801, large 1261.
4. Reload and compare again. Iterate until a reasonable likeness. Do not chase sub-pixel differences or third-party iframes (PayPal etc.).
5. Verify before reporting: `npx tsc -p tsconfig.app.json --noEmit` (must print nothing), no horizontal overflow at 375/768, one `<h1>`, images have `alt`, controls have labels, visible focus.

## Hard rules

- Work only in this worktree. The dev server is already running on port 5173 and rebuilds on save. DO NOT restart it or change `config.json`, `tokens.json`, `theme.scss`, `assets/scss/vendor/oww/*`, `assets/scss/tailwind/_tailwind.scss`, `src/templates/components/common/header.tsx`, `footer.tsx`, `navigation*.tsx` or `src/templates/layout/*` (shared; another agent or the lead owns them). If you need a change there, describe it in your report instead.
- NEVER add to the cart, submit a form, sign in or out, delete anything, or change account data. Browse and read only.
- Do NOT run git add/commit/stash/checkout. The lead commits. Do not install packages.
- Only edit files in YOUR group (listed in your task). Keep class names that JS or specs select (`docs/design/legacy-hooks.md`); only change styling classes.
- Scratch files go in the session scratchpad, never in the repo.
- Write your deviations (live behaviour vs ours and the bible rule) to `docs/design/parity-deviations-<your group>.md` as a table (Section | Live behaviour | Ours | Bible rule). Do not edit `parity-deviations.md`.

## Lessons from Home (save yourself an hour)

- The Edit tool strips TRAILING spaces from `old_string`/`new_string`. A replacement ending in a space glues two classes together (`flexcursor-pointer`). Anchor edits on text in the middle of a string, or write a small Node script (files may use CRLF: normalise `\r\n` first and restore it).
- Right after an edit the first `navigate` often fails while the server rebuilds. Just navigate again.
- The `javascript_tool` output filter blocks results that contain URLs or query strings. Return plain numbers and short names.
- Store-injected HTML (regions, page-builder widgets, merchant content) is styled by the merchant CSS ported to `assets/scss/vendor/oww/_oww-custom.scss`. If store markup on your page is unstyled, report which class hooks are missing; do not edit that file.
- Store CSS styles bare `details`/`summary` (adds margins, backgrounds, a "❯" pseudo-element): override with scoped utilities (`m-0 p-0 bg-transparent before:[display:none]`).
- A utility named like a legacy class (`hidden`, `block`, `table`, `container`) restyles legacy elements: use arbitrary properties (`[display:none]`).
- Tailwind `important` is on, so utilities beat store CSS. Descendant selectors like `[&_.x]:...` have higher specificity than a utility on the element itself.
- `[:where(&)]:...` classes in shared parts are zero-specificity defaults; override them with normal utilities.
- The user's Edge is in dark mode. Legacy page text does not follow the dark tokens, so keep light-only surfaces (cards) on the fixed `ink`/`white` tokens, as the product card does.
- Live compares: the live header is sticky red with Categories; cards are white, 10px radius, 0.8px `#ddd` border, `0 3px 5px #ddd` shadow, 12px padding; buttons are red pills with bold text; page background is `#F2F2F2`.

## Report back (short)

For each page: what you changed (files), what still differs and why, verification results (tsc, widths), and any shared-file changes you need from the lead. Under 250 words.
