# SANSKRIT.EXE — Brand Kit

> Internal alias: **Magical Lantern**

Everything in this file is derived from live source files. When in doubt, treat `src/css/style.css` and `index.html` as the authoritative sources.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| Product name | **SANSKRIT.EXE** |
| Internal alias | Magical Lantern |
| Status badge | BETA |
| Logo icon | 🪔 (diya / oil lamp — illumination, knowledge) |
| Primary tagline | *"Learn Sanskrit Daily"* |
| Sanskrit motto | *"वाग्देव्यै नमः"* (Salutation to the Goddess of Speech) |
| Mission | *"An interactive daily Sanskrit learning app with guided lessons, module-based practice, and progress tracking."* |

**Logo assembly** (rendered in the topbar):
```
[ 🪔 ] SANSKRIT.EXE [BETA]
        वाग्देव्यै नमः
```
- Box: 40×40 px, `--border-brand` (2px solid `--brand`), background `--surface`
- Title: `VT323` font, 22 px, color `--brand`, `letter-spacing: 2px`, `text-shadow: 0 0 12px var(--brand)`
- Subtitle: 12 px, color `--text-3`, `letter-spacing: 1px`
- BETA badge: 10 px, `letter-spacing: 1px`, background `--brand`, white text

---

## 2. Color System

Themes are toggled via `data-theme="dark"` or `data-theme="light"` on `<html>`.  
Persistence: `localStorage` key `sk_theme`. OS fallback: `prefers-color-scheme`.  
Source: `src/css/style.css` (`:root` and `[data-theme]` blocks).

### 2.1 Design Tokens

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#06060A` | `#F5EDDA` |
| `--surface` | `#0C0C12` | `#EDE3C8` |
| `--surface2` | `#12121A` | `#E4D9B8` |
| `--surface3` | `#1A1A24` | `#D8CCAA` |
| `--surface4` | `#22222E` | `#CABF98` |
| `--brand` | `#F0A500` | `#6B3A00` |
| `--brand-dim` | `#A86E00` | `#4A2800` |
| `--brand-dark` | `#3D2800` | `#2A1600` |
| `--brand-glow` | `rgba(240,165,0,0.12)` | `rgba(107,58,0,0.10)` |
| `--brand-glow2` | `rgba(240,165,0,0.06)` | `rgba(107,58,0,0.05)` |
| `--ok` | `#3DD68C` | `#1A7A40` |
| `--ok-dim` | `#1A5C3A` | `#0D4020` |
| `--ok-bg` | `rgba(61,214,140,0.07)` | `rgba(26,122,64,0.08)` |
| `--err` | `#FF4D4D` | `#B52020` |
| `--err-dim` | `#6B1A1A` | `#5C1010` |
| `--err-bg` | `rgba(255,77,77,0.07)` | `rgba(181,32,32,0.07)` |
| `--cyan` | `#00D4C8` | `#1A5C7A` |
| `--text` | `#E8DEB8` | `#2A1E06` |
| `--text-2` | `#9A8F60` | `#6B5A30` |
| `--text-3` | `#4A4535` | `#A08858` |
| `--border` | `#252018` | `#C4B48A` |
| `--scanline-opacity` | `0.12` | `0.04` |
| `--flicker-min` | `0.97` | `0.99` |
| `--overlay-bg` | `rgba(0,0,0,0.78)` | `rgba(40,28,8,0.55)` |

### 2.2 Semantic Shadow Tokens

| Token | Value | Use |
|---|---|---|
| `--shadow` | `4px 4px 0 var(--brand-dark)` | Standard hard drop shadow |
| `--shadow-sm` | `3px 3px 0 var(--brand-dark)` | Smaller variant |
| `--shadow-ok` | `4px 4px 0 var(--ok-dim)` | Success / completion shadow |
| `--shadow-err` | `4px 4px 0 var(--err-dim)` | Error shadow |

### 2.3 Off-palette Accent

`#aa3bff` (purple) — used only inside `public/icons.svg` for the documentation and social stroke icons. Not a CSS variable; do not introduce it into UI components.

---

## 3. Typography

Fonts imported from Google Fonts in `index.html` and `lesson.html` (line 35 in each):

```html
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&family=Noto+Sans+Devanagari:wght@400&display=swap" rel="stylesheet"/>
```

| Role | Family | Weight | CSS var | Use |
|---|---|---|---|---|
| UI / body | Share Tech Mono | 400 | `--font-ui` | All interface text, buttons, labels, metadata |
| Display / logo | VT323 | 400 | `--font-logo` | App title, section headings, score displays |
| Sanskrit script | Noto Sans Devanagari | 400 | `--font-dev` | Vocabulary, Sanskrit examples, lesson content |

### 3.1 Font Size Tokens

Defined in `src/css/style.css` `:root`:

| Token | Value | Use |
|---|---|---|
| `--q-size` | `22px` | Question / prompt text |
| `--inp-size` | `18px` | Input fields, answer text |
| `--tile-size` | `17px` | Word tile text |

---

## 4. Logo Mark & Favicons

The favicon shape is a **geometric bolt / lightning symbol** — brand color `#F0A500` on `#06060A` background.

### 4.1 Favicon Files (`public/`)

| File | Dimensions | Purpose |
|---|---|---|
| `favicon.svg` | vector, 48×46 vb | Primary scalable favicon |
| `favicon.ico` | multi-size, 15 KB | Windows / legacy browsers |
| `favicon-16x16.png` | 16×16 | Small browser tab |
| `favicon-32x32.png` | 32×32 | Standard browser tab |
| `favicon-48x48.png` | 48×48 | Large browser tab |
| `apple-touch-icon.png` | 180×180 | iOS / macOS home screen |
| `android-chrome-192x192.png` | 192×192 | Android PWA icon |
| `android-chrome-512x512.png` | 512×512 | Android PWA splash |
| `safari-pinned-tab.svg` | vector, 48×46 vb | Safari pinned tab (monochrome black); mask-icon color `#F0A500` |
| `og-image.png` | 1200×630 | Social sharing card |

Source template for the OG image: `scripts/og-image-template.svg`.

### 4.2 Icons Sprite (`public/icons.svg`)

| Symbol ID | ViewBox | Color | Social platform |
|---|---|---|---|
| `bluesky-icon` | 16×17 | fill `#08060d` | Bluesky |
| `discord-icon` | 20×19 | fill `#08060d` | Discord |
| `github-icon` | 19×19 | fill `#08060d` | GitHub |
| `x-icon` | 19×19 | fill `#08060d` | X / Twitter |
| `social-icon` | 20×20 | stroke `#aa3bff` | Generic social / profile |
| `documentation-icon` | 21×20 | stroke `#aa3bff` | Documentation |

Usage: `<use href="/icons.svg#github-icon"/>` (or via JS `.innerHTML` injection).

---

## 5. Spacing & Layout

No custom spacing-scale CSS variables. Pixel values used directly:

**Common spacing:** 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36 px

**Border radius:**
| Value | Use |
|---|---|
| `2px` | Cards, inputs (sharp retro feel) |
| `6px 6px 0 0` | Bottom-bar tabs |
| `50%` | Pill badges, circular indicators |

**Minimum touch target:** 44 px (buttons and icon buttons).

---

## 6. Responsive Breakpoints

Source: `src/css/style.css` (media queries, lines 586–835).

| Label | Condition | Behaviour |
|---|---|---|
| Tiny phone | `max-width: 480px` | Single column, sidebar hidden, carousel module list, stacked actions |
| Small phone | `480–520px` | Logo shrinks |
| Tablet | `521–768px` | Wider module grid, sidebar still hidden |
| Desktop | `> 768px` | Sidebar visible, full layout |
| Landscape phone | `orientation: landscape` + `max-height: 500px` | Compact layout, VK dock repositions to bottom strip |
| Wide landscape | `min-width: 600px` + landscape | 2-column MCQ grid, VK dock moves to right sidebar |

Safe-area insets (`env(safe-area-inset-*)`) applied for notch / Dynamic Island support.

---

## 7. Z-index Stack

| Z-index | Element |
|---|---|
| 9999 | `body::before` — CRT scanline overlay |
| 9998 | `body::after` — noise grain; achievement toasts |
| 9300 | Mobile virtual keyboard dock |
| 9100 | Lesson exit confirmation overlay |
| 9000 | Delete data confirmation overlay |
| 500 | Modals (prefs, delete, coming soon) |
| 300 | Streak tooltip |
| 201 | Explore dropdown |
| 200 | Bottom bar |
| 100 | Topbar + sidebar tab |
| 90 | PWA install banner |
| 40 | Sidebar wrap |

---

## 8. Motion & Animation

Source: `src/css/style.css`.  
All durations collapse to `0.01ms` under `prefers-reduced-motion: reduce`.

### 8.1 Keyframe Animations

| Name | Duration | Easing | Purpose |
|---|---|---|---|
| `blink` | 1s, infinite | `step-end` | Cursor blink |
| `flicker` | 11s, infinite | `ease` | CRT topbar opacity flicker |
| `scanIn` | — | `ease` | Clip-path reveal (bottom → top) |
| `bounceIn` | — | `ease` | Entry bounce (scale 0.3 → 1.08 → 1) |
| `fall` | — | `linear` | Confetti particle fall + rotation |
| `slideIn` | — | `ease` | Horizontal slide-in (translateX 16px → 0) |
| `stampIn` | — | `ease` | Certificate stamp (scale 3 → 1, rotate −12°) |
| `glowPulse` | — | `ease-in-out` | Brand glow breathing (box-shadow expand) |
| `shake` | — | `ease` | Wrong-answer / error shake |
| `fbIconIn` | — | `ease` | Feedback icon entrance (scale + rotate) |
| `sidebarSkelPulse` / `moduleSkelPulse` | 1.2s | `ease-in-out` | Skeleton loading pulse |
| `progressShimmer` | — | `ease` | Progress bar shimmer sweep |
| `slideInRight` | 0.25s | `ease` | Achievement toast entrance |
| `slideOutRight` | 0.3s | `ease` | Achievement toast exit |

### 8.2 Transition Timings

| Duration | Use |
|---|---|
| `0.1s` | Button / icon hover — color, border |
| `0.18–0.25s` | Drawer opens, layout shifts |
| `0.28–0.3s` | Accordion expand (`grid-template-rows`) |
| `0.3s` | Theme switch (background, color) |
| `0.6s` | Progress bar fill (`width`) |

---

## 9. Component Interaction States

| State | CSS |
|---|---|
| **Hover** (desktop) | `transform: translate(-1px, -1px)` + border → `--brand` + shadow enhance |
| **Active / pressed** | `transform: translate(3px, 3px)` + shadow removed (hard-press illusion) |
| **Focus** | `outline: 2px solid var(--brand); outline-offset: 3px; box-shadow: 0 0 0 4px var(--brand-glow)` |
| **Locked** | `opacity: 0.4; pointer-events: none` |
| **Completed** | Border → `var(--ok)` + checkmark indicator |
| **Active / selected** | Inset box-shadow in `--brand-glow`, border `--brand` |

---

## 10. Special Visual Effects (Retro-Terminal Aesthetic)

| Effect | Implementation |
|---|---|
| CRT scanlines | `body::before` — `repeating-linear-gradient` 1px every 4px, opacity `var(--scanline-opacity)` |
| Noise grain | `body::after` — inline SVG turbulence fractal noise; light theme only, 0.5 opacity |
| Hard shadows | `4px 4px 0` offset, zero blur — `var(--shadow)` |
| Text glow | `text-shadow: 0 0 12px var(--brand)` on logo and key branded text |
| Topbar flicker | `animation: flicker 11s ease infinite` — opacity oscillates via `--flicker-min` |

---

## 11. PWA & Manifest

Source: `public/site.webmanifest`.

```json
{
  "name": "SANSKRIT.EXE",
  "short_name": "Sanskrit",
  "theme_color": "#06060A",
  "background_color": "#06060A",
  "display": "standalone",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Relevant `<meta>` tags (in `index.html`):
```html
<meta name="theme-color" content="#06060A"/>
<meta name="application-name" content="SANSKRIT.EXE"/>
```

---

## 12. Social & SEO Copy

| Tag | Value |
|---|---|
| `<title>` | SANSKRIT.EXE — Learn Sanskrit Daily |
| `meta description` | SANSKRIT.EXE is an interactive daily Sanskrit learning app with guided lessons, module-based practice, and progress tracking. |
| `og:title` | SANSKRIT.EXE |
| `og:description` | Learn Sanskrit daily through interactive lessons, module practice, and progress tracking. |
| `og:image` | `/og-image.png` (1200×630) |
| `og:site_name` | SANSKRIT.EXE |
| `og:locale` | en_US |
| `twitter:card` | summary_large_image |
| `twitter:title` | SANSKRIT.EXE |
| `twitter:description` | Learn Sanskrit daily through interactive lessons, module practice, and progress tracking. |

---

## 13. UI Copy Patterns

The app uses a terminal / CLI voice throughout:

| Context | Pattern |
|---|---|
| Welcome | `NAMASTE` |
| CTA | `▶ START LESSON_01` |
| Progress label | `CURRICULUM_PROGRESS` |
| Sidebar label | `MODULE_DIRECTORY` |
| Section header | `LEARNING_PATH` |
| System prefix | `// ` (comments style) |
| Question prefix | `> ` (prompt style), colored `--cyan` |
| Stat labels | All-caps with underscores: `LESSONS_DONE`, `Q_ANSWERED`, `ACCURACY` |

---

## 14. Source Files Reference

| File | What it controls |
|---|---|
| `src/css/style.css` | All CSS custom properties, animations, component styles |
| `index.html` | Home page — meta tags, font imports, logo markup |
| `lesson.html` | Lesson page — same meta/font structure as index.html |
| `public/site.webmanifest` | PWA name, theme color, icon list |
| `public/favicon.svg` | Scalable brand mark (bolt shape) |
| `public/icons.svg` | Social / documentation icon sprite |
| `public/og-image.png` | Social sharing card (do not re-generate without updating `scripts/og-image-template.svg`) |
| `scripts/og-image-template.svg` | OG image source template |
| `vite.config.js` | Build config — asset hashing, PWA plugin, compression |
