const db = require("../database");

const createProductsTable = async () => {
  try {
    await db.mysqlConnection.schema.createTable("products", (product) => {
      product.increments("id").primary();
      product.string("name").notNullable();
      product.string("description").notNullable();
      product.string("thumbnailUrl").notNullable();
      product.integer("price").notNullable();
      product.integer("stock").notNullable();
    });
    console.log("Tabla de prodcutos creada exitosamente");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createProductsTable;
