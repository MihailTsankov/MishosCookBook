/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import recipes from "./src/data/recipes";

/**
 * Vite build plugin that emits `recipes-meta.json` into dist/.
 * The postbuild script (`scripts/generate-og-pages.mjs`) reads this
 * file to generate per-recipe Open Graph HTML pages.
 */
function recipeMetaPlugin(): Plugin {
    return {
        name: "recipe-meta",
        apply: "build",
        generateBundle() {
            const recipesMeta = recipes.map((recipe) => ({
                id: recipe.id,
                title: recipe.title,
                firstImageSrc: recipe.image.length > 0 ? recipe.image[0].src : "",
            }));
            this.emitFile({
                type: "asset",
                fileName: "recipes-meta.json",
                source: JSON.stringify(recipesMeta, null, 2),
            });
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), recipeMetaPlugin()],
    base: "/MishosCookBook/",
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./src/setupTests.ts",
        css: true,
    },
});
