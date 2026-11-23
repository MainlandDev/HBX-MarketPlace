import {outOfStockFor, sizesFor, type Matrix} from "./matrix.ts";

export interface SizePlan {
    /** Size labels to show, in the order given. */
    visible: string[];
    /** The selected size is no longer offered, so the selection must be cleared. */
    clearSize: boolean;
    /** The visible sizes that are out of stock: still choosable, but marked. */
    outOfStock: string[];
}

/** Which sizes to show for the picked colour. With no colour picked every size shows, because nothing is known to be missing yet. */
export const planSizes = (matrix: Matrix, colour: string | undefined, allSizes: string[], selectedSize: string | undefined): SizePlan => {
    if (colour === undefined) return {visible: allSizes, clearSize: false, outOfStock: []};
    const available = sizesFor(matrix, colour);
    const visible = allSizes.filter((size) => available.has(size));
    const soldOut = outOfStockFor(matrix, colour);
    return {visible, clearSize: selectedSize !== undefined && !available.has(selectedSize), outOfStock: visible.filter((size) => soldOut.has(size))};
};

/** Colours that cannot be bought in any size (all variants disabled, or no variant at all). */
export const disabledColours = (matrix: Matrix, allColours: string[]): Set<string> =>
    new Set(allColours.filter((colour) => sizesFor(matrix, colour).size === 0));

/**
 * Whether the variant data can be trusted to narrow this page's colours. An error message when it cannot: no variants matched the colour and
 * size options, or colours shown on the page are missing from the data (labels differ), which would wrongly disable them.
 */
export const validateMatrix = (matrix: Matrix, pageColours: string[]): string | undefined => {
    if (matrix.colours.size === 0) return "no variants matched the colour and size options";
    const missing = pageColours.filter((colour) => !matrix.colours.has(colour));
    return missing.length > 0 ? `colours on the page are missing from the variant data: ${missing.join(", ")}` : undefined;
};
