import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import authService from "../../../services/authService";

function CustomerLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Cập nhật form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authService.login(form);

      console.log("Login response:", res);

      if (!res.token) {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin.");
        return;
      }

      // Lưu vào AuthContext
      login({
        token: res.token,
        user: { email: form.email }, // backend không trả user object
        role: res.roles, // lấy từ response
      });

      // Redirect sang trang booking
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(
        err.response?.data?.message ||
          "Sai email hoặc mật khẩu, vui lòng thử lại"
      );
    }
  };

  return (
    <div className="auth-box container py-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Customer Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default CustomerLogin;
