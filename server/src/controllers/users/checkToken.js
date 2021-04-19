const { verifyToken } = require('../../utils');
const { Users } = require('../../database/models');

const checkToken = async (req, res, next) => {
  try {
    const { mernChatToken } = req.cookies;
    const { _id } = await verifyToken(mernChatToken);
    const { username, role } = await Users.findOne({ _id });
    return res.json({ username, role });
  } catch (err) {
    if (err.message === 'jwt must be provided') return res.send('un-auth');
    return next(err);
  }
};

module.exports = checkToken;
