const { validateRoomName, isNewRoom, createRoom } = require('../../utils');

const addRoom = async (req, res, next) => {
  try {
    const { room } = req.body;
    const { role } = req.userData;

    await validateRoomName(room);
    await isNewRoom(room);
    await createRoom(room, role);

    res
      .status(201)
      .json({ statusCode: 201, message: 'room has been created successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = addRoom;
