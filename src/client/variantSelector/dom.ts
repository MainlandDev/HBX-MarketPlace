// The enhancer's DOM wiring, apart from the React island so it can be driven directly (tests, devtools). Plain browser code: no React.
import {disabledColours, planSizes} from "./availability.ts";
import type {Matrix} from "./matrix.ts";
import {matchesQuery} from "./search.ts";

/** One choosable value of an option: a radio (swatch, rectangle, radio group) or an `<option>` of a dropdown. */
export interface Choice {
    label: string;
    /** What hides it: the option wrapper for a radio, the `<option>` itself for a dropdown. */
    nodes: HTMLElement[];
    isSelected: () => boolean;
    /** Unselects it and tells product-details.js, which listens for `change` to refresh price and stock. */
    clear: () => void;
    setShown: (shown: boolean) => void;
    setSoldOut: (soldOut: boolean) => void;
    setDisabled: (disabled: boolean) => void;
}

const radioLabel = (group: ParentNode, input: HTMLInputElement): string => {
    const label = input.id ? group.querySelector<HTMLElement>(`label[for="${CSS.escape(input.id)}"]`) : null;
    return (input.getAttribute("aria-label") ?? label?.querySelector<HTMLElement>(".form-option-variant")?.textContent ?? label?.textContent ?? "").trim();
};

const radioChoice = (group: ParentNode, input: HTMLInputElement): Choice => {
    const label = input.id ? group.querySelector<HTMLElement>(`label[for="${CSS.escape(input.id)}"]`) : null;
    const wrapper = input.closest<HTMLElement>(".form-option-wrapper");
    const nodes = wrapper ? [wrapper] : [input, ...(label ? [label] : [])];
    const originalAriaLabel = input.getAttribute("aria-label");
    const baseLabel = radioLabel(group, input);
    return {
        label: baseLabel,
        nodes,
        isSelected: () => input.checked,
        clear: () => {
            input.checked = false;
            input.dispatchEvent(new Event("change", {bubbles: true}));
        },
        setShown: (shown) => {
            for (const node of nodes) node.hidden = !shown;
            input.disabled = !shown;
        },
        // Marked for sight (CSS on `data-out-of-stock`, the tooltip) and for assistive tech (the accessible name).
        setSoldOut: (soldOut) => {
            for (const node of nodes) {
                if (soldOut) node.setAttribute("data-out-of-stock", "");
                else node.removeAttribute("data-out-of-stock");
            }
            if (label) {
                if (soldOut) label.title = "Out of stock";
                else label.removeAttribute("title");
            }
            if (soldOut) input.setAttribute("aria-label", `${baseLabel} (out of stock)`);
            else if (originalAriaLabel === null) input.removeAttribute("aria-label");
            else input.setAttribute("aria-label", originalAriaLabel);
        },
        setDisabled: (disabled) => {
            input.disabled = disabled;
        },
    };
};

const optionChoice = (select: HTMLSelectElement, option: HTMLOptionElement): Choice => {
    const label = (option.textContent ?? "").trim();
    return {
        label,
        nodes: [option],
        isSelected: () => option.selected,
        clear: () => {
            select.value = "";
            select.dispatchEvent(new Event("change", {bubbles: true}));
        },
        // Hidden and disabled: a browser that ignores `hidden` on an `<option>` still cannot choose it.
        setShown: (shown) => {
            option.hidden = !shown;
            option.disabled = !shown;
        },
        // A dropdown option cannot be styled, so the text carries the note.
        setSoldOut: (soldOut) => {
            option.textContent = soldOut ? `${label} (out of stock)` : label;
        },
        setDisabled: (disabled) => {
            select.disabled = disabled;
        },
    };
};

/** The choices of an option group: its radios, or the options of its dropdown. A blank value ("None", "Choose Options") is not a choice. */
export const choicesIn = (group: Element): Choice[] => {
    const radios = [...group.querySelectorAll<HTMLInputElement>('input[type="radio"]')].filter((input) => input.value !== "");
    if (radios.length > 0) return radios.map((input) => radioChoice(group, input));
    const select = group.querySelector<HTMLSelectElement>("select");
    return select ? [...select.options].filter((option) => option.value !== "").map((option) => optionChoice(select, option)) : [];
};

/** Disables the sizes until the variant data arrives, so a size that may not exist for the colour cannot be chosen yet. Returns the undo. */
export const setLoading = (root: Element): (() => void) => {
    const group = root.querySelector<HTMLElement>("[data-variant-sizes]");
    if (!group) return () => {};
    const sizes = choicesIn(group);
    group.setAttribute("aria-busy", "true");
    group.setAttribute("data-loading", "");
    for (const size of sizes) size.setDisabled(true);
    return () => {
        group.removeAttribute("aria-busy");
        group.removeAttribute("data-loading");
        for (const size of sizes) size.setDisabled(false);
    };
};

/** The colour card's search box. Needs no variant data. Returns the undo. */
export const wireColourUi = (root: Element): (() => void) => {
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

/**
 * Narrows the sizes to those that exist for the picked colour, marks the ones out of stock, disables colours with no sizes and keeps the
 * "N Colours" badge to the colours that can be bought. Returns the undo.
 */
export const wireAvailability = (root: Element, matrix: Matrix): (() => void) => {
    const colourGroup = root.querySelector("[data-variant-colours]");
    const sizeGroup = root.querySelector("[data-variant-sizes]");
    if (!colourGroup || !sizeGroup) return () => {};
    const colours = choicesIn(colourGroup);
    const sizes = choicesIn(sizeGroup);
    const badge = root.querySelector<HTMLElement>("[data-variant-count]");
    const badgeText = badge?.textContent ?? "";

    const apply = () => {
        const picked = colours.find((choice) => choice.isSelected())?.label;
        const selected = sizes.find((choice) => choice.isSelected())?.label;
        const plan = planSizes(matrix, picked, sizes.map((s) => s.label), selected);
        for (const size of sizes) {
            size.setShown(plan.visible.includes(size.label));
            size.setSoldOut(plan.outOfStock.includes(size.label));
        }
        if (plan.clearSize) sizes.find((choice) => choice.isSelected())?.clear();
    };

    const off = disabledColours(matrix, colours.map((c) => c.label));
    for (const colour of colours) if (off.has(colour.label)) colour.setShown(false);
    if (badge) badge.textContent = badgeText.replace(/\d+/, String(colours.length - off.size));

    colourGroup.addEventListener("change", apply);
    apply();
    return () => {
        colourGroup.removeEventListener("change", apply);
        for (const choice of [...colours, ...sizes]) {
            choice.setShown(true);
            choice.setSoldOut(false);
        }
        if (badge) badge.textContent = badgeText;
    };
};
