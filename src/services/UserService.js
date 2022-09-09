const UserRepository = require("../repositories/UserRepository");
const AuthHelpers = require("../helpers/AuthHelpers");
const GenericError = require("../helpers/GenericError");

class UserService {
  static async createUser({ username, email, password }) {
    const userByEmail = await UserRepository.getUser({ email });
    if (userByEmail) {
      throw new GenericError("email already in use");
    }

    const userByUsername = await UserRepository.getUser({ username });
    if (userByUsername) {
      throw new GenericError("username already in use");
    }

    const hashedPassword = await AuthHelpers.hashPassword(password);
    await UserRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });
  }
}

module.exports = UserService;
