const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Project routes
router.post('/projects', communityController.submitProject);
router.get('/projects', communityController.getProjects);
router.post('/projects/:projectId/contribute', communityController.contributeToProject); // New contribution route

// Message routes
router.post('/messages', communityController.submitMessage);
router.get('/messages', communityController.getMessages);

module.exports = router;
