const { clientError, serverError } = require('./errorHandlers');
const { signup, login, googleLogin, checkToken, logout } = require('./users');
const { getRooms, addRoom } = require('./rooms');

module.exports = {
  clientError,
  serverError,
  signup,
  login,
  googleLogin,
  checkToken,
  logout,
  getRooms,
  addRoom,
};
