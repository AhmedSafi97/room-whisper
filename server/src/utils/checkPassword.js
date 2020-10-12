const bcrypt = require('bcrypt');

const createError = require('./createError');

const checkPassword = async (password, encryptedPassword) => {
  const comparisonResult = await bcrypt.compare(password, encryptedPassword);

  if (!comparisonResult)
    throw createError(401, 'Unauthorized', 'password is incorrect');
};

module.exports = checkPassword;
