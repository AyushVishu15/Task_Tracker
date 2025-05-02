const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (user.projects.length >= 4) {
      return res.status(400).json({ message: 'Maximum 4 projects allowed' });
    }

    const project = new Project({
      title,
      description,
      user: userId,
    });

    await project.save();
    user.projects.push(project.id);
    await user.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};