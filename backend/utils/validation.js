function validate(data) {
  const { fullName, email, password, confirmPassword } = data;

  const errors = [];

  if (!fullName || fullName.trim() === "") {
    errors.push("Full Name is required.");
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Valid email is required.");
  }
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  return errors;
}

module.exports = { validate };
