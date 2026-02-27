import express from "express";
import Task from "../models/Task.js";
import protect from "../Middleware/authMiddleware.js";
const router = express.Router();


// 🔹 CREATE TASK
router.post("/", protect, async (req, res) => {
  try {

    const { Title, Description } = req.body;

    const newTask = await Task.create({
      Title,
      Description,
      user: req.user._id
    });

    res.status(201).json(newTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 GET USER TASKS
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 UPDATE TASK
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 DELETE TASK
router.delete("/:id", protect, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;