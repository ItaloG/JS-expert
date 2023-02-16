import Product from "../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const results = [];
    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) continue;

      // 2º
      // keys.forEach((key) => product[key] || delete product[key]);

      // keys.forEach(
      //   (key) => product[key] || Reflect.deleteProperty(product, key)
      // );
      // results.push(new Product(product));

      // 3º
      let newObject = {};
      keys.forEach((key) => {
        if (!keys[key]) return;

        newObject[key] = key;
      });
      results.push(new Product(product));

      // 1º
      // results.push(JSON.parse(JSON.stringify(new Product(product))));1
    }

    return results;
  }
}
