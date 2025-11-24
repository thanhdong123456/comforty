const crypto = require("crypto");
const db = require("../config/db.js");

const verifyResetToken = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
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
    req.user = users[0];
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = verifyResetToken;
