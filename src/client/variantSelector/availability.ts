import {sizesFor, type Matrix} from "./matrix.ts";

export interface SizePlan {
    /** Size labels to show, in the order given. */
    visible: string[];
    /** The selected size is no longer offered, so the selection must be cleared. */
    clearSize: boolean;
}

/** Which sizes to show for the picked colour. With no colour picked every size shows, because nothing is known to be missing yet. */
export const planSizes = (matrix: Matrix, colour: string | undefined, allSizes: string[], selectedSize: string | undefined): SizePlan => {
    if (colour === undefined) return {visible: allSizes, clearSize: false};
    const available = sizesFor(matrix, colour);
    const visible = allSizes.filter((size) => available.has(size));
    return {visible, clearSize: selectedSize !== undefined && !available.has(selectedSize)};
};

/** Colours that cannot be bought in any size (all variants disabled, or no variant at all). */
export const disabledColours = (matrix: Matrix, allColours: string[]): Set<string> =>
    new Set(allColours.filter((colour) => sizesFor(matrix, colour).size === 0));
