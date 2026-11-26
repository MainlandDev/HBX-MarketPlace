import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import {describe, expect, it} from "vitest";

const entry = fileURLToPath(new URL("../../assets/scss/tailwind/_tailwind.scss", import.meta.url));
const themeScreens = fileURLToPath(new URL("../../assets/scss/settings/_settings-global.scss", import.meta.url));

const compile = async (candidates) =>
    (await postcss([tailwind()]).process(`${readFileSync(entry, "utf8")}\n@source inline("${candidates.join(" ")}");`, {from: entry})).css;

const screens = (path) => Object.fromEntries([...readFileSync(path, "utf8").matchAll(/^\$screen-(\w+):\s*(\d+)px/gm)].map((m) => [m[1], Number(m[2])]));

describe("breakpoints", () => {
    it("generates the theme's breakpoint names at the theme's widths", async () => {
        const css = await compile(["small:flex", "medium:flex", "large:flex"]);
        expect(css).toMatch(/width >= 551px|min-width: 551px/);
        expect(css).toMatch(/width >= 801px|min-width: 801px/);
        expect(css).toMatch(/width >= 1261px|min-width: 1261px/);
    });

    it("does not generate Tailwind's own default breakpoint names", async () => {
        const css = await compile(["md:flex", "sm:flex", "lg:flex"]);
        expect(css).not.toMatch(/\.(md|sm|lg)\\:flex/);
    });

    it("matches the $screen-* values the SCSS declares", async () => {
        const expected = screens(themeScreens);
        const css = await compile(Object.keys(expected).map((name) => `${name}:flex`));
        for (const [name, width] of Object.entries(expected)) {
            expect(css, `breakpoint ${name}`).toMatch(new RegExp(`(width >= ${width}px|min-width: ${width}px)[\\s\\S]*?\\.${name}\\\\:flex`));
        }
    });
});

describe("spacing and type scales", () => {
    it("maps the theme's spacing keys to the bridged variables", async () => {
        const css = await compile(["p-single", "mt-half", "gap-quarter"]);
        expect(css).toContain("padding: var(--sv-spacing-single)");
        expect(css).toContain("margin-top: var(--sv-spacing-half)");
        expect(css).toContain("gap: var(--sv-spacing-quarter)");
    });

    it("maps the theme's font sizes without touching line-height", async () => {
        const css = await compile(["text-small", "text-tiny"]);
        expect(css).toContain("font-size: var(--sv-fontSize-small)");
        expect(css).toContain("font-size: var(--sv-fontSize-tiny)");
        expect(css).not.toMatch(/\.text-small\s*\{[^}]*line-height/);
    });
});

describe("JS state class variants", () => {
    it("styles an element that Foundation/theme JS marks with .is-open or .is-active, without changing the JS", async () => {
        const css = await compile(["is-open:p-half", "is-active:text-small"]);
        expect(css).toMatch(/is-open\\:p-half[^{]*\.is-open[^{]*\{[^}]*padding: var\(--sv-spacing-half\)/);
        expect(css).toMatch(/is-active\\:text-small[^{]*\.is-active[^{]*\{[^}]*font-size: var\(--sv-fontSize-small\)/);
    });
});

describe("merchant settings bridge", () => {
    it("exposes a stencil setting read directly in the SCSS as a custom property utilities can use", async () => {
        const css = await compile(["text-(--sv-setting-optimizedCheckout-link-color)"]);
        expect(css).toContain("color: var(--sv-setting-optimizedCheckout-link-color)");
    });
});
