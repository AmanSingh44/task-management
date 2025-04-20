const dbConn = require("../config/dbconnection");

const getTasks = (req, res) => {
  const userId = req.user.id;
  console.log(req.user);

  dbConn.query(
    `SELECT id, title, description, created_at 
     FROM tasks 
     WHERE user_id = "${userId}"`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching tasks", err });
      }
      res.status(200).json({
        message: "Tasks fetched successfully",
        data: results,
      });
    }
  );
};

const addTask = (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  dbConn.query(
    `INSERT INTO tasks (title, description, user_id) 
     VALUES ("${title}", "${description}", "${userId}")`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error adding task", err });
      }
      res.status(201).json({
        message: "Task added successfully",
        data: { id: result.insertId, title, description },
      });
    }
  );
};

const deleteTaskById = (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  dbConn.query(
    `DELETE FROM tasks 
     WHERE id = "${taskId}" AND user_id = "${userId}"`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting task", err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Task not found or not yours" });
      }
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
