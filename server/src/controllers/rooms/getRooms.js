const { Rooms } = require('../../database/models');

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    res.json({
      statusCode: 200,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getRooms;
