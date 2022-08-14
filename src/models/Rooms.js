const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
});

const Rooms = model('Rooms', roomSchema);

module.exports = Rooms;
