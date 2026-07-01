import { test, expect } from '@playwright/test';

const ALL_DAYS_UNLOCKED = [
  '1-1','1-2','1-3','1-4','1-5',
  '2-1','2-2','2-3','2-P1','2-P2',
  '3-1','3-2','3-3','3-4','3-5',
  '4-1','4-2','4-3','4-4','4-5',
  '5-1','5-2',
];

const LESSONS = [
  // Module 1 — TOOLKIT
  { mod: 1, day: '1-1',  qCount: 7  },
  { mod: 1, day: '1-2',  qCount: 7  },
  { mod: 1, day: '1-3',  qCount: 8  },
  { mod: 1, day: '1-4',  qCount: 8  },
  { mod: 1, day: '1-5',  qCount: 7  },
  { mod: 1, day: '1-T',  qCount: 9,  isTest: true },
  // Module 2 — PRACTICE
  { mod: 2, day: '2-1',  qCount: 8  },
  { mod: 2, day: '2-2',  qCount: 7  },
  { mod: 2, day: '2-3',  qCount: 7  },
  { mod: 2, day: '2-P1', qCount: 8  },
  { mod: 2, day: '2-P2', qCount: 8  },
  { mod: 2, day: '2-T',  qCount: 9,  isTest: true },
  // Module 3 — FLOW
  { mod: 3, day: '3-1',  qCount: 7  },
  { mod: 3, day: '3-2',  qCount: 7  },
  { mod: 3, day: '3-3',  qCount: 8  },
  { mod: 3, day: '3-4',  qCount: 7  },
  { mod: 3, day: '3-5',  qCount: 7  },
  { mod: 3, day: '3-T',  qCount: 8,  isTest: true },
  // Module 4 — FORM
  { mod: 4, day: '4-1',  qCount: 7  },
  { mod: 4, day: '4-2',  qCount: 8  },
  { mod: 4, day: '4-3',  qCount: 8  },
  { mod: 4, day: '4-4',  qCount: 8  },
  { mod: 4, day: '4-5',  qCount: 8  },
  { mod: 4, day: '4-T',  qCount: 10, isTest: true },
  // Module 5 — RHYTHM
  { mod: 5, day: '5-1',  qCount: 7  },
  { mod: 5, day: '5-2',  qCount: 8  },
  { mod: 5, day: '5-T',  qCount: 8,  isTest: true },
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate((unlocked) => {
    localStorage.clear();
    localStorage.setItem('sk_booted', 'true');
    localStorage.setItem('sk_cookie_ack', 'true');
    localStorage.setItem('sk_completed_v2', JSON.stringify(unlocked));
  }, ALL_DAYS_UNLOCKED);
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
