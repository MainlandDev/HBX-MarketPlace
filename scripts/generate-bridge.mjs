// Generates assets/scss/settings/global/_css-vars.scss: every $variable in assets/scss/settings as a --sv-* custom property.
// --write  write the file; --check  fail if the file is stale.
import {readdirSync, readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import {isCurrent, renderBridge, scanMarkupSettings, scanSettingCalls, scanVariables, settingName} from "./tailwind/bridge.mjs";

// The theme's settings first (its value wins for a duplicate name, as in Sass), then Citadel's global settings: spacing(), fontSize(),
// container() and screenSize() read variables declared there, and the theme settings do not redeclare most of them.
const roots = [
    fileURLToPath(new URL("../assets/scss/settings/", import.meta.url)),
    fileURLToPath(new URL("../node_modules/@bigcommerce/citadel/dist/settings/global/", import.meta.url)),
];
const target = new URL("../assets/scss/settings/global/_css-vars.scss", import.meta.url);

const walk = (dir, extension = /\.scss$/) =>
    readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return walk(path, extension);
        return extension.test(entry.name) && entry.name !== "_css-vars.scss" ? [path] : [];
    });

const files = roots.flatMap((root) => walk(root).sort()).map((path) => ({path, text: readFileSync(path, "utf8")}));
const {names, duplicates} = scanVariables(files);
const themeScss = walk(fileURLToPath(new URL("../assets/scss/", import.meta.url))).sort().map((path) => ({path, text: readFileSync(path, "utf8")}));
const config = JSON.parse(readFileSync(new URL("../config.json", import.meta.url), "utf8"));
// src/server holds the shared helpers (navParts, formParts) whose utilities read --sv-setting-* variables too.
const markup = ["../src/templates/", "../src/server/"].flatMap((dir) => walk(fileURLToPath(new URL(dir, import.meta.url)), /\.tsx$/).sort()).map((path) => ({path, text: readFileSync(path, "utf8")}));
const settingCalls = [...scanSettingCalls(themeScss), ...scanMarkupSettings([...markup, ...themeScss], config.settings)].filter((call, index, all) => all.findIndex((other) => settingName(other.fn, other.key) === settingName(call.fn, call.key)) === index);
const scss = renderBridge(names, settingCalls);
console.log(`settings ${settingCalls.length}, declared ${names.length}, duplicates ${duplicates.length}${duplicates.length ? ` (${duplicates.join(", ")})` : ""}`);

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
