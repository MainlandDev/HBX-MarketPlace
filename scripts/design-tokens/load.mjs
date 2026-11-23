import {readFileSync} from "node:fs";
import {parseHex} from "./contrast.mjs";

export const DEFAULT_TOKENS_PATH = new URL("../../docs/design/tokens.json", import.meta.url);

export function loadTokens(path = DEFAULT_TOKENS_PATH) {
    const tokens = JSON.parse(readFileSync(path, "utf8"));
    for (const [name, value] of Object.entries(tokens.colors)) {
        for (const theme of ["light", "dark"]) {
            if (!value[theme]) throw new Error(`token ${name}: missing ${theme}`);
            try {
                parseHex(value[theme]);
            } catch (error) {
                throw new Error(`token ${name} (${theme}): ${error.message}`);
            }
        }
    }
    for (const pair of tokens.pairs) {
        for (const side of [pair.fg, pair.bg]) {
            if (!tokens.colors[side]) throw new Error(`unknown token in pair: ${side}`);
        }
    }
    return tokens;
}
