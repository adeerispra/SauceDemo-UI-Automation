import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { pageTitles, routes } from "../data/index.js";

export class CheckoutInformationPage extends BasePage {
  constructor(page) {
    super(page);

    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postalCodeInput = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.cancelButton = page.getByTestId("cancel");
    this.errorMessage = page.getByTestId("error");
  }

  async expectLoaded() {
    await this.expectUrl(routes.checkoutInformation);
    await this.expectPageTitle(pageTitles.checkoutInformation);
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async fillCustomerInformation(customer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async submitCustomerInformation(customer) {
    await this.fillCustomerInformation(customer);
    await this.continue();
  }

  async expectError(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
