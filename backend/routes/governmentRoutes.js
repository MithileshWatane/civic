const express = require('express');
const router = express.Router();
const { getAllGovernmentAuthorities } = require('../controllers/authController');


// Route to fetch government authorities
router.get('/', getAllGovernmentAuthorities);


module.exports = router;
