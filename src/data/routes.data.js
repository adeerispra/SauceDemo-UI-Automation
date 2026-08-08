export const routes = {
  login: "/",
  inventory: "/inventory.html",
  productDetail: "/inventory-item.html",
  cart: "/cart.html",
  checkoutInformation: "/checkout-step-one.html",
  checkoutOverview: "/checkout-step-two.html",
  checkoutComplete: "/checkout-complete.html"
};

export function productDetailRoute(productId) {
  return `${routes.productDetail}?id=${productId}`;
}
