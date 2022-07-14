class Api {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async getAllProducts() {
    try {
      const products = await this.db.from(this.table).select("*");
      return products;
    } catch (error) {
      if (error.code === "ER_NO_SUCH_TABLE") {
        const createTable = require("./db/products/create_products_table");
        await createTable();
      } else {
        throw new Error(
          "Ha ocurrido un error obteniendo los datos: " + error.message
        );
      }
    }
  }

  async getProduct(id) {
    try {
      const product = await this.db.from(this.table).where({ id });
      if (!product) {
        const error = new Error("El producto no existe");
        error.statusCode = 404;
        throw error;
      }
      return product;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }
  async createProduct(product) {
    try {
      const id = await this.db(this.table).insert(product);
      product.id = id[0];
      return product;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async editProduct(id, product) {
    try {
      const idToEdit = await this.db
        .from(this.table)
        .where("id", "=", id)
        .update(product);
      if (!idToEdit) {
        const error = new Error("El producto no existe");
        error.statusCode = 404;
        throw error;
      }
      return product;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async deleteProduct(id) {
    try {
      const idToDelete = await this.db
        .from(this.table)
        .where("id", "=", id)
        .del();
      if (!idToDelete) {
        const error = new Error("El producto no existe");
        error.statusCode = 404;
        throw error;
      }
      console.log("Producto eliminado exitosamente");
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error eliminando los datos: " + error.message
      );
    }
  }
}

module.exports = Api;
