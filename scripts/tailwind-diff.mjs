// Compares two computed-style snapshots (see scripts/tailwind/snapshot.mjs). Run: npm run tw-diff -- before.json after.json
import {readFileSync} from "node:fs";
import {diffSnapshots} from "./tailwind/snapshot.mjs";

const [beforePath, afterPath] = process.argv.slice(2);
if (!beforePath || !afterPath) {
    console.error("usage: npm run tw-diff -- <before.json> <after.json>");
    process.exit(2);
}
const diffs = diffSnapshots(JSON.parse(readFileSync(beforePath, "utf8")), JSON.parse(readFileSync(afterPath, "utf8")));
for (const d of diffs) console.log(`${d.path}  ${d.property}: ${d.before} -> ${d.after}`);
console.log(diffs.length ? `${diffs.length} difference(s)` : "identical");
process.exit(diffs.length ? 1 : 0);
