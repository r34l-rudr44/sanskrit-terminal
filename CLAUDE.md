# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Vite dev server (http://localhost:5173)
npm run build            # Production build to dist/
npm run preview          # Serve the production build locally
npm run test:smoke       # Playwright E2E suite (tests/smoke/)
npm run validate:lessons # Structural validation of all src/data/ lesson files
```

Run a single test file or test:

```bash
npx playwright test tests/smoke/lesson-flow.spec.js
npx playwright test -g "lesson renders, answers advance"
```

Playwright starts its own dev server on `127.0.0.1:4173` (see `playwright.config.js`) and reuses an existing one if running. On Windows it drives `msedge`; elsewhere it uses the default channel. Always run `validate:lessons` after editing anything under `src/data/`.

## Architecture

This is a **backendless, multi-page vanilla-JS PWA** built with Vite. There is no framework and no bundler-level routing — each HTML page is its own Vite entry point that imports one top-level ES module.

### Page → entry-module wiring

Rollup inputs are declared in `vite.config.js`. Each page's `<script type="module">` loads exactly one JS entry:

| Page | Entry module | Role |
|---|---|---|
| `index.html` | `src/js/home.js` | Module/day grid, stats, review widget |
| `lesson.html` | `src/js/lesson.js` | The lesson runtime (briefing → questions → score) |
| `path.html` | `src/js/path.js` | Curriculum path view |
| `progress.html` | `src/js/progress.js` | Progress dashboard |
| `blog/*.html` | inline modules | Static articles |

`lesson.html` is reached via query params: `/lesson.html?mod=1&day=1-1`. Adding a new page means adding both the `.html` file and a `rollupOptions.input` entry.

### State: everything is localStorage

There is no server and no in-memory store beyond the current page. `src/js/state.js` is the single source of truth for persisted progress; it hydrates the `state` object from `sk_*` localStorage keys at import time. Key namespaces all use the `sk_` prefix (`sk_completed_v2`, `sk_streak`, `sk_lesson_progress`, `sk_review_items`, `sk_achievements`, etc.). `confirmClearCache()` in `state.js` holds the authoritative list of every key — **when you add a new persisted key, add it there too** or "reset data" will leak state.

### Content is code, not data files

Lessons are ES modules under `src/data/module-N/`, each exporting `id`, `title`, `icon`, `metadata`, `briefing`, `questions` (tests additionally export `isTest = true`). `src/data/index.js` is the registry: a new day/test file does nothing until it is imported and added to a module's `days` array there. **Order in `days` matters** — it drives home/sidebar display order and the module-test unlock gate (`isDayLocked` in `home.js` locks a test until all non-test days in the module are completed). See `docs/adding-modules-and-lessons.md` for the full authoring spec and `docs/templates/` for copyable file shapes.

### Lesson runtime (`src/js/lesson.js`)

Single-file state machine over `.screen` divs (`showScreen(name)` toggles the `active` class between briefing / lesson / score). It renders the five question types (`mcq`, `translation`, `fill`, `match`, `wordtiles`), persists mid-lesson progress to `sk_lesson_progress` (debounced) so a refresh resumes, and has a distinct mobile virtual-keyboard docking path gated on a `(max-width: 768px) and (pointer: coarse)` media query.

### Answer matching (`src/js/transliteration.js`)

Typed answers (`translation`/`fill`/`wordtiles`) are **not** compared literally. `isAcceptedTypedAnswer()` normalizes whitespace/punctuation and folds Latin diacritics, and accepts both the Devanagari `answer` and an optional `answerRoman`/`answerRoman`-style equivalent. When authoring, still keep exact-match answer strings correct (Devanagari vs roman, trailing danda `।`, spacing) — several checks depend on them.

### Spaced repetition (`src/js/srs.js`)

Review scheduling uses **SM-2 with a binary correct/incorrect grade** (not the usual 0–5 scale), keyed by `makeReviewId(dayId, qIndex)` and stored in `sk_review_items`. Due items surface via `getDueReviewIds()` and are rendered by `src/js/review.js` on the home page.

### Retention layer

`achievements.js`, `quests.js`, and `notifications.js` are localStorage-only side systems the lesson flow calls into on completion (grant achievements, tick the daily quest, offer streak reminders). They have no backend and degrade silently if permissions are denied.

## Conventions

- **UTF-8 always** — lesson content is full of Devanagari; never let an editor rewrite encoding.
- **Sanskrit sentences end with danda `।`, not `.`** — enforced in authoring guidelines and expected throughout briefings/explanations.
- **Never imply a single correct Sanskrit word order** in question text/explanations; word order is free (only `wordtiles.answer` is a fixed canonical string because it's compared literally).
- **All user-facing dynamic strings go through `escapeHtml`** (`utils.js`); `validate-lessons.js` also rejects lesson content containing script/handler-like HTML.
- CSS design tokens live entirely in `src/css/style.css`; consult `BRAND_KIT.md` before adding colors or fonts.

## Deployment

Vercel, auto-deploy on push to `main`. `vercel.json` sets immutable 1-year cache headers on hashed assets, a CSP and security headers, and clean URLs (no `.html`). The PWA service worker (`vite-plugin-pwa`, `autoUpdate`) precaches the app shell and runtime-caches Google Fonts.
