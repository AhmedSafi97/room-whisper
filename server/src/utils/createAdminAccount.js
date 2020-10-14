// only used for testing
const bcrypt = require('bcrypt');

const { Users } = require('../database/models');

const createAdmin = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await Users.create({
    username,
    email,
    password: hashedPassword,
    role: 'admin',
  });
};

module.exports = createAdmin;
