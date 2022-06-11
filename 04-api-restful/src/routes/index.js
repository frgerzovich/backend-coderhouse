const { Router } = require("express");
const router = Router();
const Api = require("../api");

const api = new Api();

router.get("/productos", (req, res, next) => {
  res.json(api.getProducts());
});

router.get("/productos/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = api.getProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
});

router.post("/productos", (req, res, next) => {
  const { name, price, thumbnail } = req.body;
  api.postProduct(name, price, thumbnail);
  res.sendStatus(201);
});

router.put("/productos/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, price, thumbnail } = req.body;
    api.editProduct(id, name, price, thumbnail);
    res.sendStatus(200);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
});

router.delete("/productos/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    api.deleteProduct(id);
    res.sendStatus(200);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
});

module.exports = router;
