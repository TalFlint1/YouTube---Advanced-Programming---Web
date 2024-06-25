const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectToMongoDB } = require('./db');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the YouTube clone API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
