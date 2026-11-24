import vm from "node:vm";
import {describe, expect, it} from "vitest";
import {buildPageHelper} from "./page-helper.mjs";

const el = (tagName, style = {}, kids = []) => {
    const node = {tagName, style, children: kids, parentElement: null, focused: false};
    for (const kid of kids) kid.parentElement = node;
    node.focus = () => (node.focused = true);
    node.blur = () => (node.focused = false);
    return node;
};
const descendants = (node) => node.children.flatMap((kid) => [kid, ...descendants(kid)]);

const setup = (root) => {
    root.querySelectorAll = () => descendants(root);
    for (const node of descendants(root)) node.querySelectorAll = () => descendants(node);
    const store = new Map();
    const context = {
        document: {querySelector: () => root, get activeElement() { return descendants(root).concat(root).find((n) => n.focused) || null; }},
        getComputedStyle: (node) => ({getPropertyValue: (prop) => node.style[prop] ?? "", outlineStyle: node.style.outlineStyle || "none", outlineWidth: "0px", outlineColor: "x", outlineOffset: "0px", borderTopStyle: "none", borderTopWidth: "0px", boxShadow: "none"}),
        sessionStorage: {getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v)},
        innerWidth: 1000,
    };
    context.window = context;
    vm.createContext(context);
    vm.runInContext(buildPageHelper({root: ".x"}), context);
    return context;
};

describe("buildPageHelper", () => {
    it("is valid JavaScript and defines the three helpers", () => {
        const context = setup(el("DIV"));
        expect(typeof context.__tw).toBe("function");
        expect(typeof context.__twFrame).toBe("function");
        expect(typeof context.__twFocus).toBe("function");
    });

    it("saves a snapshot and then reports no difference for an unchanged page", () => {
        const root = el("DIV", {color: "red"}, [el("SPAN", {color: "blue"})]);
        const context = setup(root);
        expect(context.__tw("375", "save").saved).toBe(2);
        expect(context.__tw("375").diffCount).toBe(0);
    });

    it("names the property that changed", () => {
        const root = el("DIV", {color: "red"}, [el("SPAN", {color: "blue"})]);
        const context = setup(root);
        context.__tw("375", "save");
        root.children[0].style.color = "green";
        const result = context.__tw("375");
        expect(result.diffCount).toBe(1);
        expect(result.byProp).toEqual({color: 1});
        expect(result.rest[0]).toContain("span:nth-child(1) | color | blue | green");
    });

    it("reports an element that disappeared", () => {
        const root = el("DIV", {}, [el("SPAN"), el("A")]);
        const context = setup(root);
        context.__tw("w", "save");
        root.children.pop();
        expect(context.__tw("w").rest[0]).toContain("(element) | present | missing");
    });

    it("focuses an element and reports its outline and its parent's", () => {
        const input = el("INPUT");
        const root = el("DIV", {}, [el("DIV", {}, [input])]);
        const context = setup(root);
        root.querySelector = () => input;
        context.document.querySelector = () => input;
        const result = context.__twFocus("input");
        expect(result.active).toBe(true);
        expect(Object.keys(result)).toEqual(expect.arrayContaining(["target", "parent", "active"]));
        expect(input.focused).toBe(false);
    });
});
