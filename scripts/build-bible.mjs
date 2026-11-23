// Builds docs/design/bible/dist/design-bible.html. Run: npm run build-bible
import {mkdirSync, readdirSync, readFileSync, writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {assembleBible, checkManifest} from "./design-tokens/bible.mjs";
import {loadTokens} from "./design-tokens/load.mjs";
import {buildReport} from "./design-tokens/report.mjs";

const root = new URL("../docs/design/bible/", import.meta.url);
const tokens = loadTokens();
const manifest = JSON.parse(readFileSync(new URL("manifest.json", root), "utf8"));
checkManifest(manifest, readdirSync(new URL("sections/", root)));
const html = assembleBible({
    manifest,
    readSection: (name) => readFileSync(new URL(`sections/${name}.html`, root), "utf8"),
    tokens,
    report: buildReport(tokens),
    css: readFileSync(new URL("bible.css", root), "utf8"),
});
mkdirSync(new URL("dist/", root), {recursive: true});
const out = new URL("dist/design-bible.html", root);
writeFileSync(out, html);
console.log("wrote", fileURLToPath(out), `${(html.length / 1024).toFixed(1)} KiB`);
