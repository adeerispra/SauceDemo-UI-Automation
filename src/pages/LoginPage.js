import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { loginMessages, routes } from "../data/index.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.loginContainer = page.getByTestId("login-container");
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
    this.acceptedUsernames = page.getByTestId("login-credentials");
    this.passwordHint = page.getByTestId("login-password");
  }

  async open() {
    await this.goto(routes.login);
  }

  async expectLoaded() {
    await expect(this.loginContainer).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectError(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectLockedOutError() {
    await this.expectError(loginMessages.lockedOut);
  }
}
