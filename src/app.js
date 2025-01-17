const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/users");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRoute);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Axios-Node.js Project!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
