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

// ── MCQ (lesson 1-1, Q0: "What does सः mean?") ───────────────────────────────

test('MCQ: correct answer shows correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  await page.getByRole('button', { name: /He — वह/ }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('MCQ: wrong answer shows wrong feedback and reveals correct option', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  await page.getByRole('button', { name: /She — वह/ }).click(); // wrong
  await expect(page.locator('#feedback-banner')).toHaveClass(/wrong-fb/);
  await expect(page.locator('.option-btn.correct')).toContainText('He — वह');
});

test('MCQ: renders four option buttons', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();

  await expect(page.locator('.option-btn')).toHaveCount(4);
});

// ── Translation (lesson 2-2, Q6: "Type: 'Where does he go?'") ────────────────

test('Translation: correct ITRANS input is accepted', async ({ page }) => {
  await page.goto('/lesson.html?mod=2&day=2-2');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 6); // skip Q0–Q5

  await expect(page.locator('.q-text')).toContainText('Where does he go');
  await page.locator('#active-input').fill('saH kutra gacchati');
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('Translation: wrong input shows wrong feedback and correct answer', async ({ page }) => {
  await page.goto('/lesson.html?mod=2&day=2-2');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 6);

  await page.locator('#active-input').fill('this is wrong');
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/wrong-fb/);
  await expect(page.locator('.fb-correct-ans')).toBeVisible();
});

// ── Fill (lesson 1-4, Q4: "Negate: त्वं सर्वत्र ___ गच्छसि") ────────────────

test('Fill: Devanagari input is accepted', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-4');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 4); // skip Q0–Q3

  await expect(page.locator('.fill-sentence')).toContainText('सर्वत्र');
  await page.locator('#active-input').fill('न');
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('Fill: ITRANS transliteration input is accepted', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-4');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 4);

  await page.locator('#active-input').fill('na'); // ITRANS for न
  await page.getByRole('button', { name: /SUBMIT/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

// ── WordTiles (lesson 1-4, Q5: "Build: 'I do not go there'") ─────────────────

test('WordTiles: correct tile order gives correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-4');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 5); // skip Q0–Q4

  await expect(page.locator('.q-text')).toContainText('I do not go there');
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'अहं' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'तत्र' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'न' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'गच्छामि' }).click();
  await page.locator('#wt-check-btn').click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('WordTiles: any word order with correct words gives correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-4');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 5);

  // Click in a different order — Sanskrit word order is free
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'गच्छामि' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'न' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'तत्र' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'अहं' }).click();
  await page.locator('#wt-check-btn').click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/correct-fb/);
});

test('WordTiles: wrong words (distractor used) gives wrong feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-4');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 5);

  // Use distractor गच्छसि instead of correct गच्छामि
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'अहं' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'तत्र' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'न' }).click();
  await page.locator('#wt-bank .wt-tile').filter({ hasText: 'गच्छसि' }).click();
  await page.locator('#wt-check-btn').click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/wrong-fb/);
});

// ── Match (lesson 1-2, Q3: "Match the pronoun to the correct verb form") ──────

test('Match: completing all pairs triggers correct feedback', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-2');
  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await skipQuestions(page, 3); // skip Q0–Q2

  await expect(page.locator('.q-text')).toContainText('Match the pronoun');
  for (let i = 0; i < 3; i++) {
    await page.locator(`#match-left .match-item[data-pair="${i}"]`).click();
    await page.locator(`#match-right .match-item[data-pair="${i}"]`).click();
  }
  await expect(page.locator('#feedback-banner')).toHaveClass(/active/);
});
