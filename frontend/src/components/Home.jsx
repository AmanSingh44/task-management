// pages/Home.js
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../hooks/index";
import { getTasks, addTask, deleteTask } from "../api/task";
import "./home.css";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([
    // Your initial tasks here
  ]);
  console.log(user);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        if (response && response.data) {
          setTasks(response.data);
        } else {
          console.error(
            "Failed to fetch tasks:",
            response.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [modalTask, setModalTask] = useState(null);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      title: newTitle,
      description: newDesc,
    };

    try {
      const response = await addTask(newTask);
      if (response && response.data) {
        // Prepend the newly added task to the task list
        setTasks([response.data, ...tasks]);
        setNewTitle("");
        setNewDesc("");
      } else {
        console.error("Failed to add task:", response.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      if (response && response.message === "Task deleted successfully") {
        // Refetch tasks after deletion
        const tasksResponse = await getTasks();
        if (tasksResponse && tasksResponse.data) {
          setTasks(tasksResponse.data);
        } else {
          console.error(
            "Failed to fetch tasks:",
            tasksResponse.error || "Unknown error"
          );
        }
      } else {
        console.error(
          "Failed to delete task:",
          response.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="home-body">
      <nav className="navbar">
        <Link to="/" className="nav-item">
          Home
        </Link>
        {user ? (
          <button onClick={logout} className="nav-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-item">
            Login
          </Link>
        )}
      </nav>

      <div className={`main-wrapper ${!user ? "blurred" : ""}`}>
        <div className="task-section">
          <h2>Task List</h2>
          <div className="task-scroll">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => setModalTask(task)}
              >
                <div className="task-title">{task.title}</div>
                <div className="task-desc">
                  {task.description.length > 60
                    ? task.description.slice(0, 60) + "..."
                    : task.description}
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="add-task-section">
          <h2>Add Task</h2>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="input-field"
              required
            />
            <textarea
              placeholder="Task description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="input-field desc-field"
            />
            <button type="submit" className="add_btn">
              Add
            </button>
          </form>
        </div>
      </div>

      {!user && (
        <div className="overlay-message">
          <span>
            Please
            <Link className="link" to="/login">
              log in
            </Link>
            to view and manage your tasks.
          </span>
        </div>
      )}

      {modalTask && (
        <div className="modal-backdrop" onClick={() => setModalTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalTask.title}</h2>
            <p>{modalTask.description}</p>
            <button className="close-btn" onClick={() => setModalTask(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
