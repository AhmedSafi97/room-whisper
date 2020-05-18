const { clientError, serverError } = require('./errorHandlers');
const { signup, login, googleLogin, checkToken } = require('./users');
const { getRooms, createRoom } = require('./rooms');

module.exports = {
  clientError,
  serverError,
  signup,
  login,
  googleLogin,
  checkToken,
  getRooms,
  createRoom,
};
