// src/pages/Rooms/Rooms.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import RoomList from "./RoomList"; // danh sách theo khách sạn
import AllRooms from "./AllRooms"; // tất cả phòng

function Rooms() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");

  return (
    <Container className="py-5">
      {/* 🏞️ Banner */}
      {/* <div
        className="p-5 mb-5 text-center text-white shadow-lg d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1560448075-bb4e1f8a72cd")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          minHeight: "220px",
        }}
      >
        
      </div> */}

      {/* 🏨 ROOM LIST */}
      {hotelId ? <RoomList /> : <AllRooms />}

      <style jsx="true">{`
        .text-shadow {
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </Container>
  );
}

export default Rooms;
