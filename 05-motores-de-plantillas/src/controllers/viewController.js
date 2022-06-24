const api = require("../api");

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
