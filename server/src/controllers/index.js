const { clientError, serverError } = require('./errorHandlers');
const { signup, login, googleLogin } = require('./users');
const { getRooms, createRoom } = require('./rooms');

module.exports = {
  clientError,
  serverError,
  signup,
  login,
  googleLogin,
  getRooms,
  createRoom,
};
