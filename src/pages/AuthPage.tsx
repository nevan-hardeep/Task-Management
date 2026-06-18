import { useState } from "react";
import { registerUser, loginUser } from "../services/UserService";

export default function AuthPage({ onLoginSuccess }: { onLoginSuccess: (username: string) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username || !password || (!isLogin && !email)) {
      setErrorMsg("Please fill out all fields completely.");
      return;
    }

    try {
      if (isLogin) {
        await loginUser({ username, password });
        onLoginSuccess(username);
      } else {
        await registerUser({ username, email, password });
        // Reset and jump to Login tab view state cleanly
        setEmail("");
        setPassword("");
        setIsLogin(true);
        alert("Registration successful! Please log in now.");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setErrorMsg("Authentication failed. Please verify credentials or connection.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "25px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{isLogin ? "Login" : "Create Account"}</h2>
        
        {errorMsg && (
          <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px", marginBottom: "10px", textAlign: "center", fontSize: "14px" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} placeholder="Username" />
          </div>
          {!isLogin && (
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} placeholder="Email address" />
            </div>
          )}
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} placeholder="Password" />
          </div>
          <button type="submit" style={{ padding: "12px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p 
          style={{ textAlign: "center", marginTop: "15px", cursor: "pointer", color: "#007bff", textDecoration: "underline" }} 
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMsg("");
          }}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}