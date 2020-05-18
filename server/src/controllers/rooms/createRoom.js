const { Rooms } = require('../../database/models');
const { createError, roomValidation } = require('../../utils');

const createRoom = async (req, res, next) => {
  try {
    const { room } = req.body;
    await roomValidation.validate({ room });
    const roomExist = await Rooms.findOne({ room });
    if (roomExist) {
      const errResponse = createError(
        400,
        'Bad Request',
        'this room already exist, please pick another name'
      );
      return res.status(400).json(errResponse);
    }
    await Rooms.create({ room });
    return res
      .status(201)
      .json({ statusCode: 201, message: 'room has been created successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errResponse = createError(400, 'Bad Request', err.errors);
      return res.status(400).json(errResponse);
    }
    return next(err);
  }
};

module.exports = createRoom;
