const { parse } = require('cookie');
const { Rooms, Users } = require('../database/models');
const { verifyToken } = require('../utils');

const socketDisconnect = (io, socket) => async () => {
  try {
    const { user } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(user);
    const roomToLeave = await Rooms.findOne({ users: { $in: [_id] } });
    if (roomToLeave) {
      const { room } = roomToLeave;
      await Rooms.updateOne({ room }, { $pullAll: { users: [_id] } });
      const { users } = await Rooms.findOne({ room });
      const onlineUsers = await Users.find({ _id: { $in: users } });
      const usersNames = onlineUsers.map(({ username }) => username);
      io.to(room).emit('joinRoom', usersNames);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = socketDisconnect;
