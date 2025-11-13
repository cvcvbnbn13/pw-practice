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

  test("list and dropdown", async ({ page }) => {
    const dropdownMeun = page.locator("ngx-header nb-select");
    await dropdownMeun.click();

    // when the list has ul element
    // page.getByRole("list");

    // when the list has li element
    // page.getByRole("listitem");

    //const otionList = page.getByRole('list').locator('nb-option');

    const optionList = page.locator("nb-option-list nb-option");
    await expect(optionList).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);

    await optionList.filter({ hasText: "Cosmic" }).click();
    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };

    await dropdownMeun.click();
    for (const color in colors) {
      await optionList.filter({ hasText: color }).click();
      await expect(header).toHaveCSS("background-color", colors[color]);
      if (color !== "Corporate") {
        await dropdownMeun.click();
      }
    }
  });

  test("tooltip", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();

    const tooltipCard = page.locator("nb-card", {
      hasText: "Tooltip Placement",
    });

    await tooltipCard.getByRole("button", { name: "Top" }).hover();
    const tooltipContent = await page.locator("nb-tooltip").textContent();
    expect(tooltipContent).toEqual("This is a tooltip");
  });

  test("dialog box", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });

    await page
      .getByRole("table")
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();
  });
});
