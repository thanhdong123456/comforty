const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers.js");
const verifyResetToken = require("../middleware/verifyToken.js");

router.post("/register", register);
router.post("/login", login);
router.post("/login/forgot-password", forgotPassword);
router.post("/reset-password/:token", verifyResetToken, resetPassword);

module.exports = router;
