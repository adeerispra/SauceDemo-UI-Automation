import { test, expect } from "../fixtures/pages.fixture.js";
import { checkoutCustomers, products, users } from "../data/index.js";
import { parseCurrency } from "../utils/price.utils.js";

test("@smoke @regression SD-UI-TC-075 checkout overview loads after valid information", async ({
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

test("@regression SD-UI-TC-076 overview displays correct single item details", async ({
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

  await checkoutOverviewPage.expectItemVisible(products.backpack);
});

test("@regression SD-UI-TC-077 overview displays all selected multiple items", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage
}) => {
  const selectedProducts = [
    products.backpack,
    products.bikeLight,
    products.onesie
  ];

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  for (const product of selectedProducts) {
    await inventoryPage.addProductToCart(product);
  }
  await inventoryPage.expectCartBadgeCount(selectedProducts.length);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();

  await expect(checkoutOverviewPage.overviewItems).toHaveCount(selectedProducts.length);
  for (const product of selectedProducts) {
    await checkoutOverviewPage.expectItemVisible(product);
  }
});

test("@regression SD-UI-TC-078 item total equals sum of selected product prices", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage
}) => {
  const selectedProducts = [products.backpack, products.bikeLight];

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  for (const product of selectedProducts) {
    await inventoryPage.addProductToCart(product);
  }
  await inventoryPage.expectCartBadgeCount(selectedProducts.length);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();

  await expect(checkoutOverviewPage.itemTotal).toHaveText("Item total: $39.98");
});

test("@regression SD-UI-TC-079 tax value is displayed and non-negative", async ({
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

  const tax = parseCurrency(await checkoutOverviewPage.tax.textContent());
  expect(tax).toBeGreaterThanOrEqual(0);
});

test("@regression SD-UI-TC-080 total equals item total plus tax", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage
}) => {
  const selectedProducts = [
    products.backpack,
    products.bikeLight,
    products.onesie
  ];

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  for (const product of selectedProducts) {
    await inventoryPage.addProductToCart(product);
  }
  await inventoryPage.expectCartBadgeCount(selectedProducts.length);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();

  await checkoutOverviewPage.expectTotalsForProducts(selectedProducts);
});

test("@sanity @regression SD-UI-TC-081 overview displays expected payment information", async ({
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

  await checkoutOverviewPage.expectPaymentAndShipping();
});

test("@sanity @regression SD-UI-TC-082 overview displays expected shipping information", async ({
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

  await checkoutOverviewPage.expectPaymentAndShipping();
});

test("@sanity @regression SD-UI-TC-083 cancel from overview returns to inventory page", async ({
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

  await checkoutOverviewPage.cancel();

  await inventoryPage.expectLoaded();
});

test("@smoke @regression SD-UI-TC-084 finish button completes order", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
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

  await checkoutOverviewPage.finish();

  await checkoutCompletePage.expectLoaded();
});
