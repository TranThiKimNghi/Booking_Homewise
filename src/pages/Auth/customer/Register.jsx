import React, { useState } from "react";
import customerAuth from "../../../services/customerService";

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await customerAuth.register(form);
      alert("Register success");
      window.location.href = "/login";
    } catch (error) {
      alert("Register failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="fullname" placeholder="Fullname" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
