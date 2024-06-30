const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads
const path = require('path');
const { getUserById, createUser, updateUserById, deleteUser } = require('../controllers/userController');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/auth');


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

// POST /api/users - Create a new user
router.post('/', createUser);

// GET /api/users/:id - Get user details by ID
router.get('/:id', verifyToken, getUserById);

// PATCH /api/users/:id - Update user by ID
router.patch('/:id', verifyToken, updateUserById);

// DELETE /api/users/:id - Delete user by ID
router.delete('/:id', verifyToken, deleteUser);

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Login successful
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

// Example of using verifyToken middleware for protected routes
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Access user data from req.userData set by verifyToken middleware
    const user = await User.findById(req.userData._id); // Assuming you have User model imported

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
