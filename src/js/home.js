import { MODULES, getModule } from '../data/index.js';
import { state, expandedMods, checkStreak } from './state.js';
import { Theme, Prefs, escapeHtml } from './utils.js';
import { injectGlobals } from './components.js';

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
        <div class="module-prog-text">${doneDays}/${totalDays} DAYS</div>
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

    mod.days.forEach((day, idx) => {
      const done   = completedSet.has(day.id);
      const locked = isDayLocked(mod.id, day.id);
      const card   = document.createElement('div');
      card.className = 'mod-day-card'
        + (done   ? ' completed' : '')
        + (locked ? ' locked'    : '')
        + (day.isTest ? ' is-test' : '');
      const label = day.isTest ? 'MODULE TEST' : `DAY ${idx + 1}`;
      const badge = done ? '✓' : (locked ? '🔒' : '');
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

    body.appendChild(progWrap);
    body.appendChild(desc);
    body.appendChild(grid);
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
      const dayNum = day.isTest ? 'TEST' : `DAY_${idx + 1}`;
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
      btn.onclick = () => startLesson(mod.id, day.id);
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

function updateHeroState() {
  const heroBtnEl  = document.querySelector('.hero-btn');
  const heroTagEl  = document.querySelector('.hero-tag');
  if (!heroBtnEl || !heroTagEl) return;

  const completedLessons = state.completedDays.filter(id => !dayIsTestMap.get(id));
  if (completedLessons.length === 0) {
    heroTagEl.textContent  = '> SESSION_01 // READY TO BEGIN';
    heroBtnEl.textContent  = '▶ START LESSON_01';
    return;
  }

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
}

function init() {
  injectGlobals();
  Theme.init();
  Prefs.init();
  checkStreak();
  restoreSidebarState();
  renderSidebar();
  renderHomeModules();
  updateStats();
  updateHeroState();

  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = state.streak;
}

// Bind to window for HTML events
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
