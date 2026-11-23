import {describe, expect, it} from "vitest";
import {assembleBible, checkManifest} from "./bible.mjs";
import {loadTokens} from "./load.mjs";
import {buildReport} from "./report.mjs";

const tokens = loadTokens();
const report = buildReport(tokens);
const sections = {
    "00-cover": '<h1>Design Bible</h1><p>Cover</p>',
    "10-tokens": '<h2 id="tokens">Tokens</h2><!--tokens--><!--contrast-->',
    "20-more": '<h2 id="more">More</h2><p>text</p>',
};
const build = (overrides = {}) =>
    assembleBible({
        manifest: Object.keys(sections),
        readSection: (name) => {
            if (!(name in sections)) throw Object.assign(new Error("ENOENT"), {code: "ENOENT"});
            return sections[name];
        },
        tokens,
        report,
        css: "@media print{body{color:#000}}@media (prefers-reduced-motion: reduce){*{animation:none}}",
        ...overrides,
    });

describe("assembleBible", () => {
    const html = build();

    it("has one h1, one main, and a skip link", () => {
        expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
        expect(html.match(/<main[\s>]/g)).toHaveLength(1);
        expect(html).toContain('href="#main"');
    });

    it("has a theme toggle control", () => {
        expect(html).toContain("data-theme-toggle");
    });

    it("inlines the css and the generated token properties", () => {
        expect(html).toContain("@media print");
        expect(html).toContain("prefers-reduced-motion");
        expect(html).toContain("--color-brand: #EE0700;");
    });

    it("has no SCSS line comments in the inline CSS (they break the :root selector)", () => {
        expect(html).not.toMatch(/^[ \t]*\/\//m);
    });

    it("loads nothing from the network", () => {
        expect(html).not.toMatch(/(src|href)="https?:/);
        expect(html).not.toContain("@import");
        expect(html).not.toMatch(/url\(\s*["']?https?:/);
    });

    it("builds a table of contents from section h2 ids", () => {
        expect(html).toContain('href="#tokens"');
        expect(html).toContain('href="#more"');
    });

    it("replaces the token marker with swatches that show the brand hex", () => {
        expect(html).not.toContain("<!--tokens-->");
        expect(html).toContain("#EE0700");
    });

    it("renders the contrast table with a fragile-pass note for white on brand", () => {
        expect(html).not.toContain("<!--contrast-->");
        expect(html).toMatch(/White text on brand red[\s\S]*?fragile pass/);
    });

    it("fails naming a manifest entry with no file", () => {
        expect(() => build({manifest: ["00-cover", "99-nope"]})).toThrow(/section missing: 99-nope/);
    });
});

describe("checkManifest", () => {
    it("passes when the manifest lists every section file once", () => {
        expect(() => checkManifest(["00-cover", "10-a"], ["00-cover.html", "10-a.html"])).not.toThrow();
    });

    it("fails naming a section file that is not in the manifest", () => {
        expect(() => checkManifest(["00-cover"], ["00-cover.html", "65-foo.html"])).toThrow(/section not in manifest: 65-foo/);
    });

    it("fails on a duplicate manifest entry", () => {
        expect(() => checkManifest(["00-cover", "00-cover"], ["00-cover.html"])).toThrow(/duplicate manifest entry: 00-cover/);
    });
});

describe("assembleBible theme handling", () => {
    it("inlines color-scheme and a light print override", () => {
        const html = assembleBible({manifest: ["00-cover"], readSection: () => "<h1>x</h1>", tokens, report, css: ""});
        expect(html).toContain("color-scheme: light dark;");
        expect(html).toMatch(/@media print[\s\S]*--color-bg: #F2F2F2;/);
    });
});
