const { parse } = require('cookie');
const { Rooms, Users } = require('../database/models');
const { verifyToken } = require('../utils');

const ioHandler = (socket, io) => {
  socket.on('joinRoom', async ({ room }) => {
    console.log('new Join');
    socket.join(room);
    const { user } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(user);
    await Rooms.updateOne({ room }, { $addToSet: { users: [_id] } });
    const { users } = await Rooms.findOne({ room });
    const onlineUsers = await Users.find({ _id: { $in: users } });
    const usersNames = onlineUsers.map(({ username }) => username);
    io.to(room).emit('joinRoom', usersNames);
  });

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('disconnect', async () => {
    const { user } = parse(socket.request.headers.cookie);
    const { _id } = await verifyToken(user);
    console.log(_id);
    const roomToLeave = await Rooms.findOne({ users: { $in: [_id] } });
    console.log(roomToLeave);
    if (roomToLeave) {
      const { room } = roomToLeave;
      console.log(room);
      await Rooms.updateOne({ room }, { $pullAll: { users: [_id] } });
      const { users } = await Rooms.findOne({ room });
      console.log(users);
      const onlineUsers = await Users.find({ _id: { $in: users } });
      const usersNames = onlineUsers.map(({ username }) => username);
      io.to(room).emit('joinRoom', usersNames);
    }
  });
};

module.exports = ioHandler;
