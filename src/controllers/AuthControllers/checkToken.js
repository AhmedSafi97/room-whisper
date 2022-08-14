const { verifyToken } = require('../../utils');
const { Users } = require('../../models');

const checkToken = async (httpReq) => {
  const { mernChatToken } = httpReq.cookies;

  const { _id } = await verifyToken(mernChatToken);
  const { username, role } = await Users.findOne({ _id });

  return { username, role };
};

module.exports = checkToken;
