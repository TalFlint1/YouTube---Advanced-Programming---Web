const express = require('express');
const router = express.Router();
const videoWatchController = require('../controllers/videoWatchController');

// Routes
router.post('/user/:id/videos', videoWatchController.recordVideoWatch);
router.get('/all', videoWatchController.retrieveAllVideoWatches);
router.get('/user/:id/reccomendations', videoWatchController.getVideoRecommendations);


module.exports = router;
