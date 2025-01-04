const Project = require('../models/Project');

// Submit a new project
exports.submitProject = async (req, res) => {
  const { name, goalAmount, description } = req.body;
  try {
    const newProject = new Project({ name, goalAmount, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Contribution handler
exports.contributeToProject = async (req, res) => {
  const { projectId } = req.params;
  const { amount } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project's current funding
    project.funding += parseFloat(amount);
    await project.save();

    res.status(200).json({ message: 'Contribution successful', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};