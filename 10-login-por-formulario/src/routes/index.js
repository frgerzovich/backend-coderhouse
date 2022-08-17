const router = require("express").Router();
const productRouter = require("./productRoutes");
const viewRouter = require("./viewRoutes");
const userRouter = require("./userRoutes");
const authMiddleware = require("../middlewares/auth");

router.use("/api/productos", authMiddleware, productRouter);
router.use("/productos", authMiddleware, viewRouter);
router.use("/user", userRouter);

module.exports = router;
