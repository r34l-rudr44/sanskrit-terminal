import { MODULES, getModule } from '../data/index.js';
import { state, expandedMods, checkStreak } from './state.js';
import { Theme, Prefs, escapeHtml } from './utils.js';
import { injectGlobals } from './components.js';
import { ACHIEVEMENTS, checkAndGrantAchievements, showAchievementToasts } from './achievements.js';
import { getDailyQuest } from './quests.js';
import { maybeShowStreakReminder } from './notifications.js';

// Precomputed map from dayId → isTest for O(1) lookup in updateStats/isDayLocked
const dayIsTestMap = new Map();
for (const mod of MODULES) {
  for (const day of mod.days) dayIsTestMap.set(day.id, day.isTest);
}

export function isDayLocked(modId, dayId) {
  const mod = getModule(modId);
  if (!mod) return true;
  const day = mod.days.find(d => d.id === dayId);
  if (!day || !day.isTest) return false;
  const completedSet = new Set(state.completedDays);
  return !mod.days.filter(d => !d.isTest).every(d => completedSet.has(d.id));
}

export function startLesson(modId, dayId) {
  if (isDayLocked(modId, dayId)) return;
  window.location.href = `/lesson.html?mod=${modId}&day=${dayId}`;
}

export function renderHomeModules() {
  const container = document.getElementById('home-module-list');
  if(!container) return;
  container.innerHTML = '';

  const completedSet = new Set(state.completedDays);

  for (let i = 0; i < MODULES.length; i += 3) {
    const group = document.createElement('div');
    group.className = 'home-module-group';

    MODULES.slice(i, i + 3).forEach(mod => {
    const totalDays   = mod.days.length;
    const doneDays    = mod.days.filter(d => completedSet.has(d.id)).length;
    const pct         = totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0;
    const modComplete = doneDays === totalDays;
    const isOpen      = expandedMods.has(mod.id);

    const entry = document.createElement('div');
    entry.className = 'module-entry' + (modComplete ? ' mod-complete' : '');

    const hdr = document.createElement('div');
    hdr.className = 'module-entry-hdr' + (isOpen ? ' open' : '');
    hdr.dataset.mod = mod.id;
    hdr.innerHTML = `
      <div class="module-entry-icon">${escapeHtml(mod.icon)}</div>
      <div class="module-entry-info">
        <div class="module-entry-id">MODULE_${String(mod.id).padStart(2,'0')}</div>
        <div class="module-entry-title">${escapeHtml(mod.title)}</div>
        <div class="module-entry-sub">${escapeHtml(mod.subtitle)}</div>
      </div>
      <div class="module-entry-right">
        <div class="module-prog-text">${doneDays}/${totalDays} UNITS</div>
        <div class="module-prog-mini"><div class="module-prog-mini-fill" style="width:${pct}%"></div></div>
        <div class="module-chevron">▶</div>
      </div>`;
    hdr.onclick = () => {
      const nowOpen = !expandedMods.has(mod.id);
      nowOpen ? expandedMods.add(mod.id) : expandedMods.delete(mod.id);
      hdr.classList.toggle('open', nowOpen);
      body.classList.toggle('open', nowOpen);
      // Sync sidebar without full re-render
      const sbHdr = document.querySelector(`.mod-section-hdr[data-mod="${mod.id}"]`);
      if (sbHdr) {
        sbHdr.classList.toggle('open', nowOpen);
        sbHdr.nextElementSibling?.classList.toggle('open', nowOpen);
      }
    };

    const body = document.createElement('div');
    body.className = 'module-body' + (isOpen ? ' open' : '');

    const progWrap = document.createElement('div');
    progWrap.className = 'module-progress-wrap';
    progWrap.innerHTML = `<div class="module-progress-bar"><div class="module-progress-fill" style="width:${pct}%"></div></div>`;

    const desc = document.createElement('div');
    desc.className = 'module-desc';
    desc.textContent = mod.description;

    const grid = document.createElement('div');
    grid.className = 'module-days-grid';

    const lessonScores = (() => { try { return JSON.parse(localStorage.getItem('sk_lesson_scores') || '{}'); } catch { return {}; } })();
    mod.days.forEach((day, idx) => {
      const done   = completedSet.has(day.id);
      const locked = isDayLocked(mod.id, day.id);
      const needsReview = done && !day.isTest && (lessonScores[day.id] ?? 100) < 50;
      const card   = document.createElement('div');
      card.className = 'mod-day-card'
        + (done   ? ' completed' : '')
        + (locked ? ' locked'    : '')
        + (day.isTest ? ' is-test' : '')
        + (needsReview ? ' needs-review' : '');
      const label = day.isTest ? 'MODULE TEST' : `UNIT ${idx + 1}`;
      const badge = done ? (needsReview ? '📖' : '✓') : (locked ? '🔒' : '');
      card.innerHTML = `
        <div class="mod-day-card-icon">${escapeHtml(day.icon)}</div>
        <div class="mod-day-card-title">${escapeHtml(day.title)}</div>
        <div class="mod-day-card-meta">${escapeHtml(label)}</div>
        ${badge ? `<div class="mod-day-card-badge">${escapeHtml(badge)}</div>` : ''}`;
      if (locked) {
        const remaining = mod.days.filter(d => !d.isTest && !completedSet.has(d.id)).length;
        card.dataset.tooltip = `Complete ${remaining} lesson${remaining !== 1 ? 's' : ''} to unlock`;
      }
      card.onclick = locked ? null : () => startLesson(mod.id, day.id);
      grid.appendChild(card);
    });

    const bodyInner = document.createElement('div');
    bodyInner.className = 'module-body-inner';
    bodyInner.appendChild(progWrap);
    bodyInner.appendChild(desc);
    bodyInner.appendChild(grid);
    body.appendChild(bodyInner);
    entry.appendChild(hdr);
    entry.appendChild(body);
    group.appendChild(entry);
  });

    container.appendChild(group);
  }
}

export function updateStats() {
  const el = (id) => document.getElementById(id);
  if (!el('stat-days')) return;
  const days = state.completedDays.filter(id => !dayIsTestMap.get(id)).length;
  const hasData = days > 0 || state.totalQuestions > 0;
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach(c => c.classList.toggle('stat-card--empty', !hasData));

  el('stat-days').textContent      = hasData ? days : '—';
  el('stat-questions').textContent = hasData ? state.totalQuestions : '—';
  const acc = state.totalQuestions > 0
    ? Math.round((state.totalCorrectAll / state.totalQuestions) * 100) + '%'
    : '—';
  el('stat-accuracy').textContent = acc;

  const completedSet = new Set(state.completedDays);
  const totalModules = MODULES.length;
  const completedModules = MODULES.filter(m => m.days.some(d => d.isTest && completedSet.has(d.id))).length;
  const curriculumPct = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const cbWrap = el('curriculum-bar-wrap');
  const cbFill = el('cb-fill');
  const cbPct  = el('cb-pct');
  const cbDetail = el('cb-detail');
  if (cbWrap) {
    if (cbFill) cbFill.style.width = curriculumPct + '%';
    if (cbPct)  cbPct.textContent  = curriculumPct + '%';
    if (cbDetail) cbDetail.textContent = `// ${completedModules}/${totalModules} modules completed`;
    if (cbFill) cbFill.classList.toggle('cb-fill--complete', curriculumPct === 100);
  }
}

export function renderSidebar() {
  const sb = document.getElementById('sidebar-inner');
  if(!sb) return;
  sb.innerHTML = `<div class="sidebar-title">MODULES</div>`;

  const completedSet = new Set(state.completedDays);

  MODULES.forEach(mod => {
    const isExpanded = expandedMods.has(mod.id);
    const modDone = mod.days.filter(d => !d.isTest).every(d => completedSet.has(d.id)) &&
                    mod.days.filter(d => d.isTest).every(d => completedSet.has(d.id));

    const hdr = document.createElement('button');
    hdr.className = 'mod-section-hdr' + (isExpanded ? ' open' : '');
    hdr.dataset.mod = mod.id;
    hdr.innerHTML = `<span class="mod-icon">${escapeHtml(mod.icon)}</span>
      <span style="flex:1;font-size:12px;letter-spacing:1.5px;">MOD_${mod.id} — ${escapeHtml(mod.title)}</span>
      ${modDone ? '<span style="color:var(--ok);font-size:13px;">✓</span>' : ''}
      <span class="mod-arrow">▶</span>`;
    hdr.onclick = () => {
      const nowOpen = !expandedMods.has(mod.id);
      nowOpen ? expandedMods.add(mod.id) : expandedMods.delete(mod.id);
      hdr.classList.toggle('open', nowOpen);
      daysWrap.classList.toggle('open', nowOpen);
      // Sync home module list without full re-render
      const homeHdr = document.querySelector(`.module-entry-hdr[data-mod="${mod.id}"]`);
      if (homeHdr) {
        homeHdr.classList.toggle('open', nowOpen);
        homeHdr.nextElementSibling?.classList.toggle('open', nowOpen);
      }
    };

    const daysWrap = document.createElement('div');
    daysWrap.className = 'mod-days' + (isExpanded ? ' open' : '');
    const inner = document.createElement('div');
    inner.className = 'mod-days-inner';

    mod.days.forEach((day, idx) => {
      const done   = completedSet.has(day.id);
      const locked = isDayLocked(mod.id, day.id);
      const dayNum = day.isTest ? 'TEST' : `UNIT_${idx + 1}`;
      const btn = document.createElement('button');
      btn.className = 'day-btn'
        + (done   ? ' completed' : '')
        + (day.isTest ? ' test-day' : '')
        + (locked ? ' locked'    : '');
      btn.innerHTML = `<div class="day-icon">${locked ? '🔒' : escapeHtml(day.icon)}</div>
        <div class="day-info">
          <div class="day-name">${escapeHtml(dayNum)}</div>
          <div class="day-meta">${escapeHtml(day.title)}</div>
        </div>
        ${done ? '<span class="day-check">✓</span>' : ''}`;
      if (locked) {
        btn.disabled = true;
        const remaining = mod.days.filter(d => !d.isTest && !completedSet.has(d.id)).length;
        btn.title = `Complete ${remaining} lesson${remaining !== 1 ? 's' : ''} to unlock`;
      } else {
        btn.onclick = () => startLesson(mod.id, day.id);
      }
      inner.appendChild(btn);
    });

    daysWrap.appendChild(inner);
    sb.appendChild(hdr);
    sb.appendChild(daysWrap);
  });
}

function restoreSidebarState() {
  const saved = localStorage.getItem('sk_sidebar');
  if (saved === 'collapsed') {
    const sb = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-tab-icon');
    const wrap = document.getElementById('sidebar-wrap');
    if (sb) {
      sb.classList.add('collapsed');
      if (icon) icon.textContent = '▶';
      if (wrap) wrap.style.borderRight = 'none';
    }
  }
}

function updateHeroState(streakStatus) {
  const heroBtnEl  = document.querySelector('.hero-btn');
  const heroTagEl  = document.querySelector('.hero-tag');
  if (!heroBtnEl || !heroTagEl) return;

  const completedLessons = state.completedDays.filter(id => !dayIsTestMap.get(id));
  if (completedLessons.length === 0) {
    heroTagEl.textContent = '> SESSION_01 // READY TO BEGIN';
    heroBtnEl.textContent = '▶ START LESSON_01';
    return;
  }

  const today = new Date().toDateString();
  const lastSeen = localStorage.getItem('sk_last_seen_date');
  const sessionCount = parseInt(localStorage.getItem('sk_session_count') || '0');
  const lastScore = parseInt(localStorage.getItem('sk_last_session_score') || '0');
  const gapDays = lastSeen && lastSeen !== today
    ? Math.max(1, Math.round((Date.now() - new Date(lastSeen).getTime()) / 86400000))
    : 0;

  // Find next uncompleted non-test day
  let nextDay = null;
  for (const mod of MODULES) {
    for (const day of mod.days) {
      if (!day.isTest && !state.completedDays.includes(day.id)) {
        nextDay = day; break;
      }
    }
    if (nextDay) break;
  }

  if (nextDay) {
    heroTagEl.textContent = `> CONTINUE — ${escapeHtml(nextDay.title)}`;
    heroBtnEl.textContent = '▶ RESUME PROGRESS';
  } else {
    heroTagEl.textContent = '> ALL_MODULES COMPLETE';
    heroBtnEl.textContent = '▶ REVIEW MODULES';
  }

  if (sessionCount === 0) return;

  if (gapDays === 0) {
    heroTagEl.textContent = `> TERMINAL_ACTIVE // SESSION_${sessionCount}`;
  } else if (gapDays >= 7) {
    heroTagEl.textContent = `> COLD_BOOT // RESTARTING_PROCESS`;
  } else if (gapDays >= 2) {
    heroTagEl.textContent = `> RECONNECTING... // LESSONS_WAITING`;
  }
}

function renderReturnFlash(gapDays) {
  if (gapDays < 2) return;
  const hero = document.querySelector('.hero-card');
  if (!hero) return;
  const flash = document.createElement('div');
  flash.className = 'return-flash';
  flash.id = 'return-flash';
  flash.innerHTML = `<span class="return-flash-label">PROCESS_RESUMED</span>
    <span class="return-flash-msg">// ${gapDays} days since last session — picking up where you left off</span>
    <button class="return-flash-close" onclick="document.getElementById('return-flash').remove()">✕</button>`;
  hero.insertAdjacentElement('afterend', flash);
  setTimeout(() => document.getElementById('return-flash')?.remove(), 4000);
}

function renderStreakWarning(streakStatus) {
  if (streakStatus !== 'at_risk' || state.streak < 2) return;
  const statsRow = document.querySelector('.stats-row');
  if (!statsRow) return;
  const banner = document.createElement('div');
  banner.className = 'streak-warning-banner';
  banner.innerHTML = `<span class="swb-icon">🔥</span>
    <div class="swb-body">
      <div class="swb-title">STREAK_ACTIVE — ${state.streak}× days</div>
      <div class="swb-sub">// Complete a lesson before midnight to keep your chain alive.</div>
    </div>
    <button class="swb-btn btn-primary" onclick="window.startFirstLesson()">► LESSON NOW</button>`;
  statsRow.insertAdjacentElement('afterend', banner);
}

function renderAchievements() {
  const container = document.getElementById('home-module-list');
  if (!container) return;
  const sessionCount = parseInt(localStorage.getItem('sk_session_count') || '0');
  if (sessionCount === 0) return;
  let earned;
  try { earned = new Set(JSON.parse(localStorage.getItem('sk_achievements') || '[]')); } catch { earned = new Set(); }

  const section = document.createElement('div');
  section.className = 'ach-section';
  const isOpen = localStorage.getItem('sk_ach_open') !== 'closed';

  section.innerHTML = `<div class="ach-section-hdr" id="ach-hdr">
    <span class="ach-section-label">// ACHIEVEMENTS</span>
    <span class="ach-count">${earned.size}/${ACHIEVEMENTS.length} UNLOCKED</span>
    <span class="ach-chevron">${isOpen ? '▼' : '▶'}</span>
  </div>
  <div class="ach-grid ${isOpen ? 'open' : ''}" id="ach-grid">
    <div class="ach-grid-inner">
      ${ACHIEVEMENTS.map(a => `
        <div class="ach-card ${earned.has(a.id) ? 'ach-earned' : 'ach-locked'}" title="${escapeHtml(a.desc)}">
          <div class="ach-card-icon">${earned.has(a.id) ? a.icon : '?'}</div>
          <div class="ach-card-title">${escapeHtml(a.title)}</div>
        </div>`).join('')}
    </div>
  </div>`;

  section.querySelector('#ach-hdr').addEventListener('click', () => {
    const grid = section.querySelector('#ach-grid');
    const chevron = section.querySelector('.ach-chevron');
    const nowOpen = !grid.classList.contains('open');
    grid.classList.toggle('open', nowOpen);
    chevron.textContent = nowOpen ? '▼' : '▶';
    localStorage.setItem('sk_ach_open', nowOpen ? 'open' : 'closed');
  });

  container.insertAdjacentElement('beforebegin', section);
}

function renderDailyQuest() {
  const container = document.getElementById('home-module-list');
  if (!container) return;
  const sessionCount = parseInt(localStorage.getItem('sk_session_count') || '0');
  if (sessionCount === 0) return;

  const { quest, data } = getDailyQuest();
  const todayStr = new Date().toDateString();
  const card = document.createElement('div');
  card.className = 'daily-quest-card' + (data.completed ? ' quest-done' : '');
  card.innerHTML = `<div class="dq-header">
    <span class="dq-label">DAILY_MISSION // ${escapeHtml(todayStr.toUpperCase())}</span>
    ${data.completed ? '<span class="dq-complete">✓ COMPLETE</span>' : ''}
  </div>
  <div class="dq-title">${escapeHtml(quest.title)}</div>
  <div class="dq-desc">// ${escapeHtml(quest.desc)}</div>
  ${!data.completed
    ? `<button class="dq-btn btn-primary" onclick="window.startFirstLesson()">► BEGIN MISSION</button>`
    : `<div class="dq-done-msg">MISSION_SUCCESS — Quest logged to your record.</div>`}`;

  container.insertAdjacentElement('beforebegin', card);
}

function renderWeakLessons() {
  const container = document.getElementById('home-module-list');
  if (!container) return;
  const sessionCount = parseInt(localStorage.getItem('sk_session_count') || '0');
  if (sessionCount === 0) return;

  let lessonScores;
  try { lessonScores = JSON.parse(localStorage.getItem('sk_lesson_scores') || '{}'); } catch { lessonScores = {}; }

  const weak = [];
  for (const mod of MODULES) {
    for (const day of mod.days) {
      if (!day.isTest && typeof lessonScores[day.id] === 'number' && lessonScores[day.id] < 50) {
        weak.push({ mod, day, score: lessonScores[day.id] });
      }
    }
  }
  if (weak.length === 0) return;

  const card = document.createElement('div');
  card.className = 'weak-lessons-card';

  const hdr = document.createElement('div');
  hdr.className = 'wl-header';
  hdr.textContent = `// REVIEW_QUEUE — ${weak.length} lesson${weak.length !== 1 ? 's' : ''} flagged`;
  card.appendChild(hdr);

  weak.forEach(({ mod, day, score }) => {
    const item = document.createElement('div');
    item.className = 'wl-item';

    const icon = document.createElement('span');
    icon.className = 'wl-icon';
    icon.textContent = day.icon;

    const info = document.createElement('div');
    info.className = 'wl-info';
    info.innerHTML = `<div class="wl-title">${escapeHtml(day.title)}</div>
      <div class="wl-score">SCORE: ${score}% — REVIEW NEEDED</div>`;

    const btn = document.createElement('button');
    btn.className = 'wl-retry-btn';
    btn.textContent = '↺ RETRY';
    btn.onclick = () => startLesson(mod.id, day.id);

    item.appendChild(icon);
    item.appendChild(info);
    item.appendChild(btn);
    card.appendChild(item);
  });

  container.insertAdjacentElement('beforebegin', card);
}

function init() {
  injectGlobals();
  Theme.init();
  Prefs.init();
  const streakStatus = checkStreak();
  restoreSidebarState();
  renderSidebar();
  renderHomeModules();
  updateStats();
  updateHeroState(streakStatus);

  const today = new Date().toDateString();
  const lastSeen = localStorage.getItem('sk_last_seen_date');
  const gapDays = lastSeen && lastSeen !== today
    ? Math.max(1, Math.round((Date.now() - new Date(lastSeen).getTime()) / 86400000))
    : 0;

  const sessionCount = parseInt(localStorage.getItem('sk_session_count') || '0');
  if (sessionCount > 0) {
    renderReturnFlash(gapDays);
    renderStreakWarning(streakStatus);

    const newAchs = checkAndGrantAchievements(state);
    showAchievementToasts(newAchs);
    if (streakStatus === 'at_risk') maybeShowStreakReminder(state.streak);
  }

  localStorage.setItem('sk_last_seen_date', today);

  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = state.streak;
}

// Bind to window for HTML events
window.startLesson = startLesson;

window.startFirstLesson = () => {
  for (const mod of MODULES) {
    for (const day of mod.days) {
      if (!day.isTest && !state.completedDays.includes(day.id)) {
        return startLesson(mod.id, day.id);
      }
    }
  }
  startLesson(MODULES[0].id, MODULES[0].days[0].id);
};

window.toggleSidebar = () => {
  const sb   = document.getElementById('sidebar');
  const icon = document.getElementById('sidebar-tab-icon');
  const wrap = document.getElementById('sidebar-wrap');
  if (!sb) return;
  const isCollapsed = sb.classList.toggle('collapsed');
  if (icon) icon.textContent = isCollapsed ? '▶' : '◀';
  if (wrap) wrap.style.borderRight = isCollapsed ? 'none' : '';
  localStorage.setItem('sk_sidebar', isCollapsed ? 'collapsed' : 'open');
};

document.addEventListener('DOMContentLoaded', init);
