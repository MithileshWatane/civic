const express = require('express');
const issueController = require('../controllers/issueController');
const { reportIssue , getIssuesByLoggedInUser , getIssuesByLoggedInGovernmentAuthority, modifyIssue , getAllIssues , deleteIssue} = issueController;
const { authenticateUser , authenticateGovernmentAuthority } = require('../middleware/authMiddleware');

const router = express.Router();

// Report an issue
router.post('/report', authenticateUser, reportIssue);

router.get('/user', authenticateUser, getIssuesByLoggedInUser);
router.get('/government', authenticateGovernmentAuthority, getIssuesByLoggedInGovernmentAuthority);
router.get('/get', getAllIssues);
router.put('/modify/:id' ,authenticateGovernmentAuthority, modifyIssue);

// Route for upvoting an issue
router.put('/trending/:id/upvote',  authenticateUser,issueController.upvoteIssue);
router.delete('/delete/:id', authenticateUser, issueController.deleteIssue);


module.exports = router;
