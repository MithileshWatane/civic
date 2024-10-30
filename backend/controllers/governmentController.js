const GovernmentAuthority = require('../models/GovernmentAuthority');
const Issue = require('../models/Issue');

// Create a government authority account
exports.createGovernmentAccount = async (req, res) => {
  const { name, department, email, password } = req.body;

  try {
    let authority = await GovernmentAuthority.findOne({ email });
    if (authority) return res.status(400).json({ message: 'Account already exists' });

    authority = new GovernmentAuthority({
      name,
      department,
      email,
      password,
    });

    await authority.save();
    res.status(201).json({ authority });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all issues reported to the government authority
exports.getReportedIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ taggedAuthorities: req.params.authorityId });
    res.status(200).json({ issues });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the status of a reported issue
exports.updateIssueStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const issue = await Issue.findById(req.params.issueId);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.status = status;
    await issue.save();

    res.status(200).json({ issue });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
