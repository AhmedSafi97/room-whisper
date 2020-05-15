const express = require('express');

const { clientError, serverError, signup } = require('./controllers');

const router = express.Router();

router.post('/signup', signup);

router.use(clientError);
router.use(serverError);

module.exports = router;
