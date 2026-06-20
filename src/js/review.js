import { state } from './state.js';
import { MODULES } from '../data/index.js';
import { escapeHtml } from './utils.js';

export function renderReviewQueue(streakStatus) {
  // Intentional: streak-at-risk warning takes priority; showing both would split the user's attention away from the urgent CTA.
  if (streakStatus === 'at_risk' && state.streak >= 2) return;

  const container = document.getElementById('home-widgets');
  if (!container) return;

  const scores = JSON.parse(localStorage.getItem('sk_lesson_scores') || '{}');

  const candidates = [];
  for (const mod of MODULES) {
    for (const day of mod.days) {
      if (day.isTest) continue;
      if (!state.completedDays.includes(day.id)) continue;
      const score = scores[day.id];
      if (score === undefined || score >= 80) continue;
      candidates.push({ modId: mod.id, day, score });
    }
  }

  if (candidates.length === 0) return;

  candidates.sort((a, b) => a.score - b.score);
  const top = candidates.slice(0, 3);

  const widget = document.createElement('div');
  widget.className = 'review-widget';
  widget.innerHTML = `
    <div class="review-widget-hdr">
      <span class="review-widget-title">REVIEW_QUEUE</span>
      <span class="review-widget-sub">// ${top.length} lesson${top.length !== 1 ? 's' : ''} need reinforcement</span>
    </div>
    <div class="review-widget-list">
      ${top.map(({ modId, day, score }) => `
        <div class="review-item">
          <span class="review-item-icon">${day.icon || '📖'}</span>
          <div class="review-item-body">
            <div class="review-item-title">${escapeHtml(day.title)}</div>
            <div class="review-item-score">SCORE: ${score}%</div>
          </div>
          <button class="review-item-btn btn-primary" onclick="window.startLesson(${modId},'${day.id}')">► RETRY</button>
        </div>
      `).join('')}
    </div>
  `;
  container.appendChild(widget);
}
