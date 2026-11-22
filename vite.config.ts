import {defineConfig, type PluginOption} from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";
import {BigcommerceStencil} from "@mainlanddev/bigcommerce-stencil";
import {HBXBigCommerce} from "@mainlanddev/hbx-bigcommerce/plugin";
import {islands} from "@vitejs/plugin-islands";


// Only "use client" modules matched here can hydrate.
const islandsOptions = {include: ["src/client/**/*.{js,jsx,ts,tsx}"]};

export default defineConfig({
    plugins: [
        // Fast Refresh needs a preamble Stencil's pages do not carry, and its self-import of `/src/...` is swallowed by Stencil's dev server.
        react({exclude: [/[\\/]src[\\/]client[\\/]/]}),
        BigcommerceStencil({
            paths: {
                // assetsScss: "./temp_assets_external_test/scss",
                templates: "./templates"
            },
            debug: {
                // printDetectedFilesOnDisk: true
                // network: { printServerRequests: true }
                // frontmatter: true
            },
            system: {
                variantIndex: 0,
                bundleMode: "flat",
                alwaysBuildLike: "bundle",
                // Mirrors webpack.common.js `entry`; keys are the output names (assets/dist/<key>.js), matching the
                // theme-bundle.* files the templates request. Bare names are packages loaded straight from node_modules.
                jsEntry: {
                    "theme-bundle.main": "./app.js",
                    "theme-bundle.head_async": "lazysizes",
                    "theme-bundle.font": "./theme/common/font.js",
                    "theme-bundle.polyfills": "./polyfills.js",
                    "theme-bundle.islands": "./islands.js",
                    "theme-bundle.polyfill_form_data": "formdata-polyfill",
                },
                channel: 1,
                stencilCliVersion: "10",
                storeSettingsLocale: {
                    default_shopper_language: "en",
                    shopper_language_selection_method: "default_shopper_language"
                },
                buildToPath: "./dist",
                buildWith: "vite",
            }
        }),
        // The linked package resolves its own copy of vite (and rolldown), whose Plugin type tsc cannot compare with this one.
        HBXBigCommerce({
            hints: "./.hbx",
            // The linked islands package resolves outside node_modules, where core would rewrite its template literals; it is not a template.
            core: {exclude: [/\/plugin-islands\//]},
            templates: {
                dir: "./src/templates",
                // The build renders the templates on a private server without this config's plugins: it needs the islands wrapper too.
                plugins: (() => islands(islandsOptions)) as never, // `as never`: the linked packages resolve different copies of vite's types
                // prettyPrint: {dropEmptyAttributeValues: true}
            },
            // Off on purpose: templates read plain `theme_settings.x` / `products` like the originals, never `@root.` (which prints empty inside {{#block}} fills).
            forwardRoot: false
        }) as unknown as PluginOption,
        islands(islandsOptions) as unknown as PluginOption
    ],
    resolve: {
        // The linked islands package has its own react; the theme and the islands runtime must share one copy.
        dedupe: ['react', 'react-dom'],
        // Mirrors webpack.common.js `resolve.alias`
        alias: {
            '@': path.resolve(__dirname, 'src'),

            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            jstree: path.resolve(__dirname, 'node_modules/jstree/dist/jstree.min.js'),
            lazysizes: path.resolve(__dirname, 'node_modules/lazysizes/lazysizes.min.js'),
            'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.min.js'),
            'svg-injector': path.resolve(__dirname, 'node_modules/svg-injector/dist/svg-injector.min.js'),
        },
    },
    build: {
        rolldownOptions: {
            transform: {
                inject: {
                    exclude: ['**/jquery-global.js', '**/node_modules/jquery/**'],
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                }
            }
        },
        minify: false,
        sourcemap: true,
    },
    experimental: {
        // Mirrors webpack's `__webpack_public_path__`: prefix preload/chunk URLs with the {{cdn 'assets/dist/'}} URL set in base.html
        renderBuiltUrl(filename, {hostType}) {
            if (hostType === 'js') {
                return {runtime: `window.__webpack_public_path__ + ${JSON.stringify(filename.replace(/^assets\/dist\//, ''))}`}
            }
        },
    },
    server: {
        allowedHosts: ['.trycloudflare.com']
    }
});
