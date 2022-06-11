const { Router } = require("express");
const router = Router();
const Api = require("../api");

let api = new Api();

router.get("/productos", (req, res) => {
  res.json(api.getProducts());
});

router.get("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  api.getProduct(id);
  res.status(200).json(product);
});

router.post("/productos", (req, res) => {
  const { name, price, thumbnail } = req.body;
  api.postProduct(name, price, thumbnail);
  res.sendStatus(201);
});

router.put("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price, thumbnail } = req.body;
  api.editProduct(id, name, price, thumbnail);
  res.sendStatus(200);
});

router.delete("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  api.deleteProduct(id);
  res.sendStatus(200);
});

module.exports = router;
