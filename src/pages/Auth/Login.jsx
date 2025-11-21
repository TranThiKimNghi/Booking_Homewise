import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login with ${email}`);
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" required />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
