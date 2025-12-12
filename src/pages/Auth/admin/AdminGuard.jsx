import { Navigate } from "react-router-dom";

function AdminGuard({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminGuard;
