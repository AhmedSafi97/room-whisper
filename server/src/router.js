const express = require('express');

const {
  clientError,
  serverError,
  signup,
  login,
  googleLogin,
} = require('./controllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/login/google', googleLogin);
router.use(clientError);
router.use(serverError);

module.exports = router;
