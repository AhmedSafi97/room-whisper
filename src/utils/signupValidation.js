const yup = require('yup');

const createError = require('./createError');

const signupValidationSchema = yup.object().shape({
  username: yup.string().required().min(3).max(12),
  email: yup.string().email().required().max(50),
  password: yup.string().required().min(8).max(20),
});

const validateSignUpData = async (userData) => {
  try {
    await signupValidationSchema.validate(userData, {
      abortEarly: false,
    });
  } catch (err) {
    throw createError(400, 'Bad Request', err.errors);
  }
};

module.exports = validateSignUpData;
