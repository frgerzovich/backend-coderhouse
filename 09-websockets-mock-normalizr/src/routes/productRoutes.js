const router = require("express").Router();
const { productController } = require("../controllers/index.js");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", productController.createProduct);
router.put("/:id", productController.editProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
