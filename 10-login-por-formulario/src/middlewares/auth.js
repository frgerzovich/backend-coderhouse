function auth(req, res, next) {
  if (req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    res.redirect("/user/login");
  }
}

module.exports = auth;
