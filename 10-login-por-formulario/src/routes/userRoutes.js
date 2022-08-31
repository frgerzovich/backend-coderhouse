const userController = require("../controllers/userController");
const router = require("express").Router();
const passport = require("passport");
//register
router.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/signupError" }),
  userController.postSignup
);
router.get("/signup", userController.postSignup);

//login
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/logout", userController.logOut);

module.exports = router;
