const router = require("express").Router();
const { viewController } = require("../controllers/index.js");

router.get("/", viewController.viewAll);
router.get("/nuevo", (req, res) => {
  res.render("main");
});

module.exports = router;
