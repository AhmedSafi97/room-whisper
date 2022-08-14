const bcrypt = require('bcrypt');

const { Users } = require('../models');

const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await Users.create({ username, email, password: hashedPassword });
};

module.exports = createUser;
