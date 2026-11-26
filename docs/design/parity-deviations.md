# Visual parity deviations

Where the theme intentionally differs from https://www.onlineworkwear.com.au/ (bible wins on structure, a11y, self-hosted assets, no-JS; live site wins on colours, spacing, layout, imagery). Plan: `docs/superpowers/plans/2026-11-26-visual-parity.md`.

Baseline (2026-11-26, before any parity change): `npm run design` passes (32 pairs AA), `npx vitest run scripts` 100/100.

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Fonts | Poppins from Google Fonts CDN | Poppins self-hosted (`assets/fonts/poppins-*-latin.woff2`, 400/500/600/700, latin subset, OFL). BigCommerce still injects a Google Fonts `<link>` (config `body-font` Karla / `headings-font` Montserrat) and `assets/js/theme/common/font.js` requires it, so the platform request stays until that loader is retired | No runtime CDN |
