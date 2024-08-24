const mongoose = require('mongoose');
const { Schema } = mongoose;


const videoWatchSchema = new Schema({
  userId: { type: Number, required: true },
  videoId: { type: Number, required: true },
  date: { type: String},

});

const VideoWatch = mongoose.model('VideoWatch', videoWatchSchema);

module.exports = VideoWatch;
