# Parity deviations: content and utility pages

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Generic page heading | Left aligned, 25px, black | Same (`page.tsx`); other utility pages (404, 403, generic, subscribed, gift certificates) keep a centred 25px black heading | Semantic single h1 |
| Page content width | Full container width, left aligned, 18px body paragraphs | Same | Keep `main` landmark |
| Sub-page nav (`navBar--sub`) | Not shown | Kept in markup, `display:none` | Structure kept, links reachable via header menu |
| Contact us | Live `/contact-us/` is a 404 (real page is `/contact-support/`, store-authored) | Form styled with theme form parts, max 680px, not compared | Every control labelled |
| 404 | Centred heading/message, wide pill search input (50px, #b30000 border) and red pill button | Same via descendant selectors on `SearchBox` | Labelled search input (visually hidden label) |
| Sitemap | Centred h1, white card, bold h2 sections, red underlined links, circle/square lists, no breadcrumb | Same, wrapped in `<main>` | Landmark added |
| Gift certificate balance | n/a | Inner balance `h1` changed to `h2` (one h1 per page) | One h1 |
| Breadcrumbs | Left aligned, small grey, uppercase | Centred (shared `components/common/breadcrumbs.tsx`, not editable here) | Needs lead change |
| Blog | Store has no blog in nav | Not changed | n/a |
