const express = require('express');

const {
  clientError,
  serverError,
  signup,
  login,
  googleLogin,
  checkToken,
  logout,
  getRooms,
  createRoom,
} = require('./controllers');

const { withAuth } = require('./middleware');

const router = express.Router();

router.get('/checkToken', checkToken);
router.get('/logout', logout);
router.get('/rooms', withAuth, getRooms);
router.post('/rooms', withAuth, createRoom);
router.post('/signup', signup);
router.post('/login', login);
router.post('/login/google', googleLogin);
router.use(clientError);
router.use(serverError);

module.exports = router;
