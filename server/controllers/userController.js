const User = require('../models/User');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
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
  updateUserById,
  deleteUser,
};
