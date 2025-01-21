import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 5000, // Timeout after 5 seconds
});

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }
};
