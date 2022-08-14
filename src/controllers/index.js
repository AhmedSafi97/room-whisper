const {
  signup,
  login,
  googleLogin,
  checkToken,
  logout,
} = require('./AuthControllers');
const { getRooms, addRoom } = require('./RoomControllers');

module.exports = {
  signup,
  login,
  googleLogin,
  checkToken,
  logout,
  getRooms,
  addRoom,
};
