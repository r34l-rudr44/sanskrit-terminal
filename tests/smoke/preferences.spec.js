import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sk_booted', 'true');
    localStorage.setItem('sk_cookie_ack', 'true');
  });
  await page.goto('/');
});

async function openPrefs(page) {
  await page.locator('.prefs-btn').click();
  await expect(page.locator('#prefs-modal')).toHaveClass(/open/);
}

// ── Theme ─────────────────────────────────────────────────────────────────────

test('Theme: switching to light applies data-theme=light', async ({ page }) => {
  await openPrefs(page);
  await page.locator('#theme-light').click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Theme: light preference persists across page reload', async ({ page }) => {
  await openPrefs(page);
  await page.locator('#theme-light').click();
  await page.reload();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

// ── Font size ─────────────────────────────────────────────────────────────────

test('Font size: selecting large saves sk_fs=lg to localStorage', async ({ page }) => {
  await openPrefs(page);
  await page.locator('#fs-lg').click();

  const fs = await page.evaluate(() => localStorage.getItem('sk_fs'));
  expect(fs).toBe('lg');
});

test('Font size: preference persists across reload', async ({ page }) => {
  await openPrefs(page);
  await page.locator('#fs-lg').click();
  await page.reload();

  const fs = await page.evaluate(() => localStorage.getItem('sk_fs'));
  expect(fs).toBe('lg');
});

// ── Script selection ──────────────────────────────────────────────────────────

test('Script: selecting IAST saves sk_script=iast and marks button active', async ({ page }) => {
  await openPrefs(page);
  await page.locator('#script-iast').click();

  const script = await page.evaluate(() => localStorage.getItem('sk_script'));
  expect(script).toBe('iast');
  await expect(page.locator('#script-iast')).toHaveClass(/active/);
});

// ── Sound ─────────────────────────────────────────────────────────────────────

test('Sound: toggle mutes audio and persists across reload', async ({ page }) => {
  await page.locator('#sound-toggle-btn').click();

  const muted = await page.evaluate(() => localStorage.getItem('sk_sound'));
  expect(muted).toBe('muted');

  await page.reload();
  await expect(page.locator('#sound-toggle-btn')).toHaveText('🔇');
});

// ── Delete data ───────────────────────────────────────────────────────────────

test('Delete data: typing DELETE and confirming clears all progress', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('sk_completed_v2', JSON.stringify(['1-1']));
    localStorage.setItem('sk_streak', '5');
  });

  await openPrefs(page);
  await page.locator('.btn-danger').click(); // "🗑 DELETE" button

  await expect(page.locator('#delete-overlay')).toHaveClass(/active/);
  await page.locator('#delete-type-input').fill('DELETE');
  await page.locator('#delete-enter-btn').click();

  const completed = await page.evaluate(() => localStorage.getItem('sk_completed_v2'));
  expect(completed === null || completed === '[]').toBeTruthy();
});
