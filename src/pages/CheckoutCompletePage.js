import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { orderMessages, pageTitles, routes } from "../data/index.js";

export class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);

    this.completeHeader = page.getByTestId("complete-header");
    this.completeText = page.getByTestId("complete-text");
    this.successImage = page.getByTestId("pony-express");
    this.backHomeButton = page.getByTestId("back-to-products");
  }

  async expectLoaded() {
    await this.expectUrl(routes.checkoutComplete);
    await this.expectPageTitle(pageTitles.checkoutComplete);
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText(orderMessages.completeHeader);
    await expect(this.completeText).toHaveText(orderMessages.completeText);
    await expect(this.successImage).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}
