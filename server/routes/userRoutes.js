const express = require('express');
const router = express.Router();
const multer = require('multer'); // For file uploads
const path = require('path');
const { getUserById, updateUserById, deleteUser } = require('../controllers/userController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Routes
// Get user details by ID
router.get('/:id', getUserById);

// Update user details by ID
router.put('/:id', upload.single('profile_picture'), updateUserById);

// Delete user by ID
router.delete('/:id', deleteUser);

module.exports = router;
