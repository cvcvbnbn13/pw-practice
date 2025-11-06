import { expect, test } from "@playwright/test";

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

test("locating children", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  //not command
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .first()
    .click();

  await page
    .locator("nb-card", { has: page.locator("#inputEmail") })
    .getByRole("textbox", { name: "Email" })
    .first()
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .getByRole("textbox", { name: "Email" })
    .first()
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Email" })
    .first()
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign In" })
    .getByRole("textbox", { name: "Email" })
    .first()
    .click();
});

test("reusing locator", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  const emailFeild = basicForm.getByRole("textbox", { name: "Email" });

  await emailFeild.fill("test@test.com");

  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");

  await basicForm.locator("nb-checkbox").click();

  await basicForm.getByRole("button").click();

  await expect(emailFeild).toHaveValue("test@test.com");
});

test("extracting value", async ({ page }) => {
  // single text value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });

  const buttonText = await basicForm.locator("button").textContent();

  expect(buttonText).toBe("Submit");

  //all text values
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();
  expect(allRadioButtonsLabels).toContain("Option 1");

  //input value
  const emailFeild = basicForm.getByRole("textbox", { name: "Email" });
  await emailFeild.fill("test@test.com");
  const emailValue = await emailFeild.inputValue();

  expect(emailValue).toBe("test@test.com");

  //attribute value
  const placeholderValue = await emailFeild.getAttribute("placeholder");

  expect(placeholderValue).toBe("Email");
});

test("assertions", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .locator("button");
  //general assertions
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  //locator assertions
  await expect(basicFormButton).toHaveText("Submit");

  //soft assertions (test can be continue even if assertion fails)
  await expect.soft(basicFormButton).toHaveText("Submit12");
  await basicFormButton.click();
});
