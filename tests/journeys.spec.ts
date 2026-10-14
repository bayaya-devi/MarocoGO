import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("marocogo.locale", "fr"));
});

test("home, carousel controls and main navigation are usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Maroc");
  await expect(page.locator(".hero-slide")).toHaveCount(3);
  await page.getByRole("button", { name: "Mettre en pause" }).click();
  await page.getByRole("link", { name: "Préparer", exact: true }).click();
  await expect(page).toHaveURL(/\/prepare$/);
  await expect(
    page.getByRole("heading", { name: "Préparer mon voyage" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("trip draft persists and summary supports manual ordering", async ({
  page,
}) => {
  await page.goto("./prepare", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Destination").selectOption("fes");
  await page.getByLabel("Voyageurs").fill("3");
  await page.getByRole("button", { name: "Activités" }).click();
  await page.getByRole("button", { name: /Fès/ }).click();
  await page.reload();
  await expect(page.getByLabel("Destination")).toHaveValue("fes");
  await expect(page.getByLabel("Voyageurs")).toHaveValue("3");
  await page.getByRole("button", { name: "Récapitulatif" }).click();
  await expect(page.getByText("Fès", { exact: true })).toBeVisible();
});

test("explore renders a real Leaflet map and place URL", async ({ page }) => {
  await page.goto("./explore", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".leaflet-container")).toBeVisible();
  await expect(page.locator(".leaflet-control-attribution")).toContainText(
    "OpenStreetMap",
  );
  await page.getByPlaceholder("Rechercher un lieu").fill("Fès");
  await page.locator(".place-results li button").first().click();
  await page.locator(".map-place-card a").click();
  await expect(page).toHaveURL(/\/place\/fes$/);
  await expect(page.getByRole("heading", { name: "Fès" })).toBeVisible();
});

test("Arabic switches the whole document to RTL without horizontal overflow", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  await page.locator(".language-control select").selectOption("ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(
    page.getByRole("link", { name: "خطّط", exact: true }),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBe(false);
});

test("profile is honest when authentication is unavailable", async ({
  page,
}) => {
  await page.goto("./profile", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Adresse e-mail").fill("test@example.com");
  await page.getByLabel("Mot de passe").fill("correct-horse-battery-staple");
  await page.getByRole("button", { name: "Se connecter", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("aucun serveur");
});

test("all five language preferences update the document direction", async ({
  page,
}) => {
  await page.goto("./", { waitUntil: "domcontentloaded" });
  for (const locale of ["en", "es", "pt", "ar", "fr"]) {
    await page.locator(".language-control select").selectOption(locale);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute(
      "dir",
      locale === "ar" ? "rtl" : "ltr",
    );
  }
});

test("journal exports a real PDF download", async ({ page }) => {
  await page.goto("./prepare", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Récapitulatif" }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Télécharger le PDF" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("marocogo-carnet.pdf");
});

test("provider workspace exposes only honest disconnected states", async ({
  page,
}) => {
  await page.goto("./provider", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByText("Données de démonstration clairement isolées"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Demandes" }).click();
  await expect(
    page.getByText("Aucune demande réelle à afficher."),
  ).toBeVisible();
});
