/**
 * Post-build script: generates a per-recipe index.html inside dist/recipe/{id}/
 * with the correct Open Graph meta tags so social-media crawlers (Facebook,
 * Viber, Telegram, etc.) render the recipe's first image as the link preview.
 *
 * Usage (runs automatically via the "postbuild" npm script):
 *   node scripts/generate-og-pages.mjs
 *
 * Requires that `dist/index.html` and `dist/recipes-meta.json` already exist
 * (produced by the Vite build + the recipeMetaPlugin in vite.config.ts).
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIRECTORY, "..");
const DIST_DIRECTORY = resolve(PROJECT_ROOT, "dist");

// ── Configuration ────────────────────────────────────────────────────────────
// The base path must match vite.config.ts → base
const BASE_PATH = "/MishosCookBook/";

// The full public origin.  When deploying to a custom domain, update this.
// For GitHub Pages the pattern is https://<user>.github.io
// If you don't know the origin yet, leave it empty – relative OG URLs still
// work on many platforms, and you can update this later.
const SITE_ORIGIN = "";

// ── Helpers ──────────────────────────────────────────────────────────────────
function buildAbsoluteUrl(relativePath) {
    const cleanPath = relativePath.replace(/^\/+/, "");
    return `${SITE_ORIGIN}${BASE_PATH}${cleanPath}`;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// ── 1. Copy index.html → 404.html (replaces the old postbuild one-liner) ────
const indexHtmlPath = resolve(DIST_DIRECTORY, "index.html");
const notFoundHtmlPath = resolve(DIST_DIRECTORY, "404.html");
copyFileSync(indexHtmlPath, notFoundHtmlPath);
console.log("Copied dist/index.html → dist/404.html");

// ── 2. Read the built index.html template & recipe metadata ─────────────────
const templateHtml = readFileSync(indexHtmlPath, "utf-8");

const recipesMetaPath = resolve(DIST_DIRECTORY, "recipes-meta.json");
if (!existsSync(recipesMetaPath)) {
    console.error(
        "ERROR: dist/recipes-meta.json not found. " +
        "Make sure the recipeMetaPlugin in vite.config.ts ran during the build.",
    );
    process.exit(1);
}

const recipesMeta = JSON.parse(readFileSync(recipesMetaPath, "utf-8"));

console.log(`Generating OG pages for ${recipesMeta.length} recipe(s)…`);

// ── 3. Generate one HTML file per recipe ─────────────────────────────────────
for (const recipe of recipesMeta) {
    const recipeUrl = buildAbsoluteUrl(`recipe/${recipe.id}`);
    const imageUrl = buildAbsoluteUrl(recipe.firstImageSrc.replace(/^\/+/, ""));
    const safeTitle = escapeHtml(recipe.title);

    // Build the OG meta-tag block
    const ogMetaTags = [
        `<meta property="og:type" content="article" />`,
        `<meta property="og:title" content="${safeTitle}" />`,
        `<meta property="og:description" content="${safeTitle}" />`,
        `<meta property="og:image" content="${imageUrl}" />`,
        `<meta property="og:url" content="${recipeUrl}" />`,
    ].join("\n    ");

    // Replace the default OG tags in the template with recipe-specific ones,
    // and also update <title>.
    let recipeHtml = templateHtml
        // Replace existing OG block (between the two comment-like meta tags)
        .replace(
            /<!-- Open Graph defaults \(overridden per-recipe at build time\) -->[\s\S]*?<meta property="og:url"[^>]*>/,
            `<!-- Open Graph: ${safeTitle} -->\n    ${ogMetaTags}`,
        )
        .replace(
            /<title>[^<]*<\/title>/,
            `<title>${safeTitle}</title>`,
        );

    const recipeDirectory = resolve(DIST_DIRECTORY, "recipe", recipe.id);
    mkdirSync(recipeDirectory, { recursive: true });
    writeFileSync(resolve(recipeDirectory, "index.html"), recipeHtml, "utf-8");
}

console.log(`Done – wrote ${recipesMeta.length} recipe page(s) under dist/recipe/.`);

