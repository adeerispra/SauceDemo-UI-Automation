import { expect } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId("title");
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  async expectUrl(path) {
    await expect(this.page).toHaveURL(new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
  }

  async expectPageTitle(title) {
    await expect(this.pageTitle).toHaveText(title);
  }

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async expectHidden(locator) {
    await expect(locator).toBeHidden();
  }

  async expectText(locator, text) {
    await expect(locator).toHaveText(text);
  }

  async getVisibleText(locator) {
    await expect(locator).toBeVisible();
    return locator.textContent();
  }
}
