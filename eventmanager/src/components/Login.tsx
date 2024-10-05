
import "./Login.css";
import React, { useState } from "react";
import BASE_URL from "../constants/urls";
import { useToast } from './ToastManager';
const Login = () => {
  const [userId, setEmail] = useState("");
  const { showToast } = useToast(); // Use the custom toast context
  const [error, setError] = useState<string | null>(null);

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
        // Save the token or some identifier in localStorage
        localStorage.setItem("token", data.token); // Adjust to your API response
        // Redirect to events page after successful login
        window.location.href = "/events";
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
            type="userId"
            value={userId}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
