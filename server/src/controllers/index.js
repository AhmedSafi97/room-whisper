const { clientError, serverError } = require('./errorHandlers');
const { signup, login, googleLogin } = require('./users');

module.exports = {
  clientError,
  serverError,
  signup,
  login,
  googleLogin,
};
