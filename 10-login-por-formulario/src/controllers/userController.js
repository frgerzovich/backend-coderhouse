const postLogin = async (req, res) => {
  try {
    req.session.user = req.body.user;
    const user = req.session.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).json({ error: error.message });
  }
};

const getLogin = async (req, res) => {
  res.render("login", {});
};

const logOut = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
    res.status(200).send("Sesión cerrada");
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).json({ error: error.message });
  }
};

module.exports = { postLogin, getLogin, logOut };
