import { MODULES } from '../data/index.js';

function safeInt(key) {
  const n = parseInt(localStorage.getItem(key) || '0', 10);
  return Number.isFinite(n) ? n : 0;
}

export const state = {
  currentModuleId: null,
  currentDayId:    null,
  currentQ:        0,
  totalAnswered:   0,
  totalCorrect:    0,
  answered:        false,
  matchState:      { selectedLeft:null, selectedRight:null, matched:[] },
  wtTiles:         [],
  wtTray:          [],
  completedDays:        (() => { try { return JSON.parse(localStorage.getItem('sk_completed_v2') || '[]'); } catch { return []; } })(),
  completedModuleTests: (() => { try { return JSON.parse(localStorage.getItem('sk_mod_tests') || '[]'); } catch { return []; } })(),
  streak:               safeInt('sk_streak'),
  totalQuestions:       safeInt('sk_total_q'),
  totalCorrectAll:      safeInt('sk_total_c'),
  lastDate:             localStorage.getItem('sk_last_date') || ''
};

export const expandedMods = new Set();

// Registry-derived id sets so "completed lessons" is counted identically everywhere.
const LESSON_KNOWN_IDS = new Set(MODULES.flatMap(m => m.days.map(d => d.id)));
const LESSON_TEST_IDS  = new Set(MODULES.flatMap(m => m.days.filter(d => d.isTest).map(d => d.id)));

// Completed non-test lessons that still exist in the registry (ignores stale/unknown ids).
export function completedLessonIds() {
  return state.completedDays.filter(id => LESSON_KNOWN_IDS.has(id) && !LESSON_TEST_IDS.has(id));
}
export function completedLessonCount() {
  return completedLessonIds().length;
}

export function checkStreak() {
  const today = new Date().toDateString();
  if (!state.lastDate) return 'new';
  if (state.lastDate === today) return 'current';
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastDate === yesterday) return 'at_risk';
  state.streak = 0;
  localStorage.setItem('sk_streak', '0');
  return 'broken';
}

// Single source of truth for extending the daily streak. Enforces day-to-day continuity so the
// streak resets on a missed day regardless of which page records the activity (home or a lesson
// reached directly). Idempotent within a day.
export function registerStreakDay() {
  const today = new Date().toDateString();
  if (state.lastDate === today) return state.streak; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  state.streak = state.lastDate === yesterday ? state.streak + 1 : 1;
  state.lastDate = today;
  localStorage.setItem('sk_streak', String(state.streak));
  localStorage.setItem('sk_last_date', today);
  return state.streak;
}

export function confirmClearCache() {
  ['sk_completed_v2','sk_mod_tests','sk_streak','sk_total_q','sk_total_c','sk_last_date',
   'sk_booted','sk_theme','sk_script','sk_sound','sk_sidebar','sk_cookie_ack',
   'sk_lesson_progress','sk_session_count','sk_last_session_score','sk_last_seen_date',
   'sk_achievements','sk_daily_quest','sk_quest_streak','sk_lesson_scores',
   'sk_notif_asked','sk_notif_granted','sk_notif_shown_date',
   'sk_review_items','sk_mobile_input_mode','sk_bar','sk_install_dismissed'
  ].forEach(k => localStorage.removeItem(k));
  window.location.href = '/';
}
