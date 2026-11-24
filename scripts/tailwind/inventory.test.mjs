import {describe, expect, it} from "vitest";
import {buildInventory, classSelectors, findConsumers, meaningfulLines, withoutShadowedHtml} from "./inventory.mjs";

describe("classSelectors", () => {
    it("reads class names from selector lines", () => {
        expect(classSelectors(".a, .b-c > .d {\n  x: 1;\n}\n.e:hover {\n}\n// .skip {\n}")).toEqual(["a", "b-c", "d", "e"]);
    });

    it("reads nested and compound selectors", () => {
        expect(classSelectors(".a {\n  &.is-open { }\n  .b__c { }\n}")).toEqual(["a", "is-open", "b__c"]);
    });

    it("ignores declaration values, at-rules, interpolation and attribute strings", () => {
        const scss = ".a {\n  margin: .5rem;\n  box-shadow: 0 0 1px red,\n    0 0 2px blue;\n  width: #{$x}.px;\n}\n@media (min-width: 40.5em) {\n}\na[href$=\".pdf\"] {\n}\n";
        expect(classSelectors(scss)).toEqual(["a"]);
    });

    it("returns each name once", () => {
        expect(classSelectors(".a {\n}\n.a:hover {\n}")).toEqual(["a"]);
    });
});

describe("meaningfulLines", () => {
    it("ignores blank lines and both comment styles", () => {
        expect(meaningfulLines("\n// c\n/* a\n b */\n.a {\n  x: 1;\n}\n")).toBe(3);
    });
});

describe("findConsumers", () => {
    const files = [
        {path: "a.tsx", text: '<div className="btn btn--big" />'},
        {path: "b.html", text: '<div class="btn-x"></div>'},
        {path: "c.js", text: "$('.btn').addClass('is-open')"},
    ];

    it("matches whole class names only", () => {
        const found = findConsumers(["btn", "btn--big", "btn--bi", "is-open"], files);
        expect(found.get("btn")).toEqual(["a.tsx", "c.js"]);
        expect(found.get("btn--big")).toEqual(["a.tsx"]);
        expect(found.get("btn--bi")).toEqual([]);
        expect(found.get("is-open")).toEqual(["c.js"]);
    });
});

describe("buildInventory", () => {
    it("sorts partials by size and lists consumers per class", () => {
        const rows = buildInventory({
            scssFiles: [
                {path: "small.scss", text: ".s {\n  a: 1;\n}"},
                {path: "big.scss", text: ".b {\n  a: 1;\n  b: 2;\n  c: 3;\n}\n.&-x { }"},
            ],
            sourceFiles: [{path: "x.tsx", text: 'className="b"'}],
        });
        expect(rows.map((r) => r.partial)).toEqual(["big.scss", "small.scss"]);
        expect(rows[0].classes).toEqual(["b"]);
        expect(rows[0].consumers.get("b")).toEqual(["x.tsx"]);
        expect(rows[1].consumers.get("s")).toEqual([]);
    });

    it("counts nested suffix selectors it cannot resolve", () => {
        const [row] = buildInventory({scssFiles: [{path: "n.scss", text: ".card {\n  &-title {\n  }\n  &__body {\n  }\n}"}], sourceFiles: []});
        expect(row.unresolved).toBe(2);
    });
});

describe("withoutShadowedHtml", () => {
    it("drops a hand-written template that a TSX template replaces, and keeps the rest", () => {
        const files = [
            {path: "templates/components/a.html", text: "x"},
            {path: "src/templates/components/a.tsx", text: "x"},
            {path: "templates/components/b.html", text: "x"},
            {path: "assets/js/c.js", text: "x"},
        ];
        expect(withoutShadowedHtml(files).map((f) => f.path)).toEqual(["src/templates/components/a.tsx", "templates/components/b.html", "assets/js/c.js"]);
    });
});
