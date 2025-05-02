const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    console.log('Create project attempt:', { title, userId: req.user.userId });
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const project = new Project({
      title,
      description,
      userId: req.user.userId,
    });
    await project.save();
    console.log('Project created:', project._id);
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.userId });
    res.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:projectId', verifyToken, async (req, res) => {
  try {
    console.log('Delete project attempt:', { projectId: req.params.projectId, userId: req.user.userId });
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      userId: req.user.userId,
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }
    console.log('Project deleted:', project._id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;