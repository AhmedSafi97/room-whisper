const { Rooms, Users } = require('../../database/models');

const getRoomUsers = async (req, res, next) => {
  try {
    const { room } = req.params;
    const { users } = await Rooms.findOne({ room });
    const usersData = await Users.find({ _id: { $in: users } });
    if (usersData.length === 0)
      return res.json({ statusCode: 200, data: usersData });
    const usersNames = usersData.map(({ username }) => username);
    return res.json({ statusCode: 200, data: usersNames });
  } catch (err) {
    return next(err);
  }
};

module.exports = getRoomUsers;
