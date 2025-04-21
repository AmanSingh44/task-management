// Import database connection
const dbConn = require("../config/dbconnection");

// Controller to get all tasks for the authenticated user
const getTasks = (req, res) => {
  const userId = req.user.id;

  dbConn.query(
    `SELECT id, title, description, created_at 
     FROM tasks 
     WHERE user_id = "${userId}"`,
    (err, results) => {
      if (err) {
        // Send error response if database query fails
        return res.status(500).json({ error: "Error fetching tasks", err });
      }

      // Send success response with tasks
      res.status(200).json({
        message: "Tasks fetched successfully",
        data: results,
      });
    }
  );
};

// Controller to add a new task for the authenticated user
const addTask = (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  dbConn.query(
    `INSERT INTO tasks (title, description, user_id) 
     VALUES ("${title}", "${description}", "${userId}")`,
    (err, result) => {
      if (err) {
        // Send error response if task insertion fails
        return res.status(500).json({ error: "Error adding task", err });
      }

      // Send success response with newly added task info
      res.status(201).json({
        message: "Task added successfully",
        data: { id: result.insertId, title, description },
      });
    }
  );
};

// Controller to delete task by ID for the authenticated user
const deleteTaskById = (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  dbConn.query(
    `DELETE FROM tasks 
     WHERE id = "${taskId}" AND user_id = "${userId}"`,
    (err, result) => {
      if (err) {
        // Send error response if deletion fails
        return res.status(500).json({ error: "Error deleting task", err });
      }

      // If no rows were affected, the task either doesn't exist or doesn't belong to the user
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Task not found or not yours" });
      }

      // Send success response after successful deletion
      res.status(200).json({
        message: "Task deleted successfully",
        data: { id: taskId },
      });
    }
  );
};

module.exports = {
  getTasks,
  addTask,
  deleteTaskById,
};
