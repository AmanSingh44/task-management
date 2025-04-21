// Import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Initialize Express application
const app = express();

// Import route handlers
const users = require("./routes/user-route");
const tasks = require("./routes/task-routes");

// Load environment variables from .env file
require("dotenv").config();

const PORT = process.env.PORT;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

// Enable CORS for frontend origin with credentials support
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to parse cookies from the request headers
app.use(cookieParser());

// Define route handlers
app.use("/users", users);
app.use("/tasks", tasks);

// Start the server
app.listen(PORT, () => {
  console.log(`Successfully running on port ${PORT}`);
});
