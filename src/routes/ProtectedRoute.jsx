import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, role: requiredRole }) {
  const { isAuthenticated, role } = useAuth();

  // Chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sai quyền
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default ProtectedRoute;
