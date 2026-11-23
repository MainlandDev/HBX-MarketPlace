import {defineConfig} from "vitest/config";
import path from "node:path";

// Separate from vite.config.ts on purpose: that one loads the Stencil and HBX plugins, which unit tests do not need.
export default defineConfig({
    resolve: {alias: {"@": path.resolve(import.meta.dirname, "src")}},
    test: {include: ["src/client/**/*.test.ts", "scripts/**/*.test.mjs"], environment: "node"},
});
