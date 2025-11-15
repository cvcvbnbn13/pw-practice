import { test, expect } from "@playwright/test";
import { NavigaitionPage } from "../page-object/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("navigate to form page", async ({ page }) => {
  const navigationPage = new NavigaitionPage(page);
  await navigationPage.formLayoutPage();
});
