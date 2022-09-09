const UserService = require("../services/UserService");
const validator = require("../validation/validator");
const { createUserSchema } = require("../validation/userValidation");

class UserController {
  static async createUser(request) {
    const { username, email, password } = request.body;

    const validationResult = await validator({
      schema: createUserSchema,
      data: { username, email, password },
    });
    if (!validationResult.isValid) {
      return { statusCode: 400, body: { error: validationResult.error } };
    }

    try {
      await UserService.createUser({
        username,
        email,
        password,
      });
      return { statusCode: 201, body: { message: "success" } };
    } catch (error) {
      if (error.name !== "GenericError") throw error;
      return { statusCode: 400, body: { error: error.message } };
    }
  }
}

module.exports = UserController;
