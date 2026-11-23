import {describe, expect, it} from "vitest";
import {lintBible} from "./checkBible.mjs";

const component = (kind, parts = ["no-js", "states", "a11y", "tokens-used"]) =>
    `<article class="component" data-kind="${kind}"><h3>X</h3>${parts.map((p) => `<div class="${p}">x</div>`).join("")}</article>`;

describe("lintBible", () => {
    it("accepts a clean document", () => {
        const html = `<h1>t</h1><img src="a.png" alt="a"><svg aria-hidden="true"></svg>${component("static")}`;
        expect(lintBible(html)).toEqual([]);
    });

    it("flags an image without alt", () => {
        expect(lintBible('<img src="x">').join("\n")).toMatch(/alt/);
    });

    it("flags an svg with neither aria-hidden nor role=img", () => {
        expect(lintBible("<svg></svg>").join("\n")).toMatch(/svg/);
    });

    it("flags external src, href and url()", () => {
        const problems = lintBible('<script src="https://cdn.example.com/a.js"></script><a href="http://x.test">x</a><style>a{background:url(https://x.test/a.png)}</style>').join("\n");
        expect(problems).toMatch(/external/);
        expect((problems.match(/external/g) ?? []).length).toBe(3);
    });

    it("ignores external URLs shown as escaped example text", () => {
        expect(lintBible('<p><code>&lt;script src="https://cdn.example.com/a.js"&gt;</code></p>')).toEqual([]);
    });

    it("flags more than one h1", () => {
        expect(lintBible("<h1>a</h1><h1>b</h1>").join("\n")).toMatch(/h1/);
    });

    it("flags a component missing its no-js block", () => {
        expect(lintBible(component("island", ["states", "a11y", "tokens-used"])).join("\n")).toMatch(/no-js/);
    });

    it("flags a component with an invalid data-kind", () => {
        expect(lintBible(component("widget")).join("\n")).toMatch(/data-kind/);
    });

    it("flags a component without a data-kind", () => {
        expect(lintBible('<article class="component"><h3>X</h3></article>').join("\n")).toMatch(/data-kind/);
    });
});
