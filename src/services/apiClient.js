const axios = require("axios");
require("dotenv").config();

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.API_URL || "https://jsonplaceholder.typicode.com", // Default base URL
  timeout: 5000, // Timeout after 5 seconds
});

// Fetch users from the external API
async function fetchUsers() {
  try {
    const response = await apiClient.get("/users");
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }
}

module.exports = { fetchUsers };
