import postcss from "postcss";
import type { Plugin } from "vite";
import tailwind from "@tailwindcss/postcss";


export const VirtualTailwind = (srcTailwind: string, postCSSTransformations?: Array<postcss.AcceptedPlugin>) => {
    const TAILWIND_SOURCE = /\.(tsx?|jsx?|html|hbs)$/;
    let root = "";
    let tailwindFile = "";
    let pending: ReturnType<typeof setTimeout> | undefined;

    // Runs Tailwind over `code` and wraps the CSS so that libsass (BC CDN) passes it through untouched.
    const toScss = async (code: string, id: string) => {
        const result = await postcss([
            tailwind(),
            ...(postCSSTransformations || [])
        ]).process(code, { from: id });

        const retCss = result?.css?.replaceAll('\\', '\\\\')
            ?.replaceAll('"', '\\"')
            ?.replaceAll('#{', '\\#{') // Sass interpolates inside quoted strings
            ?.replaceAll(/\r?\n/g, '\\a '); // or minify first so there are no newlines

        // libsass reads a root-level `#{...}` as a selector, so the CSS rides in an at-rule's params instead.
        // The leading `;` closes `@tw-inline` immediately (browsers drop the empty unknown at-rule), so the CSS
        // after it stays intact.
        return `@tw-inline #{unquote(";\\a ${retCss || `/* TAILWIND EMPTY */`}")};`;
    };

    return {
        name: "postcss-virtual-tailwind",
        configResolved(config) {
            root = config.root;
        },
        // dev: the Stencil plugin pulls the scss through vite's pipeline
        async transform(code, id) {
            // returning `code` for untouched modules counts as a transform without a sourcemap (SOURCEMAP_BROKEN x ~1300)
            if (!id.includes(srcTailwind)) return null;
            tailwindFile = id.split("?")[0];
            // generated CSS has no meaningful source, so an empty map is correct
            return { code: await toScss(code, id), map: { mappings: "" } };
        },
        // dev: Tailwind runs outside vite's css pipeline, so vite doesn't know the css depends on the class names in
        // the source files. The Stencil plugin only refreshes its scss cache (and reloads) for files under
        // assets/scss, so report a source edit as an edit of the tailwind entry itself.
        handleHotUpdate({ file, server }) {
            if (!tailwindFile || !TAILWIND_SOURCE.test(file) || file.includes("/node_modules/") || file.includes("/dist/")) return;
            clearTimeout(pending);
            pending = setTimeout(() => server.watcher.emit("change", tailwindFile), 50);
        },
        // build: the Stencil plugin copies assets/scss/** from disk into the bundle, bypassing `transform`, so
        // rewrite the emitted asset. Runs before the Stencil plugin's `order: "post"` hook that bundles the scss.
        async generateBundle(_, bundle) {
            for (const [fileName, output] of Object.entries(bundle)) {
                if (output.type !== "asset" || !fileName.startsWith("assets/scss/") || !fileName.endsWith(srcTailwind)) continue;
                const source = typeof output.source === "string" ? output.source : Buffer.from(output.source).toString("utf-8");
                output.source = await toScss(source, `${root}/${fileName}`);
            }
        }
    } as Plugin;
};
