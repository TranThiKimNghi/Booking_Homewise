import React, { useState } from "react";
import { useParams } from "react-router-dom";

function BookingForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name}, Room ID: ${id}`);
  };

  return (
    <div className="card p-4">
      <h2 className="mb-4">Booking Room {id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Check-in:</label>
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Check-out:</label>
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Book Now</button>
      </form>
    </div>
  );
}

export default BookingForm;
