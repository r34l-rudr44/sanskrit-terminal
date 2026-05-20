# SANSKRIT.EXE

**Learn Sanskrit Daily** — a retro-terminal-styled, interactive Sanskrit learning app with module-based lessons, daily streaks, achievements, and full offline (PWA) support.

Live: [sanskritexe.vercel.app](https://sanskritexe.vercel.app) &nbsp;|&nbsp; Status: **BETA**

---

## Features

- **Structured curriculum** — lessons organized into modules and days, each with a mix of question types (MCQ, translation, fill-in-the-blank, word tiles, matching)
- **Five question types** — multiple choice, free translation, fill-in-the-blank, word-tile assembly, and pair matching
- **Daily streak & quests** — streak tracking with warnings, daily quest system, welcome-back UX
- **Achievements** — unlockable milestones stored in localStorage
- **Browser notifications** — opt-in reminders for daily practice
- **Offline support** — full PWA with service worker; works without a network after first load
- **Two themes** — dark (default) and light, following OS preference with manual override
- **Devanagari + transliteration** — toggle between scripts per-session
- **Responsive** — works on phones, tablets, and desktop; landscape-mode optimized
- **No backend** — 100% client-side, all state in localStorage

---

## Tech Stack

| Layer | Choice |
|---|---|
| Build tool | Vite 8 |
| Language | Vanilla JavaScript (ES modules) |
| Styling | Plain CSS with custom properties |
| PWA | vite-plugin-pwa (Workbox) |
| Compression | vite-plugin-compression (Brotli + gzip) |
| Testing | Playwright (smoke / E2E) |
| Deployment | Vercel |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Testing

### Smoke tests (Playwright E2E)

```bash
npm run test:smoke
```

Runs 55 tests against a local dev server. The suite is organized into 6 files under `tests/smoke/`:

| File | What it covers |
|---|---|
| `lesson-flow.spec.js` | Home load, full lesson flow, module test, skip confirmation, transliteration, sidebar |
| `question-types.spec.js` | All 5 question types: MCQ, translation, fill, word tiles, match |
| `navigation.spec.js` | Briefing, score screen, certificate screen, exit, retry |
| `progress.spec.js` | Progress persistence, streak, completed-day markers, localStorage state |
| `preferences.spec.js` | Theme, font size, script selection, sound, data reset |
| `data-integrity.spec.js` | All lessons load without JS error with correct question counts |

### Lesson data validation

```bash
npm run validate:lessons
```

Checks every file under `src/data/` for structural correctness (required fields, valid question types, etc.).

---

## Project Structure

```text
src/
  css/            Global stylesheet (all design tokens live here)
  data/           Sanskrit lesson content
    index.js      Module registry — import new lessons here
    module-1/     day-1.js … day-5.js, test.js
    module-2/     day-1.js … day-3.js, test.js
  js/
    home.js       Home page entry point
    lesson.js     Lesson page entry point
    state.js      localStorage state management
    components.js Shared UI components
    achievements.js  Achievement system
    quests.js     Daily quest system
    notifications.js Browser notification prompts
    utils.js      Shared helpers

public/           Static assets (favicons, PWA icons, OG image, icon sprite)
blog/             Blog pages (static HTML)
docs/             Authoring guides and lesson file templates
tests/smoke/      Playwright test suite
scripts/          Build-time scripts (OG image generation, lesson validation)

index.html        Home page
lesson.html       Lesson page
vite.config.js    Vite + PWA + compression config
vercel.json       Deployment config (cache headers, CSP, clean URLs)
BRAND_KIT.md      Design system reference (colors, fonts, icons, motion)
```

---

## Adding Curriculum Content

Lesson content is plain JavaScript files — no database, no CMS.

See [`docs/adding-modules-and-lessons.md`](docs/adding-modules-and-lessons.md) for the full authoring guide and [`docs/templates/`](docs/templates/) for ready-to-copy lesson file templates.

**Quick summary:**

1. Create `src/data/module-N/day-1.js` (copy a template).
2. Export `meta`, `briefing`, and `questions` from the file.
3. Import and register the lesson in `src/data/index.js`.
4. Run `npm run validate:lessons` to check structure.
5. Run `npm run test:smoke` to confirm nothing is broken.

---

## Deployment

Deployed on Vercel. Push to `main` triggers an automatic production deploy.

```bash
# Manual deploy via Vercel CLI (if needed)
vercel --prod
```

`vercel.json` configures:
- `immutable` cache headers on all hashed assets (1 year)
- Security headers (`X-Frame-Options`, `CSP`, `Permissions-Policy`, etc.)
- Clean URLs (no `.html` extensions)

---

## Brand & Design System

See [`BRAND_KIT.md`](BRAND_KIT.md) for the complete reference:
- Color tokens (dark + light themes)
- Typography (VT323, Share Tech Mono, Noto Sans Devanagari)
- Logo assembly spec
- Favicon and icon inventory
- Motion / animation catalogue
- Component interaction states
- Responsive breakpoints and z-index stack

---

## Contributing

- New lessons: follow [`docs/adding-modules-and-lessons.md`](docs/adding-modules-and-lessons.md)
- Design changes: consult [`BRAND_KIT.md`](BRAND_KIT.md) before introducing new colors or fonts
- Bug reports: open an issue on GitHub
