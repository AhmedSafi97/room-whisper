const {
  validateLoginCredentials,
  getUserByEmail,
  checkPassword,
  createToken,
} = require('../../utils');

const login = async (httpReq) => {
  const { email, password } = httpReq.body;
  await validateLoginCredentials({ email, password });

  const user = await getUserByEmail(email);

  await checkPassword(password, user.password);

  const token = await createToken(user._id, user.role);

  return {
    statusCode: 200,
    message: 'logged in successfully',
    cookies: { name: 'mernChatToken', token },
  };
};

module.exports = login;
