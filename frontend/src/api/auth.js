// Import the pre-configured Axios client
import client from "./client";

/**
 * Registers a new user with the provided userInfo.
 * @param {Object} userInfo - Contains username, email, and password.
 * @returns {Object} - Response data from server or error object.
 */
export const registerUser = async (userInfo) => {
  try {
    const { data } = await client.post("/users/register", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

/**
 * Logs in a user using provided credentials.
 * @param {Object} userInfo - Contains email and password.
 * @returns {Object} - Response data or error object.
 */
export const loginUser = async (userInfo) => {
  try {
    const { data } = await client.post("/users/login", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

/**
 * Logs out the currently authenticated user.
 * @returns {Object} - Response message or error object.
 */
export const logoutUser = async () => {
  try {
    const { data } = await client.post("/users/logout");
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

/**
 * Checks whether the user is currently authenticated.
 * @returns {Object} - Auth status and user info or error object.
 */
export const getIsAuth = async () => {
  try {
    const { data } = await client.get("/users/is-auth");
    return data;
  } catch (error) {
    const { response } = error;
    if (response && response.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
