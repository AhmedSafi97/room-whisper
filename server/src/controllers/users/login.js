const bcrypt = require('bcrypt');

const { Users } = require('../../database/models');
const {
  createError,
  loginValidationSchema,
  signToken,
} = require('../../utils');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await loginValidationSchema.validate(
      { email, password },
      {
        abortEarly: false,
      }
    );
    const userData = await Users.findOne({ email });
    if (!userData) {
      const errResponse = createError(
        400,
        'Bad request',
        'an account with this email does not exist'
      );
      return res.status(400).json(errResponse);
    }
    const compareResult = await bcrypt.compare(password, userData.password);
    if (!compareResult) {
      const errResponse = createError(
        401,
        'Unauthorized',
        'password is incorrect'
      );
      return res.status(401).json(errResponse);
    }
    const payload = { id: userData._id };
    const token = await signToken(payload);
    return res
      .cookie('user', token)
      .json({ statusCode: 200, message: 'logged in successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errResponse = createError(400, 'Bad request', err.errors);
      return res.status(400).json(errResponse);
    }
    return next(err);
  }
};

module.exports = login;
