import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  try {
    const payload = token.split(".")[1];    // Extract the payload part of the JWT
    const decoded = JSON.parse(atob(payload));  // Decode the Base64 URL-encoded payload

    if (adminOnly && decoded.role !== "admin") {
      return <Navigate to="/" />;
    }
  } catch (error) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default PrivateRoute;