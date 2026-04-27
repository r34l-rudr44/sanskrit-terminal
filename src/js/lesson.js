import { MODULES, getModule, getDay } from '../data/index.js';
import { state } from './state.js';
import { Theme, Prefs, Audio, Effects } from './utils.js';
import { injectGlobals } from './components.js';

let currentDay = null;
let currentMod = null;

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
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
    <div class="briefing-header"><div class="briefing-icon">${currentDay.icon}</div><div class="briefing-title">${data.title}</div><div class="briefing-tag">${tag}</div></div>
    <div class="briefing-body"><div class="briefing-lead">${data.lead}</div>${sectionsHTML}</div>
    <div class="briefing-footer"><span class="briefing-footer-note">${currentDay.isTest ? 'prepare yourself' : 'read before continuing'}</span>
    <button class="btn-primary" onclick="window.showLesson()">${currentDay.isTest ? '► BEGIN TEST' : 'BEGIN LESSON →'}</button></div>
  `;
  mount.innerHTML = '';
  mount.appendChild(card);
}

// Lesson logic
window.showLesson = function() {
  showScreen('lesson');
  renderQuestion();
};

function renderQuestion() {
  const q = currentDay.questions[state.currentQ];
  if (!q) return;
  const pct = Math.round((state.currentQ / currentDay.questions.length) * 100);

  document.getElementById('lesson-day-tag').textContent = `MOD_${currentMod.id}`;
  document.getElementById('lesson-title-sm').textContent = currentDay.title;
  document.getElementById('progress-count').textContent  = `${state.currentQ + 1}/${currentDay.questions.length}`;
  document.getElementById('progress-fill').style.width   = pct + '%';

  state.answered = false;
  state.wtTray = [];
  
  if (q.type === 'wordtiles') {
    const allWords = [...q.tiles, ...(q.distractors || [])].sort(() => Math.random() - 0.5);
    state.wtTiles = allWords.map(w => ({ word: w, placed: false }));
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
    // auto-advances
  } else if (q.type === 'wordtiles') {
    aa.innerHTML = `<button class="btn-secondary" onclick="window.skipQuestion()">SKIP</button>
      <button class="btn-primary" id="wt-check-btn" onclick="window.checkWordTiles()" disabled>CHECK ✓</button>`;
  } else {
    aa.innerHTML = `<button class="btn-secondary" onclick="window.skipQuestion()">SKIP</button>`;
  }
  card.appendChild(aa);
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
      <input class="answer-input" type="text" placeholder="Type answer..." onkeydown="if(event.key==='Enter') window.checkTranslation(this)">
      <div class="keyboard-hint">// press ENTER to submit</div></div>`;
  }
  
  if (q.type === 'fill') {
    return `${badge}<div class="fill-sentence">${q.sentenceParts[0]}<input class="blank-input devanagari" type="text" onkeydown="if(event.key==='Enter') window.checkFill(this)">${q.sentenceParts[1]}</div>
      <div class="keyboard-hint">// press ENTER to check</div>`;
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

window.checkTranslation = (inp) => {
  if (state.answered) return;
  state.answered = true;
  const q = currentDay.questions[state.currentQ];
  const isCorrect = inp.value.trim() === q.answer.trim();
  inp.classList.add(isCorrect ? 'correct' : 'wrong');
  inp.disabled = true;
  recordAnswer(isCorrect, q);
};

window.checkFill = (inp) => {
  if (state.answered) return;
  state.answered = true;
  const q = currentDay.questions[state.currentQ];
  const isCorrect = inp.value.trim() === q.answer.trim();
  inp.classList.add(isCorrect ? 'correct' : 'wrong');
  inp.disabled = true;
  recordAnswer(isCorrect, q);
};

window.wtTileClick = (id) => {
  if (state.answered) return;
  const tile = state.wtTiles[id];
  const tray = document.getElementById('wt-tray');
  const tileEl = document.getElementById('wt-tile-' + id);
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
  document.getElementById('wt-check-btn').disabled = state.wtTray.length === 0;
};

window.checkWordTiles = () => {
  if (state.answered) return;
  const q = currentDay.questions[state.currentQ];
  const built = state.wtTray.map(id => state.wtTiles[id].word).join(' ');
  const isCorrect = built.trim() === q.answer.trim();
  state.answered = true;
  document.getElementById('wt-tray').classList.add(isCorrect ? 'correct-tray' : 'wrong-tray');
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
      ms.selectedLeft.el.classList.add('wrong-match'); ms.selectedRight.el.classList.add('wrong-match');
      setTimeout(() => {
        ms.selectedLeft?.el.classList.remove('wrong-match','selected');
        ms.selectedRight?.el.classList.remove('wrong-match','selected');
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
  fb.className = 'feedback-banner active ' + (correct ? 'correct-fb' : 'wrong-fb');
  const icon  = correct ? '✓' : (skipped ? '»' : '✗');
  const title = correct ? '>> CORRECT!' : (skipped ? '>> SKIPPED' : '>> WRONG');
  const detail = correct ? (q.explanation||'') : `ANSWER: <span class="fb-correct-ans">${q.answer||''}</span> ${q.explanation ? '— '+q.explanation : ''}`;
  fb.innerHTML = `<span class="fb-icon">${icon}</span><div><div class="fb-title">${title}</div><div class="fb-detail">${detail}</div></div>`;

  document.getElementById('action-area').innerHTML = `<button class="btn-primary" onclick="window.nextQuestion()">CONTINUE →</button>`;
}

window.nextQuestion = () => {
  state.currentQ++;
  if (state.currentQ >= currentDay.questions.length) finishLesson();
  else renderQuestion();
};

function finishLesson() {
  const pct = Math.round((state.totalCorrect / state.totalAnswered) * 100);
  
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
  document.getElementById('streak-count').textContent = state.streak;
  document.getElementById('topbar-marquee').textContent =
    `MODULES: ${MODULES.length}  //  STREAK: ${state.streak}×  //  अभ्यासेन न किंचित् अशक्यम् — Nothing is impossible with practice`;

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

  showBriefing();
}

document.addEventListener('DOMContentLoaded', init);
