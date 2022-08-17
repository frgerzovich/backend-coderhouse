const userController = require("../controllers/userController");
const router = require("express").Router();

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/logout", userController.logOut);

module.exports = router;
