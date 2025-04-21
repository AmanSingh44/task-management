// Import the custom Axios client
import client from "./client";

// Fetch all tasks for the authenticated user
export const getTasks = async () => {
  try {
    const { data } = await client.get("/tasks");
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

// Add a new task for the authenticated user
export const addTask = async (task) => {
  try {
    const { data } = await client.post("/tasks", task);
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

// Delete a specific task by its ID for the authenticated user
export const deleteTask = async (taskId) => {
  try {
    const { data } = await client.delete(`/tasks/${taskId}`);
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
