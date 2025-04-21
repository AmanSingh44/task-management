import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  return (
    // Wrap the entire app with Router to enable routing functionality
    <Router>
      <Routes>
        {/* Home route ("/") which renders the Home component */}
        <Route path="/" element={<Home />} />

        {/* Login route ("/login") which renders the Login component */}
        <Route path="/login" element={<Login />} />

        {/* Register route ("/register") which renders the Register component */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
