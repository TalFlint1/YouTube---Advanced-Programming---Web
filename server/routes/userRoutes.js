const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads
const path = require('path');
const { getUserById, createUser, updateUserById, deleteUser } = require('../controllers/userController');

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

module.exports = router;
