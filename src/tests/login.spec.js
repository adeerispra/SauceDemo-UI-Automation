import { test, expect } from "../fixtures/pages.fixture.js";
import { loginMessages, users } from "../data/index.js";

test("@smoke @regression SD-UI-TC-001 valid standard user can log in successfully", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.expectLoaded();

  await loginPage.login(users.standard.username, users.standard.password);

  await inventoryPage.expectLoaded();
});

test("@sanity @regression SD-UI-TC-002 locked out user cannot log in", async ({
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);

  await loginPage.expectLockedOutError();
});

test("@sanity @regression SD-UI-TC-003 login requires username when both fields are empty", async ({
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login("", "");

  await loginPage.expectError(loginMessages.usernameRequired);
});

test("@sanity @regression SD-UI-TC-004 login requires password when password is empty", async ({
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, "");

  await loginPage.expectError(loginMessages.passwordRequired);
});

test("@regression SD-UI-TC-005 invalid username and valid password are rejected", async ({
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login("invalid_user", users.standard.password);

  await loginPage.expectError(loginMessages.invalidCredentials);
});

test("@regression SD-UI-TC-006 valid username and invalid password are rejected", async ({
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, "wrong_password");

  await loginPage.expectError(loginMessages.invalidCredentials);
});

test("@regression SD-UI-TC-008 password value is case sensitive", async ({
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, "Secret_Sauce");

  await loginPage.expectError(loginMessages.invalidCredentials);
});

test("@regression SD-UI-TC-010 login fields and button are visible and enabled", async ({
  loginPage
}) => {
  await loginPage.open();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
});

test("@regression SD-UI-TC-013 problem_user can authenticate", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.problem.username, users.problem.password);

  await inventoryPage.expectLoaded();
});

test("@regression SD-UI-TC-014 performance_glitch_user can authenticate with delayed response", async ({
  loginPage,
  inventoryPage
}) => {
  test.setTimeout(20000);

  await loginPage.open();
  await loginPage.login(
    users.performanceGlitch.username,
    users.performanceGlitch.password
  );

  await expect(inventoryPage.inventoryContainer).toBeVisible({ timeout: 15000 });
});
