const { Users } = require('../models');
const createError = require('./createError');

const isNewEmail = async (email) => {
  const emailExist = await Users.findOne({ email });
  if (emailExist)
    throw createError(
      400,
      'Bad Request',
      'an account with this email already exists'
    );
};

module.exports = isNewEmail;
