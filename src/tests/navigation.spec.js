import { test, expect } from "../fixtures/pages.fixture.js";
import { products, routes, users } from "../data/index.js";

test("@sanity @regression SD-UI-TC-094 hamburger menu opens navigation drawer", async ({
  loginPage,
  inventoryPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await navigationMenuPage.open();

  await expect(navigationMenuPage.allItemsLink).toBeVisible();
  await expect(navigationMenuPage.logoutLink).toBeVisible();
  await expect(navigationMenuPage.resetAppStateLink).toBeVisible();
});

test("@regression SD-UI-TC-095 close button hides navigation drawer", async ({
  loginPage,
  inventoryPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await navigationMenuPage.open();
  await navigationMenuPage.close();

  await expect(navigationMenuPage.allItemsLink).toBeHidden();
});

test("@regression SD-UI-TC-096 all items navigates to inventory page", async ({
  loginPage,
  inventoryPage,
  cartPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();
  await cartPage.expectLoaded();

  await navigationMenuPage.goToAllItems();

  await inventoryPage.expectLoaded();
});

test("@smoke @regression SD-UI-TC-098 logout returns user to login page", async ({
  loginPage,
  inventoryPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await navigationMenuPage.logout();

  await loginPage.expectLoaded();
  await expect(loginPage.page).toHaveURL(new RegExp(`${routes.login}$`));
  await expect(loginPage.loginButton).toHaveValue("Login");
});

test("@regression SD-UI-TC-099 protected page is not accessible after logout", async ({
  page,
  loginPage,
  inventoryPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await navigationMenuPage.logout();

  await page.goto(routes.inventory);
  await loginPage.expectLoaded();
  await expect(page).toHaveURL(new RegExp(`${routes.login}$`));
});

test("@sanity @regression SD-UI-TC-100 reset App State clears cart badge and buttons", async ({
  loginPage,
  inventoryPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.expectCartBadgeCount(2);

  await navigationMenuPage.resetAppState();

  await inventoryPage.expectCartBadgeHidden();
  await inventoryPage.page.reload();
  await expect(inventoryPage.addToCartButton(products.backpack)).toBeVisible();
  await expect(inventoryPage.addToCartButton(products.bikeLight)).toBeVisible();
});
