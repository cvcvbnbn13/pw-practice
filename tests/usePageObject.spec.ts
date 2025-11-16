import { test, expect } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutPage();

  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("parameterized test example", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "password",
      "Option 1"
    );
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEamilAndCheckbox("Fatty", "test@test.com", true);
});
