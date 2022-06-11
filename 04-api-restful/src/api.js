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
    const product = this.products.filter((product) => product.id === id);
    if (isNaN(id)) {
      res.status(400).json({
        error: "El id debe ser un número",
      });
      return;
    }

    if (!product.length) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }
  }

  postProduct(name, price, thumbnail) {
    this.currentId = this.products.length + 1;
    this.products.push({ id: this.currentId, name, price, thumbnail });
  }

  editProduct(id, name, price, thumbnail) {
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
      return res.status(400).json({
        error: "El id debe ser un número",
      });
    }

    const editedProducts = this.products.filter((product) => product.id !== id);
    this.products = editedProducts;
  }
}

module.exports = Api;
