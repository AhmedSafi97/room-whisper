const AuthService = require("../services/AuthService");

class AuthController {
  static async authenticate(request) {
    const { email, password } = request.body;

    try {
      const { token, user } = await AuthService.authenticate({
        email,
        password,
      });
      return { statusCode: 200, body: { message: "success", token, user } };
    } catch (error) {
      if (error.name !== "GenericError") throw error;
      return { statusCode: 400, body: { error: error.message } };
    }
  }

  static async authenticateWithGoogle(request) {
    const { tokenId } = request.body;

    try {
      const { token, user } = await AuthService.authenticateWithGoogle(tokenId);
      return { statusCode: 200, body: { message: "success", token, user } };
    } catch (error) {
      if (error.name !== "GenericError") throw error;
      return { statusCode: 400, body: { error: error.message } };
    }
  }

  static async authenticateWithToken(request) {
    const { tokenId } = request.body;

    try {
      const { user } = await AuthService.authenticateWithToken(tokenId);
      return { statusCode: 200, body: { message: "success", user } };
    } catch (error) {
      if (error.name !== "GenericError") throw error;
      return { statusCode: 400, body: { error: error.message } };
    }
  }
}

module.exports = AuthController;
