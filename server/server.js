const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'your_mongodb_connection_string';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/videos', require('./routes/videos'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
