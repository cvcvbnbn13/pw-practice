import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigaitionPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async formLayoutPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form Layouts").click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");

    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }
}
