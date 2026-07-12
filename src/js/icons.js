// Monochrome line-icon set replacing pictographic emoji throughout the app.
// Every icon shares a 24x24 viewBox and stroke-based style so they read as one
// consistent system across lesson/module/achievement badges and UI chrome.

function svg(inner) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
}

const ICONS = {
  // lesson/day topics
  person:    svg('<circle cx="12" cy="7" r="3.2"/><path d="M5 20c0-4.5 3.2-7 7-7s7 2.5 7 7"/>'),
  walk:      svg('<circle cx="12" cy="4.5" r="2"/><path d="M12 7v5l-3 3M12 12l4 2M12 12l-1 7M12 12l3 6"/>'),
  pin:       svg('<path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/>'),
  'no-entry': svg('<circle cx="12" cy="12" r="8.5"/><line x1="6" y1="18" x2="18" y2="6"/>'),
  question:  svg('<circle cx="12" cy="12" r="9"/><path d="M9.2 9.3a2.8 2.8 0 1 1 4.3 2.4c-1 .6-1.5 1.1-1.5 2.3"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>'),
  test:      svg('<path d="M4 20l1-4L16 5l3 3L8 19l-4 1Z"/><path d="M14 7l3 3"/>'),
  houses:    svg('<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>'),
  map:       svg('<path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/>'),
  target:    svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>'),
  puzzle:    svg('<path d="M5 5h5.3a1.7 1.7 0 0 1 3.4 0H19v5.3a1.7 1.7 0 0 1 0 3.4V19h-5.3a1.7 1.7 0 0 1-3.4 0H5v-5.3a1.7 1.7 0 0 0 0-3.4V5Z"/>'),
  clock:     svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
  hourglass: svg('<path d="M6 3h12M6 21h12M7 3c0 4 3 6 5 6s5-2 5-6M7 21c0-4 3-6 5-6s5 2 5 6"/>'),
  sunrise:   svg('<line x1="3" y1="18" x2="21" y2="18"/><path d="M8 18a4 4 0 0 1 8 0"/><line x1="12" y1="6" x2="12" y2="9"/><line x1="5" y1="13" x2="7" y2="14.5"/><line x1="19" y1="13" x2="17" y2="14.5"/>'),
  'crystal-ball': svg('<circle cx="12" cy="10" r="6"/><path d="M8 20h8M9 17h6"/><circle cx="10" cy="8" r=".7" fill="currentColor" stroke="none"/>'),
  scale:     svg('<path d="M12 3v18M9 21h6"/><path d="M4 7h16M6 7l-3 6a3 3 0 0 0 6 0L6 7Zm12 0l-3 6a3 3 0 0 0 6 0l-3-6Z"/>'),
  link:      svg('<path d="M8 13.5 5.8 15.7a3 3 0 1 0 4.5 4.5L13 18"/><path d="M16 10.5l2.2-2.2a3 3 0 1 0-4.5-4.5L11.5 6"/><path d="M9 15l6-6"/>'),
  sparkle:   svg('<path d="M12 3c.6 3.4 2 4.8 5.4 5.4C14 9 12.6 10.4 12 13.8 11.4 10.4 10 9 6.6 8.4 10 7.8 11.4 6.4 12 3Z" fill="currentColor" stroke="none"/><path d="M19 15c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" fill="currentColor" stroke="none"/>'),
  'arrow-up': svg('<line x1="12" y1="20" x2="12" y2="4"/><path d="M6 10l6-6 6 6"/>'),
  'hook-arrow': svg('<path d="M19 6H10a5 5 0 0 0 0 10h3"/><path d="M10 12l3 4-3 4"/>'),
  wave:      svg('<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>'),
  repeat:    svg('<path d="M4 12a8 8 0 0 1 14-5.3L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-14 5.3L4 16"/><path d="M4 20v-4h4"/>'),

  // module / brand icons
  diya:      svg('<path d="M4 15c1.5 2 4.5 3 8 3s6.5-1 8-3"/><path d="M4 15c0-1.5 1-2.5 3-2.5h10c2 0 3 1 3 2.5"/><path d="M12 11c-1.3-1.6-1-3.3 0-4.8 1 1.5 1.3 3.2 0 4.8Z" fill="currentColor" stroke="none"/>'),
  scroll:    svg('<rect x="6" y="5" width="12" height="14" rx="2"/><path d="M6 8a2 2 0 1 0 0-4M6 19a2 2 0 1 1 0-4"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/>'),
  'alarm-clock': svg('<circle cx="12" cy="13" r="7"/><path d="M12 9v4l2.5 1.5"/><path d="M5 5 3 3M19 5l2-2"/><path d="M9 3h6"/>'),
  letters:   svg('<rect x="3" y="6" width="8" height="12" rx="1.5"/><rect x="13" y="6" width="8" height="12" rx="1.5"/><path d="M6 12h2M15 12h2"/>'),

  // achievements
  bolt:      svg('<path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" fill="currentColor" stroke="none"/>'),
  book:      svg('<path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5Z"/><path d="M12 6v13"/>'),
  'half-moon': svg('<path d="M14 3.5A8.5 8.5 0 1 0 14 20.5 7 7 0 0 1 14 3.5Z" fill="currentColor" stroke="none"/>'),
  flame:     svg('<path d="M12 22c4 0 6-3 6-6.5C18 12 15 9 14 5c-.5 3-2 4-3 6-1-1-1.5-2.5-1.5-4C7 9 6 12.5 6 15.5 6 19 8 22 12 22Z" fill="currentColor" stroke="none"/>'),
  burst:     svg('<path d="M12 2l1.8 5.6L19 4l-2.4 5.6L23 12l-6.4 1.6L19 20l-5.4-2.6L12 23l-1.6-5.6L5 20l2.4-6.4L1 12l6.4-2.4L5 4l5.6 3.6Z" fill="currentColor" stroke="none"/>'),
  star:      svg('<path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2L3 9.5l6.4-.6Z"/>'),
  hundred:   svg('<circle cx="12" cy="12" r="9"/><text x="12" y="15.2" text-anchor="middle" font-size="7.5" font-family="var(--font-ui, monospace)" fill="currentColor" stroke="none">100</text>'),
  'bar-chart': svg('<line x1="4" y1="20" x2="20" y2="20"/><rect x="6" y="14" width="3" height="6" fill="currentColor" stroke="none"/><rect x="11" y="9" width="3" height="11" fill="currentColor" stroke="none"/><rect x="16" y="4" width="3" height="16" fill="currentColor" stroke="none"/>'),
  trident:   svg('<path d="M12 22V9M6 4c0 3 2.5 5 6 5s6-2 6-5M8 3v4M16 3v4"/>'),
  om:        svg('<path d="M4 14c0-3 2-5 5-5s4 2 3 4-3 1-3-1 2-3 4-3c2.5 0 4.5 2 4.5 4.5"/><path d="M16 6.5a2 2 0 1 1 3.5 1.3"/><circle cx="19" cy="4" r=".9" fill="currentColor" stroke="none"/>'),
  flower:    svg('<circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/><path d="M12 9.8C11 7 9 6 7 7c-1 2 .3 4 3 5-3 .5-4.7 2.3-4 4.3 2 .8 4-.3 5-3 .3 3 2 4.7 4 4.3 1.7-1 2-3.3 0-4.3 2.7-.8 4.2-2.7 3-4.6-2-1-4 0-5 2.6Z"/>'),
  temple:    svg('<path d="M4 21h16M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6"/>'),
  'graduation-cap': svg('<path d="M2 9l10-5 10 5-10 5-10-5Z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>'),
  trophy:    svg('<path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5"/><path d="M12 13v4M8 21h8M9 17h6v2a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-2Z"/>'),

  // functional UI
  lock:      svg('<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  'sound-on': svg('<path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/>'),
  'sound-off': svg('<path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9l5 6M21 9l-5 6"/>'),
  trash:     svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 13a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-1L18 7"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>'),
};

/** Returns the SVG markup for an icon key, falling back to `fallbackKey` (default: none, i.e. '') if unknown. */
export function iconSvg(key, fallbackKey) {
  return ICONS[key] || ICONS[fallbackKey] || '';
}

export const ICON_KEYS = new Set(Object.keys(ICONS));
