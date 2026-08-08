import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class NavigationMenuPage extends BasePage {
  constructor(page) {
    super(page);

    this.menuButton = page.locator("#react-burger-menu-btn");
    this.closeButton = page.locator("#react-burger-cross-btn");
    this.menuContainer = page.locator(".bm-menu-wrap");
    this.allItemsLink = page.getByTestId("inventory-sidebar-link");
    this.aboutLink = page.getByTestId("about-sidebar-link");
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.resetAppStateLink = page.getByTestId("reset-sidebar-link");
  }

  async open() {
    await this.menuButton.click();
    await expect(this.allItemsLink).toBeVisible();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.allItemsLink).toBeHidden();
  }

  async goToAllItems() {
    await this.open();
    await this.allItemsLink.click();
  }

  async openAbout() {
    await this.open();
    await this.aboutLink.click();
  }

  async logout() {
    await this.open();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.open();
    await this.resetAppStateLink.click();
    await this.close();
  }
}
