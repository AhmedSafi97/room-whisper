const { verifyToken, createError } = require('../utils');

const withAuth = async (req, res, next) => {
  try {
    const { mernChatToken } = req.cookies;
    const userData = await verifyToken(mernChatToken);
    req.userData = userData;
    return next();
  } catch (err) {
    if (err.message === 'jwt must be provided') {
      const errResponse = createError(
        403,
        'Forbidden',
        'you need to login first to access this resource'
      );
      return res.status(403).json(errResponse);
    }
    return next(err);
  }
};

module.exports = withAuth;
