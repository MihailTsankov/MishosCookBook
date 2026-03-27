# AGENTS: How to be productive in this repo

This document gives focused, actionable guidance for AI coding agents working on MishosCookBook_v3.

1) Big-picture architecture
- Frontend single-page app (React + TypeScript) built with Vite. Entry points: `src/main.tsx` and `src/App.tsx`.
- UI uses MUI + Emotion (`@mui/material`, `@emotion/*`). Theme helpers in `src/theme.ts`.
- Static/public assets (images, icons) live under `public/` and are served relative to Vite `base` (see `vite.config.ts` — `base: "/MishosCookBook/"`).
- Local app data is in `src/data/` (recipes, static JSON-like exports). Types live in `src/types/` and reusable logic in `src/hooks/`.

2) Developer workflows (PowerShell-ready commands)
- Start dev server (HMR): `npm run dev`  # runs `vite`
- Build for production: `npm run build`  # runs `tsc -b && vite build`
- Create SPA 404 copy after build: `npm run postbuild` runs automatically (copies `dist/index.html` -> `dist/404.html`).
- Preview production build: `npm run preview`  # vite preview
- Run tests: `npm run test` (single run using Vitest)
- Run tests in watch mode: `npm run test:watch`

Notes: use PowerShell on Windows; combine commands with `;` if needed. The repository uses strict TypeScript settings (`tsconfig.app.json`) and noEmit — run `npm run build` to validate types and produce a bundled `dist`.

3) Project-specific conventions and patterns
- Naming: variables camelCase, constants UPPER_CASE, functions camelCase (also documented in `.github/copilot-instructions.md`).
- File structure conventions: keep presentational UI in `src/components/`, domain data in `src/data/`, hooks in `src/hooks/`, i18n resources in `src/i18n/` and type definitions in `src/types/`.
- Styling: MUI + Emotion. Patterns: components often use MUI primitives + `sx` or styled-emotion wrappers (see `src/theme.ts` and component files).
- Routing: app implies a client-side SPA using `react-router-dom` (dependency present). Check `src/main.tsx` / `src/App.tsx` for specific routes.
- Tests: Vitest configured in `vite.config.ts` (happy-dom environment, `src/setupTests.ts` used for setup). Use `@testing-library/react` in existing tests.

4) Integration points & dependencies
- Key runtime deps: `react`, `react-dom`, `react-router-dom`, `i18next`, `react-i18next`, `@mui/material`, `@emotion/react`, `@emotion/styled`.
- Dev/runtime config: `vite.config.ts` includes `base: "/MishosCookBook/"` — all absolute links and asset URLs must account for this base during deployment.
- Tests: Vitest with `environment: "happy-dom"` and `setupFiles: "./src/setupTests.ts"` (see `vite.config.ts`).

5) Existing AI guidance and repository cues
- `.github/copilot-instructions.md` exists and documents code-style (no single-letter names, spaces-only indentation, TypeScript naming rules). Use it as the canonical stylistic reference.
- No existing `AGENTS.md` or `AGENT.md` was present before this file.

6) Quick examples & patterns to copy
- Example script usage (from `package.json`):

  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }

- Example Vitest config (from `vite.config.ts`):

  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts",
    css: true,
  }

7) Actionable starting tasks for an AI agent
- Task A — Run the dev server: `npm run dev`. Inspect `http://localhost:5173` (or the port Vite reports) and open `src/App.tsx` and `src/main.tsx` to trace rendering and routing.
- Task B — Run unit tests in watch mode: `npm run test:watch`. Look at `src/setupTests.ts` for globals and `src/test-utils.tsx` for render wrappers.
- Task C — Add a new presentational component: create `src/components/NewFeatureCard/NewFeatureCard.tsx` following existing component patterns (MUI + Emotion; export a typed prop interface from `src/types/*`).
- Task D — Update i18n: add translation keys under `src/i18n/` and use `react-i18next` hooks in components.

8) Unknowns & recommended next probes
- No server-side API endpoints discovered in repository files — if external APIs are required, look for environment variables or docs. Search for `fetch(`, `axios`, or `.env` references when implementing data integrations.
- Confirm routing setup by opening `src/App.tsx` and `src/main.tsx` if you need to modify navigation or add routes.

If you need a longer onboarding or an architecture diagram, ask and I will expand this into a developer-oriented README section with code snippets and example component templates.

