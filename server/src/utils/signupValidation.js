const yup = require('yup');

const signupValidationSchema = yup.object().shape({
  username: yup.string().required().min(3).max(12),
  email: yup.string().email().required().max(50),
  password: yup.string().required().min(8).max(20),
});

module.exports = signupValidationSchema;
