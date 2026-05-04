import { MODULES, getModule, getDay } from '../data/index.js';
import { state } from './state.js';
import { Theme, Prefs, Audio, Effects } from './utils.js';
import { injectGlobals } from './components.js';

let currentDay = null;
let currentMod = null;
const LESSON_PROGRESS_KEY = 'sk_lesson_progress';
let hydratedLessonProgress = null;

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

function buildAcceptedAnswerSet(question) {
  const accepted = new Set();
  const add = (value) => {
    if (!value) return;
    const strict = normalizeAnswerText(value);
    const folded = normalizeAnswerText(value, { latinFold: true });
    if (strict) accepted.add(strict);
    if (folded) accepted.add(folded);
  };

  add(question.answer);
  add(question.answerRoman);
  return accepted;
}

function isAcceptedTypedAnswer(inputValue, question) {
  const strict = normalizeAnswerText(inputValue);
  const folded = normalizeAnswerText(inputValue, { latinFold: true });
  if (!strict && !folded) return false;

  const accepted = buildAcceptedAnswerSet(question);
  return accepted.has(strict) || accepted.has(folded);
}

// Briefing logic
function renderSection(s) {
  if (s.type === 'table') {
    const ths = s.cols.map(c => `<th>${c}</th>`).join('');
    const trs = s.rows.map(row => {
      const tds = row.map((cell, i) => {
        const cls = (i <= 1 && /[\u0900-\u097F]/.test(cell)) ? ' class="dev"' : '';
        return `<td${cls}>${cell}</td>`;
      }).join('');
      return `<tr>${tds}</tr>`;
    }).join('');
    return `<div style="margin-bottom:14px"><div class="brief-grammar-title" style="margin-bottom:8px">${s.label}</div><div style="overflow-x:auto"><table class="brief-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div></div>`;
  }
  if (s.type === 'grammar') return `<div class="brief-grammar"><span class="brief-grammar-title">${s.label}</span><p>${s.text}</p></div>`;
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
    <div class="briefing-header"><div class="briefing-icon">${currentDay.icon}</div><div class="briefing-title">${data.title}</div><div class="briefing-tag">${tag}</div></div>
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
      const escaped = key.replace(/'/g, "\\'");
      html += `<button class="vk-key" onclick="window.vkPress('${escaped}')">${key}</button>`;
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
  const body = document.getElementById('vk-body');
  const btn = document.getElementById('vk-toggle-btn');
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'flex';
  btn.textContent = isOpen ? '▲' : '▼';
};

window.vkPress = (char) => {
  const inp = document.getElementById('active-input');
  if (inp && !inp.disabled) {
    const start = inp.selectionStart;
    const end = inp.selectionEnd;
    const val = inp.value;
    inp.value = val.substring(0, start) + char + val.substring(end);
    inp.selectionStart = inp.selectionEnd = start + char.length;
    inp.focus();
  }
};

window.vkBackspace = () => {
  const inp = document.getElementById('active-input');
  if (inp && !inp.disabled) {
    const start = inp.selectionStart;
    const end = inp.selectionEnd;
    const val = inp.value;
    if (start === end && start > 0) {
      inp.value = val.substring(0, start - 1) + val.substring(end);
      inp.selectionStart = inp.selectionEnd = start - 1;
    } else if (start !== end) {
      inp.value = val.substring(0, start) + val.substring(end);
      inp.selectionStart = inp.selectionEnd = start;
    }
    inp.focus();
  }
};

function renderQuestion() {
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
    state.matchState = { selectedLeft: null, selectedRight: null, matched: [] };
  }

  const midData = (currentDay.briefing?.mid || []).find(m => m.afterQ === state.currentQ);
  const midHTML = midData ? `<div class="mid-briefing"><span class="mid-briefing-tag">${midData.tag || 'INFO'}</span><h4>${midData.title}</h4>${renderSection(midData.content)}</div>` : '';

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

  if ((q.type === 'translation' || q.type === 'fill') && restoredState?.type === q.type) {
    const inp = document.getElementById('active-input');
    if (inp && typeof restoredState.inputValue === 'string') inp.value = restoredState.inputValue;
    inp?.addEventListener('input', () => saveLessonProgress('lesson'));
  }

  if (q.type === 'wordtiles' && restoredState?.type === 'wordtiles') {
    restoreWordTileUI();
  }

  hydratedLessonProgress = null;
  saveLessonProgress('lesson');
}

function buildQuestion(q) {
  const badge = `<div class="q-type-badge">${q.type.toUpperCase()}</div>`;
  const qText = `<div class="q-text">${q.question}</div>`;
  
  if (q.type === 'mcq') {
    const opts = q.options.map((opt, i) => {
      const dev = q.optionsDevanagari ? `<span class="devanagari">${q.optionsDevanagari[i]}</span>` : '';
      return `<button class="option-btn" onclick="window.answerMCQ(this, ${i})">${opt}${dev}</button>`;
    }).join('');
    return `${badge}${qText}<div class="options-grid">${opts}</div>`;
  }
  
  if (q.type === 'translation') {
    return `${badge}${qText}<div class="translation-wrap"><div class="translation-hint">${q.hint||''}</div>
      <input class="answer-input" type="text" id="active-input" placeholder="Type answer..." autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key==='Enter') window.submitInputQuestion()">
      <div class="keyboard-hint">// press ENTER or tap SUBMIT</div>
      ${renderVirtualKeyboard()}
      </div>`;
  }
  
  if (q.type === 'fill') {
    return `${badge}<div class="fill-sentence">${q.sentenceParts[0]}<input class="blank-input devanagari" id="active-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key==='Enter') window.submitInputQuestion()">${q.sentenceParts[1]}</div>
      <div class="keyboard-hint">// press ENTER or tap SUBMIT</div>
      ${renderVirtualKeyboard()}`;
  }
  
  if (q.type === 'match') {
    const left  = q.pairs.map((p, i) => `<button class="match-item" onclick="window.matchClick(this,${i},'left')">${p.left}</button>`).join('');
    const shuffledIdx = q.pairs.map((_,i) => i).sort(() => Math.random()-0.5);
    const right = shuffledIdx.map(i => `<button class="match-item" onclick="window.matchClick(this,${i},'right')">${q.pairs[i].right}</button>`).join('');
    return `${badge}${qText}<div class="match-grid"><div class="match-col" id="match-left">${left}</div><div class="match-col" id="match-right">${right}</div></div>`;
  }
  
  if (q.type === 'wordtiles') {
    const tileHTML = state.wtTiles.map((t, i) => `<button class="wt-tile" id="wt-tile-${i}" onclick="window.wtTileClick(${i})">${t.word}</button>`).join('');
    return `${badge}${qText}<div id="wt-tray" class="wt-tray"><span id="wt-placeholder" class="wt-placeholder">tap words</span></div>
      <div class="wt-bank-label">WORD_BANK</div><hr class="wt-divider"><div class="wt-bank" id="wt-bank">${tileHTML}</div>`;
  }
  return '';
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
    inp.focus();
    return;
  }
  state.answered = true;
  const q = currentDay.questions[state.currentQ];
  const isCorrect = isAcceptedTypedAnswer(inp.value, q);
  inp.classList.add(isCorrect ? 'correct' : 'wrong');
  inp.disabled = true;
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
  state.answered = true;
  recordAnswer(false, currentDay.questions[state.currentQ], true);
};

function recordAnswer(correct, q, skipped = false) {
  state.totalAnswered++;
  if (correct) state.totalCorrect++;
  Audio.playTone(correct);
  
  const fb = document.getElementById('feedback-banner');
  if (!fb) return;
  fb.className = 'feedback-banner active ' + (correct ? 'correct-fb' : 'wrong-fb');
  const icon  = correct ? '✓' : (skipped ? '»' : '✗');
  const title = correct ? '>> CORRECT!' : (skipped ? '>> SKIPPED' : '>> WRONG');
  const detail = correct ? (q.explanation||'') : `ANSWER: <span class="fb-correct-ans">${q.answer||''}</span> ${q.explanation ? '— '+q.explanation : ''}`;
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
    localStorage.setItem('sk_streak', state.streak);
    localStorage.setItem('sk_last_date', today);
  }
  
  state.totalQuestions += state.totalAnswered;
  state.totalCorrectAll += state.totalCorrect;
  localStorage.setItem('sk_total_q', state.totalQuestions);
  localStorage.setItem('sk_total_c', state.totalCorrectAll);

  if (currentDay.isTest) {
    if (!state.completedModuleTests.includes(currentMod.id)) {
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
    Effects.launchConfetti(pct >= 60 ? 100 : 40);
  } else {
    document.getElementById('score-big').textContent = pct + '%';
    document.getElementById('sc-correct').textContent = state.totalCorrect;
    document.getElementById('sc-wrong').textContent = state.totalAnswered - state.totalCorrect;
    document.getElementById('sc-total').textContent = state.totalAnswered;
    showScreen('score');
    if (pct >= 70) Effects.launchConfetti();
  }
}

function init() {
  Theme.init();
  Prefs.init();
  injectGlobals();

  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = state.streak;

  const marquee = document.getElementById('topbar-marquee');
  if (marquee) {
    marquee.textContent =
      `MODULES: ${MODULES.length}  //  STREAK: ${state.streak}×  //  अभ्यासेन न किंचित् अशक्यम् — Nothing is impossible with practice`;
  }

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
