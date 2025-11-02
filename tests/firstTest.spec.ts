import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.skip("Locator syntax rules", async ({ page }) => {
  //by tag name
  page.locator("input");

  //by ID
  page.locator("#inputEmail");

  //by class value
  page.locator(".shape-rectangle");

  //by attribute
  page.locator('[placeholder="Email"]');

  //by Class value (full)
  page.locator('[class="shape-rectangle"]');

  //combine different selectors (no spaces)
  page.locator("input[placeholder='Email']");

  //by XPath (not commands)
  page.locator("//*[@id='inputEmail']");

  //by partial text (:)
  page.locator(":text('Using')");

  //by exact text
  page.locator(':text-is("Using the Grid")');
});

test("user facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Using the Grid").click();

  await page.getByTitle("IoT Dashboard").click();

  await page.getByTestId("SignIn").click();
});
