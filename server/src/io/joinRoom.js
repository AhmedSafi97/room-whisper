const { parse } = require('cookie');
const { Rooms, Users, Chats } = require('../database/models');
const { verifyToken, findRoomUsers } = require('../utils');

const joinRoom = (io, socket) => async ({ room }) => {
  try {
    socket.join(room);
    const { token } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(token);

    await Rooms.updateOne({ room }, { $addToSet: { users: [_id] } });

    const { username } = await Users.findOne({ _id });
    const roomMessages = await Chats.find({ room });
    const usersInfo = await findRoomUsers(room);

    socket.emit('username', username);
    socket.emit('msg', roomMessages);

    io.to(room).emit('joinRoom', usersInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = joinRoom;
