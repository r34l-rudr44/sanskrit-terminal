import { test, expect } from '@playwright/test';

async function skipAll(page, count) {
  for (let i = 0; i < count; i++) {
    await page.getByRole('button', { name: /SKIP/i }).click();
    await expect(page.locator('#skip-confirm-overlay')).toHaveClass(/active/);
    await page.getByRole('button', { name: /YES, SKIP/i }).click();
    await page.getByRole('button', { name: /CONTINUE/i }).click();
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sk_booted', 'true');
    localStorage.setItem('sk_cookie_ack', 'true');
  });
});

// ── Achievements ──────────────────────────────────────────────────────────────

test('BOOT_SEQUENCE achievement unlocks after first lesson completion', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipAll(page, 7);
  await expect(page.locator('#screen-score')).toHaveClass(/active/);

  await page.goto('/progress.html');
  await expect(
    page.locator('#achievements-grid .ach-modal-item--earned').filter({ hasText: 'BOOT_SEQUENCE' })
  ).toBeVisible();
});

test('Achievement toast appears on score screen after first lesson', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipAll(page, 7);
  await expect(page.locator('#screen-score')).toHaveClass(/active/);

  await expect(page.locator('.achievement-toast')).toBeVisible();
});

// ── Review queue ──────────────────────────────────────────────────────────────

test('Review queue appears on home when a completed lesson has score below 80', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('sk_completed_v2', JSON.stringify(['1-1']));
    localStorage.setItem('sk_lesson_scores', JSON.stringify({ '1-1': 40 }));
    localStorage.setItem('sk_session_count', '1'); // review queue only renders after first session
  });

  await page.goto('/');

  await expect(page.locator('.review-widget')).toBeVisible();
  await expect(page.locator('.review-widget-title')).toContainText('REVIEW_QUEUE');
});

// ── Spaced-recall (SRS) review ──────────────────────────────────────────────

test('Completing a lesson question schedules it for spaced recall', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await page.locator('.option-btn').nth(0).click(); // "He — वह", the correct answer

  const item = await page.evaluate(() => JSON.parse(localStorage.getItem('sk_review_items') || '{}')['1-1::0']);
  expect(item).toBeTruthy();
  expect(item.reps).toBe(1);
  expect(item.due).toBeGreaterThan(0);
});

test('Spaced-recall widget surfaces a due item and answering it advances the schedule', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('sk_review_items', JSON.stringify({
      '1-1::0': { ef: 2.5, interval: 0, reps: 0, due: 0 }
    }));
    localStorage.setItem('sk_session_count', '1');
  });
  await page.goto('/');

  await expect(page.locator('.srs-widget')).toBeVisible();
  await expect(page.locator('.srs-widget .review-widget-title')).toContainText('SPACED_RECALL');

  await page.getByRole('button', { name: /START REVIEW/i }).click();
  await expect(page).toHaveURL(/review=1/);

  await page.locator('.option-btn').nth(0).click(); // "He — वह", the correct answer
  await page.getByRole('button', { name: /CONTINUE/i }).click();

  await expect(page.locator('#screen-score')).toHaveClass(/active/);
  await expect(page.locator('#score-title')).toContainText('REVIEW_SESSION');

  const item = await page.evaluate(() => JSON.parse(localStorage.getItem('sk_review_items'))['1-1::0']);
  expect(item.reps).toBe(1);
  expect(item.due).toBeGreaterThan(0);
});

test('Reviewing an item incorrectly resets its schedule to due tomorrow', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('sk_review_items', JSON.stringify({
      '1-1::0': { ef: 2.5, interval: 6, reps: 2, due: 0 }
    }));
    localStorage.setItem('sk_session_count', '1');
  });
  await page.goto('/lesson.html?review=1');

  await page.locator('.option-btn').nth(1).click(); // "She — वह (स्त्री.)", the wrong answer
  await page.getByRole('button', { name: /CONTINUE/i }).click();

  const item = await page.evaluate(() => JSON.parse(localStorage.getItem('sk_review_items'))['1-1::0']);
  expect(item.reps).toBe(0);
  expect(item.interval).toBe(1);
});
