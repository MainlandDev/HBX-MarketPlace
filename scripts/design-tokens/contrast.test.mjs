import {describe, expect, it} from "vitest";
import {contrastRatio, grade, luminance, parseHex} from "./contrast.mjs";

describe("contrast", () => {
    it("black on white is 21:1", () => {
        expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 5);
    });

    it("white on brand red is 4.50, a razor-thin AA pass that misses AAA", () => {
        const ratio = contrastRatio("#fff", "#EE0700");
        expect(ratio).toBeGreaterThanOrEqual(4.5);
        expect(ratio).toBeLessThan(4.51);
        expect(grade(ratio, "normal")).toEqual({aa: true, aaa: false});
    });

    it("black on brand red is 4.67, a safer AA pass", () => {
        expect(contrastRatio("#000", "#EE0700")).toBeGreaterThan(4.6);
    });

    it("parses 3 digit hex", () => {
        expect(parseHex("#fff")).toEqual({r: 255, g: 255, b: 255});
    });

    it("rejects alpha hex", () => {
        expect(() => parseHex("#ffffff80")).toThrow(/alpha not supported/);
        expect(() => parseHex("#fff8")).toThrow(/alpha not supported/);
    });

    it("luminance of white is 1", () => {
        expect(luminance("#fff")).toBeCloseTo(1, 5);
    });

    it("grades ratios by text size", () => {
        expect(grade(4.0, "normal")).toEqual({aa: false, aaa: false});
        expect(grade(4.0, "large")).toEqual({aa: true, aaa: false});
        expect(grade(7, "normal")).toEqual({aa: true, aaa: true});
    });
});
