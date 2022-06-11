const res = require("express/lib/response");

class Api {
  constructor() {
    this.products = [];
    this.currentId = 1;
  }

  getProducts() {
    return this.products;
  }

  getProduct(id) {
    if (isNaN(id)) {
      const error = new Error("El id debe ser un número");
      error.statusCode = 400;
      throw error;
    }

    const product = this.products.find((product) => product.id === id);

    if (!product) {
      const error = new Error("El producto no existe");
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  postProduct(name, price, thumbnail) {
    this.currentId = this.products.length + 1;
    this.products.push({ id: this.currentId, name, price, thumbnail });
  }

  editProduct(id, name, price, thumbnail) {
    if (isNaN(id)) {
      const error = new Error("El id debe ser un número");
      error.statusCode = 400;
      throw error;
    }
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      const error = new Error("El producto no existe");
      error.statusCode = 404;
      throw error;
    }
    const editedProducts = this.products.map((product) => {
      if (product.id === id) {
        return {
          id,
          name,
          price,
          thumbnail,
        };
      }
      return product;
    });

    this.products = editedProducts;
  }

  deleteProduct(id) {
    if (isNaN(id)) {
      const error = new Error("El id debe ser un número");
      error.statusCode = 400;
      throw error;
    }

    const product = this.products.find((product) => product.id === id);

    if (!product) {
      const error = new Error("El producto no existe");
      error.statusCode = 404;
      throw error;
    }
    const editedProducts = this.products.filter((product) => product.id !== id);

    this.products = editedProducts;
  }
}

module.exports = Api;
