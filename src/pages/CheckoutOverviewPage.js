import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { checkoutInfo, pageTitles, routes } from "../data/index.js";
import { calculateExpectedCheckoutTotals } from "../utils/price.utils.js";

export class CheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);

    this.overviewItems = page.getByTestId("inventory-item");
    this.paymentInfo = page.getByTestId("payment-info-value");
    this.shippingInfo = page.getByTestId("shipping-info-value");
    this.itemTotal = page.getByTestId("subtotal-label");
    this.tax = page.getByTestId("tax-label");
    this.total = page.getByTestId("total-label");
    this.cancelButton = page.getByTestId("cancel");
    this.finishButton = page.getByTestId("finish");
  }

  async expectLoaded() {
    await this.expectUrl(routes.checkoutOverview);
    await this.expectPageTitle(pageTitles.checkoutOverview);
  }

  overviewItem(product) {
    return this.overviewItems.filter({ hasText: product.name });
  }

  async expectItemVisible(product) {
    const item = this.overviewItem(product);
    await expect(item).toBeVisible();
    await expect(item.getByTestId("inventory-item-name")).toHaveText(product.name);
    await expect(item.getByTestId("inventory-item-price")).toHaveText(`$${product.price.toFixed(2)}`);
  }

  async expectPaymentAndShipping() {
    await expect(this.paymentInfo).toHaveText(checkoutInfo.payment);
    await expect(this.shippingInfo).toHaveText(checkoutInfo.shipping);
  }

  async expectTotalsForProducts(products) {
    const totals = calculateExpectedCheckoutTotals(products);

    await expect(this.itemTotal).toHaveText(totals.itemTotalText);
    await expect(this.tax).toHaveText(totals.taxText);
    await expect(this.total).toHaveText(totals.totalText);
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
