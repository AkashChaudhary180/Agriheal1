require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const diseaseRoutes = require("./routes/diseaseRoutes");
const path = require("path");

const app = express(); // <-- declare app FIRST

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", diseaseRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server (IPv4 to avoid EADDRINUSE on :::5000/7000)
const PORT = process.env.PORT || 5000;
// app.listen(PORT, "127.0.0.1", () => {
//   console.log(`AgriHeal backend running on http://127.0.0.1:${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`AgriHeal backend running on port ${PORT}`);
});
