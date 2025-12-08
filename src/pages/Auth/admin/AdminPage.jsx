import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminPage() {
  const { user } = useAuth();

  if (!user?.roles?.includes("ADMIN")) {
    return <Navigate to="/login" />;
  }

  return <h1>Trang Admin</h1>;
}
export default AdminPage;