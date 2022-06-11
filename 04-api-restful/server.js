const express = require("express");
const app = express();
const routes = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
