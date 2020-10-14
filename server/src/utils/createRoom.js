const { Rooms } = require('../database/models');
const createError = require('./createError');

const createRoom = async (room, UserRole) => {
  if (UserRole !== 'admin') {
    throw createError(
      403,
      'Forbidden',
      'only admin is allowed to create new rooms'
    );
  }

  return Rooms.create({ room });
};

module.exports = createRoom;
