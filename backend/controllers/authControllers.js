const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const { validate } = require("../utils/validation.js");

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

module.exports = { register, login };
