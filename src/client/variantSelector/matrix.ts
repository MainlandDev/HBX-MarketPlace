/** A variant as the Storefront GraphQL `variants` query returns it (only the fields the selector reads). */
export interface VariantNode {
    entityId: number;
    isPurchasable: boolean;
    /** Null or absent when the store does not track this variant's stock: it counts as in stock. */
    inventory?: {isInStock: boolean} | null;
    options: {edges: {node: {displayName: string; values: {edges: {node: {label: string}}[]}}}[]};
}

export interface Matrix {
    /** Colour label to the sizes that exist (purchasable variants) for it. A colour with no purchasable variant maps to an empty set. */
    colours: Map<string, Set<string>>;
    /** Colour label to the purchasable sizes that are out of stock. */
    outOfStock: Map<string, Set<string>>;
}

/** Option names compare ignoring case and surrounding whitespace, and `color` equals `colour`. */
const normalise = (name: string): string => name.trim().toLowerCase().replace(/^color$/, "colour");

const labelOf = (variant: VariantNode, optionName: string): string | undefined => {
    const wanted = normalise(optionName);
    const option = variant.options.edges.find((edge) => normalise(edge.node.displayName) === wanted);
    return option?.node.values.edges[0]?.node.label;
};

export const buildMatrix = (variants: VariantNode[], colourName: string, sizeName: string): Matrix => {
    const colours = new Map<string, Set<string>>();
    const outOfStock = new Map<string, Set<string>>();
    for (const variant of variants) {
        const colour = labelOf(variant, colourName);
        const size = labelOf(variant, sizeName);
        if (colour === undefined || size === undefined) continue;
        const sizes = colours.get(colour) ?? new Set<string>();
        colours.set(colour, sizes);
        // Disabled variants do not exist for this purpose, but the colour stays so the UI can show it disabled.
        if (variant.isPurchasable) {
            sizes.add(size);
            if (variant.inventory?.isInStock === false) outOfStock.set(colour, (outOfStock.get(colour) ?? new Set<string>()).add(size));
        }
    }
    return {colours, outOfStock};
};

export const outOfStockFor = (matrix: Matrix, colour: string): ReadonlySet<string> => matrix.outOfStock.get(colour) ?? new Set<string>();

export const sizesFor = (matrix: Matrix, colour: string): ReadonlySet<string> => matrix.colours.get(colour) ?? new Set<string>();
