import {describe, expect, it} from "vitest";
import {configDrift, renderScss} from "./generate.mjs";
import {loadTokens} from "./load.mjs";

const block = (css, opener) => {
    const start = css.indexOf(opener);
    return start === -1 ? "" : css.slice(start, css.indexOf("}", start));
};

describe("renderScss", () => {
    const css = renderScss(loadTokens());

    it("emits the light brand value in :root", () => {
        expect(block(css, ":root {")).toContain("--color-brand: #EE0700;");
    });

    it("emits dark values for the OS preference unless light is forced", () => {
        expect(block(css, ':root:not([data-theme="light"])')).toContain("--color-bg: #121212;");
    });

    it("emits dark values for the manual toggle", () => {
        expect(block(css, ':root[data-theme="dark"]')).toContain("--color-bg: #121212;");
    });

    it("zeroes motion durations for reduced motion", () => {
        expect(css).toMatch(/prefers-reduced-motion: reduce[\s\S]*--motion-base: 0ms;/);
    });

    it("never prints undefined", () => {
        expect(css).not.toContain("undefined");
    });

    it("includes type, space and radius custom properties", () => {
        expect(css).toContain("--font-stack:");
        expect(css).toContain("--space-4: 1rem;");
        expect(css).toContain("--radius-md: 0.5rem;");
    });
});

describe("renderScss options", () => {
    const tokens = loadTokens();

    it("leaves color-scheme out of the theme partial (it would restyle native controls with no theme support)", () => {
        expect(renderScss(tokens)).not.toMatch(/^\s*color-scheme:/m);
    });

    it("includes color-scheme in bible mode", () => {
        expect(renderScss(tokens, {bible: true})).toContain("color-scheme: light dark;");
    });

    it("forces light values for print in bible mode, whatever theme is active", () => {
        const css = renderScss(tokens, {bible: true});
        const print = css.slice(css.indexOf("@media print"));
        expect(print).toContain(':root[data-theme="dark"]');
        expect(print).toContain("--color-bg: #F2F2F2;");
        expect(renderScss(tokens)).not.toContain("@media print");
    });
});

describe("configDrift", () => {
    const tokens = loadTokens();

    it("is empty when config matches", () => {
        const settings = Object.fromEntries(Object.values(tokens.colors).filter((c) => c.configKey).map((c) => [c.configKey, c.light.toLowerCase()]));
        expect(configDrift(tokens, {settings})).toEqual([]);
    });

    it("names the key that differs", () => {
        const settings = Object.fromEntries(Object.values(tokens.colors).filter((c) => c.configKey).map((c) => [c.configKey, c.light]));
        settings["color-textBase"] = "#333333";
        const drift = configDrift(tokens, {settings});
        expect(drift).toHaveLength(1);
        expect(drift[0].key).toBe("color-textBase");
    });
});
