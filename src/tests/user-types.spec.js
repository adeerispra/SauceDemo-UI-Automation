import { test, expect } from "../fixtures/pages.fixture.js";
import {
  checkoutCustomers,
  loginMessages,
  productList,
  products,
  routes,
  sortOptions,
  users
} from "../data/index.js";
import { parseCurrency } from "../utils/price.utils.js";

test("@regression SD-UI-TC-104 problem_user sorting does not work correctly", async ({
  loginPage,
  inventoryPage
}) => {
  const expectedSortedPrices = [...productList]
    .sort((a, b) => a.price - b.price)
    .map((product) => product.price);

  await loginPage.open();
  await loginPage.login(users.problem.username, users.problem.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.sortBy(sortOptions.priceAscending);

  const actualPrices = (await inventoryPage.getProductPrices()).map(parseCurrency);
  expect(actualPrices).not.toEqual(expectedSortedPrices);
});

test("@regression SD-UI-TC-106 performance_glitch_user login delay is observed", async ({
  loginPage,
  inventoryPage
}) => {
  test.setTimeout(20000);

  await loginPage.open();
  const startedAt = Date.now();
  await loginPage.login(
    users.performanceGlitch.username,
    users.performanceGlitch.password
  );
  await expect(inventoryPage.inventoryContainer).toBeVisible({ timeout: 15000 });

  expect(Date.now() - startedAt).toBeGreaterThan(1000);
});

test("@sanity @regression SD-UI-TC-110 locked_out_user cannot access any authenticated page", async ({
  page,
  loginPage
}) => {
  await loginPage.open();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);

  await loginPage.expectError(loginMessages.lockedOut);
  await page.goto(routes.inventory);
  await loginPage.expectLoaded();
  await expect(page).toHaveURL(new RegExp(`${routes.login}$`));
});

test("@smoke @regression SD-UI-TC-111 standard_user has normal product and checkout behavior", async ({
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
