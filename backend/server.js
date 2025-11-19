const express = require("express");
const cors = require("cors");
const siteData = require("../database/data/siteData");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/api/landing", (req, res) => {
  res.json(siteData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
