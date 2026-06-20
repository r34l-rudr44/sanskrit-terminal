import { MODULES } from '../data/index.js';

const _testIds = new Set(MODULES.flatMap(m => m.days.filter(d => d.isTest).map(d => d.id)));
const _totalNonTest = MODULES.reduce((acc, m) => acc + m.days.filter(d => !d.isTest).length, 0);

export const ACHIEVEMENTS = [
  { id: 'first_blood',   icon: '⚡', title: 'BOOT_SEQUENCE',    desc: 'Complete your first lesson',              check: (s)      => s.completedDays.length >= 1 },
  { id: 'perfect_score', icon: '🎯', title: 'PRECISION_STRIKE', desc: 'Score 100% on any lesson',               check: (s, ctx) => ctx.pct === 100 },
  { id: 'quick_learner', icon: '📡', title: 'SIGNAL_ACQUIRED',  desc: 'Complete 3 lessons',                     check: (s)      => s.completedDays.filter(id => !_testIds.has(id)).length >= 3 },
  { id: 'streak_3',      icon: '🔥', title: 'FLAME_PROTOCOL',   desc: '3-day streak achieved',                  check: (s)      => s.streak >= 3 },
  { id: 'streak_7',      icon: '💥', title: 'WEEK_COMPILE',     desc: '7-day streak achieved',                  check: (s)      => s.streak >= 7 },
  { id: 'century',       icon: '💯', title: 'CENTUM_ANSWERED',  desc: 'Answer 100 questions',                   check: (s)      => s.totalQuestions >= 100 },
  { id: 'accuracy_ace',  icon: '◈',  title: 'ACCURACY_DAEMON',  desc: '90%+ accuracy (50+ questions)',          check: (s)      => s.totalQuestions >= 50 && (s.totalCorrectAll / s.totalQuestions) >= 0.9 },
  { id: 'module_1',      icon: '🪔', title: 'TOOLKIT_UNLOCKED', desc: 'Complete Module 1',                      check: (s)      => s.completedModuleTests.includes(1) },
  { id: 'module_2',      icon: '📜', title: 'PRACTICE_MASTER',  desc: 'Complete Module 2',                      check: (s)      => s.completedModuleTests.includes(2) },
  { id: 'streak_30',     icon: '🏛️', title: 'PANINI_PROTOCOL',  desc: '30-day streak achieved',                 check: (s)      => s.streak >= 30 },
  { id: 'all_lessons',   icon: '⬡',  title: 'FULL_COMPILE',     desc: 'Complete all lessons',                   check: (s)      => s.completedDays.filter(id => !_testIds.has(id)).length >= _totalNonTest },
];

export function checkAndGrantAchievements(state, ctx = {}) {
  let earned;
  try { earned = JSON.parse(localStorage.getItem('sk_achievements') || '[]'); } catch { earned = []; }
  const newlyEarned = [];
  for (const ach of ACHIEVEMENTS) {
    if (!earned.includes(ach.id) && ach.check(state, ctx)) {
      earned.push(ach.id);
      newlyEarned.push(ach);
    }
  }
  if (newlyEarned.length > 0) localStorage.setItem('sk_achievements', JSON.stringify(earned));
  return newlyEarned;
}

export function showAchievementsModal() {
  let earned;
  try { earned = new Set(JSON.parse(localStorage.getItem('sk_achievements') || '[]')); } catch { earned = new Set(); }
  const questStreak = parseInt(localStorage.getItem('sk_quest_streak') || '0');

  const existing = document.getElementById('achievements-modal');
  if (existing) { existing.classList.add('open'); document.body.style.overflow = 'hidden'; return; }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'achievements-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-header-title">ACHIEVEMENTS</span>
        <button class="modal-close-btn" id="ach-modal-close-btn">✕</button>
      </div>
      <div class="modal-scrollable">
        <div class="ach-modal-grid">
          ${ACHIEVEMENTS.map(a => {
            const done = earned.has(a.id);
            return `<div class="ach-modal-item${done ? ' ach-modal-item--earned' : ''}">
              <span class="ach-modal-icon">${a.icon}</span>
              <div class="ach-modal-info">
                <div class="ach-modal-title">${a.title}</div>
                <div class="ach-modal-desc">${a.desc}</div>
              </div>
              ${done ? '<span class="ach-modal-check">✓</span>' : ''}
            </div>`;
          }).join('')}
        </div>
        <div class="ach-modal-footer">QUEST_STREAK: ${questStreak}</div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('#ach-modal-close-btn').addEventListener('click', () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  });
}

export function showAchievementToasts(achievements) {
  if (!achievements.length) return;
  achievements.forEach((ach, i) => {
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = 'achievement-toast';
      toast.innerHTML = `<span class="ach-toast-icon">${ach.icon}</span>
        <div class="ach-toast-body">
          <div class="ach-toast-label">ACHIEVEMENT_UNLOCKED</div>
          <div class="ach-toast-title">${ach.title}</div>
          <div class="ach-toast-desc">${ach.desc}</div>
        </div>`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('ach-toast-out');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }, i * 500);
  });
}
