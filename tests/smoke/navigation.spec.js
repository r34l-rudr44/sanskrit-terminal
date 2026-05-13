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

// ── Briefing screen ───────────────────────────────────────────────────────────

test('Briefing screen is active on lesson load', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');

  await expect(page.locator('#screen-briefing')).toHaveClass(/active/);
  await expect(page.getByRole('button', { name: /BEGIN LESSON/i })).toBeVisible();
});

test('Briefing shows the lesson title and content', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');

  await expect(page.locator('.briefing-title')).toContainText('Basic Sanskrit Vocabulary');
  await expect(page.locator('.brief-table')).toBeVisible();
});

test('Briefing EXIT button navigates back to home', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await expect(page.locator('#screen-briefing')).toHaveClass(/active/);

  await page.getByRole('button', { name: /EXIT/i }).click();
  await expect(page).toHaveURL('/');
});

// ── Score screen (lesson 1-1, 6 questions) ────────────────────────────────────

test('Score screen appears after completing a regular lesson', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipAll(page, 6);

  await expect(page.locator('#screen-score')).toHaveClass(/active/);
});

test('Score screen shows a percentage in score-big', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipAll(page, 6);

  await expect(page.locator('#score-big')).toContainText('%');
});

// ── Certificate screen (lesson 1-T, 8 questions) ─────────────────────────────

test('Certificate screen appears after completing a module test', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-T');
  await page.getByRole('button', { name: /BEGIN TEST/i }).click();
  await skipAll(page, 8);

  await expect(page.locator('#screen-cert')).toHaveClass(/active/);
  await expect(page.locator('#cert-module-id')).toHaveText('MODULE_1');
});

// ── Retry flow ────────────────────────────────────────────────────────────────

test('Retry from score screen restarts lesson from Q1', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipAll(page, 6);

  await expect(page.locator('#screen-score')).toHaveClass(/active/);
  await page.getByRole('button', { name: /RETRY/i }).click();

  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await expect(page.locator('#progress-count')).toHaveText('1/6');
});
