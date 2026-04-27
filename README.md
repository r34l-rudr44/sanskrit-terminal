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

## Project Structure

```text
src/
  assets/         Images and static frontend assets
  css/            Additional stylesheet assets
  data/           Sanskrit lesson content by module/day
  js/             App logic for screens, components, state, and utilities
  main.js         Current Vite entry point
  style.css       Main stylesheet imported by the entry point

public/
  favicon.svg
  icons.svg
```

## Notes

- Lesson content is defined under `src/data/`, with modules split into daily files and tests.
- The interactive lesson experience is implemented under `src/js/`.
- `src/main.js` is still using the default Vite starter-style entry, so the lesson app may be wired through other HTML or JS entry files.

## Repository Files

- `index.html` and `lesson.html` provide HTML entry pages in the project root.
