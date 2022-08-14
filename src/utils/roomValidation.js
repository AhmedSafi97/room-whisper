const yup = require('yup');

const createError = require('./createError');

const roomValidationSchema = yup.object().shape({
  room: yup.string().required().min(5).max(20),
});

const validateRoomName = async (room) => {
  try {
    await roomValidationSchema.validate({ room });
  } catch (err) {
    throw createError(400, 'Bad Request', err.errors);
  }
};

module.exports = validateRoomName;
