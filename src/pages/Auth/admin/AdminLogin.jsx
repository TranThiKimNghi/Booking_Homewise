import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import authService from "../../../services/authService";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authService.login({ email, password });

      if (res.roles.toLowerCase() !== "admin") {
        setError("Bạn không phải admin");
        authService.logout();
        return;
      }

      // Lưu token, role, user
      login({
        token: res.token,
        role: res.roles.toLowerCase(),
        user: { email },
      });

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Admin Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-danger w-100">
          Đăng nhập Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
