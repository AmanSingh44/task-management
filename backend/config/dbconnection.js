const mysql = require("mysql");
// Load environment variables from .env file
require("dotenv").config();

// Create a MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});

// Establish the connection to the database
connection.connect((err) => {
  if (err) {
    // Log error if connection fails
    console.log("Connection Error", err);
  } else {
    // Log success message if connected
    console.log("Database Connected Successfully");
  }
});

module.exports = connection;
