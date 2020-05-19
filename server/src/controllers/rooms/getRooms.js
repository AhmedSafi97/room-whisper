const { Rooms } = require('../../database/models');

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    if (rooms.length === 0)
      return res.json({
        statusCode: 200,
        data: [],
      });
    const roomsNames = rooms.map(({ room }) => room);
    return res.json({
      statusCode: 200,
      data: roomsNames,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = getRooms;
