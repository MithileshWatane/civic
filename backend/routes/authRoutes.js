const express = require('express');
const { createUser, createGovernmentAccount } = require('../controllers/authController');
const router = express.Router();

// Register as a citizen
router.post('/citizen', createUser);

// Register as a government authority
router.post('/government', createGovernmentAccount);

module.exports = router;
