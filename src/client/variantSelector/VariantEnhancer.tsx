/** @jsxImportSource react */
// The theme compiles JSX against the HBX runtime; client code ships to the browser and must use plain React's.
"use client"

import {useEffect, useRef} from "react";
import {validateMatrix} from "./availability.ts";
import {choicesIn, setLoading, wireAvailability, wireColourUi} from "./dom.ts";
import {fetchVariants} from "./fetchVariants.ts";
import {buildMatrix} from "./matrix.ts";

/** How long to wait for the variants before giving up and leaving the plain selector. */
const FETCH_TIMEOUT_MS = 8000;

/**
 * Progressive enhancement of the server-rendered colour + size selector. The static markup is the whole UI and works without JS; this adds
 * the colour search at once, then narrows the sizes per colour once the variants arrive.
 *
 * If anything fails (the request, a timeout, data that does not match the page, or an error while wiring) it logs the error to the console
 * and undoes every change, leaving exactly the plain selector a visitor without JS gets.
 */
export const VariantEnhancer = ({productId, token}: {productId: number; token: string}) => {
    const marker = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        // Its own selector: the one this island was rendered in, not the first on the page (a quick view can add a second).
        const root = marker.current?.closest("[data-variant-selector]");
        if (!root) return;
        const undo: Array<() => void> = [];
        const undoAll = () => {
            while (undo.length > 0) undo.pop()?.();
        };
        const controller = new AbortController();
        let timedOut = false;
        const timer = setTimeout(() => {
            timedOut = true;
            controller.abort();
        }, FETCH_TIMEOUT_MS);
        let undoLoading = () => {};
        const bail = (error: unknown) => {
            undoLoading();
            undoAll();
            root.setAttribute("data-variant-enhancer", "failed");
            console.error("[variant-selector] Could not enhance the colour and size selector; showing the plain selector instead.", error);
        };

        try {
            undo.push(wireColourUi(root));
            undoLoading = setLoading(root);
        } catch (error) {
            clearTimeout(timer);
            bail(error);
            return;
        }

        fetchVariants({productId, token, signal: controller.signal})
            .then((variants) => {
                // "colour" also matches "Color" (see matrix.ts).
                const matrix = buildMatrix(variants, "colour", "size");
                const colourGroup = root.querySelector("[data-variant-colours]");
                const problem = validateMatrix(matrix, colourGroup ? choicesIn(colourGroup).map((choice) => choice.label) : []);
                if (problem) throw new Error(problem);
                undoLoading();
                undo.push(wireAvailability(root, matrix));
                root.setAttribute("data-variant-enhancer", "ready");
            })
            .catch((error: unknown) => {
                // Leaving the page (the effect's own cleanup aborts the request) is not a failure.
                if (controller.signal.aborted && !timedOut) return;
                bail(timedOut ? new Error(`the variant request took longer than ${FETCH_TIMEOUT_MS} ms`) : error);
            })
            .finally(() => clearTimeout(timer));

        return () => {
            clearTimeout(timer);
            controller.abort();
            undoLoading();
            undoAll();
        };
    }, [productId, token]);
    return <span ref={marker} hidden />;
};
