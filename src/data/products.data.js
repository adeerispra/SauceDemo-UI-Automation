export const products = {
  backpack: {
    id: 4,
    name: "Sauce Labs Backpack",
    dataTestSlug: "sauce-labs-backpack",
    price: 29.99,
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
  },
  bikeLight: {
    id: 0,
    name: "Sauce Labs Bike Light",
    dataTestSlug: "sauce-labs-bike-light",
    price: 9.99,
    description:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night."
  },
  boltTShirt: {
    id: 1,
    name: "Sauce Labs Bolt T-Shirt",
    dataTestSlug: "sauce-labs-bolt-t-shirt",
    price: 15.99,
    description:
      "Get your testing superhero on with the Sauce Labs bolt T-shirt."
  },
  fleeceJacket: {
    id: 5,
    name: "Sauce Labs Fleece Jacket",
    dataTestSlug: "sauce-labs-fleece-jacket",
    price: 49.99,
    description:
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything."
  },
  onesie: {
    id: 2,
    name: "Sauce Labs Onesie",
    dataTestSlug: "sauce-labs-onesie",
    price: 7.99,
    description:
      "Rib snap infant onesie for the junior automation engineer in development."
  },
  redTShirt: {
    id: 3,
    name: "Test.allTheThings() T-Shirt (Red)",
    dataTestSlug: "test.allthethings()-t-shirt-(red)",
    price: 15.99,
    description:
      "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests."
  }
};

export const productList = Object.values(products);

export const defaultProductOrder = [
  products.backpack,
  products.bikeLight,
  products.boltTShirt,
  products.fleeceJacket,
  products.onesie,
  products.redTShirt
];

export const sortOptions = {
  nameAscending: {
    label: "Name (A to Z)",
    value: "az"
  },
  nameDescending: {
    label: "Name (Z to A)",
    value: "za"
  },
  priceAscending: {
    label: "Price (low to high)",
    value: "lohi"
  },
  priceDescending: {
    label: "Price (high to low)",
    value: "hilo"
  }
};
