/** @jsxImportSource react */
// The theme compiles JSX against the HBX runtime; client code ships to the browser and must use plain React's.
"use client"

import {useEffect} from "react";
import {disabledColours, planSizes} from "./availability.ts";
import {fetchVariants} from "./fetchVariants.ts";
import {buildMatrix, type Matrix} from "./matrix.ts";
import {matchesQuery} from "./search.ts";

interface Choice {
    label: string;
    input: HTMLInputElement;
    /** What to hide: the option wrapper when there is one, else the input and its label. */
    nodes: HTMLElement[];
}

const labelFor = (root: ParentNode, input: HTMLInputElement): string => {
    const label = input.id ? root.querySelector<HTMLElement>(`label[for="${CSS.escape(input.id)}"]`) : null;
    return (input.getAttribute("aria-label") ?? label?.querySelector<HTMLElement>(".form-option-variant")?.textContent ?? label?.textContent ?? "").trim();
};

const choicesIn = (group: Element): Choice[] =>
    [...group.querySelectorAll<HTMLInputElement>('input[type="radio"]')]
        .filter((input) => input.value !== "")
        .map((input) => {
            const label = input.id ? group.querySelector<HTMLElement>(`label[for="${CSS.escape(input.id)}"]`) : null;
            const wrapper = input.closest<HTMLElement>(".form-option-wrapper");
            return {label: labelFor(group, input), input, nodes: wrapper ? [wrapper] : [input, ...(label ? [label] : [])]};
        });

const setShown = (choice: Choice, shown: boolean) => {
    for (const node of choice.nodes) node.hidden = !shown;
    choice.input.disabled = !shown;
};

/** The colour card's search box. Needs no variant data. Returns a cleanup. */
const wireColourUi = (root: Element): (() => void) => {
    const group = root.querySelector("[data-variant-colours]");
    if (!group) return () => {};
    const colours = choicesIn(group);
    const search = group.querySelector<HTMLElement>("[data-variant-search]");
    const field = search?.querySelector("input");
    const empty = group.querySelector<HTMLElement>("[data-variant-empty]");

    const filter = () => {
        let matches = 0;
        for (const colour of colours) {
            const wrapper = colour.nodes[0];
            if (matchesQuery(colour.label, field?.value ?? "")) {
                wrapper.removeAttribute("data-filtered");
                matches++;
            } else wrapper.setAttribute("data-filtered", "");
        }
        if (empty) empty.hidden = matches > 0;
    };

    if (search) search.hidden = false;
    field?.addEventListener("input", filter);
    return () => {
        if (search) search.hidden = true;
        field?.removeEventListener("input", filter);
        for (const colour of colours) colour.nodes[0].removeAttribute("data-filtered");
        if (empty) empty.hidden = true;
    };
};

/** Hides sizes that do not exist for the picked colour and disables colours with no sizes. Returns a cleanup. */
const wireAvailability = (root: Element, matrix: Matrix): (() => void) => {
    const colourGroup = root.querySelector("[data-variant-colours]");
    const sizeGroup = root.querySelector("[data-variant-sizes]");
    if (!colourGroup || !sizeGroup) return () => {};
    const colours = choicesIn(colourGroup);
    const sizes = choicesIn(sizeGroup);

    const apply = () => {
        const picked = colours.find((choice) => choice.input.checked)?.label;
        const selected = sizes.find((choice) => choice.input.checked)?.label;
        const plan = planSizes(matrix, picked, sizes.map((s) => s.label), selected);
        for (const size of sizes) setShown(size, plan.visible.includes(size.label));
        if (plan.clearSize) {
            const checked = sizes.find((choice) => choice.input.checked);
            if (checked) {
                checked.input.checked = false;
                // product-details.js listens for change to refresh price and stock.
                checked.input.dispatchEvent(new Event("change", {bubbles: true}));
            }
        }
    };

    const off = disabledColours(matrix, colours.map((c) => c.label));
    for (const colour of colours) if (off.has(colour.label)) setShown(colour, false);

    colourGroup.addEventListener("change", apply);
    apply();
    return () => {
        colourGroup.removeEventListener("change", apply);
        for (const choice of [...colours, ...sizes]) setShown(choice, true);
    };
};

/**
 * Progressive enhancement of the server-rendered colour + size selector. Renders nothing itself: the static markup is the whole UI.
 * It turns on the colour search at once, then narrows the sizes per colour once the variants arrive. If the request fails the selector keeps
 * the search, and every size stays available.
 */
export const VariantEnhancer = ({productId, token}: {productId: number; token: string}) => {
    useEffect(() => {
        const root = document.querySelector("[data-variant-selector]");
        if (!root) return;
        const controller = new AbortController();
        const cleanupUi = wireColourUi(root);
        let cleanupAvailability = () => {};
        fetchVariants({productId, token, signal: controller.signal})
            // "colour" also matches "Color" (see matrix.ts).
            .then((variants) => {
                cleanupAvailability = wireAvailability(root, buildMatrix(variants, "colour", "size"));
            })
            .catch(() => {});
        return () => {
            controller.abort();
            cleanupAvailability();
            cleanupUi();
        };
    }, [productId, token]);
    return null;
};
