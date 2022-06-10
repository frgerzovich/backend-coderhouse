const { Router } = require("express");
const router = Router();

const products = [];

router.get("/productos", (req, res) => {
  res.json(products);
});

router.get("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.filter((product) => product.id === id);
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

  res.status(200).json(product);
});

router.post("/productos", (req, res) => {
  const { id, name, price, thumbnail } = req.body;
  currentId = products.length + 1;

  products.push({ id: currentId, name, price, thumbnail });
  res.sendStatus(201);
});

router.put("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price, thumbnail } = req.body;
  products.push({ name, price, thumbnail });
  res.sendStatus(201);
});

module.exports = router;
