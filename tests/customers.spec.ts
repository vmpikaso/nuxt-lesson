import { test, expect } from "@playwright/test";

test("clients list - affiche les clients et ajoute un client", async ({ page }) => {
  let created = false;

  // Intercepter GET/POST sur /api/crm/**/clients pour simuler le backend
  await page.route("**/api/crm/**/clients", async (route, request) => {
    const method = request.method();
    if (method === "GET") {
      if (!created) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: [
              { id: 1, name: "Acme Corp", email: "a@acme.com", phone: "", company: "Acme" },
              { id: 2, name: "Beta LLC", email: "b@beta.com", phone: "", company: "Beta" },
            ],
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: [
              { id: 1, name: "Acme Corp", email: "a@acme.com", phone: "", company: "Acme" },
              { id: 2, name: "Beta LLC", email: "b@beta.com", phone: "", company: "Beta" },
              { id: 3, name: "NewCo", email: "new@newco.com", phone: "", company: "NewCo" },
            ],
          }),
        });
      }
    } else if (method === "POST") {
      // Simuler création de client
      created = true;
      await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({}) });
    } else {
      await route.continue();
    }
  });

  // Aller sur la page de listing clients
  await page.goto("http://localhost:3000/customers");

  // Vérifier que les clients initiaux sont affichés
  await expect(page.getByRole("heading", { name: "Liste des clients" })).toBeVisible();
  await expect(page.getByText("Acme Corp")).toBeVisible();
  await expect(page.getByText("Beta LLC")).toBeVisible();

  // Cliquer sur le bouton pour ajouter un client
  await page.click('button:has-text("Ajouter un client")');

  // Attendre que la nouvelle entrée apparaisse après le fetch
  await expect(page.getByText("NewCo")).toBeVisible();
});
