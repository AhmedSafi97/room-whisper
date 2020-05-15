const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Rooms',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chats = model('Chats', chatSchema);

module.exports = Chats;
