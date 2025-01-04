const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Project routes
router.post('/projects', communityController.submitProject);
router.get('/projects', communityController.getProjects);
router.post('/projects/:projectId/contribute', communityController.contributeToProject); // New contribution route


module.exports = router;
