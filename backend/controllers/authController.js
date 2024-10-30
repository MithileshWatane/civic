const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GovernmentAuthority = require('../models/GovernmentAuthority');
// Register Citizen
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      user = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user });
    } catch (error) {
      console.error('Error creating user:', error); // Log the error
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Register Government Authority
  exports.createGovernmentAccount = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let authority = await GovernmentAuthority.findOne({ email });
      if (authority) return res.status(400).json({ message: 'Authority already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      authority = new GovernmentAuthority({
        name,
        email,
        password: hashedPassword,
      });
  
      await authority.save();
  
      const token = jwt.sign({ authorityId: authority._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, authority });
    } catch (error) {
      console.error('Error creating authority account:', error); // Log the error
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };