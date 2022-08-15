const loginController = require("../controllers/loginController");
const router = require("express").Router();

router.get("/", loginController.getLogin);
router.post("/", loginController.postLogin);
router.delete("/", loginController.logOut);

module.exports = router;
