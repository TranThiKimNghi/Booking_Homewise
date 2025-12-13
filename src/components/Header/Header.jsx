import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "react-bootstrap";

function Header() {
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // quay về trang chủ sau logout
  };

  return (
    <header style={{ width: "100%", position: "sticky", top: 0, zIndex: 1000 }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "linear-gradient(90deg, #1e90ff, #00bfff)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "700",
              fontSize: "1.5rem",
            }}
          >
            HotelBooking
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
          >
            Trang chủ
          </Link>
          <Link
            to="/hotels"
            style={{ color: "white", textDecoration: "none", fontWeight: 500 }}
          >
            Khách sạn
          </Link>

          {isAuthenticated ? (
            <>
              {role === "customer" && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="secondary"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    {user?.fullname || user?.name || "User"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {role === "admin" && (
                <Link
                  to="/admin"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: "0.4rem 1rem",
                  border: "1px solid white",
                  borderRadius: "8px",
                  color: "white",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#1e90ff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white";
                }}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "#1e90ff",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
