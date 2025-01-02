const express = require('express');
const router = express.Router();
const { getLoggedInUser } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Route to get the logged-in user's information
router.get('/me', authenticateUser, getLoggedInUser);

module.exports = router;
