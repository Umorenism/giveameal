




// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute - user:", user, "loading:", loading); // Debug
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}