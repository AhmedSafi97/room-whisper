const logout = (req, res, next) => {
  try {
    res.clearCookie('token').sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = logout;
