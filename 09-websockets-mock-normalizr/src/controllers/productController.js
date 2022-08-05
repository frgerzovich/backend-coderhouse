const Api = require("../productsApi");
const db = require("../db/database").mysqlConnection;

const api = new Api(db, "products");
const getAll = async (req, res) => {
  try {
    const products = await api.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    res.json(await api.getProduct(Number(req.params.id)));
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    await api.createProduct(req.body);
    res.redirect("/productos");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    await api.editProduct(Number(req.params.id), req.body);
    res.sendStatus(200);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await api.deleteProduct(Number(req.params.id));
    res.sendStatus(200);
  } catch {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  editProduct,
  deleteProduct,
};
