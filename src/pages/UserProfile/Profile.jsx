import React from "react";

function Profile() {
  const user = { name: "John Doe", email: "john@example.com", avatar: "https://i.pravatar.cc/150?img=3" };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div 
        className="card shadow p-4"
        style={{
          maxWidth: "400px",
          borderRadius: "15px",
          backgroundColor: "#f8f9fa"
        }}
      >
        <div className="text-center mb-4">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover", border: "3px solid #0d6efd" }}
          />
        </div>
        <h3 className="text-center mb-3" style={{ color: "#0d6efd" }}>
          {user.name}
        </h3>
        <div className="mb-2">
          <strong>Email:</strong>
          <p className="text-muted">{user.email}</p>
        </div>
        <button
          className="btn btn-primary w-100"
          style={{ borderRadius: "10px" }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
