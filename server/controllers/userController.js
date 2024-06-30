const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/auth');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// POST /api/users - Create a new user
const createUser = async (req, res) => {
  const { username, password, name, profile_picture } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({ username, password, name, profile_picture });
    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser._id);

    // Respond with success message and token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
};

// PATCH /api/users/:id - Update user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, name, profile_picture } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, name, profile_picture },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// DELETE /api/users/:id - Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
};
