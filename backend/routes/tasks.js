const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  const { title, description, projectId, status } = req.body;
  try {
    if (!title || !description || !projectId) {
      return res.status(400).json({ message: 'Title, description, and projectId are required' });
    }
    const task = new Task({
      title,
      description,
      projectId,
      userId: req.user.userId,
      status,
      completedAt: status === 'Done' ? new Date() : null,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/project/:projectId', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId,
      userId: req.user.userId,
    });
    res.json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:taskId', verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.status) {
      updates.completedAt = updates.status === 'Done' ? new Date() : null;
    }
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user.userId },
      updates,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.json(task);
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:taskId', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      userId: req.user.userId,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;