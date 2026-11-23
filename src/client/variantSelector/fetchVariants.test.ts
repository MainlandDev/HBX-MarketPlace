import {describe, expect, it, vi} from "vitest";
import {fetchVariants, VariantFetchError} from "./fetchVariants.ts";
import type {VariantNode} from "./matrix.ts";

const node = (entityId: number): VariantNode => ({entityId, isPurchasable: true, options: {edges: []}});
const page = (ids: number[], endCursor: string | null) => ({
    data: {site: {product: {variants: {pageInfo: {hasNextPage: endCursor !== null, endCursor}, edges: ids.map((id) => ({node: node(id)}))}}}},
});
const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), {status});

describe("fetchVariants", () => {
    it("returns the variants of a single page and sends the token", async () => {
        const fetcher = vi.fn().mockResolvedValue(respond(page([1, 2], null)));
        const result = await fetchVariants({productId: 5, token: "t0k", fetcher});
        expect(result.map((v) => v.entityId)).toEqual([1, 2]);
        const [url, init] = fetcher.mock.calls[0] as [string, RequestInit];
        expect(url).toBe("/graphql");
        expect((init.headers as Record<string, string>).Authorization).toBe("Bearer t0k");
    });

    it("follows endCursor across pages", async () => {
        const fetcher = vi.fn().mockResolvedValueOnce(respond(page([1], "c1"))).mockResolvedValueOnce(respond(page([2], null)));
        const result = await fetchVariants({productId: 5, token: "t", fetcher});
        expect(result.map((v) => v.entityId)).toEqual([1, 2]);
        const second = JSON.parse((fetcher.mock.calls[1] as [string, RequestInit])[1].body as string) as {variables: {after: string}};
        expect(second.variables.after).toBe("c1");
    });

    it("rejects on an HTTP error", async () => {
        const fetcher = vi.fn().mockResolvedValue(respond({}, 500));
        await expect(fetchVariants({productId: 5, token: "t", fetcher})).rejects.toBeInstanceOf(VariantFetchError);
    });

    it("rejects on GraphQL errors", async () => {
        const fetcher = vi.fn().mockResolvedValue(respond({errors: [{message: "nope"}]}));
        await expect(fetchVariants({productId: 5, token: "t", fetcher})).rejects.toBeInstanceOf(VariantFetchError);
    });

    it("rejects when the product is not found", async () => {
        const fetcher = vi.fn().mockResolvedValue(respond({data: {site: {product: null}}}));
        await expect(fetchVariants({productId: 5, token: "t", fetcher})).rejects.toBeInstanceOf(VariantFetchError);
    });

    it("rejects when aborted", async () => {
        const controller = new AbortController();
        const fetcher = vi.fn().mockRejectedValue(new DOMException("aborted", "AbortError"));
        controller.abort();
        await expect(fetchVariants({productId: 5, token: "t", fetcher, signal: controller.signal})).rejects.toThrow();
    });
});
