# Design Bible: marketplace-hbx (onlineworkwear.com.au replacement)

Status: DRAFT, awaiting approval. Date: 2026-11-23.

## Intent and why

Replace onlineworkwear.com.au (AU workwear/uniform retailer: hi-vis, polos, pants, PPE; embroidery and printing) with an HBX theme that is static-first, accessible, resilient without JavaScript, and self-contained (no CDNs). Before building templates we need one authoritative reference that designers and builders (human and agent) work from: a "design bible" that is both readable on the web and printable, with real rendered samples.

## Goals

- One HTML+CSS design bible: tokens, components (with live samples), page specs, a11y playbook, asset policy, islands + data map, performance budget, content/brand voice.
- Web and print usable (`@media print` layout, page breaks, link URLs, no sample chrome clutter).
- Single token source (`tokens.json`) → generated SCSS/CSS custom properties, `config.json` defaults, and the bible's own swatches; build-time WCAG contrast check for every light/dark pair.
- Baseline WCAG 2.2 AA; AAA where cheap (measured by the contrast check).
- Pages designed first: Home, Category/search, Product, Cart/checkout entry.

## Non-goals (second pass / separate briefs)

- Decoration + branding (embroidery/printing) flow. Core to shopping, but needs this baseline first. Leave a marked placeholder per component/page.
- Marketing materials and third-party tracking (GTM, PostHog, Bing, Mailchimp): separate brief extending the decoration + branding doc.
- Tailwind migration (known gap, revisit later). Use existing SCSS (`assets/scss`) + theme config.
- Final font choice (decide later from Google fonts and default system fonts; self-hosted either way).

## Anti-goals

- Bible and code disagree (tokens duplicated by hand).
- A page that needs JS to browse or buy.
- Any runtime CDN dependency in the bible or the theme.
- Decorative motion that ignores `prefers-reduced-motion`.

## Constraints

- No new packages without approval; tooling is Node scripts in `scripts/`, plain HTML/CSS for the bible.
- Self-host icons (Lucide, Heroicons, Font Awesome), fonts, JS libs, images. Icons: static inline SVG at build, `aria-hidden` unless meaningful, `currentColor`.
- No-JS level: browse + buy works without JS; JS enhances only (filters via links/forms, add-to-cart via form POST, `<details>` for FAQ).
- Data: server-prefetch via page front matter; islands share one batched, deduped GraphQL request per page; each island defines loading/error/empty states.
- Themes: light, dark (`prefers-color-scheme`) and manual toggle (small island, persisted; no-JS follows OS), plus reduced-motion.
- Brand red `#EE0700` kept exactly. Measured contrast: black on red 4.67:1, white on red 4.50:1 (AA pass by 0.0008, AAA fails both). Prefer black text on red; white allowed at AA but fragile (no anti-aliasing/opacity headroom), so white only for large or bold text. Darker derived red for red text/links on light surfaces (red on white is also 4.50:1).
- Core tokens exposed in `config.json` (BC `theme_settings`); contrast validated at build.

## Findings from the live site (inspected 2026-11-23)

- Brand: header `#EE0700`; page bg `#F2F2F2`; text `#000`; accents amber `#FBBE24`, blue `#1F4FFF`, navy `#0023A3`, tint `#E5EBFF`; greys `#9C9C9C #E5E7EB #DDD #454545 #333`.
- Type: Poppins (Google Fonts) → Arial; 16/24 body; h2 28px/400. Font Awesome 6 via cdnjs.
- Third parties: Bing, GTM, PostHog, Mailchimp, BC checkout SDK, PapaThemes script, b-cdn.
- Home sections: spend-and-save banner (10/15/20% at $299/$499/$2399), hero, free embroidery set-up banner, category tiles (Mens/Womens), brand grid, featured/new tabs, copy blocks, trust points, FAQ (7), Google reviews, Organization JSON-LD.
- A11y gaps to fix: no `<main>`, no skip link, hidden (0px) h1, 11 footers, images missing `alt`.
- Replace: PapaThemes/third-party theme code, all CDNs.

## Approaches considered

| | Approach | Trade-off |
|---|---|---|
| A | Prose markdown only | Fast; tokens drift, contrast unchecked |
| **B (chosen)** | Docs + `tokens.json` + generated SCSS/config + contrast check | More up-front; docs, code, a11y claims can't disagree |
| C | Live style-guide page inside the theme | Great review; blocked on HBX build and design decisions |

Chosen: B, with the document format changed to a standalone HTML+CSS design bible (user's call).

## Proposed structure (my call, adjust freely)

```
docs/design/
  tokens.json                 single source (colour light/dark, type, space, radius, motion)
  bible/index.html            cover, TOC, version
  bible/css/bible.css         screen + print styles (own file; self-hosted fonts)
  bible/sections/*.html       tokens, components, pages/*, a11y, assets, islands-data, perf, voice
  bible/img, bible/icons      embedded assets
scripts/design-tokens.mjs     tokens.json → assets/scss/settings/_tokens.scss, config.json defaults,
                              bible swatch data, WCAG contrast report (fails on regression)
```

Sections are stitched into one printable page by a tiny build step (or a single long HTML file if simpler; builder's call). Component entries show: live sample (light/dark), static vs island, no-JS behaviour, states, a11y notes, tokens used, placeholder for decoration flow.

## Left to the builder

- Exact token names and scale values (derive from live site, run through contrast check).
- Dark palette values.
- Sample markup fidelity vs HBX output; section stitching mechanism.
- Print layout details (page size A4, margins, running headers).
- Font stack until fonts are chosen: system stack, with Poppins self-hosted as interim brand font.

## Open items

- Font choice (deferred by user).
- Decoration/branding and marketing briefs.
- Tailwind migration.
