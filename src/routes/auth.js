const express = require("express");
const expressCallback = require("../expressCallback");
const { AuthController, UserController } = require("../controllers");

const router = express.Router();

router.post("/signup", expressCallback(UserController.createUser));
router.post(
  "/authenticate/token",
  expressCallback(AuthController.authenticateWithToken)
);
router.post(
  "/authenticate/google",
  expressCallback(AuthController.authenticateWithGoogle)
);
router.post("/authenticate", expressCallback(AuthController.authenticate));

module.exports = router;
