const { Chats } = require('../models');

const msgHandler =
  (io) =>
  async ({ msg, room, username }) => {
    try {
      const date = Date.now();
      const newChat = await Chats.create({
        msg,
        author: username,
        room,
        date,
      });

      io.to(room).emit('msg', [
        {
          _id: newChat._id,
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
