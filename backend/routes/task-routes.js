const express = require("express");
const router = express.Router();

const {
  getTasks,
  addTask,
  deleteTaskById,
} = require("../controllers/task_controller");
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, getTasks);
router.post("/", isAuth, addTask);
router.delete("/:id", isAuth, deleteTaskById);

module.exports = router;
