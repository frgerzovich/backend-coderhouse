const express = require("express");
const routes = require("./src/routes/index");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.use("/imagenes", express.static("public/images"));

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
