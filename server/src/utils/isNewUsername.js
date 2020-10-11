const { Users } = require('../database/models');
const createError = require('./createError');

const isNewUsername = async (username) => {
  const usernameExist = await Users.findOne({ username });
  if (usernameExist)
    throw createError(400, 'Bad Request', 'username is already taken');
};

module.exports = isNewUsername;
