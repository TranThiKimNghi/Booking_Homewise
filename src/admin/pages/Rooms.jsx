// src/admin/pages/Rooms.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import RoomModal from "../components/models/RoomModal";
import roomService from "../../services/roomService";
import roomImageService from "../../services/roomImageService";
import formatCurrency from "../../utils/formatCurrency";

const BACKEND_URL = "http://localhost:8082"; // URL backend
const PAGE_SIZE = 6;

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const resolveImageUrl = (url) =>
    !url ? "/no-image.png" : url.startsWith("http") ? url : `${BACKEND_URL}${url}`;

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const roomsData = await roomService.getAll();
      const roomsWithImages = await Promise.all(
        roomsData.map(async (room) => {
          try {
            const images = await roomImageService.getByRoomId(room.id);
            const primary = images.find((img) => img.isPrimary);
            const fallback = images[0];
            return { ...room, imageUrl: resolveImageUrl(primary?.url || fallback?.url) };
          } catch {
            return { ...room, imageUrl: "/no-image.png" };
          }
        })
      );
      setRooms(roomsWithImages);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách phòng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAdd = () => {
    setEditingRoom(null);
    setShowModal(true);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa phòng này?")) return;
    try {
      await roomService.delete(id);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Xóa phòng thất bại!");
    }
  };

  const handleSave = async (room) => {
    try {
      if (room.id) {
        await roomService.update(room.id, room);
      } else {
        const newRoom = await roomService.create(room);
        setRooms((prev) => [...prev, newRoom]);
      }
      fetchRooms();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Lưu phòng thất bại!");
    }
  };

  const totalPages = Math.ceil(rooms.length / PAGE_SIZE);
  const paginatedRooms = rooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải phòng...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!rooms.length) return <div className="alert alert-info text-center">Chưa có phòng nào</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý phòng</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Thêm phòng
        </Button>
      </div>

      <Row className="g-4">
        {paginatedRooms.map((room) => (
          <Col lg={4} md={6} key={room.id}>
            <Card className="h-100 shadow-sm">
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img
                  src={room.imageUrl}
                  alt={room.roomType}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <Badge
                  bg={room.status === "available" ? "success" : "danger"}
                  className="position-absolute top-2 end-2 py-2 px-3"
                >
                  {room.status === "available" ? "CÒN PHÒNG" : "HẾT PHÒNG"}
                </Badge>
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold text-primary">
                    Phòng {room.roomNumber} - {room.roomType}
                  </Card.Title>
                  <Card.Text className="text-muted">{room.description || "Phòng đầy đủ tiện nghi"}</Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="fw-bold text-danger">{formatCurrency(room.price)}</div>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(room)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(room.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Prev / Next */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <RoomModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSave} roomData={editingRoom} />
    </Container>
  );
}

export default Rooms;
