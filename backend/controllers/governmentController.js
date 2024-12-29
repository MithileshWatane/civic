const GovernmentAuthority = require('../models/GovernmentAuthority');
const Issue = require('../models/Issue');
// Create a government authority account
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

exports.createGovernmentAccount = async (req, res) => {
  const { name, department, email, password, location } = req.body;

  try {
    // Validate required fields
    if (!name || !department || !email || !password || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email is already registered
    let authority = await GovernmentAuthority.findOne({ email });
    if (authority) {
      return res.status(400).json({ message: 'Account already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new government authority account
    authority = new GovernmentAuthority({
      name,
      department,
      email,
      password: hashedPassword, // Save hashed password
      location,
    });

    await authority.save();
    res.status(201).json({ message: 'Account created successfully', authority });
  } catch (error) {
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

// Update the status of a reported issue
exports.updateIssueStatus = async (req, res) => {
  const { status } = req.body;
  const { issueId } = req.params;

  try {
    // Find the issue by its ID
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Update the issue's status
    issue.status = status;
    await issue.save();

    res.status(200).json({ message: 'Issue status updated successfully', issue });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
