const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  duration: { type: String, required: true },
  owner: { type: String, required: true },
  views: { type: Number, default: 0 },
  time_publish: { type: Number, required: true },
  time_type: { type: String, required: true },
  user_icon: { type: String },
  likes: { type: Number, default: 0 },
  id: { type: Number, default: 0 },
  comments: [{ type: String }],
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
