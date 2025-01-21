import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// READ: Get all users
router.get("/", getAllUsers);

// READ: Get a user by ID
router.get("/:id", getUserById);

// CREATE: Add a new user
router.post("/", createUser);

// UPDATE: Update a user by ID
router.put("/:id", updateUser);

// DELETE: Remove a user by ID
router.delete("/:id", deleteUser);

export default router;
