import {contrastRatio, grade} from "./contrast.mjs";

export function buildReport(tokens) {
    const rows = [];
    for (const theme of ["light", "dark"]) {
        for (const pair of tokens.pairs) {
            const ratio = contrastRatio(tokens.colors[pair.fg][theme], tokens.colors[pair.bg][theme]);
            rows.push({theme, label: pair.label, fg: pair.fg, bg: pair.bg, size: pair.size, ratio, ...grade(ratio, pair.size)});
        }
    }
    return rows;
}
