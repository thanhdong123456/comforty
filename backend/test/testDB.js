const db = require("../config/db.js");

(async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("DB connected, test result:", rows);
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();
