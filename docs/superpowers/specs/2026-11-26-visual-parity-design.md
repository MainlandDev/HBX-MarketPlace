# Visual parity with onlineworkwear.com.au

Status: DRAFT, awaiting approval. Date: 2026-11-26.

## Intent and why

The theme is functionally converted (HBX + Tailwind). Next step: make it look like the production site, https://www.onlineworkwear.com.au/, so it can replace it. Visual parity is the goal; the pulled theme at `D:\webstorm\@beren\onlineworkwear\test-marketplace\OWW-Theme-Marketplace` is a reference only (its syntax is legacy and is not ported).

## Goals

- Each converted page/section matches the live site's colours, type, spacing, layout and imagery at 375 / 768 / 1280 px.
- Built from the design bible's rules and tokens, in TSX + Tailwind using existing theme names.
- Every intentional difference from the live site is logged.

## Non-goals

- Porting SCSS or markup from the pulled theme.
- Decoration/branding flow, marketing/tracking (separate briefs, per the bible).
- Pages beyond the agreed order until Header/Footer/Home are signed off (Category, Product, Cart, then the rest are later phases).

## Anti-goals

- Parity achieved by breaking a bible rule silently (hidden h1, CDN assets, JS-required browsing).
- Reintroducing legacy SCSS or one-off hex values outside `tokens.json`.

## Constraints

- Conflict rule (user's call): the bible wins on structure, a11y, self-hosted assets and no-JS; the live site wins on colours, spacing, layout, imagery.
- Work in a git worktree; no commits/pushes unless asked; no new packages without approval.
- Verify in the user's Edge via the claude-in-chrome driver at `http://localhost:5173/` (never add to cart or submit forms). Viewport cannot resize: use the same-origin iframe helper (`npm run tw-helper`).
- Reuse existing Tailwind names (see `docs/design/tailwind-handoff.md`); promote new ones by the stated rule. `rem` is 14px.
- Brand red `#EE0700` exact; contrast checks (`npm run design`) must stay green.

## Approaches

| | Approach | Trade-off |
|---|---|---|
| **A+B (chosen)** | Token pass, then per-section measure-and-rebuild | Slower; real parity and clean code |
| A only | Skip tokens | Repeats values per section |
| C | Port pulled-theme SCSS | Brings legacy back; rejected |

## Phases

0. **Tokens.** Diff `tokens.json`/`config.json` against live computed styles (colours, Poppins type scale, radii, spacing); update tokens, run `npm run design`. Resolve the known `config.json` drift reported by `--check`.
1. **Header and footer** (global chrome): promo/spend-and-save bar, logo, search, cart, nav; single footer. Landmarks and skip link per bible.
2. **Home** sections in live order: hero, embroidery banner, category tiles, brand grid, featured/new tabs, copy blocks, trust points, FAQ, reviews.
3. Later, separate sign-off each: Category/search, Product, Cart.

## Per-section loop

1. Snapshot live section in Edge (screenshot + computed styles at 3 widths).
2. Rebuild the TSX with Tailwind/tokens (consult the pulled theme only for ambiguity).
3. Snapshot the local section; compare (`tw-diff`, visual check); iterate.
4. Record deviations in `docs/design/parity-deviations.md` (section, live behaviour, ours, bible rule).
5. Stop for user review before the next section.

## Left to the builder

Exact token values, fonts (Poppins self-hosted as the interim brand font), image sourcing (self-hosted copies of live imagery, with `alt` text), section-level component splitting.

## Open items

- Final font choice (deferred in the bible).
- Where live imagery comes from (needs the user's or the store's assets if not downloadable).
- Dark-mode palette appearance is bible-defined; live site has none.
