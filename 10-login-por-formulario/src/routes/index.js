const router = require("express").Router();
const productRouter = require("./productRoutes");
const viewRouter = require("./viewRoutes");
const loginRouter = require("./loginRoutes");

router.use("/api/productos", productRouter);
router.use("/productos", viewRouter);
router.use("/login", loginRouter);

module.exports = router;
