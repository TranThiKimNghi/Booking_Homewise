import { Navigate } from "react-router-dom";

function AdminGuard({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default AdminGuard;
