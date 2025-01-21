// // import { fetchUsers } from "../services/apiClient.js";

// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await fetchUsers();
// //     res.status(200).json(users);
// //   } catch (error) {
// //     console.error("Error fetching users:", error.message);
// //     res.status(500).json({ message: "Failed to retrieve users." });
// //   }
// // };

// // export const createUser = (req, res) => {
// //   const { name, email, phone } = req.body;

// //   if (!name || !email || !phone) {
// //     return res.status(400).json({ message: "All fields are required." });
// //   }

// //   const newUser = {
// //     id: Date.now(), // Temporary ID; replace with DB logic
// //     name,
// //     email,
// //     phone,
// //   };

// //   res.status(201).json({
// //     message: "User created successfully.",
// //     user: newUser,
// //   });
// // };

// // src/controllers/userController.js
// import { users } from "../db/db.js";

// // GET all users (Read)
// export const getAllUsers = (req, res) => {
//   res.status(200).json(users);
// };

// // GET a single user by ID (Read)
// export const getUserById = (req, res) => {
//   const { id } = req.params;
//   const user = users.find((user) => user.id === parseInt(id));

//   if (!user) {
//     return res.status(404).json({ message: "User not found." });
//   }

//   res.status(200).json(user);
// };

// // POST: Create a new user (Create)
// export const createUser = (req, res) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   const newUser = {
//     id: users.length + 1, // Auto-increment ID
//     name,
//     email,
//     phone,
//   };

//   users.push(newUser);

//   res.status(201).json({
//     message: "User created successfully.",
//     user: newUser,
//   });
// };

// // PUT: Update a user (Update)
// export const updateUser = (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone } = req.body;

//   const user = users.find((user) => user.id === parseInt(id));

//   if (!user) {
//     return res.status(404).json({ message: "User not found." });
//   }

//   user.name = name || user.name;
//   user.email = email || user.email;
//   user.phone = phone || user.phone;

//   res.status(200).json({
//     message: "User updated successfully.",
//     user,
//   });
// };

// // DELETE: Delete a user (Delete)
// export const deleteUser = (req, res) => {
//   const { id } = req.params;
//   const index = users.findIndex((user) => user.id === parseInt(id));

//   if (index === -1) {
//     return res.status(404).json({ message: "User not found." });
//   }

//   users.splice(index, 1);

//   res.status(200).json({ message: "User deleted successfully." });
// };

import { users } from "../db/db.js";


export const getAllUsers = (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to retrieve users." });
  }
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json(user);
};

// POST: Create a new user (Create)
export const createUser = (req, res) => {
  const { name, email, phone } = req.body;

  // validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Simple email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const newUser = {
    id: users.length + 1, // Auto-increment ID
    name,
    email,
    phone,
  };

  try {
    users.push(newUser); // Add user to the sample data

    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Failed to create user." });
  }
};

// PUT: Update a user (Update)
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Update user fields
  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  try {
    res.status(200).json({
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Failed to update user." });
  }
};

// DELETE: Delete a user (Delete)
export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  try {
    users.splice(index, 1); // Remove user from sample data
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Failed to delete user." });
  }
};
