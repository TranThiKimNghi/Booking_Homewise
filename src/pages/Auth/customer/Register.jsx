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
    <div className="auth-box container py-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Register</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            name="fullname"
            placeholder="Fullname"
            className="form-control"
            value={form.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            placeholder="Email"
            className="form-control"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="phone"
            placeholder="Phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
