const { clientError, serverError } = require('./errorHandlers');
const { signup } = require('./users');

module.exports = {
  clientError,
  serverError,
  signup,
};
