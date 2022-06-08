const express = require("express");
const Container = require("./container");
const app = express();

let container;
new Container("products.txt").then((containerInstance) => {
  container = containerInstance;
});

const port = process.env.PORT || 8080;

app.get("/productos", (req, res) => {
  const allProducts = container.getAll();
  res.json(allProducts);
});

app.get("/productoRandom", (req, res) => {
  const randomProduct = container.getRandomProduct();
  res.json(randomProduct);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
