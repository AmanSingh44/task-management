import client from "./client";

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
