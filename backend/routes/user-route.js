const express = require("express");
const router = express.Router();

// Import controller functions
const { register, login, logout } = require("../controllers/user_controller");

// Import middlewares
const userValidation = require("../middlewares/validate");
const { isAuth } = require("../middlewares/auth");

// Authentiaction routes with middlewares
router.post("/register", userValidation, register);
router.post("/login", login);
router.post("/logout", logout);

// Route to check if the user is authenticated
router.get("/is-auth", isAuth, async (req, res) => {
  const { user } = req;

  res.json({
    user: {
      id: user.id,
      name: user.username,
    },
  });
});

module.exports = router;
