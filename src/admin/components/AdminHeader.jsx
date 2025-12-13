import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-2">
      <span className="navbar-brand mb-0 h1">Admin Panel</span>
      <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default AdminHeader;
