const logout = (req, res, next) => {
  try {
    res.clearCookie('mernChatToken').sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = logout;
