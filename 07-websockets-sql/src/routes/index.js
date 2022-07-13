const router = require("express").Router();
const productRouter = require("./productRoutes");
const viewRouter = require("./viewRoutes");

router.use("/api/productos", productRouter);
router.use("/productos", viewRouter);

module.exports = router;
