const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/youtube_db'; // Replace with your MongoDB URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connectToMongoDB };
