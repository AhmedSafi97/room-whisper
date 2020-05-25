const { parse } = require('cookie');
const { Rooms, Users, Chats } = require('../database/models');
const { verifyToken } = require('../utils');

const joinRoom = (io, socket) => async ({ room }) => {
  try {
    socket.join(room);
    const { user } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(user);
    await Rooms.updateOne({ room }, { $addToSet: { users: [_id] } });
    const { users } = await Rooms.findOne({ room });
    const onlineUsers = await Users.find({ _id: { $in: users } });
    const usersNames = onlineUsers.map(({ username }) => username);
    const { username } = await Users.findOne({ _id });
    const oldChats = await Chats.find({ room });
    socket.emit('username', username);
    socket.emit('msg', oldChats);
    io.to(room).emit('joinRoom', usersNames);
  } catch (err) {
    console.log(err);
  }
};

module.exports = joinRoom;
