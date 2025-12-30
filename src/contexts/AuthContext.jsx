import React, { createContext, useContext, useState } from "react";

// Tạo context
const AuthContext = createContext();

// Provider bao quanh app
export const AuthProvider = ({ children }) => {
  // Lấy token từ localStorage, mặc định null
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Lấy role từ localStorage, mặc định null
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  // Lấy user từ localStorage, parse JSON an toàn
  const [user, setUser] = useState(() => {
    try {
      const item = localStorage.getItem("user");
      return item && item !== "undefined" ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  // Login: lưu vào state + localStorage
  const login = ({ token, role, user }) => {
    if (!token || !role) return; // bảo vệ trường hợp thiếu dữ liệu
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user || {}));

    setToken(token);
    setRole(role);
    setUser(user || {});
  };

  // Logout: xóa state + localStorage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setToken(null);
    setRole(null);
    setUser(null);
  };

  // Giá trị truyền vào context
  const value = {
    token,
    role,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook để sử dụng context
export const useAuth = () => useContext(AuthContext);
