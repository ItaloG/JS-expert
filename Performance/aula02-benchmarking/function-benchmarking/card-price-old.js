export default class Cart {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice();
  }

  getCartPrice() {
    return this.products
      .map((product) => product.price)
      .reduce((prev, next) => prev + next, 0);
  }
}
