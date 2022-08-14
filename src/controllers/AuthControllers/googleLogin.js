const { Users } = require('../../models');
const { signToken, verifyGoogleToken } = require('../../utils');

const googleLogin = async (httpReq) => {
  const { tokenId } = httpReq.body;

  const { email, name } = await verifyGoogleToken(tokenId);
  const currentUser = await Users.findOne({ email });

  let payload;
  if (!currentUser) {
    const newUser = await Users.create({ username: name, email });
    payload = { _id: newUser._id };
  } else {
    payload = { _id: currentUser._id };
  }

  const token = await signToken(payload);

  return {
    statusCode: 200,
    message: 'logged in successfully',
    cookies: { name: 'mernChatToken', token },
  };
};

module.exports = googleLogin;
