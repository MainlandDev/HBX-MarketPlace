// Checks what the real build produced for the islands on the home page.
// Run after `npm run vite-build`: node scripts/check-islands.mjs
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html = readFileSync(new URL("../dist/templates/pages/home.html", import.meta.url), "utf8");

/** The marker element (opening tag and content) of the island exported as `name`. */
const island = (name) => {
    const match = new RegExp(String.raw`<vite-island [^>]*data-export="${name}"[^>]*>[\s\S]*?</vite-island>`).exec(html);
    assert.ok(match, `no <vite-island> for ${name} in dist/templates/pages/home.html (did vite-build run?)`);
    return match[0];
};

// Counter: a Handlebars value as a prop, so it renders on the client, with a placeholder and no-JS content.
const counter = island("Counter");
assert.match(counter, /data-hydrate="client"/, "a token prop must force client rendering");
assert.match(counter, /data-state="pending"/);
assert.match(counter, /data-props="&#123;&quot;start&quot;:\{\{json theme_settings\.homepage_featured_products_column_count\}\} \}"/,
    "the prop must be written as {{json ...}} with a space before the closing brace");
assert.match(counter, /<span data-island-placeholder="" style="display:contents"><button disabled="">…<\/button><\/span>/);
assert.match(counter, /<noscript><span>Enable JavaScript to use the counter\.<\/span><\/noscript>/);
assert.doesNotMatch(counter, /<template/, "there is no failed variant");
assert.match(counter, /data-has-noscript=""/, "an island with no-JS content must say so for the head style to find it");
assert.doesNotMatch(counter, /data-on-/, "an island with no conditions loads eagerly");

// CounterStatic: literal props, so it renders on the server; loads gradually, or at once if seen.
const staticIsland = island("CounterStatic");
assert.match(staticIsland, /data-hydrate="ssr"/);
assert.match(staticIsland, /data-on-visible="" data-on-idle="" data-on-any=""/);
assert.match(staticIsland, /<button>10<\/button>/, "server-rendered markup must be inside the marker");
assert.doesNotMatch(staticIsland, /data-state/, "a server-rendered island has no pending state");
assert.doesNotMatch(staticIsland, /data-has-noscript/, "a server-rendered island has no placeholder to hide");
assert.doesNotMatch(staticIsland, /onVisible|onIdle|onAny/, "conditions must not leak into the props");

// A production build stamps every marker with the build id of the islands entry.
const builds = [...html.matchAll(/data-build="([0-9a-f]{8})"/g)].map((m) => m[1]);
assert.equal(builds.length, 2, "both markers must carry a build id");
assert.equal(new Set(builds).size, 1);

// The scripts-off style: last in <head>, with its braces intact, in the layout every page extends.
const layout = readFileSync(new URL("../dist/templates/layout/base.html", import.meta.url), "utf8");
const head = layout.slice(0, layout.indexOf("</head>"));
assert.ok(
    head.endsWith("<noscript><style>vite-island[data-has-noscript]>[data-island-placeholder]{display:none!important}</style></noscript>"),
    "the layout must end its <head> with the islands <noscript><style> rule, braces unescaped",
);

console.log("islands: home page markup and the layout head style are as expected");
