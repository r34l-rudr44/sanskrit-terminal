import { injectGlobals } from './components.js';
import { ACHIEVEMENTS } from './achievements.js';
import { getDailyQuest } from './quests.js';

injectGlobals();

const completed = (() => { try { return JSON.parse(localStorage.getItem('sk_completed_v2') || '[]'); } catch { return []; } })();
const totalQ = parseInt(localStorage.getItem('sk_total_q') || '0');
const totalC = parseInt(localStorage.getItem('sk_total_c') || '0');
const questStreak = parseInt(localStorage.getItem('sk_quest_streak') || '0');
const earned = (() => { try { return new Set(JSON.parse(localStorage.getItem('sk_achievements') || '[]')); } catch { return new Set(); } })();

const hintState = {
  streak:               parseInt(localStorage.getItem('sk_streak') || '0'),
  totalQuestions:       totalQ,
  totalCorrectAll:      totalC,
  completedDays:        completed,
  completedModuleTests: (() => { try { return JSON.parse(localStorage.getItem('sk_mod_tests') || '[]'); } catch { return []; } })(),
};

// Stats
const statDays = document.getElementById('stat-days');
const statQ = document.getElementById('stat-questions');
const statAcc = document.getElementById('stat-accuracy');
const statQS = document.getElementById('stat-quest-streak');

if (completed.length > 0) {
  statDays.closest('.stat-card').classList.remove('stat-card--empty');
  statDays.textContent = completed.length;
}
if (totalQ > 0) {
  statQ.closest('.stat-card').classList.remove('stat-card--empty');
  statQ.textContent = totalQ;
  statAcc.closest('.stat-card').classList.remove('stat-card--empty');
  statAcc.textContent = Math.round((totalC / totalQ) * 100) + '%';
}
if (questStreak > 0) {
  statQS.closest('.stat-card').classList.remove('stat-card--empty');
  statQS.textContent = questStreak;
}

// Daily quest
const { quest, data } = getDailyQuest();
const questSection = document.getElementById('quest-section');
const isDone = data.completed;
questSection.innerHTML = `
  <div class="quest-card${isDone ? ' quest-card--done' : ''}">
    <div class="quest-card-id">QUEST_ID: ${quest.id.toUpperCase()}</div>
    <div class="quest-card-title">${quest.title}</div>
    <div class="quest-card-desc">> ${quest.desc}</div>
    <div class="quest-card-status ${isDone ? 'quest-card-status--done' : 'quest-card-status--pending'}">
      ${isDone ? '✓ COMPLETE' : '○ PENDING — complete a lesson to unlock'}
    </div>
  </div>`;

// Achievements grid
const achCount = document.getElementById('ach-count');
achCount.textContent = `${earned.size} / ${ACHIEVEMENTS.length} UNLOCKED`;

const achGrid = document.getElementById('achievements-grid');
achGrid.innerHTML = ACHIEVEMENTS.map(a => {
  const done = earned.has(a.id);
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
}).join('');
