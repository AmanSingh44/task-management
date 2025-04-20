const dbConn = require("../config/dbconnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const register = (req, res) => {
  const body = req.body;
  const { username, email, password } = body;

  dbConn.query(
    `SELECT email FROM users WHERE email = "${email}"`,
    (err, results) => {
      if (err) {
        res.status(500).json({
          error: "Error while checking existing email",
        });
      } else if (results.length > 0) {
        // Email already exists
        res.status(400).json({
          error: "Email already in use",
        });
      } else {
        // Email does not exist, proceed with registration
        let hashedPassword = bcrypt.hashSync(password, 10);
        dbConn.query(
          `INSERT INTO users (username, password, email) VALUES ("${username}", "${hashedPassword}", "${email}")`,
          (err, result) => {
            if (err) {
              res.status(500).json({
                error: "Error while inserting data",
              });
            } else {
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

// Login
const login = (req, res) => {
  const body = req.body;

  dbConn.query(
    `SELECT * FROM users WHERE email = "${body.email}"`,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = result[0];
      const isMatch = bcrypt.compareSync(body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

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

const logout = (req, res) => {
  // Clear the 'token' cookie
  res.clearCookie("token", {
    httpOnly: true,
    path: "/", // Ensure this matches the path used when setting the cookie
  });

  return res.status(200).json({ message: "Logout successful" });
};

module.exports = { logout };

module.exports = {
  register,
  login,
  logout,
};
