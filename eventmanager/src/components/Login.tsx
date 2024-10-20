import "./Login.css";
import React, { useState } from "react";
import BASE_URL from "../constants/urls";
import { useToast } from './ToastManager';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Login = () => {
  const [userId, setEmail] = useState("");
  const { showToast } = useToast(); // Use the custom toast context
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Adjust to your API response
        window.location.href = "/events"; // Redirect to events page
        showToast('Login successful! Welcome!', 'success');
      } else {
        setError(data.message || "Login failed. Please try again.");
        showToast(data.message || 'Login failed. Please try again.', 'error');
      }
    } catch (err) {
      setError(`An error occurred: ${err}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Id:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Add a Register button below the form */}
      <button className="register-link-button" onClick={() => navigate("/register")}>
        Don't have an account? Register
      </button>
    </div>
  );
};

export default Login;
