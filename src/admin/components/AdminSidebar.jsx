import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/rooms", label: "Manage Rooms" },
    { path: "/admin/bookings", label: "Manage Bookings" },
    { path: "/admin/users", label: "Manage Users" },
    { path: "/admin/hotels", label: "Manage Hotel" },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="d-flex flex-column vh-100 p-3"
      style={{
        width: "230px",
        background: "linear-gradient(180deg, #1e90ff, #0b4f9c)",
        color: "#fff",
      }}
    >
      {/* Logo / Title */}
      <div className="mb-4 text-center">
        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          Admin Panel
        </div>
        <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          Hotel Booking System
        </div>
      </div>

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item mb-1" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link d-flex align-items-center ${
                isActive(item.path) ? "active" : "text-white-50"
              }`}
              style={{
                borderRadius: "10px",
                padding: "8px 12px",
                fontSize: "0.95rem",
                transition: "all 0.2s ease-in-out",
                backgroundColor: isActive(item.path)
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              }}
            >
              {/* Icon giả lập bằng emoji cho nhẹ, sau muốn dùng react-icons thì thêm sau */}
              <span style={{ marginRight: "8px" }}>
                {item.label.includes("Dashboard") && "📊"}
                {item.label.includes("Rooms") && "🛏️"}
                {item.label.includes("Bookings") && "📅"}
                {item.label.includes("Users") && "👤"}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
