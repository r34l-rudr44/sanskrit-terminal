const QUESTS = [
  { id: 'q_lesson_today',   title: 'PROCESS_EXECUTE',  desc: 'Complete any lesson today',                      check: (ctx) => ctx.lessonCompleted },
  { id: 'q_perfect_lesson', title: 'ZERO_ERROR_MODE',  desc: 'Score 80% or higher on a lesson',               check: (ctx) => ctx.lessonCompleted && ctx.pct >= 80 },
  { id: 'q_ten_correct',    title: 'BATCH_PROCESS_10', desc: 'Answer 10+ questions correctly in one session',  check: (ctx) => ctx.sessionCorrect >= 10 },
  { id: 'q_no_skip',        title: 'SKIP_DISABLED',    desc: 'Complete a lesson without skipping any question', check: (ctx) => ctx.lessonCompleted && ctx.skipped === 0 },
  { id: 'q_streak_extend',  title: 'FLAME_EXTEND',     desc: 'Play a lesson today to extend your streak',     check: (ctx) => ctx.lessonCompleted },
];

export function getDailyQuest() {
  const today = new Date().toDateString();
  let saved;
  try { saved = JSON.parse(localStorage.getItem('sk_daily_quest') || 'null'); } catch { saved = null; }
  if (saved && saved.date === today) {
    return { quest: QUESTS.find(q => q.id === saved.questId) || QUESTS[0], data: saved };
  }
  const dateHash = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const quest = QUESTS[dateHash % QUESTS.length];
  const data = { date: today, questId: quest.id, completed: false };
  localStorage.setItem('sk_daily_quest', JSON.stringify(data));
  return { quest, data };
}

export function checkDailyQuest(ctx) {
  const today = new Date().toDateString();
  let data;
  try { data = JSON.parse(localStorage.getItem('sk_daily_quest') || 'null'); } catch { data = null; }
  if (!data || data.date !== today || data.completed) return null;
  const quest = QUESTS.find(q => q.id === data.questId);
  if (!quest || !quest.check(ctx)) return null;
  data.completed = true;
  localStorage.setItem('sk_daily_quest', JSON.stringify(data));
  const qs = parseInt(localStorage.getItem('sk_quest_streak') || '0') + 1;
  localStorage.setItem('sk_quest_streak', qs);
  return quest;
}
