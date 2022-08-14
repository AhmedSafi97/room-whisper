const {
  validateSignUpData,
  isNewEmail,
  isNewUsername,
  createUser,
} = require('../../utils');

const signup = async (httpReq) => {
  const { username, email, password } = httpReq.body;
  await validateSignUpData({ username, email, password });
  await isNewUsername(username);
  await isNewEmail(email);
  await createUser({ username, email, password });

  return { statusCode: 201, message: 'signed up successfully' };
};

module.exports = signup;
