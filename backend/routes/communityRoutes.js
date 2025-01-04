const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { authenticateUser } = require('../middleware/authMiddleware');


// Project routes
router.post('/projects',  authenticateUser,communityController.submitProject);
router.get('/projects', communityController.getProjects);
router.post('/projects/:projectId/contribute', authenticateUser, communityController.contributeToProject); // New contribution route


module.exports = router;
