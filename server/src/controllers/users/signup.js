const bcrypt = require('bcrypt');

const { Users } = require('../../database/models');
const { createError, signupValidationSchema } = require('../../utils');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    await signupValidationSchema.validate(
      { username, email, password },
      {
        abortEarly: false,
      }
    );
    const usernameExist = await Users.findOne({ username });
    if (usernameExist) {
      const errResponse = createError(
        400,
        'Bad request',
        'username is already taken'
      );
      return res.status(400).json(errResponse);
    }
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      const errResponse = createError(
        400,
        'Bad request',
        'an account with this email already exists'
      );
      return res.status(400).json(errResponse);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({ username, email, password: hashedPassword });
    return res
      .status(201)
      .json({ statusCode: 201, message: 'signed up successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errResponse = createError(400, 'Bad request', err.errors);
      return res.status(400).json(errResponse);
    }
    return next(err);
  }
};

module.exports = signup;
