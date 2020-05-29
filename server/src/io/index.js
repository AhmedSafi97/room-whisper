const joinRoom = require('./joinRoom');
const msgHandler = require('./msgHandler');
const socketDisconnect = require('./disconnect');

const ioHandler = (io) => (socket) => {
  socket.on('joinRoom', joinRoom(io, socket));

  socket.on('msg', msgHandler(io));

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('disconnecting', socketDisconnect(io, socket));
};

module.exports = ioHandler;
