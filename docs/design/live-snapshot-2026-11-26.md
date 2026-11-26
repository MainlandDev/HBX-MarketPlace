# Live site snapshot, 2026-11-26 (home, desktop 1513px wide)

Measured in Edge with computed styles on https://www.onlineworkwear.com.au/.

| Element | Value |
| --- | --- |
| body | bg `rgb(242,242,242)` = `#F2F2F2`, colour `#000`, Poppins, 16px/24px, weight 400 |
| header | bg `rgb(238,7,0)` = `#EE0700`, height 122px, full width |
| h1 | font-size 0 (hidden), weight 700 (bible: replace with real visible h1) |
| h2 | 28px/35px, weight 400 |

Result of the token pass: every measured value already matches `docs/design/tokens.json` (bg, brand, text, Poppins, 16/24, h2 28/400), so no token values changed. The only gap was the self-hosted font (see `parity-deviations.md`). `config.json` colour drift reported by `node scripts/generate-design-tokens.mjs --check` is unchanged and still open for review.

Local theme before parity work (for contrast): white header with a centred logo and a four-row text nav (header about 467px tall) versus the live red 122px bar.
