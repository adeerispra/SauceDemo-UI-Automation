import { test, expect } from "../fixtures/pages.fixture.js";
import {
  defaultProductOrder,
  productList,
  products,
  sortOptions,
  users
} from "../data/index.js";
import { parseCurrency } from "../utils/price.utils.js";

test("@smoke @regression SD-UI-TC-017 inventory page loads after login", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);

  await inventoryPage.expectLoaded();
});

test("@smoke @regression SD-UI-TC-018 all six products are displayed", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await expect(inventoryPage.productCards).toHaveCount(6);
});

test("@regression SD-UI-TC-019 inventory product names match catalog", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await expect(await inventoryPage.getProductNames()).toEqual(
    defaultProductOrder.map((product) => product.name)
  );
});

test("@regression SD-UI-TC-020 inventory product prices match catalog", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await expect(await inventoryPage.getProductPrices()).toEqual(
    defaultProductOrder.map((product) => `$${product.price.toFixed(2)}`)
  );
});

test("@smoke @regression SD-UI-TC-022 add one product from inventory", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(products.backpack);

  await inventoryPage.expectCartBadgeCount(1);
  await expect(inventoryPage.removeButton(products.backpack)).toBeVisible();
});

test("@regression SD-UI-TC-023 add multiple products from inventory", async ({
  loginPage,
  inventoryPage
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

  for (const product of selectedProducts) {
    await expect(inventoryPage.removeButton(product)).toBeVisible();
  }
});

test("@sanity @regression SD-UI-TC-024 remove added product from inventory page", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.removeProductFromCart(products.backpack);

  await inventoryPage.expectCartBadgeHidden();
  await expect(inventoryPage.addToCartButton(products.backpack)).toBeVisible();
});

test("@regression SD-UI-TC-025 cart badge updates correctly when adding and removing several items", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.addProductToCart(products.onesie);
  await inventoryPage.expectCartBadgeCount(3);
  await inventoryPage.removeProductFromCart(products.bikeLight);
  await inventoryPage.expectCartBadgeCount(2);
  await inventoryPage.addProductToCart(products.fleeceJacket);

  await inventoryPage.expectCartBadgeCount(3);
});

test("@regression SD-UI-TC-026 default sort order is Name A to Z", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await expect(await inventoryPage.getProductNames()).toEqual(
    defaultProductOrder.map((product) => product.name)
  );
});

test("@regression SD-UI-TC-027 sort products by Name Z to A", async ({
  loginPage,
  inventoryPage
}) => {
  const expected = [...productList].sort((a, b) => b.name.localeCompare(a.name));

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.sortBy(sortOptions.nameDescending);

  await expect(await inventoryPage.getProductNames()).toEqual(
    expected.map((product) => product.name)
  );
});

test("@regression SD-UI-TC-028 sort products by Price low to high", async ({
  loginPage,
  inventoryPage
}) => {
  const expected = [...productList].sort((a, b) => a.price - b.price);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.sortBy(sortOptions.priceAscending);

  await expect((await inventoryPage.getProductPrices()).map(parseCurrency)).toEqual(
    expected.map((product) => product.price)
  );
});

test("@regression SD-UI-TC-029 sort products by Price high to low", async ({
  loginPage,
  inventoryPage
}) => {
  const expected = [...productList].sort((a, b) => b.price - a.price);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.sortBy(sortOptions.priceDescending);

  await expect((await inventoryPage.getProductPrices()).map(parseCurrency)).toEqual(
    expected.map((product) => product.price)
  );
});

test("@regression SD-UI-TC-030 sorting does not clear already selected cart items", async ({
  loginPage,
  inventoryPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.sortBy(sortOptions.priceAscending);

  await inventoryPage.expectCartBadgeCount(1);
  await expect(inventoryPage.removeButton(products.backpack)).toBeVisible();
});

test("@regression SD-UI-TC-031 click product name opens product detail page", async ({
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

test("@sanity @regression SD-UI-TC-033 cart icon opens shopping cart page", async ({
  loginPage,
  inventoryPage,
  cartPage
}) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.openCart();

  await cartPage.expectLoaded();
});
