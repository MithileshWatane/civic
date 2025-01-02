const Project = require('../models/Project');
const Message = require('../models/Message');

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

// Upvote a project
exports.upvoteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(projectId, { $inc: { upvotes: 1 } }, { new: true });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Submit a new message
exports.submitMessage = async (req, res) => {
  const { user, text } = req.body;
  try {
    const newMessage = new Message({ user, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
