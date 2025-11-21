import React from "react";

function Profile() {
  const user = { name: "John Doe", email: "john@example.com" };

  return (
    <div className="card p-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;
