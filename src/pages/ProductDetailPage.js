import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);

    this.backToProductsButton = page.getByTestId("back-to-products");
    this.productName = page.getByTestId("inventory-item-name");
    this.productDescription = page.getByTestId("inventory-item-desc");
    this.productPrice = page.getByTestId("inventory-item-price");
    this.productImage = page.locator(".inventory_details_img");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.detailAddToCartButton = page.getByTestId("add-to-cart");
    this.detailRemoveButton = page.getByTestId("remove");
  }

  addToCartButton() {
    return this.detailAddToCartButton;
  }

  removeButton() {
    return this.detailRemoveButton;
  }

  async expectProduct(product) {
    await expect(this.productName).toHaveText(product.name);
    await expect(this.productDescription).toContainText(product.description);
    await expect(this.productPrice).toHaveText(`$${product.price.toFixed(2)}`);
  }

  async addProductToCart(product) {
    await this.addToCartButton(product).click();
  }

  async removeProductFromCart(product) {
    await this.removeButton(product).click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
