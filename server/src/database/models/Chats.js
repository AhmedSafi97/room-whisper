const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Chats = model('Chats', chatSchema);

module.exports = Chats;
