const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const users = require("./routes/user-route");
const tasks = require("./routes/task-routes");
require("dotenv").config();

const PORT = process.env.PORT;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", users);
app.use("/tasks", tasks);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
