const yup = require('yup');

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required().max(50),
  password: yup.string().required().min(8).max(20),
});

module.exports = loginValidationSchema;
