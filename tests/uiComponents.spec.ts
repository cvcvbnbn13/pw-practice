import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGirdEmailInput = page
      .locator("nb-card", { hasText: "Using the grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGirdEmailInput.fill("test@test.com");
    // await usingTheGirdEmailInput.clear();
    // await usingTheGirdEmailInput.pressSequentially("test@test.com", {
    //   delay: 500,
    // });

    //generic assertion
    const inputValue = await usingTheGirdEmailInput.inputValue();
    expect(inputValue).toEqual("test@test.com");

    //locator assertion
    await expect(usingTheGirdEmailInput).toHaveValue("test@test.com");
  });

  test("radio buttons", async ({ page }) => {
    const usingTheGirdForm = page.locator("nb-card", {
      hasText: "Using the grid",
    });

    await usingTheGirdForm.getByLabel("Option 1").check({ force: true });

    await usingTheGirdForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    // return boolean
    const radioStatus = await usingTheGirdForm
      .getByRole("radio", { name: "Option 2" })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    await expect(usingTheGirdForm.getByLabel("Option 1")).not.toBeChecked();
  });

  // use check and uncheck
  test("checkboxes", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true });

    // all checkboxes
    const allCheckboxes = page.getByRole("checkbox");
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.uncheck({ force: true });
      expect(await checkbox.isChecked()).toBeFalsy();
    }
  });
});
