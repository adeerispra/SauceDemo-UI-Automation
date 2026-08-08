import { test, expect } from "../fixtures/pages.fixture.js";
import { pageTitles, products, users } from "../data/index.js";

test("@smoke @regression SD-UI-TC-045 cart page opens from cart icon", async ({
  loginPage,
  inventoryPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
});

test("@regression SD-UI-TC-047 single cart item shows name description price and quantity", async ({
  loginPage,
  inventoryPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
  await expect(cartPage.cartItem(products.backpack).getByTestId("item-quantity")).toHaveText("1");
});

test("@regression SD-UI-TC-048 multiple cart items are listed separately", async ({
  loginPage,
  inventoryPage,
  cartPage
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
  await expect(cartPage.cartItems).toHaveCount(selectedProducts.length);
  for (const product of selectedProducts) {
    await cartPage.expectItemVisible(product);
  }
});

test("@sanity @regression SD-UI-TC-049 remove one item from cart", async ({
  loginPage,
  inventoryPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.expectCartBadgeCount(2);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.removeProduct(products.backpack);
  await cartPage.expectItemHidden(products.backpack);
  await cartPage.expectItemVisible(products.bikeLight);
  await expect(cartPage.cartBadge).toHaveText("1");
});

test("@regression SD-UI-TC-050 remove all items from cart", async ({
  loginPage,
  inventoryPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.expectCartBadgeCount(2);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.removeProduct(products.backpack);
  await cartPage.removeProduct(products.bikeLight);
  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(cartPage.cartBadge).toBeHidden();
});

test("@regression SD-UI-TC-051 continue shopping returns to inventory without clearing cart", async ({
  loginPage,
  inventoryPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.continueShopping();
  await inventoryPage.expectPageTitle(pageTitles.products);
  await inventoryPage.expectCartBadgeCount(1);
});

test("@smoke @regression SD-UI-TC-052 checkout button opens checkout information page", async ({
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

test("@regression SD-UI-TC-054 cart badge count matches number of cart lines", async ({
  loginPage,
  inventoryPage,
  cartPage
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
  await expect(cartPage.cartItems).toHaveCount(selectedProducts.length);
  await expect(cartPage.cartBadge).toHaveText(String(selectedProducts.length));
});

test("@regression SD-UI-TC-055 cart state persists across page navigation", async ({
  loginPage,
  inventoryPage,
  productDetailPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.openProductDetail(products.bikeLight);
  await productDetailPage.backToProducts();
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible(products.backpack);
});

test("@regression SD-UI-TC-056 reset App State clears cart", async ({
  loginPage,
  inventoryPage,
  cartPage,
  navigationMenuPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.expectCartBadgeCount(2);

  await navigationMenuPage.resetAppState();
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(cartPage.cartBadge).toBeHidden();
});
