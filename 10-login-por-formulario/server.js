const express = require("express");
const router = require("./src/routes/index.js");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const mongoose = require("mongoose");
const ProductsApi = require("./src/productsApi");
const MessagesApi = require("./src/messagesApi");
const messagesDB = require("./src/db/database").sqliteConnection;
const productsDB = require("./src/db/database").mysqlConnection;
const normalizeMessages = require("./src/util/normalize");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./src/schemas/userSchema");

const app = express();
const port = 8080;
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);
const productsApi = new ProductsApi(productsDB, "products");

const messagesApi = new MessagesApi("chats", {
  author: {
    id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
});

//conexion con mongo

async function mongoConnection() {
  const URL = "mongodb://localhost:27017/websocketsmongo";
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongodb connection established");
}

mongoConnection();

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
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: false, secure: false },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessions",
    }),
    rolling: true,
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
  const products = await productsApi.getAllProducts();
  socket.emit("products", products);

  socket.on("new-product", async (product) => {
    await productsApi.createProduct(product);
    const updatedProducts = await productsApi.getAllProducts();
    ioServer.sockets.emit("products", updatedProducts);
  });

  //mostrar Mensajes
  const messages = await messagesApi.getAll();
  const normalizedMessages = normalizeMessages(messages);
  socket.emit("messages", normalizedMessages);

  socket.on("new-message", async (message) => {
    await messagesApi.send(message);
    const updatedMessages = await messagesApi.getAll();
    const normalizedMessages = normalizeMessages(updatedMessages);
    ioServer.sockets.emit("messages", normalizedMessages);
  });
});

//passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

//login Strategy

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

passport.use(
  "login",
  new LocalStrategy((username, password, done) =>
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("user not found");
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("invalid password");
        return done(null, false);
      }

      return done(null, user);
    })
  )
);

//signup strategy

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("there was an error" + err);
          return done(err);
        }

        if (user) {
          console.log("user already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          pasword: createHash(password),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("error in saving user: " + err);
            return done(err);
          }
          console.log(newUser);
          console.log("user saved succesfully!");
          return done(null, userWithId);
        });
      });
    }
  )
);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
