import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../hooks/index";
import { getTasks, addTask, deleteTask } from "../api/task";
import "./home.css";

const Home = () => {
  // Extract user and logout function from context
  const { user, logout } = useContext(AuthContext);

  // State for holding tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        if (response && response.data) {
          setTasks(response.data); // Update state with fetched tasks
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

  // States for new task input
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [modalTask, setModalTask] = useState(null); // State for modal task details

  // Handler for adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = { title: newTitle, description: newDesc };

    try {
      const response = await addTask(newTask);
      if (response && response.data) {
        // Prepend the newly added task to the task list
        setTasks([response.data, ...tasks]);
        setNewTitle(""); // Clear input fields
        setNewDesc("");
      } else {
        console.error("Failed to add task:", response.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handler for deleting a task
  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      if (response && response.message === "Task deleted successfully") {
        // Refetch tasks after deletion
        const tasksResponse = await getTasks();
        if (tasksResponse && tasksResponse.data) {
          setTasks(tasksResponse.data); // Update task list after deletion
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
      {/* Navigation bar with conditional rendering based on user authentication */}
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

      {/* Main content area, blurred when user is not logged in */}
      <div className={`main-wrapper ${!user ? "blurred" : ""}`}>
        {/* Task list section */}
        <div className="task-section">
          <h2>
            {user?.username
              ? `${user.username.split(" ")[0]}'s Task List` //Ectracting name from user context
              : "Task List"}
          </h2>
          <div className="task-scroll">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => setModalTask(task)} // Open task in modal on click
              >
                <div className="task-title">{task.title}</div>
                <div className="task-desc">
                  {task.description.length > 60
                    ? task.description.slice(0, 60) + "..."
                    : task.description}
                </div>
                {/* Delete button */}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening when clicking delete
                    handleDelete(task.id); // Call delete handler
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Task creation section */}
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

      {/* Overlay message when user is not logged in */}
      {!user && (
        <div className="overlay-message">
          <span>
            Please
            <Link className="link" to="/login">
              {" "}
              log in{" "}
            </Link>
            to view and manage your tasks.
          </span>
        </div>
      )}

      {/* Modal for viewing task details */}
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
