import { Page, expect } from "@playwright/test";
import { NavigaitionPage } from "../page-object/navigationPage";
import { FormLayoutsPage } from "../page-object/formLayoutsPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigaitionPage;
  private readonly formLayoutsPage: FormLayoutsPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigaitionPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }
}
