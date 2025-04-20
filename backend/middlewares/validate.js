// user-validation.js
const userValidation = (req, res, next) => {
  const { username, password, email } = req.body;

  // Check for missing username
  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  // Check for missing email
  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  // Check for valid email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Check for missing password
  if (!password) {
    return res.status(400).json({ error: "Missing password" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  next();
};

module.exports = userValidation;
