import { test, expect } from "../fixtures/pages.fixture.js";
import { pageTitles, products, users } from "../data/index.js";

test("@sanity @regression SD-UI-TC-035 product detail page displays selected product information", async ({
  loginPage,
  inventoryPage,
  productDetailPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.openProductDetail(products.backpack);

  await productDetailPage.expectProduct(products.backpack);
});

test("@regression SD-UI-TC-036 back to Products returns to inventory page", async ({
  loginPage,
  inventoryPage,
  productDetailPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetail(products.bikeLight);

  await productDetailPage.backToProducts();

  await inventoryPage.expectLoaded();
});

test("@regression SD-UI-TC-037 add product to cart from detail page", async ({
  loginPage,
  inventoryPage,
  productDetailPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetail(products.fleeceJacket);

  await productDetailPage.addProductToCart(products.fleeceJacket);

  await expect(productDetailPage.cartBadge).toHaveText("1");
  await expect(productDetailPage.removeButton(products.fleeceJacket)).toBeVisible();
});

test("@regression SD-UI-TC-038 remove product from cart from detail page", async ({
  loginPage,
  inventoryPage,
  productDetailPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.openProductDetail(products.fleeceJacket);

  await productDetailPage.addProductToCart(products.fleeceJacket);
  await productDetailPage.removeProductFromCart(products.fleeceJacket);

  await expect(productDetailPage.cartBadge).toBeHidden();
  await expect(productDetailPage.addToCartButton(products.fleeceJacket)).toBeVisible();
});

test("@regression SD-UI-TC-039 cart state is preserved between inventory and detail page", async ({
  loginPage,
  inventoryPage,
  productDetailPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openProductDetail(products.backpack);

  await expect(productDetailPage.cartBadge).toHaveText("1");
  await expect(productDetailPage.removeButton(products.backpack)).toBeVisible();
  await productDetailPage.backToProducts();
  await inventoryPage.expectPageTitle(pageTitles.products);
  await inventoryPage.expectCartBadgeCount(1);
});
