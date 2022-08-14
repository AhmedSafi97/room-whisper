const express = require('express');
const { getRooms, addRoom } = require('../controllers');
const expressCallback = require('../expressCallback');
const { withAuth } = require('../middleware');

const router = express.Router();

router.get('/rooms', withAuth, expressCallback(getRooms));
router.post('/rooms', withAuth, expressCallback(addRoom));

module.exports = router;
