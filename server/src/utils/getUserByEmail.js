const { Users } = require('../database/models');
const createError = require('./createError');

const getUserByEmail = async (email) => {
  const user = await Users.findOne({ email });

  if (!user)
    throw createError(
      400,
      'Bad Request',
      'an account with this email does not exist'
    );

  return user;
};

module.exports = getUserByEmail;
