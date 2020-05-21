const logout = (req, res, next) => {
  try {
    res.clearCookie('user').sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = logout;
