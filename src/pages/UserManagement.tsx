import { useState, useEffect } from "react";
import { getAllUsers, registerUser, User } from "../services/UserService";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"add" | "view">("add");

  // Fetch all users from the Spring Boot backend database
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load user list from backend:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission to register a user
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill in all fields including the password!");
      return;
    }

    try {
      // Sends the complete payload with the password to the backend
      await registerUser({ username, email, password });
      
      // Reset form input fields completely
      setUsername("");
      setEmail("");
      setPassword("");
      
      // Refresh user list and switch view to display the grid
      await fetchUsers();
      setView("view");
    } catch (err) {
      console.error("Failed to register user:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>{view === "add" ? "Add User" : "User Database Grid"}</h2>
        <div>
          <button 
            onClick={() => setView("add")} 
            style={{ 
              marginRight: "10px", 
              padding: "8px 16px", 
              backgroundColor: view === "add" ? "#0d6efd" : "#fff", 
              color: view === "add" ? "#fff" : "#0d6efd",
              border: "1px solid #0d6efd",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Create User
          </button>
          <button 
            onClick={() => setView("view")} 
            style={{ 
              padding: "8px 16px", 
              backgroundColor: view === "view" ? "#0d6efd" : "#fff", 
              color: view === "view" ? "#fff" : "#0d6efd",
              border: "1px solid #0d6efd",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            View Users
          </button>
        </div>
      </div>

      <hr />

      {view === "add" ? (
        <form onSubmit={handleSaveUser} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "600px", margin: "20px auto" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              placeholder="Enter username"
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" style={{ padding: "12px", backgroundColor: "#198754", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "10px" }}>
            Save User
          </button>
        </form>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left", backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Username</th>
              <th style={{ padding: "12px" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "20px", textAlign: "center", color: "#666" }}>No users found in database.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>{user.id}</td>
                  <td style={{ padding: "12px" }}>{user.username}</td>
                  <td style={{ padding: "12px" }}>{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}