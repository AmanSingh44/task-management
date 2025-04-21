import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Signup = () => {
  // State variables for capturing user input and error messages
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
  const [error, setError] = useState(""); // State to hold error messages

  // Hook for navigation after successful registration
  const navigate = useNavigate();

  // Handle password change and toggle password visibility based on length
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear previous error messages

    try {
      // Send a POST request to register the user
      const response = await registerUser({
        username,
        email,
        password,
      });

      // If the response contains an error, display it
      if (response.error) {
        setError(response.error);
      } else {
        // If successful, navigate the user to the login page
        navigate("/login", { replace: true });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <h4>Sign Up</h4>
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <label htmlFor="username" className="input_label">
          Username
        </label>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text_input"
            required
          />
        </div>

        {/* Email input field */}
        <label htmlFor="email" className="input_label">
          Email
        </label>
        <div className="text_area">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text_input"
            required
          />
        </div>

        {/* Password input field with toggle visibility */}
        <label htmlFor="password" className="input_label">
          Password
        </label>
        <div className="text_area" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="text_input"
            required
          />
          {/* FontAwesome Eye Icon for toggling password visibility */}
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#999",
            }}
          />
        </div>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit button to trigger form submission */}
        <input type="submit" value="SIGN UP" className="btn" />
      </form>

      {/* Link to navigate to the login page if user already has an account */}
      <span className="link_line">
        Already have an account?
        <Link className="link" to="/login">
          Log in
        </Link>
      </span>
    </div>
  );
};

export default Signup;
