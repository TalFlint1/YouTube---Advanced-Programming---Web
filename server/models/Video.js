const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    views: Number,
});

module.exports = mongoose.model('Video', VideoSchema);
