const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getVideos);
router.get('/user/:id', videoController.getUserVideos);
router.post('/user/:id', videoController.createVideo);
router.put('/user/:id/:pid', videoController.updateVideo);
router.delete('/user/:id/:pid', videoController.deleteVideo);

module.exports = router;
