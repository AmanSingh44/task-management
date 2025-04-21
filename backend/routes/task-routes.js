const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getTasks,
  addTask,
  deleteTaskById,
} = require("../controllers/task_controller");

// Import authentication middleware
const { isAuth } = require("../middlewares/auth");

// Routes for Task Management
router.get("/", isAuth, getTasks);
router.post("/", isAuth, addTask);
router.delete("/:id", isAuth, deleteTaskById);

module.exports = router;
