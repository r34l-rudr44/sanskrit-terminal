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
  streak:               parseInt(localStorage.getItem('sk_streak') || '0'),
  totalQuestions:       parseInt(localStorage.getItem('sk_total_q') || '0'),
  totalCorrectAll:      parseInt(localStorage.getItem('sk_total_c') || '0'),
  lastDate:             localStorage.getItem('sk_last_date') || ''
};

export const expandedMods = new Set();

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

export function confirmClearCache() {
  ['sk_completed_v2','sk_mod_tests','sk_streak','sk_total_q','sk_total_c','sk_last_date',
   'sk_booted','sk_theme','sk_script','sk_sound','sk_sidebar','sk_cookie_ack',
   'sk_lesson_progress','sk_session_count','sk_last_session_score','sk_last_seen_date',
   'sk_achievements','sk_daily_quest','sk_quest_streak','sk_lesson_scores',
   'sk_notif_asked','sk_notif_granted','sk_notif_shown_date','sk_ach_open'
  ].forEach(k => localStorage.removeItem(k));
  window.location.href = '/';
}
