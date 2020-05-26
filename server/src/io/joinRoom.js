const { parse } = require('cookie');
const { Rooms, Users, Chats } = require('../database/models');
const { verifyToken } = require('../utils');

const joinRoom = (io, socket) => async ({ room }) => {
  try {
    socket.join(room);
    const { token } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(token);

    await Rooms.updateOne({ room }, { $addToSet: { users: [_id] } });

    const roomInfo = await Rooms.findOne({ room });
    const roomMessages = await Chats.find({ room });
    const roomUsers = await Users.find({ _id: { $in: roomInfo.users } });
    const usersInfo = roomUsers.map(({ username }) => username);

    const { username } = await Users.findOne({ _id });

    socket.emit('username', username);
    socket.emit('msg', roomMessages);

    io.to(room).emit('joinRoom', usersInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = joinRoom;
