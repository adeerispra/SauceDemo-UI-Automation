export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export function parseCurrency(value) {
  const match = String(value).match(/-?\d+(?:\.\d{1,2})?/);

  if (!match) {
    throw new Error(`Unable to parse currency from value: ${value}`);
  }

  return Number(match[0]);
}

export function calculateItemTotal(products) {
  return products.reduce((total, product) => total + product.price, 0);
}

export function calculateSauceDemoTax(itemTotal) {
  return Number((itemTotal * 0.08).toFixed(2));
}

export function calculateOrderTotal(itemTotal, tax) {
  return Number((itemTotal + tax).toFixed(2));
}

export function calculateExpectedCheckoutTotals(products) {
  const itemTotal = calculateItemTotal(products);
  const tax = calculateSauceDemoTax(itemTotal);
  const total = calculateOrderTotal(itemTotal, tax);

  return {
    itemTotal,
    tax,
    total,
    itemTotalText: `Item total: ${formatCurrency(itemTotal)}`,
    taxText: `Tax: ${formatCurrency(tax)}`,
    totalText: `Total: ${formatCurrency(total)}`
  };
}
