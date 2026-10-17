import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('voyagego.locale.v1', 'fr'));
});

test('world globe selects honest country states and enters Morocco', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Le monde vous attend' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Globe interactif des pays VoyageGo' })).toBeVisible();
  for (const name of ['Tourner vers l’ouest', 'Tourner vers l’est', 'Agrandir le globe', 'Réduire le globe', 'Réinitialiser le globe']) {
    await expect(page.getByRole('button', { name })).toBeVisible();
  }

  await page.locator('.country-list button').filter({ hasText: 'France' }).click();
  await expect(page.getByText('Expérience en préparation').first()).toBeVisible();
  await expect(page.getByText('Aucun paysage national vérifié')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Entrer au Maroc' })).toHaveCount(0);

  await page.locator('.country-list button').filter({ hasText: 'Maroc' }).click();
  await expect(page.getByRole('link', { name: 'Entrer au Maroc' })).toBeVisible();
  await page.getByRole('link', { name: 'Entrer au Maroc' }).click();
  await expect(page).toHaveURL(/\/ma$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page).toHaveTitle('VoyageGo — Maroc');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  expect(errors).toEqual([]);
});

test('national capsule covers both homes, three hubs, search and account state', async ({ page }) => {
  await page.goto('./ma', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('navigation', { name: 'Navigation du pays' })).toBeVisible();
  for (const name of ['Explorer', 'Planifier', 'Découvrir']) {
    await expect(page.getByRole('link', { name, exact: true })).toBeVisible();
  }

  await page.getByRole('button', { name: 'Plus' }).click();
  await page.getByRole('button', { name: 'Recherche' }).click();
  await page.getByPlaceholder('Rechercher Fès, désert, patrimoine…').fill('Fès');
  await page.getByRole('link', { name: /Fès/ }).click();
  await expect(page).toHaveURL(/\/ma\/decouvrir\/lieux\/fes$/);

  await page.getByRole('link', { name: 'Accueil du pays' }).click();
  await expect(page).toHaveURL(/\/ma$/);
  await page.getByRole('button', { name: 'Plus' }).click();
  await page.getByRole('button', { name: 'Compte' }).click();
  await expect(page.getByRole('status')).toContainText('ne sont pas encore connectés');
  await page.getByRole('link', { name: 'Accueil mondial VoyageGo' }).click();
  await expect(page).toHaveURL(/\/MarocoGO\/?$/);
});

test('explorer renders the real map and destination route', async ({ page }) => {
  await page.goto('./ma/explorer', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.leaflet-container')).toBeVisible();
  await expect(page.locator('.leaflet-control-attribution')).toContainText('OpenStreetMap');
  await page.getByRole('textbox', { name: 'Rechercher une destination' }).fill('Fès');
  await page.locator('.destination-list button').filter({ hasText: 'Fès' }).click();
  await page.locator('.map-detail-link').click();
  await expect(page).toHaveURL(/\/ma\/decouvrir\/lieux\/fes$/);
});

test('planning draft persists locally without a booking claim', async ({ page }) => {
  await page.goto('./ma/planifier', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Destination').selectOption('fes');
  await page.getByLabel('Voyageurs').fill('3');
  await page.getByLabel('Transport').fill('Train puis taxi local');
  await page.getByLabel('Budget indicatif').fill('8 000 MAD');
  await page.reload();
  await expect(page.getByLabel('Destination')).toHaveValue('fes');
  await expect(page.getByLabel('Voyageurs')).toHaveValue('3');
  await expect(page.getByLabel('Transport')).toHaveValue('Train puis taxi local');
  await expect(page.getByText('Brouillon enregistré localement')).toBeVisible();
  await expect(page.getByRole('button', { name: /payer|réserver/i })).toHaveCount(0);
});

test('Arabic applies RTL without horizontal overflow', async ({ page }) => {
  await page.goto('./ma', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Plus' }).click();
  await page.getByRole('combobox', { name: 'Langue' }).selectOption('ar');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('link', { name: 'خطط', exact: true })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
});

test('VoyageGo Info exposes institutional links', async ({ page }) => {
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'VoyageGo Info' }).click();
  await expect(page.getByRole('dialog', { name: 'Informations VoyageGo' })).toBeVisible();
  await page.getByRole('link', { name: 'Mentions légales' }).click();
  await expect(page).toHaveURL(/\/info\/legal$/);
  await expect(page.getByRole('heading', { name: 'Mentions légales' })).toBeVisible();
});

test('retired legacy routes are no longer active', async ({ page }) => {
  for (const route of ['./prepare', './explore', './profile', './provider']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Cette page n’existe pas.' })).toBeVisible();
  }
});

test('reduced motion preference disables decorative movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  const motion = await page.locator('.globe-sphere').evaluate((element) => {
    const styles = getComputedStyle(element);
    return { animation: styles.animationName, transition: styles.transitionDuration };
  });
  expect(motion.animation).toBe('none');
  expect(motion.transition).toBe('0s');
});
