import {describe, expect, it} from "vitest";
import {disabledColours, planSizes} from "./availability.ts";
import type {Matrix} from "./matrix.ts";

const matrix: Matrix = {
    colours: new Map([
        ["Yellow", new Set(["S", "M", "L"])],
        ["Red", new Set(["M", "L", "XL"])],
        ["Blue", new Set<string>()],
    ]),
};
const all = ["S", "M", "L", "XL"];

describe("planSizes", () => {
    it("shows only the sizes that exist for the colour", () => {
        expect(planSizes(matrix, "Yellow", all, undefined).visible).toEqual(["S", "M", "L"]);
        expect(planSizes(matrix, "Red", all, undefined).visible).toEqual(["M", "L", "XL"]);
    });

    it("clears a selected size the colour does not have", () => {
        expect(planSizes(matrix, "Red", all, "S").clearSize).toBe(true);
        expect(planSizes(matrix, "Red", all, "M").clearSize).toBe(false);
    });

    it("shows every size while no colour is picked", () => {
        expect(planSizes(matrix, undefined, all, undefined)).toEqual({visible: all, clearSize: false});
    });

    it("shows no sizes for a colour with no variants, and for an unknown colour", () => {
        expect(planSizes(matrix, "Blue", all, "S")).toEqual({visible: [], clearSize: true});
        expect(planSizes(matrix, "Pink", all, undefined).visible).toEqual([]);
    });
});

describe("disabledColours", () => {
    it("disables colours with no sizes, including colours the matrix does not know", () => {
        expect([...disabledColours(matrix, ["Yellow", "Red", "Blue", "Pink"])].sort()).toEqual(["Blue", "Pink"]);
    });
});
