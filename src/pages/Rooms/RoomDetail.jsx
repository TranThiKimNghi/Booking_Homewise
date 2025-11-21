import React from "react";
import { useParams, Link } from "react-router-dom";

function RoomDetail() {
  const { id } = useParams();
  const room = { id, name: "Deluxe Room", price: 120, description: "A comfortable room with sea view." };

  return (
    <div>
      <h2 className="mb-3">{room.name}</h2>
      <p>{room.description}</p>
      <p className="fw-bold">Price: ${room.price}/night</p>
      <Link to={`/booking/${room.id}`} className="btn btn-primary">Book Now</Link>
    </div>
  );
}

export default RoomDetail;
