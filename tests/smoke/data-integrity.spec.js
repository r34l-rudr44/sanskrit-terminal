import { test, expect } from '@playwright/test';

const LESSONS = [
  { mod: 1, day: '1-1', qCount: 7, title: 'Pronouns' },
  { mod: 1, day: '1-2', qCount: 7, title: 'Going' },
  { mod: 1, day: '1-3', qCount: 8, title: 'Where' },
  { mod: 1, day: '1-4', qCount: 8, title: 'No & Not' },
  { mod: 1, day: '1-T', qCount: 9, title: 'Final Test', isTest: true },
  { mod: 2, day: '2-1', qCount: 8, title: 'Places' },
  { mod: 2, day: '2-2', qCount: 7, title: 'Questions + Places' },
  { mod: 2, day: '2-3', qCount: 7, title: 'Negation' },
  { mod: 2, day: '2-T', qCount: 9, title: 'Final Test', isTest: true },
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sk_booted', 'true');
    localStorage.setItem('sk_cookie_ack', 'true');
    // Mark all days complete so locked lessons can be accessed
    localStorage.setItem('sk_completed_v2', JSON.stringify(['1-1','1-2','1-3','1-4','2-1','2-2','2-3']));
  });
});

for (const lesson of LESSONS) {
  test(`${lesson.day}: loads briefing without JS error`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(`/lesson.html?mod=${lesson.mod}&day=${lesson.day}`);
    await expect(page.locator('#screen-briefing')).toHaveClass(/active/);
    await expect(page.locator('.briefing-title')).toBeVisible();

    expect(errors, `JS errors on ${lesson.day}: ${errors.join(', ')}`).toHaveLength(0);
  });

  test(`${lesson.day}: shows correct question count after beginning`, async ({ page }) => {
    await page.goto(`/lesson.html?mod=${lesson.mod}&day=${lesson.day}`);

    const beginBtn = lesson.isTest
      ? page.getByRole('button', { name: /BEGIN TEST/i })
      : page.getByRole('button', { name: /BEGIN LESSON/i });
    await beginBtn.click();

    await expect(page.locator('#progress-count')).toHaveText(`1/${lesson.qCount}`);
  });
}
