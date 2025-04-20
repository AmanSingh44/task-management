import React, { useState, useEffect } from "react";
import AuthContext from "../hooks/index";
import { loginUser, getIsAuth, logoutUser } from "../api/auth"; // Ensure these functions are correctly implemented

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle the loading state during authentication check

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await getIsAuth();
      if (response && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Run the authentication check on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      console.log(response);
      if (response && response.user) {
        setUser(response.user);
        return { success: true };
      } else {
        return { success: false, error: "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "Login error" };
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await logoutUser();
      // Implement a logout API call if needed to invalidate the session on the server
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // While checking authentication, you can render a loading indicator or null
  if (loading) {
    return null; // Or a loading spinner/component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
