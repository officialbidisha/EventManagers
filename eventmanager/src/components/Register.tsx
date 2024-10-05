import React, { useState } from "react";
import BASE_URL from "../constants/urls";
import { useToast } from "./ToastManager";
import "./Register.css";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast(); // Use the custom toast context

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
        // Handle successful registration
        showToast('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login after a short delay
        }, 2000);
      } else {
        console.log(data)
        setError(data.error);
        setUserId("");
        showToast(data.error|| 'Registration failed. Please try again.', 'error');
      }
    } catch (err) {
      setError(`${err}`);
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
            type="userId"
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
