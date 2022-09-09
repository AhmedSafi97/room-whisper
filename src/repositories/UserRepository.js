const { Users } = require("../models");

class UserRepository {
  static getUser(options) {
    return Users.findOne({ ...options });
  }

  static createUser(user) {
    return Users.create(user);
  }
}

module.exports = UserRepository;
