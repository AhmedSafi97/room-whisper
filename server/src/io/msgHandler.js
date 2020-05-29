const { Chats } = require('../database/models');

const msgHandler = (io) => async ({ msg, room, username }) => {
  try {
    const newChat = await Chats.create({
      msg,
      author: username,
      room,
    });
    io.to(room).emit('msg', [
      {
        msg: newChat.msg,
        author: username,
        date: newChat.date,
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = msgHandler;
