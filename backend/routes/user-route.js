const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/user_controller");
const userValidation = require("../middlewares/validate");
const { isAuth } = require("../middlewares/auth");

router.post("/register", userValidation, register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/is-auth", isAuth, async (req, res) => {
  const { user } = req;

  res.json({
    user,
    user: {
      id: user.id,
      name: user.username,
    },
  });
});

module.exports = router;
