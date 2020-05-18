const yup = require('yup');

const roomValidationSchema = yup.object().shape({
  room: yup.string().required().min(5).max(20),
});

module.exports = roomValidationSchema;
