const User = require('../models/User');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

const createUser = async (req, res) => {
  const { username, password, name } = req.body;
  const profile_picture = req.file ? req.file.path : null; // Correctly assign profile_picture

  console.log('Received data:', { username, password, name, profile_picture });

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      password, // Ensure password hashing in production
      name,
      profile_picture, // Correctly reference profile_picture here
    });

    // Save user to database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params; // Get user ID from parameters
  const { username, name, profile_picture } = req.body; // Get updated data from request body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, name, profile_picture },
      { new: true } // Return the updated user object
    );

    res.json(updatedUser); // Respond with updated user object
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
};
