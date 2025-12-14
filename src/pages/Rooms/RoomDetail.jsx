// src/components/rooms/RoomDetail.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Spinner, Badge, Row, Col } from "react-bootstrap";
import roomService from "../../services/roomService";
import roomServiceAPI from "../../services/roomServiceService";
import serviceService from "../../services/serviceService";

function RoomDetail({ show, handleClose, roomId }) {
  const [room, setRoom] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const roomData = await roomService.getById(roomId);
        const roomServices = await roomServiceAPI.getByRoom(roomId);
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
    <Modal show={show} onHide={handleClose} size="lg" centered>
      {/* Header */}
      <Modal.Header closeButton className="bg-gradient text-white">
        <Modal.Title>Phòng {room.roomNumber}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Ảnh phòng */}
        {room.imageUrl && (
          <Card className="mb-4 shadow-sm border-0">
            <Card.Img src={room.imageUrl} alt={room.roomNumber} style={{ borderRadius: "10px" }} />
          </Card>
        )}

        {/* Thông tin phòng */}
        <Card className="mb-4 p-3 shadow-sm border-0" style={{ backgroundColor: "#f7f9fc" }}>
          <h5 className="text-primary fw-bold mb-3">Thông tin phòng</h5>
          <Row className="mb-2">
            <Col md={6}><strong>Loại:</strong> {room.roomType}</Col>
            <Col md={6}><strong>Giá:</strong> <span className="text-success fw-bold">{room.price?.toLocaleString()} VND</span></Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <strong>Trạng thái:</strong>{" "}
              <Badge bg={room.status === "Available" ? "success" : "danger"}>{room.status}</Badge>
            </Col>
          </Row>
          <p className="mt-2"><strong>Mô tả:</strong> {room.description || "Phòng đầy đủ tiện nghi."}</p>
        </Card>

        {/* Dịch vụ đi kèm */}
        <Card className="p-3 shadow-sm border-0" style={{ backgroundColor: "#fff8e1" }}>
          <h5 className="text-warning fw-bold mb-3">Dịch vụ đi kèm</h5>
          {services.length === 0 ? (
            <p className="text-muted">Không có dịch vụ nào.</p>
          ) : (
            <Row>
              {services.map((s) => (
                <Col md={6} className="mb-3" key={s.id}>
                  <Card className="p-2 h-100 shadow-sm border-start border-5 border-warning">
                    <h6 className="fw-bold mb-1">{s.name || "Không tên"}</h6>
                    <p className="mb-1 text-success">{s.price != null ? `${s.price.toLocaleString()} VND` : "Chưa có giá"}</p>
                    <p className="mb-0 text-muted">Số lượng: {s.quantity || "-"}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
      </Modal.Footer>

      <style jsx="true">{`
        .bg-gradient {
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
        }
      `}</style>
    </Modal>
  );
}

export default RoomDetail;
