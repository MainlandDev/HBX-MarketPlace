import {describe, expect, it} from "vitest";
import {disabledColours, planSizes, validateMatrix} from "./availability.ts";
import type {Matrix} from "./matrix.ts";

const matrix: Matrix = {
    colours: new Map([
        ["Yellow", new Set(["S", "M", "L"])],
        ["Red", new Set(["M", "L", "XL"])],
        ["Blue", new Set<string>()],
    ]),
    outOfStock: new Map([["Red", new Set(["L"])]]),
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

    it("lists the visible sizes that are out of stock for the colour", () => {
        expect(planSizes(matrix, "Red", all, undefined).outOfStock).toEqual(["L"]);
        expect(planSizes(matrix, "Yellow", all, undefined).outOfStock).toEqual([]);
    });

    it("shows every size while no colour is picked", () => {
        expect(planSizes(matrix, undefined, all, undefined)).toEqual({visible: all, clearSize: false, outOfStock: []});
    });

    it("shows no sizes for a colour with no variants, and for an unknown colour", () => {
        expect(planSizes(matrix, "Blue", all, "S")).toEqual({visible: [], clearSize: true, outOfStock: []});
        expect(planSizes(matrix, "Pink", all, undefined).visible).toEqual([]);
    });
});

describe("disabledColours", () => {
    it("disables colours with no sizes, including colours the matrix does not know", () => {
        expect([...disabledColours(matrix, ["Yellow", "Red", "Blue", "Pink"])].sort()).toEqual(["Blue", "Pink"]);
    });
});

describe("validateMatrix", () => {
    it("accepts a matrix that knows every colour on the page", () => {
        expect(validateMatrix(matrix, ["Yellow", "Red", "Blue"])).toBeUndefined();
    });

    it("rejects an empty matrix (the variants did not match the colour and size options)", () => {
        expect(validateMatrix({colours: new Map(), outOfStock: new Map()}, ["Yellow"])).toMatch(/no variants/i);
    });

    it("rejects a matrix that lacks colours shown on the page, naming them", () => {
        expect(validateMatrix(matrix, ["Yellow", "Pink", "Teal"])).toMatch(/Pink, Teal/);
    });
});
