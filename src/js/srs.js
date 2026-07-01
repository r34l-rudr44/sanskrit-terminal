import { MODULES } from '../data/index.js';

const REVIEW_KEY = 'sk_review_items';
const DAY_MS = 86400000;

function epochDay(ts = Date.now()) {
  return Math.floor(ts / DAY_MS);
}

function loadItems() {
  try { return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}'); } catch { return {}; }
}

function saveItems(items) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(items));
}

export function makeReviewId(dayId, qIndex) {
  return `${dayId}::${qIndex}`;
}

// SM-2 with a binary correct/incorrect grade instead of the usual 0-5 scale.
export function recordReviewOutcome(reviewId, correct) {
  const items = loadItems();
  const item = items[reviewId] || { ef: 2.5, interval: 0, reps: 0, due: epochDay() };

  if (correct) {
    item.reps += 1;
    item.ef = Math.max(1.3, item.ef + 0.1);
    item.interval = item.reps === 1 ? 1 : item.reps === 2 ? 6 : Math.round(item.interval * item.ef);
  } else {
    item.reps = 0;
    item.ef = Math.max(1.3, item.ef - 0.2);
    item.interval = 1;
  }

  item.due = epochDay() + item.interval;
  item.lastReviewed = epochDay();
  items[reviewId] = item;
  saveItems(items);
  return item;
}

export function getDueReviewIds(limit = 10) {
  const items = loadItems();
  const currentDay = epochDay();
  return Object.entries(items)
    .filter(([, it]) => it.due <= currentDay)
    .sort((a, b) => a[1].due - b[1].due)
    .slice(0, limit)
    .map(([id]) => id);
}

export function getDueReviewCount() {
  const items = loadItems();
  const currentDay = epochDay();
  return Object.values(items).filter(it => it.due <= currentDay).length;
}

export function resolveReviewQuestion(reviewId) {
  const sepIdx = reviewId.lastIndexOf('::');
  if (sepIdx === -1) return null;
  const dayId = reviewId.slice(0, sepIdx);
  const qIndex = parseInt(reviewId.slice(sepIdx + 2), 10);

  for (const mod of MODULES) {
    const day = mod.days.find(d => d.id === dayId);
    if (day && day.questions[qIndex]) {
      return { modId: mod.id, day, question: day.questions[qIndex] };
    }
  }
  return null;
}
