import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../hooks/index";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  // Destructuring login function from AuthContext for user authentication
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation after successful login

  // State variables to store email, password, visibility of password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setError(""); // Reset error message

    // login with email and password
    const response = await login({ email, password });

    // If error occurs, display error message
    if (response.error) {
      console.log(response);
      setError("Invalid email or password.");
    } else {
      // On successful login, redirect user to the home page
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
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
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text_input"
            required
          />
          {/* Toggle password visibility icon */}
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

        {/* Submit button for login */}
        <input type="submit" value="LOGIN" className="btn" />
      </form>

      {/* Link to redirect user to the registration page if they don't have an account */}
      <span className="link_line">
        Don’t have an account?
        <Link className="link" to="/register">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default Login;
