const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // To compare passwords
const jwt = require('jsonwebtoken'); // To generate JWT token
const User = require('../models/User'); // Assuming you have a User model

// Citizen Login Route
router.post('/citizen', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the role "citizen"
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Citizen user not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
