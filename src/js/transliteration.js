export function normalizeAnswerText(value, { latinFold = false } = {}) {
  let normalized = String(value || '')
    .normalize(latinFold ? 'NFKD' : 'NFKC')
    .replace(/['"'`''"".,!?;:()[\]{}<>|/\\\-_=+*&^%$#@~]/g, ' ')
    .replace(/[।॥]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  if (latinFold) {
    normalized = normalized.replace(/[̀-ͯ]/g, '');
  }

  return normalized;
}

const DEVANAGARI_CHAR_RE = /[ऀ-ॿ]/;
const TRANSLITERATION_PUNCTUATION_RE = /['"`''"".,!?;:()[\]{}<>|/\\\-_=+*&^%$#@~]/;
const DEVANAGARI_VOWELS = {
  a:   { independent: 'अ', matra: '' },
  aa:  { independent: 'आ', matra: 'ा' },
  i:   { independent: 'इ', matra: 'ि' },
  ii:  { independent: 'ई', matra: 'ी' },
  u:   { independent: 'उ', matra: 'ु' },
  uu:  { independent: 'ऊ', matra: 'ू' },
  ri:  { independent: 'ऋ', matra: 'ृ' },
  rii: { independent: 'ॠ', matra: 'ॄ' },
  li:  { independent: 'ऌ', matra: 'ॢ' },
  lii: { independent: 'ॡ', matra: 'ॣ' },
  e:   { independent: 'ए', matra: 'े' },
  ai:  { independent: 'ऐ', matra: 'ै' },
  o:   { independent: 'ओ', matra: 'ो' },
  au:  { independent: 'औ', matra: 'ौ' }
};

function createTransliterationScheme({ normalizeInput, vowels, consonants, marks, specials = {} }) {
  const tokens = [];

  Object.entries(specials).forEach(([key, output]) => {
    tokens.push({ key, kind: 'consonant', output });
  });
  Object.entries(consonants).forEach(([key, output]) => {
    tokens.push({ key, kind: 'consonant', output });
  });
  Object.entries(vowels).forEach(([key, output]) => {
    tokens.push({ key, kind: 'vowel', output });
  });
  Object.entries(marks).forEach(([key, output]) => {
    tokens.push({ key, kind: 'mark', output });
  });

  tokens.sort((a, b) => b.key.length - a.key.length);
  return { normalizeInput, tokens };
}

const TRANSLITERATION_SCHEMES = [
  createTransliterationScheme({
    normalizeInput: (value) => String(value || '').normalize('NFKC').toLowerCase(),
    vowels: {
      ai: DEVANAGARI_VOWELS.ai, au: DEVANAGARI_VOWELS.au,
      ā: DEVANAGARI_VOWELS.aa, a: DEVANAGARI_VOWELS.a,
      ī: DEVANAGARI_VOWELS.ii, i: DEVANAGARI_VOWELS.i,
      ū: DEVANAGARI_VOWELS.uu, u: DEVANAGARI_VOWELS.u,
      ṝ: DEVANAGARI_VOWELS.rii, ṛ: DEVANAGARI_VOWELS.ri,
      ḹ: DEVANAGARI_VOWELS.lii, ḷ: DEVANAGARI_VOWELS.li,
      e: DEVANAGARI_VOWELS.e, o: DEVANAGARI_VOWELS.o
    },
    consonants: {
      kh: 'ख', gh: 'घ', ṅ: 'ङ', ch: 'छ', jh: 'झ', ñ: 'ञ',
      ṭh: 'ठ', ḍh: 'ढ', ṇ: 'ण', th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ',
      ś: 'श', ṣ: 'ष',
      k: 'क', g: 'ग', c: 'च', j: 'ज', ṭ: 'ट', ḍ: 'ड',
      t: 'त', d: 'द', n: 'न', p: 'प', b: 'ब', m: 'म',
      y: 'य', r: 'र', l: 'ल', v: 'व', s: 'स', h: 'ह'
    },
    marks: { ṃ: 'ं', ṁ: 'ं', ḥ: 'ः' },
    specials: { kṣ: 'क्ष', jñ: 'ज्ञ' }
  }),
  createTransliterationScheme({
    normalizeInput: (value) => String(value || '').normalize('NFKC'),
    vowels: {
      lRR: DEVANAGARI_VOWELS.lii, lR: DEVANAGARI_VOWELS.li,
      RR: DEVANAGARI_VOWELS.rii, R: DEVANAGARI_VOWELS.ri,
      ai: DEVANAGARI_VOWELS.ai, au: DEVANAGARI_VOWELS.au,
      A: DEVANAGARI_VOWELS.aa, a: DEVANAGARI_VOWELS.a,
      I: DEVANAGARI_VOWELS.ii, i: DEVANAGARI_VOWELS.i,
      U: DEVANAGARI_VOWELS.uu, u: DEVANAGARI_VOWELS.u,
      e: DEVANAGARI_VOWELS.e, o: DEVANAGARI_VOWELS.o
    },
    consonants: {
      kh: 'ख', gh: 'घ', G: 'ङ', ch: 'छ', jh: 'झ', J: 'ञ',
      Th: 'ठ', Dh: 'ढ', N: 'ण', th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ',
      z: 'श', S: 'ष',
      k: 'क', g: 'ग', c: 'च', j: 'ज', T: 'ट', D: 'ड',
      t: 'त', d: 'द', n: 'न', p: 'प', b: 'ब', m: 'म',
      y: 'य', r: 'र', l: 'ल', v: 'व', s: 'स', h: 'ह'
    },
    marks: { M: 'ं', H: 'ः' },
    specials: { kS: 'क्ष', jJ: 'ज्ञ' }
  }),
  createTransliterationScheme({
    normalizeInput: (value) => String(value || '').normalize('NFKC'),
    vowels: {
      RRI: DEVANAGARI_VOWELS.rii, RRi: DEVANAGARI_VOWELS.ri,
      LLI: DEVANAGARI_VOWELS.lii, LLi: DEVANAGARI_VOWELS.li,
      ai: DEVANAGARI_VOWELS.ai, au: DEVANAGARI_VOWELS.au,
      aa: DEVANAGARI_VOWELS.aa, A: DEVANAGARI_VOWELS.aa, a: DEVANAGARI_VOWELS.a,
      ii: DEVANAGARI_VOWELS.ii, I: DEVANAGARI_VOWELS.ii, i: DEVANAGARI_VOWELS.i,
      uu: DEVANAGARI_VOWELS.uu, U: DEVANAGARI_VOWELS.uu, u: DEVANAGARI_VOWELS.u,
      e: DEVANAGARI_VOWELS.e, o: DEVANAGARI_VOWELS.o
    },
    consonants: {
      kh: 'ख', gh: 'घ', '~N': 'ङ', ch: 'छ', jh: 'झ', '~n': 'ञ',
      Th: 'ठ', Dh: 'ढ', N: 'ण', th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ',
      sh: 'श', Sh: 'ष',
      k: 'क', g: 'ग', c: 'च', j: 'ज', T: 'ट', D: 'ड',
      t: 'त', d: 'द', n: 'न', p: 'प', b: 'ब', m: 'म',
      y: 'य', r: 'र', l: 'ल', v: 'व', s: 'स', h: 'ह'
    },
    marks: { '.m': 'ं', M: 'ं', H: 'ः' },
    specials: { kSh: 'क्ष', GY: 'ज्ञ', 'j~n': 'ज्ञ' }
  }),
  createTransliterationScheme({
    normalizeInput: (value) => String(value || '').normalize('NFKC').toLowerCase(),
    vowels: {
      rii: DEVANAGARI_VOWELS.rii, ri: DEVANAGARI_VOWELS.ri,
      lii: DEVANAGARI_VOWELS.lii, li: DEVANAGARI_VOWELS.li,
      ai: DEVANAGARI_VOWELS.ai, au: DEVANAGARI_VOWELS.au,
      aa: DEVANAGARI_VOWELS.aa, a: DEVANAGARI_VOWELS.a,
      ee: DEVANAGARI_VOWELS.ii, ii: DEVANAGARI_VOWELS.ii, i: DEVANAGARI_VOWELS.i,
      oo: DEVANAGARI_VOWELS.uu, uu: DEVANAGARI_VOWELS.uu, u: DEVANAGARI_VOWELS.u,
      e: DEVANAGARI_VOWELS.e, o: DEVANAGARI_VOWELS.o
    },
    consonants: {
      kh: 'ख', gh: 'घ', ng: 'ङ', chh: 'छ', ch: 'च', jh: 'झ', ny: 'ञ',
      th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ', sh: 'श',
      k: 'क', g: 'ग', c: 'च', j: 'ज', t: 'त', d: 'द',
      n: 'न', p: 'प', b: 'ब', m: 'म', y: 'य', r: 'र',
      l: 'ल', v: 'व', w: 'व', s: 'स', h: 'ह'
    },
    marks: {},
    specials: { ksh: 'क्ष', cch: 'च्छ', gny: 'ज्ञ', jny: 'ज्ञ' }
  })
];

function isWordBoundary(text, index) {
  if (index >= text.length) return true;
  const char = text[index];
  return /\s/.test(char) || TRANSLITERATION_PUNCTUATION_RE.test(char);
}

function transliterateRomanToDevanagari(inputValue, scheme) {
  const text = scheme.normalizeInput(inputValue);
  let output = '';
  let pendingConsonant = false;
  let matchedRomanToken = false;

  for (let i = 0; i < text.length;) {
    const char = text[i];

    if (DEVANAGARI_CHAR_RE.test(char)) {
      if (pendingConsonant) output += '्';
      output += char;
      pendingConsonant = false;
      i += 1;
      continue;
    }

    if (/\s/.test(char) || TRANSLITERATION_PUNCTUATION_RE.test(char)) {
      if (pendingConsonant) output += '्';
      output += ' ';
      pendingConsonant = false;
      i += 1;
      continue;
    }

    if (scheme === TRANSLITERATION_SCHEMES[3] && char === 'h' && !pendingConsonant && isWordBoundary(text, i + 1)) {
      output += 'ः';
      matchedRomanToken = true;
      i += 1;
      continue;
    }

    const token = scheme.tokens.find(({ key }) => text.startsWith(key, i));
    if (!token) return '';

    matchedRomanToken = true;
    i += token.key.length;

    if (token.kind === 'consonant') {
      if (pendingConsonant) output += '्';
      output += token.output;
      pendingConsonant = true;
      continue;
    }

    if (token.kind === 'vowel') {
      if (pendingConsonant) {
        output += token.output.matra;
      } else {
        output += token.output.independent;
      }
      pendingConsonant = false;
      continue;
    }

    if (pendingConsonant) pendingConsonant = false;
    output += token.output;
  }

  if (pendingConsonant) output += '्';
  return matchedRomanToken ? output : '';
}

export function buildDevanagariCandidateSet(value) {
  const candidates = new Set();
  const raw = String(value || '').trim();
  if (!raw) return candidates;

  if (DEVANAGARI_CHAR_RE.test(raw)) {
    const normalized = normalizeAnswerText(raw);
    if (normalized) candidates.add(normalized);
  }

  TRANSLITERATION_SCHEMES.forEach((scheme) => {
    const transliterated = transliterateRomanToDevanagari(raw, scheme);
    const normalized = normalizeAnswerText(transliterated);
    if (normalized) candidates.add(normalized);
  });

  return candidates;
}

export function buildAcceptedAnswerSet(question) {
  const accepted = new Set();
  const add = (value) => {
    buildDevanagariCandidateSet(value).forEach((candidate) => accepted.add(candidate));
  };

  add(question.answer);
  add(question.answerRoman);
  return accepted;
}

export function isAcceptedTypedAnswer(inputValue, question) {
  const accepted = buildAcceptedAnswerSet(question);
  if (accepted.size === 0) return false;

  for (const candidate of buildDevanagariCandidateSet(inputValue)) {
    if (accepted.has(candidate)) return true;
  }

  return false;
}
