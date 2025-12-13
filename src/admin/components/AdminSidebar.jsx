import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/users", label: "Manage Users", icon: "👤" },
    { path: "/admin/rooms", label: "Manage Rooms", icon: "🛏️" },
    { path: "/admin/hotels", label: "Manage Hotels", icon: "🏨" },
    { path: "/admin/bookings", label: "Manage Bookings", icon: "📅" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-primary text-white" style={{ width: "220px" }}>
      <div className="mb-4 text-center fw-bold fs-5">Admin Panel</div>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item mb-1" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link d-flex align-items-center ${isActive(item.path) ? "active bg-light text-primary" : "text-white"}`}
              style={{ borderRadius: "8px", padding: "8px 12px" }}
            >
              <span className="me-2">{item.icon}</span> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
