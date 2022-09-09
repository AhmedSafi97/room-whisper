const UserRepository = require("../repositories/UserRepository");
const AuthHelpers = require("../helpers/AuthHelpers");
const GenericError = require("../helpers/GenericError");

class AuthService {
  static async authenticate({ email, password }) {
    const user = await UserRepository.getUser({ email });
    if (!user) {
      throw new GenericError("please double check your password and email");
    }

    const isCorrectPassword = await AuthHelpers.checkPassword(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      throw new GenericError("please double check your password and email");
    }

    const token = await AuthHelpers.generateToken({
      id: user._id,
      role: user.role,
    });

    return { token, user };
  }

  static async authenticateWithToken(tokenId) {
    const payload = await AuthHelpers.verifyToken(tokenId);
    const user = await UserRepository.getUser({ _id: payload.id });

    return { user };
  }

  static async authenticateWithGoogle(tokenId) {
    let username;
    let email;

    try {
      const payload = await AuthHelpers.verifyGoogleToken(tokenId);
      username = payload.name;
      email = payload.email;
    } catch (err) {
      throw new GenericError(err.message);
    }

    let user = await UserRepository.getUser({ email });
    if (!user) {
      user = await UserRepository.createUser(user);
    }

    const token = await AuthHelpers.generateToken({ id: user._id });

    return { token, user };
  }
}

module.exports = AuthService;
