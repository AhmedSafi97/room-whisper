const { verifyToken } = require('../../utils');
const { Users } = require('../../database/models');

const checkToken = async (req, res, next) => {
  try {
    const { user } = req.cookies;
    const { _id } = await verifyToken(user);
    const { role } = await Users.findOne({ _id });
    return res.json({ role });
  } catch (err) {
    if (err.message === 'jwt must be provided') return res.sendStatus(200);
    return next(err);
  }
};

module.exports = checkToken;
