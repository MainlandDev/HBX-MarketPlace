import {renderScss} from "./generate.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FRAGILE_BELOW = 4.6;

// The generated partial is SCSS; `//` comments are invalid in a plain <style> and would corrupt the next selector.
const plainCss = (scss) => scss.replace(/^[ \t]*\/\/.*\n/gm, "");

function renderSwatches(tokens) {
    const cards = Object.entries(tokens.colors).map(([name, v]) => {
        const note = v.note ? `<p class="swatch-note">${esc(v.note)}</p>` : "";
        return `<li class="swatch"><h3>${esc(name)}</h3>
<div class="swatch-pair">
<div><span class="chip" style="background:${v.light}" role="img" aria-label="${esc(name)} light ${v.light}"></span><code>${v.light}</code><small>light</small></div>
<div><span class="chip" style="background:${v.dark}" role="img" aria-label="${esc(name)} dark ${v.dark}"></span><code>${v.dark}</code><small>dark</small></div>
</div>${note}</li>`;
    });
    return `<ul class="swatches">${cards.join("\n")}</ul>`;
}

function renderContrast(report) {
    const body = report.map((r) => {
        const note = !r.aa ? "fails AA" : r.ratio < FRAGILE_BELOW ? "fragile pass: use large or bold text only" : r.aaa ? "AAA" : "";
        return `<tr><td>${esc(r.label)}</td><td>${r.theme}</td><td>${r.ratio.toFixed(2)}:1</td><td>${r.aa ? "pass" : "<strong>FAIL</strong>"}</td><td>${r.aaa ? "pass" : "no"}</td><td>${note}</td></tr>`;
    });
    return `<table class="contrast"><caption>Contrast of every token pair, per theme. Non-text pairs use the large-text 3:1 threshold.</caption>
<thead><tr><th scope="col">Pair</th><th scope="col">Theme</th><th scope="col">Ratio</th><th scope="col">AA</th><th scope="col">AAA</th><th scope="col">Note</th></tr></thead>
<tbody>${body.join("\n")}</tbody></table>`;
}

const THEME_SCRIPT = `(function(){var b=document.querySelector('[data-theme-toggle]');if(!b)return;var order=['auto','light','dark'];var cur='auto';try{cur=localStorage.getItem('bible-theme')||'auto'}catch(e){}
function apply(){if(cur==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',cur);b.textContent='Theme: '+cur;b.setAttribute('aria-label','Theme: '+cur+'. Activate to change.')}
b.hidden=false;apply();b.addEventListener('click',function(){cur=order[(order.indexOf(cur)+1)%3];try{localStorage.setItem('bible-theme',cur)}catch(e){}apply()})})();`;

export function checkManifest(manifest, files) {
    const seen = new Set();
    for (const name of manifest) {
        if (seen.has(name)) throw new Error(`duplicate manifest entry: ${name}`);
        seen.add(name);
    }
    for (const file of files) {
        const name = file.replace(/\.html$/, "");
        if (file.endsWith(".html") && !seen.has(name)) throw new Error(`section not in manifest: ${name}`);
    }
}

export function assembleBible({manifest, readSection, tokens, report, css}) {
    const sections = manifest.map((name) => {
        let html;
        try {
            html = readSection(name);
        } catch (error) {
            if (error.code === "ENOENT") throw new Error(`section missing: ${name}`);
            throw error;
        }
        return html.replace("<!--tokens-->", () => renderSwatches(tokens)).replace("<!--contrast-->", () => renderContrast(report));
    });
    const body = sections.join("\n");
    const toc = [...body.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => `<li><a href="#${m[1]}">${m[2].replace(/<[^>]+>/g, "")}</a></li>`);
    return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Online Workwear Design Bible</title>
<style>
${plainCss(renderScss(tokens, {bible: true}))}
${css}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
<span class="bar-title">Online Workwear Design Bible</span>
<button type="button" class="theme-toggle" data-theme-toggle hidden>Theme: auto</button>
</header>
<nav class="toc" aria-label="Contents"><ol>${toc.join("")}</ol></nav>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="foot"><p>Generated from docs/design/tokens.json. Edit the sources, not this file.</p></footer>
<script>${THEME_SCRIPT}</script>
</body>
</html>
`;
}
