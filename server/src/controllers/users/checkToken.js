const { verifyToken } = require('../../utils');
const { Users } = require('../../database/models');

const checkToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { _id } = await verifyToken(token);
    const { role } = await Users.findOne({ _id });
    return res.json({ role });
  } catch (err) {
    if (err.message === 'jwt must be provided') return res.send('un-auth');
    return next(err);
  }
};

module.exports = checkToken;
