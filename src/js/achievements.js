import { MODULES } from '../data/index.js';

const _testIds = new Set(MODULES.flatMap(m => m.days.filter(d => d.isTest).map(d => d.id)));
const _totalNonTest = MODULES.reduce((acc, m) => acc + m.days.filter(d => !d.isTest).length, 0);

const _nonTestDone = s => s.completedDays.filter(id => !_testIds.has(id)).length;

export const ACHIEVEMENTS = [
  {
    id: 'first_blood',    rarity: 'common',    icon: '⚡', title: 'BOOT_SEQUENCE',
    desc: 'Complete your first lesson',
    check: s      => s.completedDays.length >= 1,
    hint:  s      => `${s.completedDays.length} / 1 lesson`,
  },
  {
    id: 'quick_learner',  rarity: 'common',    icon: '📖', title: 'LESSONS_BEGUN',
    desc: 'Complete 3 lessons',
    check: s      => _nonTestDone(s) >= 3,
    hint:  s      => `${_nonTestDone(s)} / 3 lessons`,
  },
  {
    id: 'halfway',        rarity: 'common',    icon: '🌗', title: 'MIDPOINT_REACHED',
    desc: 'Complete half the curriculum',
    check: s      => _nonTestDone(s) >= 11,
    hint:  s      => `${_nonTestDone(s)} / 11 lessons`,
  },
  {
    id: 'perfect_score',  rarity: 'rare',      icon: '🎯', title: 'PRECISION_STRIKE',
    desc: 'Score 100% on any lesson',
    check: (s, ctx) => ctx.pct === 100,
    hint:  ()     => 'Score 100% on any lesson',
  },
  {
    id: 'streak_3',       rarity: 'common',    icon: '🔥', title: 'FLAME_PROTOCOL',
    desc: '3-day streak achieved',
    check: s      => s.streak >= 3,
    hint:  s      => `${s.streak} / 3 days`,
  },
  {
    id: 'streak_7',       rarity: 'rare',      icon: '💥', title: 'WEEK_COMPILE',
    desc: '7-day streak achieved',
    check: s      => s.streak >= 7,
    hint:  s      => `${s.streak} / 7 days`,
  },
  {
    id: 'quest_streak_7', rarity: 'rare',      icon: '⭐', title: 'QUEST_VETERAN',
    desc: 'Complete 7 daily quests',
    check: ()     => parseInt(localStorage.getItem('sk_quest_streak') || '0') >= 7,
    hint:  ()     => `${parseInt(localStorage.getItem('sk_quest_streak') || '0')} / 7 quests`,
  },
  {
    id: 'century',        rarity: 'rare',      icon: '💯', title: 'CENTUM_ANSWERED',
    desc: 'Answer 100 questions',
    check: s      => s.totalQuestions >= 100,
    hint:  s      => `${s.totalQuestions} / 100 answered`,
  },
  {
    id: 'questions_500',  rarity: 'rare',      icon: '📊', title: 'FIVE_HUNDRED_DEEP',
    desc: 'Answer 500 questions',
    check: s      => s.totalQuestions >= 500,
    hint:  s      => `${s.totalQuestions} / 500 answered`,
  },
  {
    id: 'questions_1000', rarity: 'legendary', icon: '🔮', title: 'KILO_QUERIES',
    desc: 'Answer 1000 questions',
    check: s      => s.totalQuestions >= 1000,
    hint:  s      => `${s.totalQuestions} / 1000 answered`,
  },
  {
    id: 'accuracy_ace',   rarity: 'rare',      icon: '◈',  title: 'ACCURACY_DAEMON',
    desc: '90%+ accuracy (50+ questions)',
    check: s      => s.totalQuestions >= 50 && (s.totalCorrectAll / s.totalQuestions) >= 0.9,
    hint:  s      => s.totalQuestions >= 50
                       ? `${Math.round((s.totalCorrectAll / s.totalQuestions) * 100)}% accuracy`
                       : `${s.totalQuestions} / 50 questions`,
  },
  {
    id: 'module_1',       rarity: 'common',    icon: '🪔', title: 'MODULE_1_CLEARED',
    desc: 'Complete Module 1',
    check: s      => s.completedModuleTests.includes(1),
    hint:  ()     => 'Pass the Module 1 test',
  },
  {
    id: 'module_2',       rarity: 'rare',      icon: '📜', title: 'MODULE_2_CLEARED',
    desc: 'Complete Module 2',
    check: s      => s.completedModuleTests.includes(2),
    hint:  ()     => 'Pass the Module 2 test',
  },
  {
    id: 'module_3',       rarity: 'rare',      icon: '🔱', title: 'SANDHI_CLEARED',
    desc: 'Complete Module 3',
    check: s      => s.completedModuleTests.includes(3),
    hint:  ()     => 'Pass the Module 3 test',
  },
  {
    id: 'module_4',       rarity: 'legendary', icon: '🕉️', title: 'VIBHAKTI_CLEARED',
    desc: 'Complete Module 4',
    check: s      => s.completedModuleTests.includes(4),
    hint:  ()     => 'Pass the Module 4 test',
  },
  {
    id: 'module_5',       rarity: 'legendary', icon: '🌺', title: 'SAMAPTI',
    desc: 'Complete Module 5',
    check: s      => s.completedModuleTests.includes(5),
    hint:  ()     => 'Pass the Module 5 test',
  },
  {
    id: 'streak_30',      rarity: 'legendary', icon: '🏛️', title: 'PANINI_PROTOCOL',
    desc: '30-day streak achieved',
    check: s      => s.streak >= 30,
    hint:  s      => `${s.streak} / 30 days`,
  },
  {
    id: 'all_lessons',    rarity: 'legendary', icon: '🎓', title: 'FULL_COMPILE',
    desc: 'Complete all lessons',
    check: s      => _nonTestDone(s) >= _totalNonTest,
    hint:  s      => `${_nonTestDone(s)} / ${_totalNonTest} lessons`,
  },
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

function _readHintState() {
  return {
    streak:               parseInt(localStorage.getItem('sk_streak') || '0'),
    totalQuestions:       parseInt(localStorage.getItem('sk_total_q') || '0'),
    totalCorrectAll:      parseInt(localStorage.getItem('sk_total_c') || '0'),
    completedDays:        (() => { try { return JSON.parse(localStorage.getItem('sk_completed_v2') || '[]'); } catch { return []; } })(),
    completedModuleTests: (() => { try { return JSON.parse(localStorage.getItem('sk_mod_tests') || '[]'); } catch { return []; } })(),
  };
}

function _achItemHTML(a, done, hintState) {
  const hintText = !done && a.hint ? a.hint(hintState) : null;
  return `<div class="ach-modal-item ach-modal-item--${a.rarity}${done ? ' ach-modal-item--earned' : ''}">
    <span class="ach-modal-icon">${a.icon}</span>
    <div class="ach-modal-info">
      <div class="ach-modal-title">${a.title}</div>
      <div class="ach-modal-desc">${a.desc}</div>
      ${hintText ? `<div class="ach-modal-hint">${hintText}</div>` : ''}
    </div>
    ${done ? '<span class="ach-modal-check">✓</span>' : ''}
  </div>`;
}

export function showAchievementsModal() {
  let earned;
  try { earned = new Set(JSON.parse(localStorage.getItem('sk_achievements') || '[]')); } catch { earned = new Set(); }
  const questStreak = parseInt(localStorage.getItem('sk_quest_streak') || '0');
  const hintState = _readHintState();

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
          ${ACHIEVEMENTS.map(a => _achItemHTML(a, earned.has(a.id), hintState)).join('')}
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
  overlay.addEventListener('click', e => {
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
