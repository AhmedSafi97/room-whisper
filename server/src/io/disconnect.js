const { parse } = require('cookie');
const { Rooms } = require('../database/models');
const { verifyToken, findRoomUsers } = require('../utils');

const socketDisconnect = (io, socket) => async () => {
  try {
    const room = Object.keys(socket.rooms)[1];
    // socket.rooms returns an object where key and value are the same
    // first key is socket id, second key is rooms name

    const { token } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(token);

    await Rooms.updateOne({ room }, { $pullAll: { users: [_id] } });

    const usersInfo = await findRoomUsers(room);

    io.to(room).emit('joinRoom', usersInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = socketDisconnect;
