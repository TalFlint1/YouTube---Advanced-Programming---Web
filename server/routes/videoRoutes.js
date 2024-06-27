const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Routes
router.get('/', videoController.getVideos);
router.get('/user/:id/videos', videoController.getUserVideos);
router.post('/user/:id/videos', videoController.createVideo);
router.get('/user/:id/videos/:pid', videoController.getVideo);
router.put('/user/:id/videos/:pid', videoController.updateVideo);
router.delete('/user/:id/videos/:pid', videoController.deleteVideo);

module.exports = router;
