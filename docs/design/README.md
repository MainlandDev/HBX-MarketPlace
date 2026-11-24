# Design bible

The single design reference for the marketplace-hbx theme (replacement for onlineworkwear.com.au). It is an HTML + CSS document for web and print, with live samples in light and dark.

- Output: `docs/design/bible/dist/design-bible.html` (committed). Open it directly, or print it (A4).
- Source of truth for tokens: `docs/design/tokens.json`. Never copy token values by hand.
- Spec and plan: `docs/superpowers/specs/2026-11-23-design-bible-design.md`, `docs/superpowers/plans/2026-11-23-design-bible.md`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run design` | Generate SCSS tokens, check contrast, build the bible, lint it |
| `npm run generate-design-tokens` | Write `assets/scss/settings/global/color/_design-tokens.scss` |
| `node scripts/generate-design-tokens.mjs --check` | Fail if the SCSS is stale; prints `config.json` colour drift |
| `npm run check-design-tokens` | Fail if any token pair misses WCAG AA (AAA is reported) |
| `npm run build-bible` / `npm run check-bible` | Build / lint the document |
| `npm run generate-bridge` / `npm run check-bridge` | Write / check `assets/scss/settings/global/_css-vars.scss` (SCSS variables as `--sv-*`) |
| `npm run tw-diff -- before.json after.json` | Compare two computed-style snapshots (see `tailwind-playbook.md`) |
| `npm run tw-inventory` / `-- --classes <partial>` | SCSS partials by size, classes defined and files still using them |
| `npm run tw-helper -- "<root>"` | Print the in-page parity helper to run in Edge |
| `npx vitest run scripts` | Unit tests for the tooling |

## Editing

- Colours, type, space, radius, motion: edit `tokens.json`, then `npm run design`. Every colour needs `light` and `dark`; list new text/background combinations in `pairs` so they are contrast-checked.
- Content: edit `docs/design/bible/sections/*.html` and list new sections in `docs/design/bible/manifest.json` (order is document order). A section starts with `<h2 id="...">` to appear in the contents.
- Component entries are `<article class="component" data-kind="static|island">` and must contain `.no-js`, `.states`, `.a11y` and `.tokens-used` blocks (the lint enforces this).
- Examples of external URLs in prose must be escaped (`&lt;script src="https://..."&gt;`); real tags may not load anything external.

## Open items

- Final font (interim: system stack; Poppins is the live-site font). Self-host when chosen.
- Decoration and branding (embroidery, printing) and marketing/tracking: separate briefs.
- `config.json` colour defaults differ from the tokens (reported by `--check`); update by hand after review.
- Tailwind migration: in progress, see `docs/design/tailwind-playbook.md`.
