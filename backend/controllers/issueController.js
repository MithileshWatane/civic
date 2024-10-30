const Issue = require('../models/Issue');

// Report a new issue
exports.reportIssue = async (req, res) => {
  const { description, location, image, taggedAuthorities } = req.body;

  try {
    const issue = new Issue({
      description,
      location,
      image,
      taggedAuthorities,
      status: 'Pending',
    });

    await issue.save();
    res.status(201).json({ issue });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all issues reported by a user
exports.getUserIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user.id });
    res.status(200).json({ issues });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific issue's details
exports.getIssueDetails = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.issueId);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    res.status(200).json({ issue });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
