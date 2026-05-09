import { MODULES, getModule, getDay } from '../data/index.js';
import { state } from './state.js';
import { Theme, Prefs, Audio, Effects, escapeHtml } from './utils.js';
import { injectGlobals } from './components.js';

let currentDay = null;
let currentMod = null;
const LESSON_PROGRESS_KEY = 'sk_lesson_progress';
const MOBILE_INPUT_MODE_KEY = 'sk_mobile_input_mode';
let hydratedLessonProgress = null;
let skipConfirmPending = false;
let _vkBlurTimer = null;

function isMobileKeyboardMode() {
  return window.matchMedia('(max-width: 768px) and (pointer: coarse)').matches;
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function getActiveLessonScreen() {
  const active = document.querySelector('.screen.active');
  return active ? active.id.replace('screen-', '') : 'briefing';
}

function syncKeyboardInput(input) {
  if (!input) return;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function setKeyboardOpen(open) {
  const wrap = document.querySelector('.vk-wrap');
  const body = document.getElementById('vk-body');
  const btn = document.getElementById('vk-toggle-btn');
  if (!wrap || !body || !btn) return;

  if (isMobileKeyboardMode()) {
    wrap.classList.add('vk-mobile-dock');
    wrap.classList.toggle('open', open);
    document.body.classList.toggle('vk-mobile-open', open);
    btn.textContent = open ? 'CLOSE' : 'OPEN';
    return;
  }

  body.style.display = open ? 'flex' : 'none';
  btn.textContent = open ? '▼' : '▲';
}

function openKeyboard() {
  setKeyboardOpen(true);
}

function closeKeyboard() {
  setKeyboardOpen(false);
}

function renderKeyboardHint() {
  return isMobileKeyboardMode()
    ? (getMobileInputMode() === 'custom'
        ? '// tap the answer field to type with the Sanskrit keyboard'
        : '// use your phone keyboard or switch to Sanskrit keys')
    : '// press ENTER or tap SUBMIT';
}

function renderInputModeAttrs() {
  if (!isMobileKeyboardMode()) return '';
  if (getMobileInputMode() === 'custom') {
    return `readonly inputmode="none" onclick="window.activateAnswerInput(this)" onfocus="window.activateAnswerInput(this)"`;
  }
  return `inputmode="text"`;
}

function rerenderActiveInputQuestion() {
  if (!currentDay || state.answered) return;
  const q = currentDay.questions[state.currentQ];
  if (!q || (q.type !== 'translation' && q.type !== 'fill')) return;

  hydratedLessonProgress = {
    currentQ: state.currentQ,
    questionState: getQuestionDraftSnapshot(q)
  };
  renderQuestion();
}

function getMobileInputMode() {
  if (!isMobileKeyboardMode()) return 'custom';
  return localStorage.getItem(MOBILE_INPUT_MODE_KEY) || 'native';
}

function renderMobileInputSwitcher() {
  if (!isMobileKeyboardMode()) return '';
  const mode = getMobileInputMode();
  return `<div class="mobile-input-switch" role="group" aria-label="Keyboard choice">
    <button type="button" data-mode="native" class="mobile-input-mode-btn${mode === 'native' ? ' active' : ''}" onclick="window.setMobileInputMode('native')">PHONE KEYBOARD</button>
    <button type="button" data-mode="custom" class="mobile-input-mode-btn${mode === 'custom' ? ' active' : ''}" onclick="window.setMobileInputMode('custom')">SANSKRIT KEYS</button>
  </div>`;
}

function openSkipConfirm() {
  closeKeyboard();
  const overlay = document.getElementById('skip-confirm-overlay');
  if (!overlay) return;
  skipConfirmPending = true;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('skip-confirm-accept')?.focus();
}

function closeSkipConfirm() {
  const overlay = document.getElementById('skip-confirm-overlay');
  if (!overlay) return;
  skipConfirmPending = false;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function clearLessonProgress() {
  hydratedLessonProgress = null;
  localStorage.removeItem(LESSON_PROGRESS_KEY);
}

function loadLessonProgress(modId, dayId) {
  try {
    const raw = localStorage.getItem(LESSON_PROGRESS_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!saved || saved.modId !== modId || saved.dayId !== dayId) return null;
    return saved;
  } catch {
    return null;
  }
}

function getQuestionDraftSnapshot(q) {
  if (!q) return null;

  if (q.type === 'translation' || q.type === 'fill') {
    return {
      type: q.type,
      inputValue: document.getElementById('active-input')?.value || ''
    };
  }

  if (q.type === 'wordtiles') {
    return {
      type: q.type,
      wtTiles: state.wtTiles.map(tile => ({ word: tile.word, placed: !!tile.placed })),
      wtTray: [...state.wtTray]
    };
  }

  if (q.type === 'match') {
    return { type: 'match', matched: [...state.matchState.matched] };
  }

  return null;
}

function saveLessonProgress(screen = getActiveLessonScreen()) {
  if (!currentMod || !currentDay) return;

  const progress = {
    modId: currentMod.id,
    dayId: currentDay.id,
    screen,
    currentQ: state.currentQ,
    totalAnswered: state.totalAnswered,
    totalCorrect: state.totalCorrect,
    questionState: screen === 'lesson' ? getQuestionDraftSnapshot(currentDay.questions[state.currentQ]) : null
  };

  localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(progress));
}

function restoreWordTileUI() {
  const tray = document.getElementById('wt-tray');
  const placeholder = document.getElementById('wt-placeholder');
  if (!tray) return;

  if (state.wtTray.length > 0 && placeholder) placeholder.style.display = 'none';

  state.wtTray.forEach(id => {
    const tile = state.wtTiles[id];
    const tileEl = document.getElementById('wt-tile-' + id);
    if (!tile || !tileEl) return;

    const clone = document.createElement('button');
    clone.className = 'wt-tile in-tray';
    clone.id = 'wt-tray-tile-' + id;
    clone.textContent = tile.word;
    clone.onclick = () => window.wtTileClick(id);
    tray.appendChild(clone);
    tileEl.style.visibility = 'hidden';
  });

  const checkBtn = document.getElementById('wt-check-btn');
  if (checkBtn) checkBtn.disabled = state.wtTray.length === 0;
}

function normalizeAnswerText(value, { latinFold = false } = {}) {
  let normalized = String(value || '')
    .normalize(latinFold ? 'NFKD' : 'NFKC')
    .replace(/['"'`’‘“”.,!?;:()[\]{}<>|/\\\-_=+*&^%$#@~]/g, ' ')
    .replace(/[।॥]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  if (latinFold) {
    normalized = normalized.replace(/[\u0300-\u036f]/g, '');
  }

  return normalized;
}

const DEVANAGARI_CHAR_RE = /[\u0900-\u097f]/;
const TRANSLITERATION_PUNCTUATION_RE = /['"`’‘“”.,!?;:()[\]{}<>|/\\\-_=+*&^%$#@~]/;
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

function buildDevanagariCandidateSet(value) {
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

function buildAcceptedAnswerSet(question) {
  const accepted = new Set();
  const add = (value) => {
    buildDevanagariCandidateSet(value).forEach((candidate) => accepted.add(candidate));
  };

  add(question.answer);
  add(question.answerRoman);
  return accepted;
}

function isAcceptedTypedAnswer(inputValue, question) {
  const accepted = buildAcceptedAnswerSet(question);
  if (accepted.size === 0) return false;

  for (const candidate of buildDevanagariCandidateSet(inputValue)) {
    if (accepted.has(candidate)) return true;
  }

  return false;
}

// Briefing logic
function renderSection(s) {
  if (s.type === 'table') {
    const ths = s.cols.map(c => `<th>${escapeHtml(c)}</th>`).join('');
    const trs = s.rows.map(row => {
      const tds = row.map((cell, i) => {
        const cls = (i <= 1 && /[\u0900-\u097F]/.test(cell)) ? ' class="dev"' : '';
        return `<td${cls}>${escapeHtml(cell)}</td>`;
      }).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<div style="margin-bottom:14px"><div class="brief-grammar-title" style="margin-bottom:8px">${escapeHtml(s.label)}</div><div style="overflow-x:auto"><table class="brief-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div></div>`;
  }
  if (s.type === 'grammar') return `<div class="brief-grammar"><span class="brief-grammar-title">${escapeHtml(s.label)}</span><p>${s.text}</p></div>`;
  if (s.type === 'block')   return `<div class="brief-block">${s.text}</div>`;
  return '';
}

function showBriefing() {
  const data = currentDay.briefing?.pre;
  if (!data) { showLesson(); return; }
  
  const mount = document.getElementById('briefing-mount');
  const tag = currentDay.isTest ? `MODULE_${currentMod.id} // TEST` : `MODULE_${currentMod.id} — DAY`;
  
  const sectionsHTML = data.sections.map(renderSection).join('');
  const card = document.createElement('div');
  card.className = 'briefing-card';
  card.innerHTML = `
    <div class="briefing-topbar">
      <button class="btn-secondary briefing-exit-btn" onclick="window.exitLesson()"><- EXIT</button>
    </div>
    <div class="briefing-header"><div class="briefing-icon">${currentDay.icon}</div><div class="briefing-title">${escapeHtml(data.title)}</div><div class="briefing-tag">${escapeHtml(tag)}</div></div>
    <div class="briefing-body"><div class="briefing-lead">${data.lead}</div>${sectionsHTML}</div>
    <div class="briefing-footer"><span class="briefing-footer-note">${currentDay.isTest ? 'prepare yourself' : 'read before continuing'}</span>
    <button class="btn-primary" onclick="window.showLesson()">${currentDay.isTest ? '► BEGIN TEST' : 'BEGIN LESSON →'}</button></div>
  `;
  mount.innerHTML = '';
  mount.appendChild(card);
  saveLessonProgress('briefing');
}

// Lesson logic
window.showLesson = function() {
  showScreen('lesson');
  renderQuestion();
};

window.exitLesson = () => {
  clearLessonProgress();
  window.location.href = '/';
};

window.retryLesson = () => {
  clearLessonProgress();
  window.location.reload();
};

const KEYBOARDS = {
  deva: [
    ['अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ'],
    ['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ'],
    ['ट','ठ','ड','ढ','ण','त','थ','द','ध','न'],
    ['प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'],
    ['्','ा','ि','ी','ु','ू','ृ','े','ै','ो','ौ','ं','ः']
  ],
  iast: [
    ['a','ā','i','ī','u','ū','ṛ','ṝ','ḷ','ḹ','e','ai','o','au'],
    ['k','kh','g','gh','ṅ','c','ch','j','jh','ñ'],
    ['ṭ','ṭh','ḍ','ḍh','ṇ','t','th','d','dh','n'],
    ['p','ph','b','bh','m','y','r','l','v','ś','ṣ','s','h'],
    ['ṃ','ḥ']
  ],
  itrans: [
    ['a','A','aa','i','I','ii','u','U','uu','RRi','RRI','LLi','LLI'],
    ['k','kh','g','gh','~N','c','ch','j','jh','~n'],
    ['T','Th','D','Dh','N','t','th','d','dh','n'],
    ['p','ph','b','bh','m','y','r','l','v','sh','Sh','s','h'],
    ['.m','H']
  ],
  hk: [
    ['a','A','i','I','u','U','R','RR','lR','lRR','e','ai','o','au'],
    ['k','kh','g','gh','G','c','ch','j','jh','J'],
    ['T','Th','D','Dh','N','t','th','d','dh','n'],
    ['p','ph','b','bh','m','y','r','l','v','z','S','s','h'],
    ['M','H']
  ]
};

function renderVirtualKeyboard() {
  const script = localStorage.getItem('sk_script') || 'deva';
  const layout = KEYBOARDS[script] || KEYBOARDS.deva;
  
  let html = `<div class="vk-wrap">
    <div class="vk-header" onclick="window.toggleKeyboard()">
      <span class="vk-title">VIRTUAL_KEYBOARD [${script.toUpperCase()}]</span>
      <button class="vk-toggle" id="vk-toggle-btn">▲</button>
    </div>
    <div class="vk-body" id="vk-body">`;
    
  layout.forEach(row => {
    html += `<div class="vk-row">`;
    row.forEach(key => {
      html += `<button class="vk-key" onclick="window.vkPress(${JSON.stringify(key)})">${escapeHtml(key)}</button>`;
    });
    html += `</div>`;
  });
  
  html += `
    <div class="vk-row">
      <button class="vk-key vk-space" onclick="window.vkPress(' ')">SPACE</button>
      <button class="vk-key vk-backspace" onclick="window.vkBackspace()">⌫</button>
    </div>
  </div></div>`;
  
  return html;
}

window.toggleKeyboard = () => {
  const wrap = document.querySelector('.vk-wrap');
  const body = document.getElementById('vk-body');
  const btn = document.getElementById('vk-toggle-btn');
  if (!wrap || !body || !btn) return;

  if (isMobileKeyboardMode()) {
    const isOpen = wrap.classList.contains('open');
    wrap.classList.add('vk-mobile-dock');
    wrap.classList.toggle('open', !isOpen);
    document.body.classList.toggle('vk-mobile-open', !isOpen);
    btn.textContent = isOpen ? 'OPEN' : 'CLOSE';
    return;
  }

  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'flex';
  btn.textContent = isOpen ? '▲' : '▼';
};

window.activateAnswerInput = (input) => {
  if (!input || input.disabled || !isMobileKeyboardMode() || getMobileInputMode() !== 'custom') return;
  input.focus({ preventScroll: true });
  const cursor = input.value.length;
  if (typeof input.setSelectionRange === 'function') input.setSelectionRange(cursor, cursor);
  const wrap = document.querySelector('.vk-wrap');
  if (wrap) {
    wrap.classList.add('vk-mobile-dock', 'open');
    document.body.classList.add('vk-mobile-open');
  }
  const btn = document.getElementById('vk-toggle-btn');
  if (btn) btn.textContent = 'CLOSE';
  // Wait for the keyboard slide-up transition (.18s) then scroll input into view
  // so it isn't hidden behind the keyboard overlay.
  setTimeout(() => input.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 200);
};

function applyActiveInputMode() {
  const input = document.getElementById('active-input');
  const wrap = document.querySelector('.vk-wrap');
  const btn = document.getElementById('vk-toggle-btn');
  if (!input || !isMobileKeyboardMode()) return;

  const mode = getMobileInputMode();
  if (mode === 'custom') {
    input.setAttribute('readonly', '');
    input.setAttribute('inputmode', 'none');
    input.onclick = () => window.activateAnswerInput(input);
    input.onfocus = () => { clearTimeout(_vkBlurTimer); window.activateAnswerInput(input); };
    input.onblur  = () => { _vkBlurTimer = setTimeout(closeKeyboard, 150); };
    if (wrap) wrap.classList.add('vk-mobile-dock');
    if (btn) btn.textContent = wrap?.classList.contains('open') ? 'CLOSE' : 'OPEN';
  } else {
    input.removeAttribute('readonly');
    input.setAttribute('inputmode', 'text');
    input.onclick = null;
    input.onfocus = null;
    input.onblur  = null;
    closeKeyboard();
    if (btn) btn.textContent = 'OPEN';
  }
}

window.setMobileInputMode = (mode) => {
  if (!isMobileKeyboardMode()) return;
  const nextMode = mode === 'custom' ? 'custom' : 'native';
  localStorage.setItem(MOBILE_INPUT_MODE_KEY, nextMode);
  applyActiveInputMode();

  const switcher = document.querySelector('.mobile-input-switch');
  if (switcher) {
    switcher.querySelectorAll('.mobile-input-mode-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === nextMode);
    });
  }

  const hint = document.querySelector('.keyboard-hint');
  if (hint) hint.textContent = renderKeyboardHint();

  const input = document.getElementById('active-input');
  if (!input || input.disabled) return;
  if (nextMode === 'custom') {
    window.activateAnswerInput(input);
  } else {
    input.focus({ preventScroll: true });
  }
};

window.vkPress = (char) => {
  const inp = document.getElementById('active-input');
  if (inp && !inp.disabled) {
    const start = inp.selectionStart ?? inp.value.length;
    const end = inp.selectionEnd ?? inp.value.length;
    const val = inp.value;
    inp.value = val.substring(0, start) + char + val.substring(end);
    inp.selectionStart = inp.selectionEnd = start + char.length;
    syncKeyboardInput(inp);
    inp.focus({ preventScroll: isMobileKeyboardMode() });
  }
};

window.vkBackspace = () => {
  const inp = document.getElementById('active-input');
  if (inp && !inp.disabled) {
    const start = inp.selectionStart ?? inp.value.length;
    const end = inp.selectionEnd ?? inp.value.length;
    const val = inp.value;
    if (start === end && start > 0) {
      inp.value = val.substring(0, start - 1) + val.substring(end);
      inp.selectionStart = inp.selectionEnd = start - 1;
    } else if (start !== end) {
      inp.value = val.substring(0, start) + val.substring(end);
      inp.selectionStart = inp.selectionEnd = start;
    }
    syncKeyboardInput(inp);
    inp.focus({ preventScroll: isMobileKeyboardMode() });
  }
};

function renderQuestion() {
  closeKeyboard();
  const q = currentDay.questions[state.currentQ];
  if (!q) return;
  const pct = Math.round((state.currentQ / currentDay.questions.length) * 100);
  const restoredState = hydratedLessonProgress?.currentQ === state.currentQ ? hydratedLessonProgress.questionState : null;

  document.getElementById('lesson-day-tag').textContent = `MOD_${currentMod.id}`;
  document.getElementById('lesson-title-sm').textContent = currentDay.title;
  document.getElementById('progress-count').textContent  = `${state.currentQ + 1}/${currentDay.questions.length}`;
  document.getElementById('progress-fill').style.width   = pct + '%';

  state.answered = false;
  state.wtTray = [];
  
  if (q.type === 'wordtiles') {
    if (restoredState?.type === 'wordtiles' && Array.isArray(restoredState.wtTiles) && Array.isArray(restoredState.wtTray)) {
      state.wtTiles = restoredState.wtTiles.map(tile => ({ word: tile.word, placed: !!tile.placed }));
      state.wtTray = restoredState.wtTray.filter(id => Number.isInteger(id) && state.wtTiles[id]);
    } else {
      const allWords = [...q.tiles, ...(q.distractors || [])].sort(() => Math.random() - 0.5);
      state.wtTiles = allWords.map(w => ({ word: w, placed: false }));
    }
  }
  if (q.type === 'match') {
    const savedMatched = (restoredState?.type === 'match' && Array.isArray(restoredState.matched))
      ? restoredState.matched.filter(Number.isInteger)
      : [];
    state.matchState = { selectedLeft: null, selectedRight: null, matched: savedMatched };
  }

  const midData = (currentDay.briefing?.mid || []).find(m => m.afterQ === state.currentQ);
  const midHTML = midData ? `<div class="mid-briefing"><span class="mid-briefing-tag">${escapeHtml(midData.tag || 'INFO')}</span><h4>${escapeHtml(midData.title)}</h4>${renderSection(midData.content)}</div>` : '';

  const card = document.getElementById('question-card');
  card.innerHTML = midHTML + buildQuestion(q);

  const fb = document.createElement('div');
  fb.className = 'feedback-banner'; fb.id = 'feedback-banner';
  card.appendChild(fb);

  const aa = document.createElement('div');
  aa.className = 'action-area'; aa.id = 'action-area';
  
  if (q.type === 'match') {
    aa.innerHTML = `<button class="btn-secondary" onclick="window.skipQuestion()">SKIP</button>`;
  } else if (q.type === 'wordtiles') {
    aa.innerHTML = `<button class="btn-secondary" onclick="window.skipQuestion()">SKIP</button>
      <button class="btn-primary" id="wt-check-btn" onclick="window.checkWordTiles()" disabled>CHECK ✓</button>`;
  } else if (q.type === 'translation' || q.type === 'fill') {
    aa.innerHTML = `<button class="btn-secondary" onclick="window.skipQuestion()">SKIP</button>
      <button class="btn-primary" onclick="window.submitInputQuestion()">SUBMIT ⏎</button>`;
  } else {
    aa.innerHTML = `<button class="btn-secondary" onclick="window.skipQuestion()">SKIP</button>`;
  }
  card.appendChild(aa);

  if (q.type === 'translation' || q.type === 'fill') {
    const inp = document.getElementById('active-input');
    if (restoredState?.type === q.type && inp && typeof restoredState.inputValue === 'string') {
      inp.value = restoredState.inputValue;
    }
    inp?.addEventListener('input', () => saveLessonProgress('lesson'));
    applyActiveInputMode();
  }

  if (q.type === 'wordtiles' && restoredState?.type === 'wordtiles') {
    restoreWordTileUI();
  }
  if (q.type === 'wordtiles') {
    initWordTileDrag(document.getElementById('wt-bank'));
  }

  if (q.type === 'match' && state.matchState.matched.length) {
    state.matchState.matched.forEach(pairIdx => {
      document.querySelector(`#match-left .match-item[data-pair="${pairIdx}"]`)?.classList.add('matched');
      document.querySelector(`#match-right .match-item[data-pair="${pairIdx}"]`)?.classList.add('matched');
    });
  }

  hydratedLessonProgress = null;
  saveLessonProgress('lesson');
}

function buildQuestion(q) {
  const badge = `<div class="q-type-badge">${q.type.toUpperCase()}</div>`;
  const qText = `<div class="q-text">${escapeHtml(q.question)}</div>`;

  if (q.type === 'mcq') {
    const opts = q.options.map((opt, i) => {
      const dev = q.optionsDevanagari ? `<span class="devanagari">${escapeHtml(q.optionsDevanagari[i])}</span>` : '';
      return `<button class="option-btn" onclick="window.answerMCQ(this, ${i})">${escapeHtml(opt)}${dev}</button>`;
    }).join('');
    return `${badge}${qText}<div class="options-grid">${opts}</div>`;
  }

  if (q.type === 'translation') {
    return `${badge}${qText}<div class="translation-wrap"><div class="translation-hint">${escapeHtml(q.hint||'')}</div>
      ${renderMobileInputSwitcher()}
      <input class="answer-input" type="text" id="active-input" placeholder="Type answer..." autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key==='Enter') window.submitInputQuestion()" ${renderInputModeAttrs()}>
      <div class="keyboard-hint">${renderKeyboardHint()}</div>
      ${renderVirtualKeyboard()}
      </div>`;
  }

  if (q.type === 'fill') {
    return `${badge}${renderMobileInputSwitcher()}<div class="fill-sentence">${escapeHtml(q.sentenceParts[0])}<input class="blank-input devanagari" id="active-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key==='Enter') window.submitInputQuestion()" ${renderInputModeAttrs()}>${escapeHtml(q.sentenceParts[1])}</div>
      <div class="keyboard-hint">${renderKeyboardHint()}</div>
      ${renderVirtualKeyboard()}`;
  }

  if (q.type === 'match') {
    const left  = q.pairs.map((p, i) => `<button class="match-item" data-pair="${i}" onclick="window.matchClick(this,${i},'left')">${escapeHtml(p.left)}</button>`).join('');
    const shuffledIdx = q.pairs.map((_,i) => i).sort(() => Math.random()-0.5);
    const right = shuffledIdx.map(i => `<button class="match-item" data-pair="${i}" onclick="window.matchClick(this,${i},'right')">${escapeHtml(q.pairs[i].right)}</button>`).join('');
    return `${badge}${qText}<div class="match-grid"><div class="match-col match-panel" id="match-left">${left}</div><div class="match-col match-panel" id="match-right">${right}</div></div>`;
  }

  if (q.type === 'wordtiles') {
    const tileHTML = state.wtTiles.map((t, i) => `<button class="wt-tile" id="wt-tile-${i}" onclick="window.wtTileClick(${i})">${escapeHtml(t.word)}</button>`).join('');
    return `${badge}${qText}<div id="wt-tray" class="wt-tray"><span id="wt-placeholder" class="wt-placeholder">tap words</span></div>
      <div class="wt-bank-label">WORD_BANK</div><hr class="wt-divider"><div class="wt-bank" id="wt-bank">${tileHTML}</div>`;
  }
  return '';
}

function initWordTileDrag(bank) {
  if (!bank) return;
  let drag = null;
  let ghost = null;

  bank.addEventListener('touchstart', e => {
    const tile = e.target.closest('.wt-tile');
    if (!tile || tile.style.visibility === 'hidden' || state.answered) return;
    drag = { tile, startX: e.touches[0].clientX, startY: e.touches[0].clientY, moved: false };
  }, { passive: true });

  bank.addEventListener('touchmove', e => {
    if (!drag) return;
    const dx = e.touches[0].clientX - drag.startX;
    const dy = e.touches[0].clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 10) {
      drag.moved = true;
      ghost = drag.tile.cloneNode(true);
      ghost.style.cssText = 'position:fixed;pointer-events:none;opacity:0.85;z-index:9999;margin:0;transform:translate(-50%,-50%);';
      document.body.appendChild(ghost);
      drag.tile.style.opacity = '0.35';
    }
    if (drag.moved && ghost) {
      ghost.style.left = e.touches[0].clientX + 'px';
      ghost.style.top  = e.touches[0].clientY + 'px';
      e.preventDefault();
    }
  }, { passive: false });

  bank.addEventListener('touchend', e => {
    if (!drag) return;
    e.preventDefault();
    if (drag.moved) {
      if (ghost) { ghost.remove(); ghost = null; }
      drag.tile.style.opacity = '';
      const t = e.changedTouches[0];
      const tray = document.getElementById('wt-tray');
      if (t && tray) {
        const r = tray.getBoundingClientRect();
        if (t.clientX >= r.left && t.clientX <= r.right && t.clientY >= r.top && t.clientY <= r.bottom) {
          const id = parseInt(drag.tile.id.replace('wt-tile-', ''));
          if (!isNaN(id) && !state.wtTiles[id]?.placed) window.wtTileClick(id);
        }
      }
    } else {
      const id = parseInt(drag.tile.id.replace('wt-tile-', ''));
      if (!isNaN(id)) window.wtTileClick(id);
    }
    drag = null;
  });

  bank.addEventListener('touchcancel', () => {
    if (ghost) { ghost.remove(); ghost = null; }
    if (drag?.tile) drag.tile.style.opacity = '';
    drag = null;
  });
}

window.answerMCQ = (el, idx) => {
  if (state.answered) return;
  state.answered = true;
  const q = currentDay.questions[state.currentQ];
  const isCorrect = q.options[idx] === q.answer;
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  el.classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {
    document.querySelectorAll('.option-btn').forEach((b, i) => {
      if (q.options[i] === q.answer) b.classList.add('correct');
    });
  }
  recordAnswer(isCorrect, q);
};

window.submitInputQuestion = () => {
  const inp = document.getElementById('active-input');
  if (!inp) return;
  if (state.answered) return;
  if (!inp.value.trim()) {
    if (isMobileKeyboardMode()) window.activateAnswerInput(inp);
    inp.focus();
    return;
  }
  state.answered = true;
  const q = currentDay.questions[state.currentQ];
  const isCorrect = isAcceptedTypedAnswer(inp.value, q);
  inp.classList.add(isCorrect ? 'correct' : 'wrong');
  inp.disabled = true;
  closeKeyboard();
  recordAnswer(isCorrect, q);
};

window.wtTileClick = (id) => {
  if (state.answered) return;
  const tile = state.wtTiles[id];
  const tray = document.getElementById('wt-tray');
  const tileEl = document.getElementById('wt-tile-' + id);
  if (!tile || !tray || !tileEl) return;

  if (!tile.placed) {
    tile.placed = true; state.wtTray.push(id);
    const clone = document.createElement('button');
    clone.className = 'wt-tile in-tray'; clone.id = 'wt-tray-tile-' + id;
    clone.textContent = tile.word; clone.onclick = () => window.wtTileClick(id);
    tray.appendChild(clone); tileEl.style.visibility = 'hidden';
  } else {
    tile.placed = false; state.wtTray = state.wtTray.filter(x => x !== id);
    document.getElementById('wt-tray-tile-' + id)?.remove();
    tileEl.style.visibility = 'visible';
  }
  const checkBtn = document.getElementById('wt-check-btn');
  if (checkBtn) checkBtn.disabled = state.wtTray.length === 0;
  saveLessonProgress('lesson');
};

window.checkWordTiles = () => {
  if (state.answered) return;
  const q = currentDay.questions[state.currentQ];
  const built = state.wtTray.map(id => state.wtTiles[id].word).join(' ');
  const isCorrect = built.trim() === q.answer.trim();
  state.answered = true;
  const tray = document.getElementById('wt-tray');
  if (tray) tray.classList.add(isCorrect ? 'correct-tray' : 'wrong-tray');
  recordAnswer(isCorrect, q);
};

window.matchClick = (el, pairIdx, side) => {
  if (el.classList.contains('matched') || state.answered) return;
  const ms = state.matchState;
  
  document.querySelectorAll(`#match-${side} .match-item`).forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  if(side === 'left') ms.selectedLeft = {el, pairIdx};
  else ms.selectedRight = {el, pairIdx};

  if (ms.selectedLeft && ms.selectedRight) {
    const isMatch = ms.selectedLeft.pairIdx === ms.selectedRight.pairIdx;
    if (isMatch) {
      ms.selectedLeft.el.classList.add('matched'); ms.selectedRight.el.classList.add('matched');
      ms.matched.push(ms.selectedLeft.pairIdx);
      if (ms.matched.length === currentDay.questions[state.currentQ].pairs.length) {
        state.answered = true; recordAnswer(true, currentDay.questions[state.currentQ]);
      }
    } else {
      const leftEl = ms.selectedLeft.el;
      const rightEl = ms.selectedRight.el;
      leftEl.classList.add('wrong-match'); rightEl.classList.add('wrong-match');
      setTimeout(() => {
        leftEl.classList.remove('wrong-match','selected');
        rightEl.classList.remove('wrong-match','selected');
      }, 600);
    }
    ms.selectedLeft = null; ms.selectedRight = null;
  }
};

window.skipQuestion = () => {
  if (state.answered) return;
  openSkipConfirm();
};

window.closeSkipConfirm = (event) => {
  if (event && event.target && event.target.id !== 'skip-confirm-overlay') return;
  closeSkipConfirm();
};

window.confirmSkipQuestion = () => {
  if (!skipConfirmPending || state.answered) {
    closeSkipConfirm();
    return;
  }
  closeSkipConfirm();
  state.answered = true;
  recordAnswer(false, currentDay.questions[state.currentQ], true);
};

function recordAnswer(correct, q, skipped = false) {
  if (!skipped) {
    state.totalAnswered++;
    if (correct) state.totalCorrect++;
  }
  Audio.playTone(correct);
  if (navigator.vibrate) navigator.vibrate(correct ? 50 : [50, 30, 50]);
  
  const fb = document.getElementById('feedback-banner');
  if (!fb) return;
  fb.className = 'feedback-banner active ' + (correct ? 'correct-fb' : 'wrong-fb');
  const icon  = correct ? '✓' : (skipped ? '»' : '✗');
  const title = correct ? '>> CORRECT!' : (skipped ? '>> SKIPPED' : '>> WRONG');
  const detail = correct ? (q.explanation||'') : `ANSWER: <span class="fb-correct-ans">${escapeHtml(q.answer||'')}</span> ${q.explanation ? '— '+q.explanation : ''}`;
  fb.innerHTML = `<span class="fb-icon">${icon}</span><div><div class="fb-title">${title}</div><div class="fb-detail">${detail}</div></div>`;

  const aa = document.getElementById('action-area');
  if (aa) aa.innerHTML = `<button class="btn-primary" onclick="window.nextQuestion()">CONTINUE →</button>`;
}

window.nextQuestion = () => {
  state.currentQ++;
  if (state.currentQ >= currentDay.questions.length) finishLesson();
  else renderQuestion();
};

function finishLesson() {
  const pct = state.totalAnswered > 0 ? Math.round((state.totalCorrect / state.totalAnswered) * 100) : 0;
  clearLessonProgress();
  
  if (!state.completedDays.includes(currentDay.id)) {
    state.completedDays.push(currentDay.id);
    localStorage.setItem('sk_completed_v2', JSON.stringify(state.completedDays));
  }
  
  const today = new Date().toDateString();
  if (state.lastDate !== today) {
    state.streak++; state.lastDate = today;
    localStorage.setItem('sk_last_date', today);
    localStorage.setItem('sk_streak', state.streak);
  }
  
  state.totalQuestions += state.totalAnswered;
  state.totalCorrectAll += state.totalCorrect;
  localStorage.setItem('sk_total_q', state.totalQuestions);
  localStorage.setItem('sk_total_c', state.totalCorrectAll);

  if (currentDay.isTest) {
    if (pct >= 60 && !state.completedModuleTests.includes(currentMod.id)) {
      state.completedModuleTests.push(currentMod.id);
      localStorage.setItem('sk_mod_tests', JSON.stringify(state.completedModuleTests));
    }
    document.getElementById('cert-badge').textContent = currentMod.icon;
    document.getElementById('cert-module-id').textContent = `MODULE_${currentMod.id}`;
    document.getElementById('cert-module-title').textContent = currentMod.title;
    document.getElementById('cert-module-sub').textContent = currentMod.subtitle;
    document.getElementById('cert-score-box').textContent = pct + '%';
    document.getElementById('cert-correct').textContent = state.totalCorrect;
    document.getElementById('cert-wrong').textContent = state.totalAnswered - state.totalCorrect;
    document.getElementById('cert-total').textContent = state.totalAnswered;
    
    if (pct >= 60) {
      document.getElementById('cert-stamp').textContent = '✓ CERTIFIED';
      document.getElementById('cert-stamp').className = 'cert-stamp';
    } else {
      document.getElementById('cert-stamp').textContent = '↺ RETRY';
      document.getElementById('cert-stamp').className = 'cert-stamp fail-stamp';
    }
    showScreen('cert');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Effects.launchConfetti(pct >= 60 ? 100 : 40);
    }
  } else {
    document.getElementById('score-big').textContent = pct + '%';
    document.getElementById('sc-correct').textContent = state.totalCorrect;
    document.getElementById('sc-wrong').textContent = state.totalAnswered - state.totalCorrect;
    document.getElementById('sc-total').textContent = state.totalAnswered;
    showScreen('score');
    if (pct >= 70 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Effects.launchConfetti();
    }
  }
}

function init() {
  injectGlobals();
  Theme.init();
  Prefs.init();

  window.addEventListener('sk:script-change', () => {
    rerenderActiveInputQuestion();
  });

  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = state.streak;

  const urlParams = new URLSearchParams(window.location.search);
  const modId = parseInt(urlParams.get('mod'));
  const dayId = urlParams.get('day');

  if (!modId || !dayId) {
    window.location.href = '/';
    return;
  }

  currentMod = getModule(modId);
  currentDay = getDay(modId, dayId);

  if (!currentMod || !currentDay) {
    window.location.href = '/';
    return;
  }

  state.currentModuleId = modId;
  state.currentDayId = dayId;

  document.addEventListener('keydown', (event) => {
    const overlay = document.getElementById('skip-confirm-overlay');
    if (!overlay || !overlay.classList.contains('active')) return;
    if (event.key === 'Escape') closeSkipConfirm();
  });

  const savedProgress = loadLessonProgress(modId, dayId);
  if (savedProgress) {
    state.currentQ = Math.max(0, Math.min(savedProgress.currentQ || 0, currentDay.questions.length - 1));
    state.totalAnswered = Math.max(0, savedProgress.totalAnswered || 0);
    state.totalCorrect = Math.max(0, savedProgress.totalCorrect || 0);
    hydratedLessonProgress = savedProgress;

    if (savedProgress.screen === 'lesson') {
      showLesson();
      return;
    }
  }

  showBriefing();
}

document.addEventListener('DOMContentLoaded', init);
