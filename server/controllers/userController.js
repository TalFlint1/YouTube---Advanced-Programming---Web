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

    if(!name) {
      return res.status(409).json({ message: 'You must enter a name' });
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return res.status(409).json({ message: 'Password must be between 8-16 characters and combine a-Z letters and numbers.' });
    }

    if(!profile_picture) {
      return res.status(409).json({ message: 'You must enter a picture' });
    }
    // Create new user
    const newUser = new User({ username, password, name, profile_picture });
    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser._id);

    // Respond with success message and token
    res.status(200).json({ message: 'User registered successfully', token ,profile_picture });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
};

// PATCH /api/users/:id - Update user by ID
const updateUserById = async (req, res) => {
  const { username } = req.params;
  const { name, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updateData = { name };
    if (password) updateData.password = password;
    if (profilePicture) updateData.profile_picture = profilePicture;

    const updatedUser = await User.findOneAndUpdate({ username }, updateData, { new: true });
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
  try {
    // Assuming you have a User model imported
    const { username } = req.params;
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, perform additional actions upon successful deletion
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
};
