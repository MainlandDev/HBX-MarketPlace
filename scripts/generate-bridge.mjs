// Generates assets/scss/settings/global/_css-vars.scss: every $variable in assets/scss/settings/_settings*.scss and _citadel-*.scss as a --sv-* custom property.
// --write  write the file; --check  fail if the file is stale.
import {readdirSync, readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import {isCurrent, onlyReferenced, renderBridge, scanMarkupSettings, scanReferences, scanSettingCalls, scanVariables, settingName} from "./tailwind/bridge.mjs";

// Every $variable declared in the theme or in the hoisted Citadel defaults is a candidate: spacing(), fontSize(), container() and screenSize() read
// variables declared in the Citadel files, and the theme settings do not redeclare most of them. All of them live in assets/scss.
const roots = [fileURLToPath(new URL("../assets/scss/", import.meta.url))];
const target = new URL("../assets/scss/settings/global/_css-vars.scss", import.meta.url);

const walk = (dir, extension = /\.scss$/) =>
    readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return walk(path, extension);
        return extension.test(entry.name) && entry.name !== "_css-vars.scss" ? [path] : [];
    });

// Theme settings sort first (declaration order only decides the order of the emitted properties). Of assets/scss only the settings files declare variables (the rest are entry points, helpers and generated files).
const isSettings = (path) => /[\\/]_(settings|citadel)(-[a-z]+)?\.scss$/.test(path);
const files = roots.flatMap((root) => walk(root).sort()).filter(isSettings).sort((a, b) => Number(/_citadel/.test(a)) - Number(/_citadel/.test(b))).map((path) => ({path, text: readFileSync(path, "utf8")}));
const {names, duplicates} = scanVariables(files);
const themeScss = walk(fileURLToPath(new URL("../assets/scss/", import.meta.url))).sort().map((path) => ({path, text: readFileSync(path, "utf8")}));
const config = JSON.parse(readFileSync(new URL("../config.json", import.meta.url), "utf8"));
// src/server holds the shared helpers (navParts, formParts) whose utilities read --sv-setting-* variables too.
const markup = ["../src/templates/", "../src/server/"].flatMap((dir) => walk(fileURLToPath(new URL(dir, import.meta.url)), /\.tsx$/).sort()).map((path) => ({path, text: readFileSync(path, "utf8")}));
const settingCalls = [...scanSettingCalls(themeScss), ...scanMarkupSettings([...markup, ...themeScss], config.settings)].filter((call, index, all) => all.findIndex((other) => settingName(other.fn, other.key) === settingName(call.fn, call.key)) === index);
// Only the variables a source file reads (var(--sv-NAME)) become custom properties: the other settings stay SCSS-only and cost no CSS.
const sources = [
    ...markup,
    ...["../src/", "../assets/js/"].flatMap((dir) => walk(fileURLToPath(new URL(dir, import.meta.url)), /.(ts|js)$/).sort()).map((path) => ({path, text: readFileSync(path, "utf8")})),
    ...themeScss.filter(({path}) => !/_css-vars.scss$/.test(path)),
];
const referenced = scanReferences(sources);
const scss = renderBridge(onlyReferenced(names, referenced), settingCalls);
console.log(`settings ${settingCalls.length}, declared ${names.length}, emitted ${onlyReferenced(names, referenced).length}, duplicates ${duplicates.length}${duplicates.length ? ` (${duplicates.join(", ")})` : ""}`);

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
