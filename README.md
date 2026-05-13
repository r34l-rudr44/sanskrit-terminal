# Sanskrit Terminal

A Vite-powered Sanskrit learning project with structured lesson content, browser-based lesson flows.

## Overview

This repository contains:

- A frontend app built with Vite and vanilla JavaScript
- Lesson data organized by module and day
- UI logic for home, lesson, state, and shared components

## Tech Stack

- JavaScript
- Vite
- HTML/CSS

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Run the App

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Testing

### Run Smoke Tests

```bash
npm run test:smoke
```

Runs the full [Playwright](https://playwright.dev/) end-to-end suite (55 tests) against a local dev server. Tests are organized into 6 files under `tests/smoke/`:

| File | What it covers |
|------|----------------|
| `lesson-flow.spec.js` | Home load, lesson flow, module test, skip confirmation, transliteration, sidebar |
| `question-types.spec.js` | All 5 question types: MCQ, translation, fill, word tiles, match |
| `navigation.spec.js` | Briefing, score screen, certificate screen, exit, retry |
| `progress.spec.js` | Progress persistence, streak, completed-day markers, localStorage state |
| `preferences.spec.js` | Theme, font size, script selection, sound, data reset |
| `data-integrity.spec.js` | All 9 lessons load without JS error and show correct question counts |

### Validate Lesson Data

```bash
npm run validate:lessons
```

Checks all lesson data files under `src/data/` for structural correctness.

## Project Structure

```text
src/
  assets/         Images and static frontend assets
  css/            Stylesheet
  data/           Sanskrit lesson content by module/day
  js/             App logic: home, lesson, state, components, utils

public/
  favicon.svg
  icons/

docs/
  adding-modules-and-lessons.md   Authoring guide for new lessons
  templates/                      Lesson file templates

tests/
  smoke/                          Playwright end-to-end test suite

index.html                        Home page entry point
lesson.html                       Lesson page entry point
playwright.config.js              Playwright configuration
vite.config.js                    Vite build configuration
```

## Notes

- Lesson content lives under `src/data/`, organized by module and day.
- The app uses two HTML entry points: `index.html` (loads `src/js/home.js`) and `lesson.html` (loads `src/js/lesson.js`).
- `src/main.js` is unused and can be ignored.

## Contributing

- To add new lessons or modules, see [`docs/adding-modules-and-lessons.md`](docs/adding-modules-and-lessons.md).
- Lesson file templates are in [`docs/templates/`](docs/templates/README.md).
- After adding content, run `npm run validate:lessons` to check for structural errors, then `npm run test:smoke` to confirm nothing is broken.
