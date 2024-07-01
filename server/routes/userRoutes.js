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
// POST /api/users - Create a new user
router.post('/', createUser);

router.post('/register', upload.single('profile_picture'), async (req, res) => {
  try {
    const { username, password, name } = req.body;
    let { profile_picture } = req.body;

    if (req.file) {
      const buffer = req.file.buffer.toString('base64');
      profile_picture = `data:${req.file.mimetype};base64,${buffer}`;
    }

    const newUser = new User({
      username,
      password,
      name,
      profile_picture,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error saving profile picture:', error);
    res.status(500).json({ error: 'Failed to save profile picture' });
  }
});

// GET /api/users/:id - Get user details by ID
router.get('/:username', auth.verifyToken, async (req, res) => {
  try {
    // Example assuming username is used to find user
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:username', verifyToken, updateUserById);

router.delete('/:username', verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
    const profile_picture = user["profile_picture"] 
    // Login successful
    res.status(200).json({ message: 'Login successful', token, profile_picture });
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
