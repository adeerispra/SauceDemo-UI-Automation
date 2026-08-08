import { test, expect } from "../fixtures/pages.fixture.js";
import { checkoutCustomers, products, users } from "../data/index.js";

test("@smoke @regression SD-UI-TC-087 order confirmation displays success message", async ({
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
  await checkoutOverviewPage.expectPaymentAndShipping();
  await checkoutOverviewPage.expectTotalsForProducts([products.backpack]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();

  await checkoutCompletePage.expectOrderComplete();
});

test("@sanity @regression SD-UI-TC-089 back home returns to inventory page", async ({
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
  await checkoutOverviewPage.expectPaymentAndShipping();
  await checkoutOverviewPage.expectTotalsForProducts([products.backpack]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();

  await checkoutCompletePage.backHome();

  await inventoryPage.expectLoaded();
});

test("@regression SD-UI-TC-090 cart is cleared after Back Home from confirmation", async ({
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
  await checkoutOverviewPage.expectPaymentAndShipping();
  await checkoutOverviewPage.expectTotalsForProducts([products.backpack]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();

  await checkoutCompletePage.backHome();
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await expect(cartPage.cartItems).toHaveCount(0);
});
