const Issue = require('../models/Issue');

exports.reportIssue = async (req, res) => {
  const { title, description, location, governmentAuthority } = req.body;

  try {
    // Ensure req.user is defined
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const issue = new Issue({
      title,
      description,
      location,
      governmentAuthority,
      reportedBy: req.user.id, // Access user ID
    });

    await issue.save();
    res.status(201).json({ message: 'Issue reported successfully', issue });
  } catch (error) {
    console.error('Error reporting issue:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all issues reported by a user
exports.getUserIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user.id }).populate('governmentAuthority');
    res.status(200).json({ issues });
  } catch (error) {
    console.error('Error fetching user issues:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
