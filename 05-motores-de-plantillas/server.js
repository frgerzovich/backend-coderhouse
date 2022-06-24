const express = require("express");
const router = require("./src/routes/index.js");
const { engine } = require("express-handlebars");

const app = express();
const port = 8080;

//handlebars config
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/src/views/layouts",
    partialsDir: __dirname + "/src/views/partials",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", router);
app.use(express.static("public"));

app.set("view engine", /* alternate between pug hbs and ejs */ "hbs");
app.set("views", "./src/views");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
