const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// GET tasks for logged-in user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId });
  res.json(tasks);
});

// POST a new task
router.post('/', auth, async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      user: req.user.userId
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Error creating task" });
  }
});

// PUT task
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    { completed: req.body.completed },
    { new: true }
  );
  res.json(task);
});

// DELETE task
router.delete('/:id', auth, async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
  res.json(deleted);
});

module.exports = router;
