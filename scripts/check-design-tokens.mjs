// Fails when any token colour pair misses WCAG AA. Run: npm run check-design-tokens
import {loadTokens} from "./design-tokens/load.mjs";
import {buildReport} from "./design-tokens/report.mjs";

const rows = buildReport(loadTokens());
const mark = (ok) => (ok ? "pass" : "FAIL");
for (const r of rows) {
    console.log(`${r.theme.padEnd(5)} ${r.ratio.toFixed(2).padStart(5)}  AA ${mark(r.aa)}  AAA ${mark(r.aaa)}  ${r.label}`);
}
const failing = rows.filter((r) => !r.aa);
if (failing.length) {
    console.error(`\n${failing.length} pair(s) fail WCAG AA`);
    process.exit(1);
}
console.log(`\nAll ${rows.length} pair checks pass AA`);
