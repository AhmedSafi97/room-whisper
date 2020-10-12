const yup = require('yup');

const createError = require('./createError');

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required().max(50),
  password: yup.string().required().min(8).max(20),
});

const validateLoginCredentials = async ({ email, password }) => {
  try {
    await loginValidationSchema.validate(
      { email, password },
      {
        abortEarly: false,
      }
    );
  } catch (err) {
    throw createError(400, 'Bad Request', err.errors);
  }
};

module.exports = validateLoginCredentials;
