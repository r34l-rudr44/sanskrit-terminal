import { MODULES, getModule } from '../data/index.js';
import { state, expandedMods, checkStreak } from './state.js';
import { Theme, Prefs } from './utils.js';
import { injectGlobals } from './components.js';

export function isDayLocked(modId, dayId) {
  const mod = getModule(modId);
  if (!mod) return true;
  const day = mod.days.find(d => d.id === dayId);
  if (!day || !day.isTest) return false;
  return !mod.days.filter(d => !d.isTest).every(d => state.completedDays.includes(d.id));
}

export function startLesson(modId, dayId) {
  if (isDayLocked(modId, dayId)) return;
  window.location.href = `/lesson.html?mod=${modId}&day=${dayId}`;
}

export function renderHomeModules() {
  const container = document.getElementById('home-module-list');
  if(!container) return;
  container.innerHTML = '';

  MODULES.forEach(mod => {
    const totalDays   = mod.days.length;
    const doneDays    = mod.days.filter(d => state.completedDays.includes(d.id)).length;
    const pct         = Math.round((doneDays / totalDays) * 100);
    const modComplete = doneDays === totalDays;
    const isOpen      = expandedMods.has(mod.id);

    const entry = document.createElement('div');
    entry.className = 'module-entry' + (modComplete ? ' mod-complete' : '');

    const hdr = document.createElement('div');
    hdr.className = 'module-entry-hdr' + (isOpen ? ' open' : '');
    hdr.innerHTML = `
      <div class="module-entry-icon">${mod.icon}</div>
      <div class="module-entry-info">
        <div class="module-entry-id">MODULE_${String(mod.id).padStart(2,'0')}</div>
        <div class="module-entry-title">${mod.title}</div>
        <div class="module-entry-sub">${mod.subtitle}</div>
      </div>
      <div class="module-entry-right">
        <div class="module-prog-text">${doneDays}/${totalDays} DAYS</div>
        <div class="module-chevron">▶</div>
      </div>`;
    hdr.onclick = () => {
      expandedMods.has(mod.id) ? expandedMods.delete(mod.id) : expandedMods.add(mod.id);
      renderHomeModules();
      renderSidebar();
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
      const done   = state.completedDays.includes(day.id);
      const locked = isDayLocked(mod.id, day.id);
      const card   = document.createElement('div');
      card.className = 'mod-day-card'
        + (done   ? ' completed' : '')
        + (locked ? ' locked'    : '')
        + (day.isTest ? ' is-test' : '');
      const label = day.isTest ? 'MODULE TEST' : `DAY ${idx + 1}`;
      const badge = done ? '✓' : (locked ? '🔒' : '');
      card.innerHTML = `
        <div class="mod-day-card-icon">${day.icon}</div>
        <div class="mod-day-card-title">${day.title}</div>
        <div class="mod-day-card-meta">${label}</div>
        ${badge ? `<div class="mod-day-card-badge">${badge}</div>` : ''}`;
      card.onclick = () => startLesson(mod.id, day.id);
      grid.appendChild(card);
    });

    body.appendChild(progWrap);
    body.appendChild(desc);
    body.appendChild(grid);
    entry.appendChild(hdr);
    entry.appendChild(body);
    container.appendChild(entry);
  });
}

export function updateStats() {
  const el = (id) => document.getElementById(id);
  if (!el('stat-days')) return;
  el('stat-days').textContent      = state.completedDays.filter(id => !id.endsWith('-T')).length;
  el('stat-questions').textContent = state.totalQuestions;
  const acc = state.totalQuestions > 0
    ? Math.round((state.totalCorrectAll / state.totalQuestions) * 100) + '%'
    : '—';
  el('stat-accuracy').textContent = acc;
}

export function renderSidebar() {
  const sb = document.getElementById('sidebar-inner');
  if(!sb) return;
  sb.innerHTML = `<div class="sidebar-title">MODULE_DIRECTORY</div>`;

  MODULES.forEach(mod => {
    const isExpanded = expandedMods.has(mod.id);
    const modDone = mod.days.filter(d => !d.isTest).every(d => state.completedDays.includes(d.id)) &&
                    mod.days.filter(d => d.isTest).every(d => state.completedDays.includes(d.id));

    const hdr = document.createElement('button');
    hdr.className = 'mod-section-hdr' + (isExpanded ? ' open' : '');
    hdr.innerHTML = `<span class="mod-icon">${mod.icon}</span>
      <span style="flex:1;font-size:12px;letter-spacing:1.5px;">MOD_${mod.id} — ${mod.title}</span>
      ${modDone ? '<span style="color:var(--ok);font-size:13px;">✓</span>' : ''}
      <span class="mod-arrow">▶</span>`;
    hdr.onclick = () => {
      expandedMods.has(mod.id) ? expandedMods.delete(mod.id) : expandedMods.add(mod.id);
      renderSidebar();
    };

    const daysWrap = document.createElement('div');
    daysWrap.className = 'mod-days' + (isExpanded ? ' open' : '');
    const inner = document.createElement('div');
    inner.className = 'mod-days-inner';

    mod.days.forEach((day, idx) => {
      const done   = state.completedDays.includes(day.id);
      const locked = isDayLocked(mod.id, day.id);
      const dayNum = day.isTest ? 'TEST' : `DAY_${idx + 1}`;
      const btn = document.createElement('button');
      btn.className = 'day-btn'
        + (done   ? ' completed' : '')
        + (day.isTest ? ' test-day' : '')
        + (locked ? ' locked'    : '');
      btn.innerHTML = `<div class="day-icon">${locked ? '🔒' : day.icon}</div>
        <div class="day-info">
          <div class="day-name">${dayNum}</div>
          <div class="day-meta">${day.title}</div>
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

function init() {
  Theme.init();
  Prefs.init();
  injectGlobals();
  checkStreak();
  restoreSidebarState();
  renderSidebar();
  renderHomeModules();
  updateStats();

  const streakEl = document.getElementById('streak-count');
  if (streakEl) streakEl.textContent = state.streak;

  const marquee = document.getElementById('topbar-marquee');
  if (marquee) {
    marquee.textContent =
      `MODULES: ${MODULES.length}  //  STREAK: ${state.streak}×  //  अभ्यासेन न किंचित् अशक्यम् — Nothing is impossible with practice`;
  }
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
