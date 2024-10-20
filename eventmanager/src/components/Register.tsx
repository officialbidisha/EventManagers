import React, { useState } from "react";
import BASE_URL from "../constants/urls";
import { useToast } from "./ToastManager";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Register.css";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast(); // Use the custom toast context
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Registration success, show success toast
        showToast('Registration successful! Redirecting to login...', 'success');

        // Redirect to login page after a 2-second delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Adjust the time if necessary
      } else {
        // Handle registration failure
        setError(data.error);
        setUserId("");
        showToast(data.error || 'Registration failed. Please try again.', 'error');
      }
    } catch (err) {
      setError(`An error occurred: ${err}`);
      showToast('An unexpected error occurred. Please try again later.', 'error');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Id</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
