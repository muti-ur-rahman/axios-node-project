// DOM Elements
const loadUsersBtn = document.getElementById("load-users");
const searchByIdBtn = document.getElementById("search-by-id-btn");
const searchByNameBtn = document.getElementById("search-by-name-btn");
const searchInput = document.getElementById("search-input");
const userList = document.getElementById("user-list");
const createUserForm = document.getElementById("create-user-form");

// Utility function to render a table
function renderTable(users) {
  userList.innerHTML = ""; // Clear previous content

  if (!users.length) {
    userList.innerHTML = "<p>No users found.</p>";
    return;
  }

  const table = `
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user) => `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
  userList.innerHTML = table;
}

// Fetch and handle user data
async function handleUserAction(actionType) {
  try {
    let url = "/api/users";
    let users = [];

    if (actionType === "load") {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch users");
      users = await response.json();
    } else if (actionType === "searchById") {
      const id = searchInput.value.trim();
      if (!id) return alert("Please enter an ID.");
      url = `/api/users/${id}`;
      const response = await fetch(url);
      if (response.status === 404) return renderTable([]);
      if (!response.ok) throw new Error("Failed to fetch user by ID");
      users = [await response.json()];
    } else if (actionType === "searchByName") {
      const name = searchInput.value.trim();
      if (!name) return alert("Please enter a name.");
      url = `/api/users?name=${encodeURIComponent(name)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch users by name");
      users = await response.json();
    }

    renderTable(users);
  } catch (error) {
    console.error(error.message);
    userList.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Create a new user
async function createUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("All fields are required.");
    return;
  }

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (!response.ok) throw new Error("Failed to create user");
    alert("User created successfully!");
    createUserForm.reset();
    handleUserAction("load"); // Reload the user list
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Attach Event Listeners
loadUsersBtn.addEventListener("click", () => handleUserAction("load"));
searchByIdBtn.addEventListener("click", () => handleUserAction("searchById"));
searchByNameBtn.addEventListener("click", () => handleUserAction("searchByName"));
createUserForm.addEventListener("submit", createUser);
