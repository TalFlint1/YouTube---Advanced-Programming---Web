const Video = require('../models/Video');

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().limit(20).sort({ $natural: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const newVideo = await Video.create(req.body);
    res.status(201).json({ message: 'Video created successfully', video: newVideo });
  } catch (err) {
    res.status(500).json({ message: 'Error creating video', error: err.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching video', error: err.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Video updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating video', error: err.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video', error: err.message });
  }
};

module.exports = {
  getVideos,
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
};
