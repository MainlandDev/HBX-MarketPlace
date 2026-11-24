// SCSS partial -> classes -> markup consumers. Run: npm run tw-inventory
//   npm run tw-inventory                          table of partials, biggest first
//   npm run tw-inventory -- --classes <substring> every class of the matching partials with the files that still use it
import {readdirSync, readFileSync, statSync} from "node:fs";
import {join, relative} from "node:path";
import {buildInventory, withoutShadowedHtml} from "./tailwind/inventory.mjs";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SKIP = /node_modules|[\\/]dist[\\/]|\.test\.|\.d\.ts$/;

const walk = (dir, test) => {
    let entries = [];
    try {
        entries = readdirSync(dir);
    } catch {
        return [];
    }
    return entries.flatMap((name) => {
        const path = join(dir, name);
        if (SKIP.test(path)) return [];
        return statSync(path).isDirectory() ? walk(path, test) : test.test(path) ? [path] : [];
    });
};
const load = (paths) => paths.map((path) => ({path: relative(root, path).split("\\").join("/"), text: readFileSync(path, "utf8")}));

const scssFiles = load(["assets/scss/components", "assets/scss/layouts", "assets/scss/common"].flatMap((dir) => walk(join(root, dir), /\.scss$/)));
const sourceFiles = withoutShadowedHtml(load(["src", "templates", "assets/js"].flatMap((dir) => walk(join(root, dir), /\.(tsx?|jsx?|html)$/))));
const rows = buildInventory({scssFiles, sourceFiles}).map((row) => ({...row, partial: row.partial.replace(/^assets\/scss\//, "")}));

const flag = process.argv.indexOf("--classes");
if (flag !== -1) {
    const needle = process.argv[flag + 1];
    if (!needle) {
        console.error("usage: npm run tw-inventory -- --classes <partial substring>");
        process.exit(2);
    }
    const matches = rows.filter((row) => row.partial.includes(needle));
    if (!matches.length) console.log(`no partial matches "${needle}"`);
    for (const row of matches) {
        console.log(`${row.partial}  (${row.lines} lines, ${row.classes.length} classes${row.unresolved ? `, ${row.unresolved} nested &-suffix selectors NOT resolved: read the file` : ""})`);
        for (const name of row.classes) {
            const users = row.consumers.get(name);
            console.log(`  .${name}  ${users.length ? users.slice(0, 4).join(", ") + (users.length > 4 ? `, +${users.length - 4} more` : "") : "UNUSED"}`);
        }
    }
} else {
    console.log("lines  classes  used  partial");
    for (const row of rows.filter((r) => r.lines > 0)) {
        const used = row.classes.filter((name) => row.consumers.get(name).length).length;
        console.log(`${String(row.lines).padStart(5)}  ${String(row.classes.length).padStart(7)}  ${String(used).padStart(4)}  ${row.partial}${row.unresolved ? `  (+${row.unresolved} &-suffix)` : ""}`);
    }
    console.log(`\n${rows.filter((r) => r.lines > 0).reduce((sum, r) => sum + r.lines, 0)} lines in ${rows.filter((r) => r.lines > 0).length} partials`);
}
