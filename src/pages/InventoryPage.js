import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { pageTitles, routes } from "../data/index.js";

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    this.inventoryContainer = page.getByTestId("inventory-container");
    this.productCards = page.getByTestId("inventory-item");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async expectLoaded() {
    await this.expectUrl(routes.inventory);
    await this.expectPageTitle(pageTitles.products);
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.productCards).toHaveCount(6);
  }

  productCard(product) {
    return this.productCards.filter({ hasText: product.name });
  }

  productName(product) {
    return this.page.getByTestId("inventory-item-name").filter({ hasText: product.name });
  }

  productPrice(product) {
    return this.productCard(product).getByTestId("inventory-item-price");
  }

  addToCartButton(product) {
    return this.page.getByTestId(`add-to-cart-${product.dataTestSlug}`);
  }

  removeButton(product) {
    return this.page.getByTestId(`remove-${product.dataTestSlug}`);
  }

  async addProductToCart(product) {
    await this.addToCartButton(product).click();
  }

  async removeProductFromCart(product) {
    await this.removeButton(product).click();
  }

  async openProductDetail(product) {
    await this.productName(product).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(sortOption) {
    await this.sortDropdown.selectOption(sortOption.value);
  }

  async getProductNames() {
    return this.page.getByTestId("inventory-item-name").allTextContents();
  }

  async getProductPrices() {
    return this.page.getByTestId("inventory-item-price").allTextContents();
  }

  async expectCartBadgeCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toBeHidden();
  }
}
