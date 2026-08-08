import { test as base, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { CheckoutInformationPage } from "../pages/CheckoutInformationPage.js";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { NavigationMenuPage } from "../pages/NavigationMenuPage.js";
import { ProductDetailPage } from "../pages/ProductDetailPage.js";

/**
 * @typedef {object} PageFixtures
 * @property {LoginPage} loginPage
 * @property {InventoryPage} inventoryPage
 * @property {ProductDetailPage} productDetailPage
 * @property {CartPage} cartPage
 * @property {CheckoutInformationPage} checkoutInformationPage
 * @property {CheckoutOverviewPage} checkoutOverviewPage
 * @property {CheckoutCompletePage} checkoutCompletePage
 * @property {NavigationMenuPage} navigationMenuPage
 */

/**
 * @type {import("@playwright/test").TestType<
 *   import("@playwright/test").PlaywrightTestArgs &
 *   import("@playwright/test").PlaywrightTestOptions &
 *   PageFixtures,
 *   import("@playwright/test").PlaywrightWorkerArgs &
 *   import("@playwright/test").PlaywrightWorkerOptions
 * >}
 */
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  navigationMenuPage: async ({ page }, use) => {
    await use(new NavigationMenuPage(page));
  }
});

export { expect };
