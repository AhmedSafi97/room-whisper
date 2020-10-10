const { Users } = require('../../database/models');
const { signToken, verifyGoogleToken } = require('../../utils');

const googleLogin = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    let payload;
    const { email, name } = await verifyGoogleToken(tokenId);
    const currentUser = await Users.findOne({ email });
    if (!currentUser) {
      const newUser = await Users.create({ username: name, email });
      payload = { _id: newUser._id };
    } else {
      payload = { _id: currentUser._id };
    }
    const token = await signToken(payload);
    return res
      .cookie('token', token)
      .json({ statusCode: 200, message: 'logged in successfully' });
  } catch (err) {
    return next(err);
  }
};

module.exports = googleLogin;
