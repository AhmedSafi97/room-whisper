const { Rooms } = require('../../database/models');

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.aggregate([
      {
        $project: { room: true, users: { $size: '$users' } },
      },
    ]);

    return res.json({
      statusCode: 200,
      data: rooms,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = getRooms;
