import {readdirSync, readFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import {describe, expect, it} from "vitest";
import {loadTokens} from "../design-tokens/load.mjs";

const entry = fileURLToPath(new URL("../../assets/scss/_tailwind.scss", import.meta.url));
const kebab = (name) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const compile = async (candidates) => {
    const source = `${readFileSync(entry, "utf8")}\n@source inline("${candidates.join(" ")}");`;
    return (await postcss([tailwind()]).process(source, {from: entry})).css;
};

describe("theme layer", () => {
    it("maps merchant colours to the bridged --sv-* variables", async () => {
        const css = await compile(["bg-primary", "bg-primary-darker", "text-grey-lightest"]);
        expect(css).toContain("background-color: var(--sv-color-primary)");
        expect(css).toContain("background-color: var(--sv-color-primaryDarker)");
        expect(css).toContain("color: var(--sv-color-greyLightest)");
    });

    it("maps every design token colour to its --color-* property without a self-reference", async () => {
        const names = Object.keys(loadTokens().colors).map(kebab);
        const css = await compile(names.map((n) => `bg-${n}`));
        for (const name of names) {
            expect(css, name).toContain(`background-color: var(--color-${name})`);
            expect(css, name).not.toContain(`--color-${name}: var(--color-${name})`);
        }
    });

    it("still allows the raw bridge through arbitrary values", async () => {
        expect(await compile(["bg-(--sv-color-primary)"])).toContain("background-color: var(--sv-color-primary)");
    });
});

describe("emitted utilities", () => {
    // Tailwind takes candidates from any text in an @source folder (attributes, comments), and with `important` a stray
    // `.hidden` or `.block` would override third-party and merchant markup site-wide.
    it("only emits classes that a className in a listed @source folder actually uses", async () => {
        const source = readFileSync(entry, "utf8");
        const folders = [...source.matchAll(/^@source "([^"]+)";/gm)].map((m) => resolve(dirname(entry), m[1]));
        const used = new Set();
        const walk = (dir) => {
            for (const item of readdirSync(dir, {withFileTypes: true})) {
                const path = join(dir, item.name);
                if (item.isDirectory()) walk(path);
                else if (/\.(tsx|jsx)$/.test(item.name)) {
                    for (const m of readFileSync(path, "utf8").matchAll(/className="([^"]+)"/g)) m[1].split(/\s+/).forEach((c) => used.add(c));
                }
            }
        };
        folders.forEach(walk);
        expect(used.size).toBeGreaterThan(0);

        const css = (await postcss([tailwind()]).process(source, {from: entry})).css;
        const utilities = css.slice(css.indexOf("@layer utilities"), css.indexOf("@layer base", css.indexOf("@layer utilities")));
        const emitted = [...utilities.matchAll(/^\s*\.((?:\\.|[\w-])+)/gm)].map((m) => m[1].replaceAll("\\", ""));
        expect(emitted.filter((c) => !used.has(c))).toEqual([]);
    });
});
