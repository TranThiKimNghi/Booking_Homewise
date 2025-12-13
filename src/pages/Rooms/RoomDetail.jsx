// src/components/rooms/RoomDetail.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Spinner } from "react-bootstrap";
import roomService from "../../services/roomService";
import roomServiceAPI from "../../services/roomServiceService"; // API room-services
import serviceService from "../../services/serviceService"; // API service

function RoomDetail({ show, handleClose, roomId }) {
  const [room, setRoom] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Lấy thông tin phòng
        const roomData = await roomService.getById(roomId);

        // Lấy danh sách RoomServiceRequestDTO
        const roomServices = await roomServiceAPI.getByRoom(roomId);

        // Lấy chi tiết từng service
        const servicesData = await Promise.all(
          roomServices.map(async (rs) => {
            const service = await serviceService.getById(rs.serviceId);
            return { ...service, quantity: rs.quantity };
          })
        );

        setRoom(roomData);
        setServices(servicesData);
      } catch (err) {
        console.error("Error loading room details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải chi tiết phòng...</p>
      </div>
    );

  if (!room) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết phòng: {room.roomNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Thông tin phòng</h5>
        <p>Loại: {room.roomType}</p>
        <p>Giá: {room.price?.toLocaleString()} VND</p>
        <p>Trạng thái: {room.status}</p>
        <p>Mô tả: {room.description || "Phòng đầy đủ tiện nghi."}</p>

        <h5 className="mt-4">Dịch vụ đi kèm</h5>
        {services.length === 0 ? (
          <p>Không có dịch vụ nào.</p>
        ) : (
          <ListGroup>
            {services.map((s) => (
              <ListGroup.Item key={s.id}>
                <strong>{s.name || "Không tên"}</strong> -{" "}
                {/* {s.description || "Không có mô tả"} -{" "} */}
                {s.price != null ? `${s.price.toLocaleString()} VND` : "Chưa có giá"}{" "}
                {s.duration ? `- ${s.duration} phút` : ""}{" "}
                {s.quantity ? `- Số lượng: ${s.quantity}` : ""}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomDetail;
