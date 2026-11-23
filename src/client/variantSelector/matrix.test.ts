import {describe, expect, it} from "vitest";
import {buildMatrix, sizesFor, type VariantNode} from "./matrix.ts";

const variant = (colour: string, size: string, isPurchasable = true): VariantNode => ({
    entityId: 1,
    isPurchasable,
    options: {
        edges: [
            {node: {displayName: "Colour", values: {edges: [{node: {label: colour}}]}}},
            {node: {displayName: "Size", values: {edges: [{node: {label: size}}]}}},
        ],
    },
});

describe("buildMatrix", () => {
    it("maps each colour to the sizes that exist for it", () => {
        const m = buildMatrix(
            [variant("Yellow", "S"), variant("Yellow", "M"), variant("Yellow", "L"), variant("Red", "M"), variant("Red", "L"), variant("Red", "XL")],
            "Colour",
            "Size",
        );
        expect([...sizesFor(m, "Yellow")]).toEqual(["S", "M", "L"]);
        expect([...sizesFor(m, "Red")]).toEqual(["M", "L", "XL"]);
    });

    it("treats a disabled variant as not existing", () => {
        const m = buildMatrix([variant("Red", "M"), variant("Red", "XL", false)], "Colour", "Size");
        expect([...sizesFor(m, "Red")]).toEqual(["M"]);
    });

    it("keeps a colour whose variants are all disabled, with no sizes", () => {
        const m = buildMatrix([variant("Blue", "S", false)], "Colour", "Size");
        expect(m.colours.has("Blue")).toBe(true);
        expect(sizesFor(m, "Blue").size).toBe(0);
    });

    it("matches option names ignoring case and whitespace, and Color/Colour", () => {
        const m = buildMatrix([variant("Red", "M")], " COLOR ", "size");
        expect([...sizesFor(m, "Red")]).toEqual(["M"]);
    });

    it("ignores a variant missing the size or colour option", () => {
        const noSize: VariantNode = {entityId: 2, isPurchasable: true, options: {edges: [{node: {displayName: "Colour", values: {edges: [{node: {label: "Red"}}]}}}]}};
        const m = buildMatrix([noSize], "Colour", "Size");
        expect(m.colours.size).toBe(0);
    });

    it("returns no sizes for an unknown colour", () => {
        expect(sizesFor(buildMatrix([], "Colour", "Size"), "Pink").size).toBe(0);
    });
});
