const express = require('express');
const { reportIssue, getUserIssues } = require('../controllers/issueController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Report an issue
router.post('/report', authenticateUser, reportIssue);

// Get all issues reported by the user
router.get('/my-issues', authenticateUser, getUserIssues);

module.exports = router;
