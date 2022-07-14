const Api = require("../productsApi");
const db = require("../db/database").mysqlConnection;

const api = new Api(db, "products");

const viewAll = async (req, res) => {
  try {
    const products = await api.getAllProducts();
    res.render("main", {
      products: products,
      listExists: products.length > 0,
    });
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

module.exports = { viewAll };
