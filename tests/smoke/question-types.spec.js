import { test, expect } from '@playwright/test';

async function skipQuestions(page, count) {
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

// ── MCQ (lesson 1-1, Q0: "What is the Sanskrit word for 'water'?") ────────────

test('MCQ: correct answer shows correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  await page.getByRole('button', { name: /Jala/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('MCQ: wrong answer shows wrong feedback and reveals correct option', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  await page.getByRole('button', { name: /Agni/i }).click(); // wrong
  await expect(page.locator('#feedback-banner')).toHaveClass(/wrong-fb/);
  await expect(page.locator('.option-btn.correct')).toContainText('Jala');
});

test('MCQ: optionsDevanagari renders as secondary script text', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  const devSpans = page.locator('.option-btn .devanagari');
  await expect(devSpans).toHaveCount(4);
  await expect(devSpans.first()).not.toBeEmpty();
});

// ── Translation (lesson 1-1, Q2: "Ram goes to the forest") ───────────────────

test('Translation: correct ITRANS input is accepted', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 2); // skip Q0, Q1

  await expect(page.locator('.q-text')).toContainText('Ram goes to the forest');
  await page.locator('#active-input').fill('raamaH vanaM gacchati');
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('Translation: wrong input shows wrong feedback and correct answer', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 2);

  await page.locator('#active-input').fill('this is wrong');
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/wrong-fb/);
  await expect(page.locator('.fb-correct-ans')).toBeVisible();
});

// ── Fill (lesson 1-1, Q4: "'Sun' in Sanskrit is ______") ─────────────────────

test('Fill: Devanagari input is accepted', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 4); // skip Q0–Q3

  await expect(page.locator('.fill-sentence')).toContainText("Sun");
  await page.locator('#active-input').fill('सूर्य');
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('Fill: ITRANS transliteration input is accepted', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 4);

  await page.locator('#active-input').fill('sUrya'); // ITRANS for सूर्य
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

// ── WordTiles (lesson 1-1, Q5: "The boy drinks water") ───────────────────────

test('WordTiles: correct tile order gives correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 5); // skip Q0–Q4

  await expect(page.locator('.q-text')).toContainText('boy drinks water');
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'बालकः' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'जलं' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'पिबति' }).click();
  await page.locator('#wt-check-btn').click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('WordTiles: wrong tile order gives wrong feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 5);

  // Click in wrong order: verb first, then subject, then object
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'पिबति' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'बालकः' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'जलं' }).click();
  await page.locator('#wt-check-btn').click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/wrong-fb/);
});

// ── Match (lesson 1-2, Q3: "Match the numbers") ──────────────────────────────

test('Match: completing all pairs triggers correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-2');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 3); // skip Q0–Q2

  await expect(page.locator('.q-text')).toContainText('Match the numbers');
  for (let i = 0; i < 4; i++) {
    await page.locator(`#match-left .match-item[data-pair="${i}"]`).click();
    await page.locator(`#match-right .match-item[data-pair="${i}"]`).click();
  }
  await expect(page.locator('#feedback-banner')).toHaveClass(/active/);
});
