const { clientError, serverError } = require('./errorHandlers');
const { signup, login } = require('./users');

module.exports = {
  clientError,
  serverError,
  signup,
  login,
};
