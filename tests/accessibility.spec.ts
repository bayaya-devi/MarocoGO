import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('marocogo.locale', 'fr'));
});

for (const route of ['./', './prepare', './explore', './profile']) {
  test(`no serious accessibility violation on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.addScriptTag({ content: axe.source });
    const results = await page.evaluate(async () => await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag22aa'] },
    }));
    const blocking = results.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious');
    expect(blocking, blocking.map((item) => `${item.id}: ${item.help} (${item.nodes.length})`).join('\n')).toEqual([]);
  });
}

declare global {
  interface Window { axe: typeof axe }
}
