const express = require("express");
const router = require("./src/routes/index.js");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ProductsApi = require("./src/productsApi");
const MessagesApi = require("./src/messagesApi");
const messagesDB = require("./src/db/database").sqliteConnection;
const productsDB = require("./src/db/database").mysqlConnection;

const app = express();
const port = 8080;
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);
const productsApi = new ProductsApi(productsDB, "products");
const products = productsApi.getAllProducts();
const messagesApi = new MessagesApi(messagesDB, "chats");

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

ioServer.on("connection", async (socket) => {
  console.log("a user connected");

  //mandar productos apenas se conecta el usuario:

  socket.emit("products", products);

  socket.on("new-product", (product) => {
    console.log(products);
    productsApi.createProduct(product);
    const updatedProducts = productsApi.getAllProducts();
    ioServer.sockets.emit("products", updatedProducts);
  });

  //mostrar Mensajes
  const messages = await messagesApi.getAll();
  socket.emit("messages", messages);

  socket.on("new-message", async (message) => {
    await messagesApi.send(message);
    const updatedMessages = await messagesApi.getAll();
    ioServer.sockets.emit("messages", updatedMessages);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
