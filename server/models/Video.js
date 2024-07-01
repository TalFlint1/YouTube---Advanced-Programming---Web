const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  replies: { type: [this], default: [] }, // Array of subdocuments
  videoId: { type: Number, required: true },
});

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  duration: { type: String, required: true },
  owner: { type: String, required: true },
  views: { type: Number, default: 0 },
  time_publish: { type: Number, required: true },
  time_type: { type: String, required: true },
  user_icon: { type: String, required: true },
  likes: { type: Number, default: 0 },
  id: { type: Number, default: 0 },
  liked: { type: Number, default: 0 },
  comments: { type: [commentSchema], default: [] }, // Array of comment subdocuments
  liked: { type: Boolean, default: null },
 // userId: { type: mongoose.Types.ObjectId, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
