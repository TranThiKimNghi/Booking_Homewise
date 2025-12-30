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
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Đăng nhập</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email"
              className="form-control form-control-lg"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control form-control-lg"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Chưa có tài khoản? <a href="/register" className="text-primary fw-semibold">Đăng ký</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
