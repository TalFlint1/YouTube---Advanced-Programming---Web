const mongoose = require('mongoose');
const { Schema } = mongoose;


const videoWatchSchema = new Schema({
  userId: { type: String, required: true },
  videoId: { type: Number, required: true },
  date: { type: Date},

});

const VideoWatch = mongoose.model('VideoWatch', videoWatchSchema);

module.exports = VideoWatch;
