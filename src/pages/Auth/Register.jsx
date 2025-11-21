import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Register with ${email}`);
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" required />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
