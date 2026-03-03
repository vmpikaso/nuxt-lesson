import { test, expect } from "@playwright/test";

test("tasks list - affiche les tâches et navigation", async ({ page }) => {
  // Intercepter GET sur /api/crm/**/tasks pour retourner des tâches simulées
  await page.route("**/api/crm/**/tasks", async (route, request) => {
    if (request.method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: [
            { id: 1, title: "Task One", description: "", status: "open", client_id: 1, due_date: "" },
            { id: 2, title: "Task Two", description: "", status: "open", client_id: 1, due_date: "" },
          ],
        }),
      });
    } else {
      await route.continue();
    }
  });

  // Aller sur la page de listing des tâches
  await page.goto("http://localhost:3000/tasks");

  // Vérifier le titre et la présence des tâches
  await expect(page.getByRole("heading", { name: "Listes des tâches" })).toBeVisible();
  await expect(page.getByText("Task One")).toBeVisible();
  await expect(page.getByText("Task Two")).toBeVisible();

  // Cliquer sur la première tâche et vérifier la navigation vers /tasks/1
  await page.click('li:has-text("Task One")');
  await page.waitForURL("http://localhost:3000/tasks/1");

  // Revenir à la liste et cliquer sur 'Ajouter une tâche'
  await page.goto("http://localhost:3000/tasks");
  await page.click('button:has-text("Ajouter une tâche")');
  await page.waitForURL("http://localhost:3000/tasks/create");
});
