// Checks the built product page markup for the colour + size selector.
// Run after `npm run vite-build`: node scripts/check-variant-selector.mjs
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read = (path) => readFileSync(new URL(`../dist/templates/components/products/${path}`, import.meta.url), "utf8");
const view = read("detail/purchase-form.html"); // the option flag pass lives in the purchase form, not the product-view composer
const selector = read("options/colour-size.html");

// Detection pass: flags set while looping the options, branch on both, and both keys freed on both paths (50-key scratchpad cap).
// Only a Colour option that is a swatch sets the flag; any other type leaves the plain option list.
assert.ok(view.includes('{{#each product.options}}{{#if (toLowerCase display_name) "===" "colour"}}{{#if partial "===" "swatch"}}{{assignVar "hasColour" 1}}'), "the colour flag is set only for a swatch option");
assert.match(view, /\{\{assignVar "hasSize" 1\}\}/);
assert.match(view, /\{\{#all \(getVar "hasColour"\) \(getVar "hasSize"\)\}\}/);
const frees = view.match(/\{\{assignVar "hasColour" null\}\}\{\{assignVar "hasSize" null\}\}/g) ?? [];
assert.equal(frees.length, 2, "each branch must free both flags");
assert.match(view, /\{\{else\}\}\{\{assignVar "hasColour" null\}\}[\s\S]*?\{\{\{dynamicComponent "components\/products\/options"\}\}\}/, "the else branch keeps the plain option list");

// Static selector: colour group, size group, no script, and the option partials (native inputs) are reused.
assert.match(selector, /data-variant-colours/);
assert.match(selector, /data-variant-sizes/);
assert.match(selector, /data-variant-search="" hidden/, "the search box stays hidden until the enhancer runs");
assert.match(selector, /Choose Colour/);
assert.match(selector, /{{values.length}} Colours/);
assert.doesNotMatch(selector, /variant-colours-all/, "no collapse toggle: every colour stays visible");
assert.doesNotMatch(selector, /<script/);
assert.equal((selector.match(/dynamicComponent "components\/products\/options"/g) ?? []).length >= 3, true);
assert.match(selector, /<vite-island [^>]*data-export="VariantEnhancer"[^>]*data-props="[^"]*{{json product.id}}[^"]*{{json settings.storefront_api.token}}/, "the enhancer island takes the product id and storefront token from Handlebars");
assert.match(selector, /data-hydrate="client"/);
// The swatch template carries the chosen-colour copy (CSS shows it) and the larger image for tiles.
const swatch = read("options/swatch.html");
assert.match(swatch, /class="form-option-active-copy" aria-hidden="true"/);
assert.ok(swatch.includes(`--swatch-image-large: url('{{getImage image "gallery_size"}}')`));
assert.equal((swatch.match(/form-option-variant--pattern/g) ?? []).length, 2, "the label and the copy each render the image swatch");
console.log("variant selector checks passed");
