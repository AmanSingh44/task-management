import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth"; // Adjust the import path as needed
import "./login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(true);
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowText(e.target.value.length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await registerUser({
        username,
        email,
        password,
      });

      if (response.error) {
        setError(response.error);
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      // Check if the error has a response from the server
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

        <label htmlFor="password" className="input_label">
          Password
        </label>
        <div className="text_area">
          <input
            type={showText ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="text_input"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <input type="submit" value="SIGN UP" className="btn" />
      </form>
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
