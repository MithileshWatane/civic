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
  
      const token = jwt.sign({ userId: user._id , role: 'citizen'}, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user });
    } catch (error) {
      console.error('Error creating user:', error); // Log the error
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  /// Create a government authority account
exports.createGovernmentAccount = async (req, res) => {
  const { name, department, email, password, location } = req.body; // Added location field

  try {
    // Check if an account with the same email already exists
    let authority = await GovernmentAuthority.findOne({ email });
    if (authority) {
      return res.status(400).json({ message: 'Account already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new government authority account
    authority = new GovernmentAuthority({
      name,
      department,
      email,
      password: hashedPassword,
      location, // Include location in the new account
    });

    await authority.save();
    const payload = { id: authority._id, role: 'government' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Account created successfully', authority });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all government authorities
exports.getAllGovernmentAuthorities = async (req, res) => {
  try {
    const authorities = await GovernmentAuthority.find().select('name department email location');
    res.status(200).json(authorities);
  } catch (error) {
    console.error('Error fetching government authorities:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getGovernmentAuthorityById = async (req, res) => {
  try {
    const { id } = req.params;
    const authority = await GovernmentAuthority.findById(id).select('name department email location');

    if (!authority) {
      return res.status(404).json({ message: 'Government authority not found' });
    }

    res.status(200).json(authority);
  } catch (error) {
    console.error('Error fetching government authority:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Get all issues reported to the government authority
exports.getReportedIssues = async (req, res) => {
  const { authorityId } = req.params;

  try {
    // Fetch all issues tagged to the specific government authority
    const issues = await Issue.find({ taggedAuthorities: authorityId });
    res.status(200).json({ message: 'Issues fetched successfully', issues });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};