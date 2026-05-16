import * as m1d1 from './module-1/day-1.js';
import * as m1d2 from './module-1/day-2.js';
import * as m1d3 from './module-1/day-3.js';
import * as m1test from './module-1/test.js';

import * as m2d1 from './module-2/day-1.js';
import * as m2d2 from './module-2/day-2.js';
import * as m2d3 from './module-2/day-3.js';
import * as m2test from './module-2/test.js';

export const MODULES = [
  {
    id: 1,
    title: "FOUNDATIONS",
    subtitle: "Pronouns, Verbs & Places",
    icon: "🪔",
    description: "Learn Sanskrit pronouns, the verb 'to go', and location words to form your first real sentences.",
    days: [m1d1, m1d2, m1d3, m1test]
  },
  {
    id: 2,
    title: "THE LIVING LANGUAGE",
    subtitle: "Verbs, People & World",
    icon: "📜",
    description: "Explore Sanskrit verbs, family vocabulary, and the rich world of colors and descriptions.",
    days: [m2d1, m2d2, m2d3, m2test]
  }
];

export function getModule(modId) { 
  return MODULES.find(m => m.id === modId); 
}

export function getDay(modId, dayId) {
  const mod = getModule(modId);
  return mod ? mod.days.find(d => d.id === dayId) : null;
}
