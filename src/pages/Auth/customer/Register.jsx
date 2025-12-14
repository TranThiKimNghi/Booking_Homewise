import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customerAuth from "../../../services/customerService";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await customerAuth.register(form); // giả sử API trả về { success: true }
      alert("Đăng ký thành công!");
      navigate("/login"); // redirect sang login
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 fw-bold text-success">Đăng ký</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label fw-semibold">Họ và tên</label>
            <input
              id="fullname"
              name="fullname"
              placeholder="Nhập họ và tên"
              className="form-control form-control-lg"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
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

          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-semibold">Số điện thoại</label>
            <input
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              className="form-control form-control-lg"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Mật khẩu</label>
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

          <button type="submit" className="btn btn-success w-100 btn-lg">Đăng ký</button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Đã có tài khoản? <a href="/login" className="text-success fw-semibold">Đăng nhập</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;
