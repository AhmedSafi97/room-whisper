const {
  validateLoginCredentials,
  getUserByEmail,
  checkPassword,
  createToken,
} = require('../../utils');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await validateLoginCredentials({ email, password });

    const user = await getUserByEmail(email);

    await checkPassword(password, user.password);

    const token = await createToken(user._id, user.role);

    res
      .cookie('token', token)
      .json({ statusCode: 200, message: 'logged in successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = login;
