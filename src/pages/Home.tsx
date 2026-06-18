import { useState } from "react";
import AuthPage from "./AuthPage";
import UserManagement from "./UserManagement";
import TaskList from "./TaskList"; // Fixed path and component name based on your file tree

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tasks" | "users">("tasks");

  if (!currentUser) {
    return <AuthPage onLoginSuccess={(username) => setCurrentUser(username)} />;
  }

  return (
    <div className="container mt-4">
      {/* Global Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 d-flex justify-content-between align-items-center rounded shadow-sm mb-4">
        <span className="navbar-brand mb-0 h1">Task Manager System</span>
        
        <div className="d-flex align-items-center gap-3">
          <span className="text-white bg-secondary px-3 py-1 rounded-pill small fw-bold">
            👤 Welcome, {currentUser}
          </span>
          <button 
            type="button"
            className="btn btn-outline-danger btn-sm" 
            onClick={() => setCurrentUser(null)}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link fw-bold ${activeTab === "tasks" ? "active text-primary" : "text-muted"}`}
            onClick={() => setActiveTab("tasks")}
          >
            📋 Manage Tasks
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link fw-bold ${activeTab === "users" ? "active text-primary" : "text-muted"}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users (Database)
          </button>
        </li>
      </ul>

      {/* Dynamic Workspace Workspace */}
      <div className="row">
        <div className="col-12">
          {activeTab === "tasks" ? (
            <div>
              <TaskList /> 
            </div>
          ) : (
            <div>
              <UserManagement />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}