// Lints the built design bible for a11y structure and self-containment. Run after npm run build-bible.
import {readFileSync} from "node:fs";
import {lintBible} from "./design-tokens/checkBible.mjs";

const file = new URL("../docs/design/bible/dist/design-bible.html", import.meta.url);
const problems = lintBible(readFileSync(file, "utf8"));
if (problems.length) {
    console.error(problems.map((p) => `- ${p}`).join("\n"));
    console.error(`\n${problems.length} problem(s) in the design bible`);
    process.exit(1);
}
console.log("design bible lint clean");
