const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/auth');

const createToken = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Replace with your logic to find user in database
      const user = await User.findOne({ username });
  
      // Check if user exists and validate password
      if (!user || user.password !== password) {
        return res.status(404).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Respond with the token
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ error: 'Failed to generate token' });
    }
};

  module.exports = {
    createToken,
  };