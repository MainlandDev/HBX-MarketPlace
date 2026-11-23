// Generates assets/scss/settings/global/_css-vars.scss: every $variable in assets/scss/settings as a --sv-* custom property.
// --write  write the file; --check  fail if the file is stale.
import {readdirSync, readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import {isCurrent, renderBridge, scanVariables} from "./tailwind/bridge.mjs";

const settings = fileURLToPath(new URL("../assets/scss/settings/", import.meta.url));
const target = new URL("../assets/scss/settings/global/_css-vars.scss", import.meta.url);

const walk = (dir) =>
    readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return walk(path);
        return entry.name.endsWith(".scss") && entry.name !== "_css-vars.scss" ? [path] : [];
    });

const files = walk(settings).sort().map((path) => ({path, text: readFileSync(path, "utf8")}));
const {names, duplicates} = scanVariables(files);
const scss = renderBridge(names);
console.log(`declared ${names.length}, duplicates ${duplicates.length}${duplicates.length ? ` (${duplicates.join(", ")})` : ""}`);

if (process.argv.includes("--write")) {
    writeFileSync(target, scss);
    console.log("wrote", fileURLToPath(target));
} else if (process.argv.includes("--check")) {
    let current = "";
    try {
        current = readFileSync(target, "utf8");
    } catch {}
    if (!isCurrent(current, scss)) {
        console.error("_css-vars.scss is stale: run npm run generate-bridge");
        process.exit(1);
    }
    console.log("_css-vars.scss is up to date");
}
