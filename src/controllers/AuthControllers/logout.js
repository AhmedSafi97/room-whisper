const logout = (req, res) => {
  res.clearCookie('mernChatToken').sendStatus(200);
};

module.exports = logout;
