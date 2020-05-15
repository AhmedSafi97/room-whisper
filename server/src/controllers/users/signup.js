const bcrypt = require('bcrypt');

const signupValidationSchema = require('../../utils/signupValidation');
const createError = require('../../utils/createError');
const { Users } = require('../../database/models');

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
        'bad request',
        'username is already taken'
      );
      return res.status(400).json(errResponse);
    }
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      const errResponse = createError(
        400,
        'bad request',
        'an account with this email already exists'
      );
      return res.status(400).json(errResponse);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({ username, email, password: hashedPassword });
    res
      .status(201)
      .json({ statusCode: 201, message: 'signed up successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errResponse = createError(400, 'bad request', err.errors);
      return res.status(400).json(errResponse);
    }
    next(err);
  }
};

module.exports = signup;
