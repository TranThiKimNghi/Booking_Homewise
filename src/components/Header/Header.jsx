import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Kiểm tra login khi load component
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const user = localStorage.getItem("username") || "";
    setIsLoggedIn(logged);
    setUsername(user);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", "User"); // hoặc username thực
    setIsLoggedIn(true);
    setUsername("User");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
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

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {username}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "#1e90ff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                style={{
                  padding: "0.4rem 1rem",
                  border: "1px solid white",
                  borderRadius: "8px",
                  color: "white",
                  backgroundColor: "transparent",
                  cursor: "pointer",
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
              </button>
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
