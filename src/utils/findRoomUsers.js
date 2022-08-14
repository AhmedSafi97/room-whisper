const { Rooms, Users } = require('../models');

const findRoomUsers = async (room) => {
  const roomInfo = await Rooms.findOne({ room });
  const roomUsers = await Users.find({ _id: { $in: roomInfo.users } });
  const usersInfo = roomUsers.map(({ username }) => username);
  return usersInfo;
};

module.exports = findRoomUsers;
