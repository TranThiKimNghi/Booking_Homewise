import React from "react";
import { Container } from "react-bootstrap";
import RoomList from "../components/Room/RoomList";

function Rooms() {
  return (
    <Container className="py-5">
      {/* 🏞️ Banner */}
      <div
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
        <h1 className="display-5 fw-bolder mb-2 text-shadow">
          Chọn phòng bạn muốn đặt
        </h1>
        <p className="lead fw-normal text-shadow">
          Danh sách các phòng có sẵn trong khách sạn
        </p>
      </div>

      {/* 🏨 ROOM LIST */}
      <RoomList />

      <style jsx="true">{`
        .text-shadow {
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </Container>
  );
}

export default Rooms;
