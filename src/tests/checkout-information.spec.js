import { test } from "../fixtures/pages.fixture.js";
import {
  checkoutCustomers,
  checkoutMessages,
  products,
  users
} from "../data/index.js";

test("@smoke @regression SD-UI-TC-061 checkout information page loads after cart checkout", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
});

test("@sanity @regression SD-UI-TC-062 checkout requires first name", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();

  await checkoutInformationPage.lastNameInput.fill("QA");
  await checkoutInformationPage.postalCodeInput.fill("15117");
  await checkoutInformationPage.continue();

  await checkoutInformationPage.expectError(checkoutMessages.firstNameRequired);
});

test("@sanity @regression SD-UI-TC-063 checkout requires last name", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();

  await checkoutInformationPage.firstNameInput.fill("Ade");
  await checkoutInformationPage.postalCodeInput.fill("15117");
  await checkoutInformationPage.continue();

  await checkoutInformationPage.expectError(checkoutMessages.lastNameRequired);
});

test("@sanity @regression SD-UI-TC-064 checkout requires postal code", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();

  await checkoutInformationPage.firstNameInput.fill("Ade");
  await checkoutInformationPage.lastNameInput.fill("QA");
  await checkoutInformationPage.continue();

  await checkoutInformationPage.expectError(checkoutMessages.postalCodeRequired);
});

test("@regression SD-UI-TC-065 checkout with all fields empty shows first required-field error", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();

  await checkoutInformationPage.continue();

  await checkoutInformationPage.expectError(checkoutMessages.firstNameRequired);
});

test("@smoke @regression SD-UI-TC-066 valid checkout information proceeds to overview", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();

  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );

  await checkoutOverviewPage.expectLoaded();
});

test("@sanity @regression SD-UI-TC-070 cancel from checkout information returns to cart", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();

  await checkoutInformationPage.cancel();

  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
});
