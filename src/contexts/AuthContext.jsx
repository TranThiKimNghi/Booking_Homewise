import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load token từ localStorage khi mount lần đầu
  useEffect(() => {
    const savedCustomerToken = localStorage.getItem("customerToken");
    const savedAdminToken = localStorage.getItem("adminToken");

    const savedToken = savedCustomerToken || savedAdminToken;

    if (savedToken) {
      setToken(savedToken);

      // Cấu hình axios
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

      // Nếu muốn, có thể set user role từ token/localStorage
      if (savedCustomerToken) {
        setUser({ role: "CUSTOMER" }); // bạn có thể lưu thêm profile nếu cần
      } else {
        setUser({ role: "ADMIN" });
      }
    }
  }, []); // Chỉ chạy 1 lần khi mount → không gây loop

  // Khi token update → cập nhật axios header
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // CUSTOMER login (Google)
  const loginCustomer = (googleToken, profile) => {
    localStorage.setItem("customerToken", googleToken);

    setToken(googleToken);
    setUser({ role: "CUSTOMER", ...profile });
  };

  // ADMIN login (Keycloak)
  const loginAdmin = (adminToken, keycloakInstance) => {
    localStorage.setItem("adminToken", adminToken);

    setToken(adminToken);
    setUser({
      role: "ADMIN",
      keycloak: keycloakInstance,
    });
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("adminToken");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginCustomer, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
