const express = require('express');
const router = express.Router();
const videoWatchController = require('../controllers/videoWatchController');

// Routes
router.post('/user/:id/videos', videoWatchController.createVideoWatch);


module.exports = router;
