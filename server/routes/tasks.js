const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task({ text: req.body.text }); // fix here
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error saving task:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// PUT (update) a task
router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updatedTask);
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(deletedTask);
});

module.exports = router;
