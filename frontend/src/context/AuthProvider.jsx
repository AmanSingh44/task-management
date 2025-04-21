import React, { useState, useEffect } from "react";
import AuthContext from "../hooks/index";
import { loginUser, getIsAuth, logoutUser } from "../api/auth";

const AuthProvider = ({ children }) => {
  // State variables for managing authentication status
  const [user, setUser] = useState(null); // Store the authenticated user's data
  const [loading, setLoading] = useState(true); // To handle the loading state during authentication check

  // Function to check if the user is authenticated by calling the API
  const checkAuth = async () => {
    try {
      const response = await getIsAuth();
      if (response && response.user) {
        // If user data is found, set the user state with the returned user data
        setUser(response.user);
      } else {
        // If no user is authenticated, set user to null
        setUser(null);
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      // In case of an error during the check, clear any user data
      setUser(null);
    } finally {
      // Set loading to false once the authentication check is complete (whether successful or not)
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Function to log in the user with provided credentials
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials); // Call API to log in with the credentials
      console.log(response);
      if (response && response.user) {
        // If login is successful, set the user state with the returned user data
        setUser(response.user);
        return { success: true };
      } else {
        // If login fails, return an error
        return { success: false, error: "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle any errors that occur during login
      return { success: false, error: error.message || "Login error" };
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      await logoutUser();
      // After successful logout, clear the user data
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return null;
  }

  // Return the AuthContext provider with the current user, login, and logout functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Render the children components wrapped in this provider */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
