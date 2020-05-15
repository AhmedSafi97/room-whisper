const express = require('express');

const { clientError, serverError, signup, login } = require('./controllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(clientError);
router.use(serverError);

module.exports = router;
