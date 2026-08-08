import { test, expect } from "../fixtures/pages.fixture.js";
import {
  checkoutCustomers,
  checkoutMessages,
  products,
  routes,
  sortOptions,
  users
} from "../data/index.js";

test("@smoke @regression SD-UI-TC-117 complete checkout with one item from inventory", async ({
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
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
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

test("@regression SD-UI-TC-118 complete checkout with multiple items from inventory", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
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
  for (const product of selectedProducts) {
    await cartPage.expectItemVisible(product);
  }
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectTotalsForProducts(selectedProducts);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-119 complete checkout with item added from product detail page", async ({
  loginPage,
  inventoryPage,
  productDetailPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetail(products.fleeceJacket);
  await productDetailPage.addProductToCart(products.fleeceJacket);
  await expect(productDetailPage.cartBadge).toHaveText("1");

  await productDetailPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.fleeceJacket);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectItemVisible(products.fleeceJacket);
  await checkoutOverviewPage.expectTotalsForProducts([products.fleeceJacket]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-120 sort low to high then purchase cheapest product", async ({
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
  await inventoryPage.sortBy(sortOptions.priceAscending);
  await inventoryPage.addProductToCart(products.onesie);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.onesie);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectTotalsForProducts([products.onesie]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-121 sort high to low then purchase most expensive product", async ({
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
  await inventoryPage.sortBy(sortOptions.priceDescending);
  await inventoryPage.addProductToCart(products.fleeceJacket);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.fleeceJacket);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectTotalsForProducts([products.fleeceJacket]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-122 add multiple items remove one then complete checkout", async ({
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
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.addProductToCart(products.onesie);
  await inventoryPage.expectCartBadgeCount(3);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.removeProduct(products.bikeLight);
  await cartPage.expectItemHidden(products.bikeLight);
  await expect(cartPage.cartBadge).toHaveText("2");
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectItemVisible(products.backpack);
  await checkoutOverviewPage.expectItemVisible(products.onesie);
  await expect(checkoutOverviewPage.overviewItem(products.bikeLight)).toBeHidden();
  await checkoutOverviewPage.expectTotalsForProducts([
    products.backpack,
    products.onesie
  ]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-123 continue shopping after adding item then complete checkout", async ({
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
  await cartPage.continueShopping();
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.expectCartBadgeCount(2);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
  await cartPage.expectItemVisible(products.bikeLight);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectTotalsForProducts([
    products.backpack,
    products.bikeLight
  ]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@sanity @regression SD-UI-TC-124 cancel checkout from information page and preserve cart", async ({
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

test("@regression SD-UI-TC-125 cancel checkout from overview and verify navigation behavior", async ({
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

test("@regression SD-UI-TC-126 recover from checkout validation error and complete order", async ({
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
  await checkoutInformationPage.continue();
  await checkoutInformationPage.expectError(checkoutMessages.firstNameRequired);
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-127 logout after adding item and verify session protection", async ({
  page,
  loginPage,
  inventoryPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.expectCartBadgeCount(1);

  await navigationMenuPage.logout();
  await page.goto(routes.cart);
  await loginPage.expectLoaded();
  await expect(page).toHaveURL(new RegExp(`${routes.login}$`));
});

test("@regression SD-UI-TC-128 reset app state after adding items then start fresh checkout", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
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
  await inventoryPage.addProductToCart(products.onesie);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.onesie);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectItemVisible(products.onesie);
  await checkoutOverviewPage.expectTotalsForProducts([products.onesie]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-132 checkout with all six products", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
}) => {
  const allProducts = Object.values(products);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  for (const product of allProducts) {
    await inventoryPage.addProductToCart(product);
  }
  await inventoryPage.expectCartBadgeCount(allProducts.length);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await expect(cartPage.cartItems).toHaveCount(allProducts.length);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectTotalsForProducts(allProducts);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});

test("@regression SD-UI-TC-133 add items from inventory and detail pages then checkout", async ({
  loginPage,
  inventoryPage,
  productDetailPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openProductDetail(products.bikeLight);
  await productDetailPage.addProductToCart(products.bikeLight);
  await expect(productDetailPage.cartBadge).toHaveText("2");

  await productDetailPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
  await cartPage.expectItemVisible(products.bikeLight);
  await cartPage.checkout();
  await checkoutInformationPage.expectLoaded();
  await checkoutInformationPage.submitCustomerInformation(
    checkoutCustomers.validCustomer
  );
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectTotalsForProducts([
    products.backpack,
    products.bikeLight
  ]);
  await checkoutOverviewPage.finish();
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderComplete();
});
