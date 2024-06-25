const Video = require('../models/Video');

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().limit(20);
        res.json(videos);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getUserVideos = async (req, res) => {
    try {
        const videos = await Video.find({ userId: req.params.id });
        res.json(videos);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.createVideo = async (req, res) => {
    const { title, description, url } = req.body;
    try {
        const video = new Video({ title, description, url, userId: req.params.id });
        await video.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        res.json(video);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.pid);
        res.json({ msg: 'Video deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
