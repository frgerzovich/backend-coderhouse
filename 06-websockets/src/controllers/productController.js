const api = require("../productsApi");

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
    const id = Number(req.params.id);
    const product = await api.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.thumbnail) {
      const error = new Error(
        "Los campos 'name', 'price' y 'thumbnail' son necesarios"
      );
      error.statusCode = 400;
      throw error;
    }
    const product = req.body;
    await api.createProduct(product);
    res.redirect("/productos");
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.thumbnail) {
      const error = new Error(
        "Los campos 'name', 'price' y 'thumbnail' son necesarios"
      );
      error.statusCode = 400;
      throw error;
    }
    const id = Number(req.params.id);
    const { name, price, thumbnail } = req.body;
    await api.editProduct(id, name, price, thumbnail);
    res.sendStatus(200);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await api.deleteProduct(id);
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
