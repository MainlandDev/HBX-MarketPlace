import vm from "node:vm";
import {describe, expect, it} from "vitest";
import {buildCaptureExpression, DEFAULT_PROPS, diffSnapshots} from "./snapshot.mjs";

const el = (tagName, style = {}, kids = []) => {
    const node = {tagName, style, children: kids, parentElement: null};
    for (const kid of kids) kid.parentElement = node;
    return node;
};
const descendants = (node) => node.children.flatMap((kid) => [kid, ...descendants(kid)]);

const run = (root, options) => {
    const context = {
        document: {querySelector: () => root},
        getComputedStyle: (node) => ({getPropertyValue: (prop) => node.style[prop] ?? ""}),
    };
    root.querySelectorAll = () => descendants(root);
    for (const node of descendants(root)) node.querySelectorAll = () => descendants(node);
    return vm.runInNewContext(buildCaptureExpression(options), context);
};

describe("buildCaptureExpression", () => {
    it("keys elements by structural path and records the requested properties", () => {
        const root = el("DIV", {color: "red"}, [el("SPAN", {color: "blue"}), el("A", {color: "green"}, [el("B", {color: "pink"})])]);
        expect(run(root, {root: ".x", props: ["color"]})).toEqual({
            ".": {color: "red"},
            "span:nth-child(1)": {color: "blue"},
            "a:nth-child(2)": {color: "green"},
            "a:nth-child(2)>b:nth-child(1)": {color: "pink"},
        });
    });

    it("does not depend on class names, so converted markup keeps the same keys", () => {
        const a = el("DIV", {}, [el("SPAN")]);
        a.className = "old-name";
        const b = el("DIV", {}, [el("SPAN")]);
        b.className = "p-4 flex";
        expect(Object.keys(run(a, {root: ".x", props: ["color"]}))).toEqual(Object.keys(run(b, {root: ".x", props: ["color"]})));
    });

    it("defaults to DEFAULT_PROPS", () => {
        const snapshot = run(el("DIV"), {root: ".x"});
        expect(Object.keys(snapshot["."])).toEqual(DEFAULT_PROPS);
        expect(DEFAULT_PROPS).toEqual(expect.arrayContaining(["display", "padding-top", "background-color", "font-size", "border-top-left-radius"]));
    });
});

describe("diffSnapshots", () => {
    it("is empty for equal snapshots", () => {
        expect(diffSnapshots({".": {color: "red"}}, {".": {color: "red"}})).toEqual([]);
    });

    it("names a changed property", () => {
        expect(diffSnapshots({".": {color: "red"}}, {".": {color: "blue"}})).toEqual([{path: ".", property: "color", before: "red", after: "blue"}]);
    });

    it("reports added and removed elements", () => {
        expect(diffSnapshots({a: {}}, {b: {}})).toEqual([
            {path: "a", property: "(element)", before: "present", after: "missing"},
            {path: "b", property: "(element)", before: "missing", after: "present"},
        ]);
    });
});
