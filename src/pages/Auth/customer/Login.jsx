import React, { useState } from "react";
import customerAuth from "../../../services/customerService";

function CustomerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await customerAuth.login(form);
      localStorage.setItem("customer_token", res.data.token);
      alert("Login success");
      window.location.href = "/";
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
