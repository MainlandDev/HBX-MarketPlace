import {mkdtempSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {describe, expect, it} from "vitest";
import {loadTokens} from "./load.mjs";

const fixture = (mutate) => {
    const tokens = structuredClone(loadTokens());
    mutate(tokens);
    const dir = mkdtempSync(path.join(tmpdir(), "tokens-"));
    const file = path.join(dir, "tokens.json");
    writeFileSync(file, JSON.stringify(tokens));
    return file;
};

describe("loadTokens", () => {
    it("loads the real file with the required colour tokens", () => {
        const {colors} = loadTokens();
        for (const name of ["brand", "onBrand", "bg", "text", "accent-amber", "accent-blue", "accent-navy", "tint"]) {
            expect(colors).toHaveProperty(name);
        }
    });

    it("keeps brand red exactly as the live site", () => {
        expect(loadTokens().colors.brand.light).toBe("#EE0700");
    });

    it("gives every colour both a light and a dark value", () => {
        for (const [name, value] of Object.entries(loadTokens().colors)) {
            expect(value.light, name).toMatch(/^#/);
            expect(value.dark, name).toMatch(/^#/);
        }
    });

    it("fails with the token name when dark is missing", () => {
        const file = fixture((t) => delete t.colors.brand.dark);
        expect(() => loadTokens(file)).toThrow(/token brand: missing dark/);
    });

    it("fails on a pair that names an unknown token", () => {
        const file = fixture((t) => t.pairs.push({fg: "nope", bg: "bg", size: "normal", label: "x"}));
        expect(() => loadTokens(file)).toThrow(/unknown token in pair: nope/);
    });

    it("fails on a malformed hex with the token name", () => {
        const file = fixture((t) => (t.colors.brand.light = "#EE07"));
        expect(() => loadTokens(file)).toThrow(/token brand/);
    });
});
