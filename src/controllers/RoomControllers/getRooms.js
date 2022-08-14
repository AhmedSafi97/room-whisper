const { Rooms } = require('../../models');

const getRooms = async () => {
  const rooms = await Rooms.aggregate([
    {
      $project: { room: true, users: { $size: '$users' } },
    },
  ]);

  return {
    statusCode: 200,
    data: rooms,
  };
};

module.exports = getRooms;
