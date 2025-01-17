const express = require("express");
const { fetchUsers } = require("../services/apiClient");

const router = express.Router();

// Route: GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await fetchUsers();

    const transformedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company.name,
    }));

    res.json(transformedUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

module.exports = router;
