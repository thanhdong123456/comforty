const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validate } = require("../utils/validation.js");
const { sendEmailWithPool } = require("../services/emailService.js");

// --- Resgister --- //
const register = async (req, res) => {
  const { fullName, email, password, confirmPassword, termsAccepted } =
    req.body;
  const errors = validate({ fullName, email, password, confirmPassword });
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }
  if (!termsAccepted) {
    return res
      .status(400)
      .json({ message: "You must accept the Terms & Conditions" });
  }
  try {
    const [emailUser] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (emailUser.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashedPassword]
    );
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Database query error", error: err.message });
  }
};

// --- Login --- //
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const [userData] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (userData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = userData[0];

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Database query error", error: err.message });
  }
};

// --- Forgot password ---
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ message: "Email is not registered" });
    }
    const user = users[0];

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expires = Date.now() + 60 * 60 * 1000;

    await db.query(
      "UPDATE users SET resetToken = ?, resetTokenExpires = ? WHERE id = ?",
      [hashedToken, expires, user.id]
    );

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const subject = "Comforty - Reset your password";
    const text = `You requested password reset. Click the link: ${resetUrl} \nIf you didn't request, ignore. Link expires in 60 minutes.`;
    const html = `
      <p>Hello ${user.fullName || ""},</p>
      <p>You requested a password reset for your Comforty account.</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:10px 16px;background:#029FAE;color:#fff;border-radius:6px;text-decoration:none;">Reset Password</a></p>
      <p>If you did not request one, please ignore this email.</p>
    `;

    try {
      await sendEmailWithPool({ to: email, subject, text, html });
    } catch (sendErr) {
      console.error("Failed to send reset email", sendErr);
      return res.status(500).json({
        message: "Failed to send reset email. Please try again later.",
      });
    }

    return res.status(200).json({
      message: "Password reset email has been sent. Please check your inbox.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// --- Reset password ---
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const now = Date.now();
    const [users] = await db.query(
      "SELECT * FROM users WHERE resetToken = ? AND resetTokenExpires > ?",
      [hashedToken, now]
    );
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = users[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      "UPDATE users SET password = ? , resetToken = NULL, resetTokenExpires = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );
    return res
      .status(200)
      .json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// const verifyResetToken = async (req, res) => {
//   const { token } = req.params;
//   if (!token) {
//     return res.status(400).json({ message: "Token is required" });
//   }
//   try {
//     const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//     const now = Date.now();
//     const [users] = await db.query(
//       "SELECT id FROM users WHERE resetToken = ? AND resetTokenExpires > ?",
//       [hashedToken, now]
//     );
//     if (users.length === 0) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }
//     return res.status(200).json({ message: "Token valid" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = { register, login, forgotPassword, resetPassword };
