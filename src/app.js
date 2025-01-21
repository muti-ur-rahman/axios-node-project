// import express from "express";
// import cors from "cors";
// import usersRoute from "./routes/users.js";

// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/users", usersRoute);

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Welcome to the Axios-Node.js CRUD Project!");
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Importing fileURLToPath to get the current directory
import userRoutes from "./routes/users.js"; // Your routes

const app = express();

// Get the current directory name (workaround for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON body
app.use(express.json()); // This ensures the request body is parsed as JSON

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// API routes for user management
app.use("/api/users", userRoutes);

// Catch-all route to serve the UI (HTML page)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
