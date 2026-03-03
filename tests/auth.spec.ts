import { test, expect } from "@playwright/test";

test("login/auth - should store token and redirect to /", async ({ page }) => {
  // Intercepter l'appel d'API de login et retourner une réponse simulée
  await page.route("**/api/crm/v019c2326dd69/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: { username: "testuser", email: "test@example.com" },
        token: "fake-token",
      }),
    });
  });

  // Aller sur la page de login
  await page.goto("http://localhost:3000/login");

  // Remplir le formulaire et soumettre
  await page.fill('input[name="username"]', "johndoe");
  await page.fill('input[name="password"]', "secret123");
  await page.click('input[type="submit"]');

  // Attendre la redirection vers la racine
  await page.waitForURL("http://localhost:3000");

  // Vérifier que le token a été stocké dans localStorage
  const stored = await page.evaluate(() => localStorage.getItem("auth.token"));
  expect(stored).toBe("fake-token");
});
