const dbConn = require("../config/dbconnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
const register = (req, res) => {
  const body = req.body;
  const { username, email, password } = body;

  // Check if the email already exists
  dbConn.query(
    `SELECT email FROM users WHERE email = "${email}"`,
    (err, results) => {
      if (err) {
        // Send error response if email check query fails
        res.status(500).json({
          error: "Error while checking existing email",
        });
      } else if (results.length > 0) {
        // If email already exists, send 400 response
        res.status(400).json({
          error: "Email already in use",
        });
      } else {
        // Password hashing
        let hashedPassword = bcrypt.hashSync(password, 10);
        dbConn.query(
          `INSERT INTO users (username, password, email) VALUES ("${username}", "${hashedPassword}", "${email}")`,
          (err, result) => {
            if (err) {
              res.status(500).json({
                error: "Error while inserting data",
              });
            } else {
              // Send success response on successful registration
              res.status(201).json({
                message: "User registered successfully",
                data: result,
              });
            }
          }
        );
      }
    }
  );
};

// Login an existing user
const login = (req, res) => {
  const body = req.body;

  // Fetch user by email
  dbConn.query(
    `SELECT * FROM users WHERE email = "${body.email}"`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      // If user not found, return unauthorized
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = result[0];

      // Compare provided password with hashed password
      const isMatch = bcrypt.compareSync(body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Set token in HTTP-only cookie and return success response
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "Login successful",
          user: { id: user.id, username: user.username },
        });
    }
  );
};

// Logout user by clearing the token cookie
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/", // redirect to home page
  });

  return res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  register,
  login,
  logout,
};
