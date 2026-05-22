import * as m1d1 from './module-1/day-1.js';
import * as m1d2 from './module-1/day-2.js';
import * as m1d3 from './module-1/day-3.js';
import * as m1d4 from './module-1/day-4.js';
import * as m1d5 from './module-1/day-5.js';
import * as m1test from './module-1/test.js';

import * as m2d1 from './module-2/day-1.js';
import * as m2d2 from './module-2/day-2.js';
import * as m2d3 from './module-2/day-3.js';
import * as m2test from './module-2/test.js';

import * as m3d1 from './module-3/day-1.js';
import * as m3d2 from './module-3/day-2.js';
import * as m3d3 from './module-3/day-3.js';
import * as m3d4 from './module-3/day-4.js';

import * as m4d1 from './module-4/day-1.js';

export const MODULES = [
  {
    id: 1,
    title: "TOOLKIT",
    subtitle: "Pronouns, Verbs & Questions",
    icon: "🪔",
    description: "Learn Sanskrit pronouns, the verb 'to go', location words, negation, and question patterns to form your first real sentences.",
    days: [m1d1, m1d2, m1d3, m1d4, m1d5, m1test]
  },
  {
    id: 2,
    title: "PRACTICE",
    subtitle: "Nouns, Places & Sentences",
    icon: "📜",
    description: "Learn Sanskrit destination nouns, question patterns with किम्/कुत्र/कः, and negate with न to form rich real-world sentences.",
    days: [m2d1, m2d2, m2d3, m2test]
  },
  {
    id: 3,
    title: "FLOW",
    subtitle: "Time, Correlatives & Nuance",
    icon: "⏰",
    description: "Learn temporal adverbs (कदा, यदा, सदा, तदा), time-of-day words (प्रातः, सायम्, रात्रौ), the future tense (गमिष्यामि), and correlative pairs यदा...तदा, यदि...तर्हि, यथा...तथा.",
    days: [m3d1, m3d2, m3d3, m3d4]
  },
  {
    id: 4,
    title: "FORM",
    subtitle: "Sandhi & Sound Rules",
    icon: "🔤",
    description: "Learn how Sanskrit words combine through sandhi — the rules governing sound changes at word boundaries. Begin with दीर्घ सन्धि, where similar vowels fuse into long vowels.",
    days: [m4d1]
  }
];

export function getModule(modId) { 
  return MODULES.find(m => m.id === modId); 
}

export function getDay(modId, dayId) {
  const mod = getModule(modId);
  return mod ? mod.days.find(d => d.id === dayId) : null;
}
