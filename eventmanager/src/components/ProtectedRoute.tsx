import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.ComponentType; // Explicitly typing the component
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is logged in

  return isAuthenticated ? <Component /> : <Navigate to="/register" />;
};

export default ProtectedRoute;
