import React from "react";
import { Link } from "react-router-dom";

function RoomList() {
  const rooms = [
    { id: 1, name: "Deluxe Room", price: 120 },
    { id: 2, name: "Suite Room", price: 200 },
  ];

  return (
    <div>
      <h2 className="mb-4">Available Rooms</h2>
      <div className="row g-3">
        {rooms.map(room => (
          <div key={room.id} className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">Price: ${room.price}/night</p>
                <Link to={`/rooms/${room.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
