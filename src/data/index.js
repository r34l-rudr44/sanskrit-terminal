import * as m1d1 from './module-1/day-1.js';
import * as m1d2 from './module-1/day-2.js';
import * as m1d3 from './module-1/day-3.js';
import * as m1d4 from './module-1/day-4.js';
import * as m1d5 from './module-1/day-5.js';
import * as m1test from './module-1/test.js';

import * as m2d1 from './module-2/day-1.js';
import * as m2d2 from './module-2/day-2.js';
import * as m2d3 from './module-2/day-3.js';
import * as m2p1 from './module-2/practice-1.js';
import * as m2p2 from './module-2/practice-2.js';
import * as m2test from './module-2/test.js';

import * as m3d1 from './module-3/day-1.js';
import * as m3d2 from './module-3/day-2.js';
import * as m3d3 from './module-3/day-3.js';
import * as m3d4 from './module-3/day-4.js';
import * as m3d5 from './module-3/day-5.js';
import * as m3test from './module-3/test.js';

import * as m4d1 from './module-4/day-1.js';
import * as m4d2 from './module-4/day-2.js';
import * as m4d3 from './module-4/day-3.js';
import * as m4d4 from './module-4/day-4.js';
import * as m4d5 from './module-4/day-5.js';
import * as m4test from './module-4/test.js';

import * as m5d1 from './module-5/day-1.js';
import * as m5test from './module-5/test.js';

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
    days: [m2d1, m2d2, m2d3, m2p1, m2p2, m2test]
  },
  {
    id: 3,
    title: "FLOW",
    subtitle: "Time, Correlatives & Nuance",
    icon: "⏰",
    description: "Learn temporal adverbs (कदा, यदा, सदा, तदा), time-of-day words (प्रातः, सायम्, रात्रौ, इदा), the future tense (गमिष्यामि), and the full correlative family (यदा…तदा, यदि…तर्हि, यथा…तथा).",
    days: [m3d1, m3d2, m3d3, m3d4, m3d5, m3test]
  },
  {
    id: 4,
    title: "FORM",
    subtitle: "Sandhi & Sound Rules",
    icon: "🔤",
    description: "Master all five types of स्वर सन्धि — the rules governing vowel changes at Sanskrit word boundaries: दीर्घ (similar vowels fuse), गुण (अ/आ + इ/उ/ऋ), वृद्धि (अ/आ + ए/ओ), यण (इ/उ/ऋ → semi-vowels), and अयादि (ए/ओ/ऐ/औ dissolve).",
    days: [m4d1, m4d2, m4d3, m4d4, m4d5, m4test]
  },
  {
    id: 5,
    title: "RHYTHM",
    subtitle: "Frequency & Repetition",
    icon: "🔁",
    description: "Learn the -दा frequency words — एकदा, अनेकदा, शतदा, अन्यदा, नित्यदा — and the productive suffix pattern that lets any numeral or qualifier answer 'how often?'",
    days: [m5d1, m5test]
  }
];

export function getModule(modId) {
  return MODULES.find(m => m.id === modId);
}

export function getDay(modId, dayId) {
  const mod = getModule(modId);
  return mod ? mod.days.find(d => d.id === dayId) : null;
}
