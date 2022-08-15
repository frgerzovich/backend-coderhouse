const postLogin = async (req, res) => {
  try {
    req.session.user = req.body.user;
    const user = req.session.user;
    res.cookie("user", user, { maxAge: 60000 }).send(user);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const getLogin = async (req, res) => {
  try {
    const user = req.session.user;
    console.log(`Usuario en sesión: ${user}`);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

const logOut = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("user").send("Sesión cerrada").status(200);
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
};

module.exports = { postLogin, getLogin, logOut };
