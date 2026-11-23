// Generates assets/scss/settings/global/color/_design-tokens.scss from docs/design/tokens.json.
// --write  write the file; --check  fail if the file is stale; always prints config.json drift.
import {readFileSync, writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {configDrift, renderScss} from "./design-tokens/generate.mjs";
import {loadTokens} from "./design-tokens/load.mjs";

const target = new URL("../assets/scss/settings/global/color/_design-tokens.scss", import.meta.url);
const tokens = loadTokens();
const scss = renderScss(tokens);
const config = JSON.parse(readFileSync(new URL("../config.json", import.meta.url), "utf8"));

const drift = configDrift(tokens, config);
for (const d of drift) console.log(`config drift: ${d.key} is ${d.actual}, tokens say ${d.expected}`);

if (process.argv.includes("--write")) {
    writeFileSync(target, scss);
    console.log("wrote", fileURLToPath(target));
} else if (process.argv.includes("--check")) {
    let current = "";
    try {
        current = readFileSync(target, "utf8");
    } catch {}
    if (current !== scss) {
        console.error("_design-tokens.scss is stale: run node scripts/generate-design-tokens.mjs --write");
        process.exit(1);
    }
    console.log("_design-tokens.scss is up to date");
}
