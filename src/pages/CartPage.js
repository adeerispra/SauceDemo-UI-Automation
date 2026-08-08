import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { pageTitles, routes } from "../data/index.js";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartItems = page.getByTestId("inventory-item");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async expectLoaded() {
    await this.expectUrl(routes.cart);
    await this.expectPageTitle(pageTitles.cart);
  }

  cartItem(product) {
    return this.cartItems.filter({ hasText: product.name });
  }

  removeButton(product) {
    return this.page.getByTestId(`remove-${product.dataTestSlug}`);
  }

  async expectItemVisible(product) {
    const item = this.cartItem(product);
    await expect(item).toBeVisible();
    await expect(item.getByTestId("inventory-item-name")).toHaveText(product.name);
    await expect(item.getByTestId("inventory-item-price")).toHaveText(`$${product.price.toFixed(2)}`);
  }

  async expectItemHidden(product) {
    await expect(this.cartItem(product)).toBeHidden();
  }

  async removeProduct(product) {
    await this.removeButton(product).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
