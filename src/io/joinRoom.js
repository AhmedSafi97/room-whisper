const { Rooms, Chats } = require('../models');
const { findRoomUsers } = require('../utils');

const joinRoom =
  (io, socket) =>
  async ({ room }) => {
    try {
      const { _id } = socket.decoded;

      socket.join(room);

      await Rooms.updateOne({ room }, { $addToSet: { users: [_id] } });

      const roomMessages = await Chats.find({ room });
      const usersInfo = await findRoomUsers(room);

      socket.emit('msg', roomMessages);

      io.to(room).emit('joinRoom', usersInfo);
    } catch (err) {
      console.log(err);
    }
  };

module.exports = joinRoom;
