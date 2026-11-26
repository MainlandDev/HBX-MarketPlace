# Visual parity deviations

Where the theme intentionally differs from https://www.onlineworkwear.com.au/ (bible wins on structure, a11y, self-hosted assets, no-JS; live site wins on colours, spacing, layout, imagery). Plan: `docs/superpowers/plans/2026-11-26-visual-parity.md`.

Baseline (2026-11-26, before any parity change): `npm run design` passes (32 pairs AA), `npx vitest run scripts` 100/100.

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Fonts | Poppins from Google Fonts CDN | Poppins self-hosted (`assets/fonts/poppins-*-latin.woff2`, 400/500/600/700, latin subset, OFL). BigCommerce still injects a Google Fonts `<link>` (config `body-font` Karla / `headings-font` Montserrat) and `assets/js/theme/common/font.js` requires it, so the platform request stays until that loader is retired | No runtime CDN |
| Header: nav | Row 2 shows a Categories button (mega menu), SALE, SERVICES, CATALOGUES, HELP & SUPPORT, mail/phone icons, Facebook/Instagram icons | Categories is a `<details>` that opens without JS; the category list sits in a 260px panel and children keep the existing Foundation sub-menus. Links are the store's nav pages. Mail, phone and social icons not done yet | No-JS browse; real store content |
| Header: search | Pill input plus magnifier button, always visible | Same at 801px and up. Below that the existing quick-search toggle stays. The form now has `action` and `method="get"` with `name="search_query"` so it works without JS (it was input-only) | No-JS browse |
| Header: colours | White text on `#EE0700` | White only on bold uppercase links (bible allows white on brand only for large/bold text, 4.50:1). Cart pill and search button use new token `brandDark` `#B30000` (white 7.2:1). Edge dark mode darkens the Categories button and panel (live has no dark mode) | AA contrast; light/dark themes |
| Header: legacy CSS | Store CSS styles bare `details` and `summary` | Overridden with scoped utilities on the Categories toggle | Static-first |
| Header: not yet | "Sign in / Register" stacked beside a user icon; yellow promo strip with countdown (store banner region); page bg `#F2F2F2` | Text links "Account / Sign out"; promo strip arrives with the Home banner work; page bg is still white here | Open: Task 4b and a global bg pass |
