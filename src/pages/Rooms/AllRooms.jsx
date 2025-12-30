// src/components/rooms/AllRooms.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge, Form, InputGroup } from "react-bootstrap";
import { FaBed, FaMoneyBillWave } from "react-icons/fa";

import roomService from "../../services/roomService";
import roomImageService from "../../services/roomImageService";
import formatCurrency from "../../utils/formatCurrency";
import RoomDetail from "./RoomDetail";

const BACKEND_URL = "http://localhost:8082";
const PAGE_SIZE = 6;

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState({
    roomType: "",
    status: "",
    priceMin: "",
    priceMax: "",
  });

  const resolveImageUrl = (url) => (!url ? "/no-image.png" : url.startsWith("http") ? url : `${BACKEND_URL}${url}`);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError("");
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
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách phòng.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const openRoomDetail = (roomId) => {
    setSelectedRoomId(roomId);
    setShowDetail(true);
  };

  const closeRoomDetail = () => {
    setSelectedRoomId(null);
    setShowDetail(false);
  };

  // Filtered & Paginated rooms
  const filteredRooms = useMemo(() => {
    setCurrentPage(1); // reset page khi filter thay đổi
    return rooms.filter((room) => {
      let ok = true;
      if (filter.roomType) ok &= room.roomType.toLowerCase().includes(filter.roomType.toLowerCase());
      if (filter.status)
        ok &= filter.status === "available" ? room.status === "available" : room.status !== "available";
      if (filter.priceMin) ok &= room.price >= parseFloat(filter.priceMin);
      if (filter.priceMax) ok &= room.price <= parseFloat(filter.priceMax);
      return ok;
    });
  }, [rooms, filter]);

  const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải phòng...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!rooms.length) return <div className="alert alert-info text-center">Không có phòng nào.</div>;

  return (
    <Container fluid className="py-4">
      <Row className="gx-4">
        {/* Sidebar Filter */}
        <Col lg={3} className="mb-4">
          <Card className="p-3 shadow-sm sticky-top" style={{ top: "20px" }}>
            <h5 className="mb-4 text-primary">Bộ lọc phòng</h5>

            <Form.Group className="mb-3">
              <Form.Label>Loại phòng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập loại phòng..."
                value={filter.roomType}
                onChange={(e) => setFilter({ ...filter, roomType: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <option value="">Tất cả</option>
                <option value="available">Còn phòng</option>
                <option value="unavailable">Hết phòng</option>
              </Form.Select>
            </Form.Group>

            <Form.Label>Giá</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                placeholder="Từ"
                value={filter.priceMin}
                onChange={(e) => setFilter({ ...filter, priceMin: e.target.value })}
              />
              <Form.Control
                type="number"
                placeholder="Đến"
                value={filter.priceMax}
                onChange={(e) => setFilter({ ...filter, priceMax: e.target.value })}
              />
            </InputGroup>

            <Button
              variant="primary"
              className="w-100"
              onClick={() => setFilter({ roomType: "", status: "", priceMin: "", priceMax: "" })}
            >
              Xóa bộ lọc
            </Button>
          </Card>
        </Col>

        {/* Room List */}
        <Col lg={9}>
          <Row className="g-4">
            {paginatedRooms.map((room) => (
              <Col lg={4} md={6} key={room.id}>
                <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow">
                  <div className="position-relative overflow-hidden" style={{ height: "220px" }}>
                    <Card.Img
                      src={room.imageUrl}
                      alt={room.roomType}
                      style={{ height: "100%", width: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                      className="room-image"
                    />
                    <Badge
                      bg={room.status === "available" ? "success" : "danger"}
                      className="position-absolute top-2 end-2 py-2 px-3 shadow"
                    >
                      {room.status === "available" ? "CÒN PHÒNG" : "HẾT PHÒNG"}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between p-3">
                    <div>
                      <Card.Title className="fw-bold text-primary mb-2">
                        <FaBed className="me-2" />
                        {room.roomType || "Loại phòng"} (Phòng {room.roomNumber})
                      </Card.Title>
                      <Card.Text className="text-muted mb-3" style={{ height: "60px", overflow: "hidden" }}>
                        {room.description || "Phòng đầy đủ tiện nghi."}
                      </Card.Text>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="fw-bold text-danger d-flex align-items-center">
                        <FaMoneyBillWave className="me-1" />
                        {formatCurrency(room.price)}
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="info"
                          onClick={() => openRoomDetail(room.id)}
                        >
                          Chi tiết
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          href={`/booking?roomId=${room.id}`}
                          disabled={room.status !== "available"}
                        >
                          Đặt phòng
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 gap-3">
              <Button
                variant="outline-primary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span className="align-self-center fw-bold">{currentPage} / {totalPages}</span>
              <Button
                variant="outline-primary"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {showDetail && <RoomDetail show={showDetail} handleClose={closeRoomDetail} roomId={selectedRoomId} />}

      {/* Custom CSS for hover */}
      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          transform: translateY(-5px);
          transition: all 0.3s ease-in-out;
        }
        .room-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Container>
  );
}

export default AllRooms;
