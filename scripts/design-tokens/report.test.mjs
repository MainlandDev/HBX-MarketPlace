import {describe, expect, it} from "vitest";
import {loadTokens} from "./load.mjs";
import {buildReport} from "./report.mjs";

describe("buildReport", () => {
    it("has one row per pair per theme", () => {
        const tokens = loadTokens();
        expect(buildReport(tokens)).toHaveLength(tokens.pairs.length * 2);
    });

    it("passes AA on every shipped pair in both themes", () => {
        const failing = buildReport(loadTokens()).filter((row) => !row.aa);
        expect(failing.map((r) => `${r.theme} ${r.label} ${r.ratio.toFixed(2)}`)).toEqual([]);
    });

    it("reports text on brand red as an AA pass in light", () => {
        const row = buildReport(loadTokens()).find((r) => r.theme === "light" && r.label === "Text on brand red");
        expect(row.aa).toBe(true);
    });

    it("flags a regression when onBrand turns mid grey", () => {
        const tokens = structuredClone(loadTokens());
        tokens.colors.onBrand.light = "#777777";
        const row = buildReport(tokens).find((r) => r.theme === "light" && r.label === "Text on brand red");
        expect(row.aa).toBe(false);
    });
});
