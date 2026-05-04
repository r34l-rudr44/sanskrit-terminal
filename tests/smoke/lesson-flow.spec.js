import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sk_booted', 'true');
    localStorage.setItem('sk_cookie_ack', 'true');
  });
});

test('home loads and a module can be expanded', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#screen-home')).toBeVisible();
  await expect(page.locator('.hero-title')).toContainText('WELCOME TO SANSKRIT');
  await expect(page.locator('.module-entry-title').first()).toContainText('FOUNDATIONS');

  const firstModuleHeader = page.locator('.module-entry').filter({ hasText: 'FOUNDATIONS' }).locator('.module-entry-hdr');
  await firstModuleHeader.click();

  await expect(page.locator('.module-body.open').first()).toBeVisible();
  await expect(page.locator('.module-days-grid .mod-day-card').first()).toBeVisible();
});

test('lesson renders, answers advance, and progress survives refresh', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-1');

  await page.getByRole('button', { name: /BEGIN LESSON/i }).click();
  await expect(page.locator('#screen-lesson')).toHaveClass(/active/);
  await expect(page.locator('#progress-count')).toHaveText(/1\/6/);

  await page.getByRole('button', { name: /Jala/i }).click();
  await expect(page.locator('#feedback-banner')).toHaveClass(/active/);
  await page.getByRole('button', { name: /CONTINUE/i }).click();

  await expect(page.locator('#progress-count')).toHaveText(/2\/6/);

  await page.reload();

  await expect(page.locator('#screen-lesson')).toHaveClass(/active/);
  await expect(page.locator('#progress-count')).toHaveText(/2\/6/);
  await expect(page.locator('.q-text')).toContainText('fire');
});

test('module test can be completed end-to-end', async ({ page }) => {
  await page.goto('/lesson.html?mod=1&day=1-T');

  await page.getByRole('button', { name: /BEGIN TEST/i }).click();
  await expect(page.locator('#screen-lesson')).toHaveClass(/active/);

  for (let i = 0; i < 8; i++) {
    await page.getByRole('button', { name: /SKIP/i }).click();
    await page.getByRole('button', { name: /CONTINUE/i }).click();
  }

  await expect(page.locator('#screen-cert')).toHaveClass(/active/);
  await expect(page.locator('#cert-module-id')).toHaveText('MODULE_1');
  await expect(page.locator('#cert-score-box')).not.toHaveText('—');
});
