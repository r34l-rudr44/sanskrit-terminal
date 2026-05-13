import { test, expect } from '@playwright/test';

async function skipAll(page, count) {
  for (let i = 0; i < count; i++) {
    await page.getByRole('button', { name: /SKIP/i }).click();
    await expect(page.locator('#skip-confirm-overlay')).toHaveClass(/active/);
    await page.getByRole('button', { name: /YES, SKIP/i }).click();
    await page.getByRole('button', { name: /CONTINUE/i }).click();
  }
}

async function finishLesson(page, mod, day, qCount) {
  await page.goto(`/lesson.html?mod=${mod}&day=${day}`);
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipAll(page, qCount);
  await expect(page.locator('#screen-score')).toHaveClass(/active/);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sk_booted', 'true');
    localStorage.setItem('sk_cookie_ack', 'true');
  });
});

test('Completed day shows .completed class on home module card', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('sk_completed_v2', JSON.stringify(['1-1']));
  });
  await page.goto('/');

  // Expand Module 1
  const modHeader = page.locator('.module-entry').filter({ hasText: 'FOUNDATIONS' }).locator('.module-entry-hdr');
  await modHeader.click();
  await expect(page.locator('.module-body.open').first()).toBeVisible();

  await expect(page.locator('.mod-day-card.completed').first()).toBeVisible();
});

test('Home stats update after completing a lesson', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('sk_completed_v2', JSON.stringify(['1-1']));
    localStorage.setItem('sk_total_q', '6');
    localStorage.setItem('sk_total_c', '5');
  });
  await page.goto('/');

  await expect(page.locator('#stat-days')).toContainText('1');
});

test('Lesson progress is cleared after finishing, so next visit shows briefing', async ({ page }) => {
  await finishLesson(page, 1, '1-1', 6);

  // Navigate directly to same lesson
  await page.goto('/lesson.html?mod=1&day=1-1');
  await expect(page.locator('#screen-briefing')).toHaveClass(/active/);
});

test('In-progress lesson resumes at the saved question after reload', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  // Skip Q0 → now at Q1
  await page.getByRole('button', { name: /SKIP/i }).click();
  await page.getByRole('button', { name: /YES, SKIP/i }).click();
  await page.getByRole('button', { name: /CONTINUE/i }).click();
  await expect(page.locator('#progress-count')).toHaveText('2/6');

  await page.reload();

  await expect(page.locator('#screen-lesson')).toHaveClass(/active/);
  await expect(page.locator('#progress-count')).toHaveText('2/6');
});

test('completedDays is persisted to localStorage after finishing a lesson', async ({ page }) => {
  await finishLesson(page, 1, '1-1', 6);

  const completed = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('sk_completed_v2') || '[]');
  });
  expect(completed).toContain('1-1');
});

test('Streak increments when completing first lesson of the day', async ({ page }) => {
  const yesterday = await page.evaluate(() => {
    return new Date(Date.now() - 86400000).toDateString();
  });

  await page.evaluate((lastDate) => {
    localStorage.setItem('sk_streak', '3');
    localStorage.setItem('sk_last_date', lastDate);
  }, yesterday);

  await finishLesson(page, 1, '1-1', 6);

  const streak = await page.evaluate(() => parseInt(localStorage.getItem('sk_streak'), 10));
  expect(streak).toBe(4);
});
