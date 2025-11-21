// src/pages/Home/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <h2 className="display-4 mb-3">Welcome to Hotel Booking</h2>
      <p className="lead mb-4">Find your perfect room and book it online easily.</p>
      <Link to="/rooms" className="btn btn-primary btn-lg">View Rooms</Link>
    </div>
  );
}

export default Home;
