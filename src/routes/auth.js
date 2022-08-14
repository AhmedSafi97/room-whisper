const express = require('express');
const {
  signup,
  login,
  googleLogin,
  checkToken,
  logout,
} = require('../controllers');
const expressCallback = require('../expressCallback');

const router = express.Router();

router.get('/checkToken', expressCallback(checkToken));
router.get('/logout', expressCallback(logout));
router.post('/signup', expressCallback(signup));
router.post('/login', expressCallback(login));
router.post('/login/google', expressCallback(googleLogin));

module.exports = router;
