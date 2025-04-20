import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../hooks/index";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    const response = await login({ email, password });

    if (response.error) {
      console.log(response);
      setError("Invalid email or password.");
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
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

        {error && <div className="error-message">{error}</div>}

        <input type="submit" value="LOGIN" className="btn" />
      </form>
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
