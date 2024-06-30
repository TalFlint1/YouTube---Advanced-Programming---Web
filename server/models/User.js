// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profile_picture: { type: String }, // Store path to profile picture
});

const User = mongoose.model('User', userSchema);

module.exports = User;
