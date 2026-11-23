import {describe, expect, it} from "vitest";
import {matchesQuery} from "./search.ts";

describe("matchesQuery", () => {
    it("matches a label containing the query, ignoring case", () => {
        expect(matchesQuery("Kelly Green", "green")).toBe(true);
        expect(matchesQuery("Kelly Green", "KELLY")).toBe(true);
    });

    it("ignores whitespace around the query", () => {
        expect(matchesQuery("Navy", "  nav ")).toBe(true);
    });

    it("matches everything for an empty or blank query", () => {
        expect(matchesQuery("Navy", "")).toBe(true);
        expect(matchesQuery("Navy", "   ")).toBe(true);
    });

    it("does not match a label without the query", () => {
        expect(matchesQuery("Navy", "red")).toBe(false);
    });

    it("matches every word of a multi-word query, in any order", () => {
        expect(matchesQuery("Kelly Green", "green kel")).toBe(true);
        expect(matchesQuery("Kelly Green", "green blue")).toBe(false);
    });
});
