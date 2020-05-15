const yup = require('yup');

const signupValidationSchema = yup.object().shape({
  username: yup.string().required().min(3).max(12),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

module.exports = signupValidationSchema;
