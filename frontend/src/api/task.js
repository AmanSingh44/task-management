import client from "./client";

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
