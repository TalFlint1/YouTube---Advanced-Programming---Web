const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads
const path = require('path');
const { getUserById, createUser, updateUserById, deleteUser } = require('../controllers/userController');
const User = require('../models/User');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Routes
// Register a new user
router.post('/register', upload.single('profile_picture'), createUser);

// Create a new user
router.post('/', upload.single('picture'), createUser);

// Get user details by ID
router.get('/:id', getUserById);

// Update user details by ID
router.put('/:id', upload.single('profile_picture'), updateUserById);

// Delete user by ID
router.delete('/:id', deleteUser);

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

module.exports = router;
