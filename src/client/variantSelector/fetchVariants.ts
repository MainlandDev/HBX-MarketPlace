import type {VariantNode} from "./matrix.ts";

export class VariantFetchError extends Error {}

export interface FetchVariantsOptions {
    productId: number;
    /** Storefront API token. */
    token: string;
    signal?: AbortSignal;
    /** Injectable for tests. */
    fetcher?: typeof fetch;
}

// Variant fields the selector needs: the option labels and whether the variant is purchasable (disabled ones are not).
const QUERY = `query Variants($productId: Int!, $after: String) {
  site { product(entityId: $productId) {
    variants(first: 250, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges { node { entityId isPurchasable options { edges { node { displayName values { edges { node { label } } } } } } } }
    }
  } }
}`;

interface Page {
    data?: {site?: {product?: {variants: {pageInfo: {hasNextPage: boolean; endCursor: string | null}; edges: {node: VariantNode}[]}} | null}};
    errors?: {message: string}[];
}

/** Every variant of a product, following pagination. Rejects with `VariantFetchError` on HTTP, GraphQL or missing-product failures. */
export const fetchVariants = async ({productId, token, signal, fetcher = fetch}: FetchVariantsOptions): Promise<VariantNode[]> => {
    const variants: VariantNode[] = [];
    let after: string | null = null;
    do {
        const response: Response = await fetcher("/graphql", {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({query: QUERY, variables: {productId, after}}),
            signal,
        });
        if (!response.ok) throw new VariantFetchError(`Storefront GraphQL responded ${response.status}`);
        const body = (await response.json()) as Page;
        if (body.errors?.length) throw new VariantFetchError(body.errors.map((e) => e.message).join("; "));
        const product = body.data?.site?.product;
        if (!product) throw new VariantFetchError(`Product ${productId} not found`);
        variants.push(...product.variants.edges.map((edge) => edge.node));
        after = product.variants.pageInfo.hasNextPage ? product.variants.pageInfo.endCursor : null;
    } while (after !== null);
    return variants;
};
