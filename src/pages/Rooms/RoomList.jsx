// src/components/rooms/RoomList.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Button, Row, Col, Spinner, Badge, Container } from "react-bootstrap";
import { FaBed, FaMoneyBillWave } from "react-icons/fa";

import roomService from "../../services/roomService";
import roomImageService from "../../services/roomImageService";
import formatCurrency from "../../utils/formatCurrency";
import RoomDetail from "./RoomDetail";

const BACKEND_URL = "http://localhost:8082";
const PAGE_SIZE = 6;

function RoomList() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const resolveImageUrl = (url) => (!url ? "/no-image.png" : url.startsWith("http") ? url : `${BACKEND_URL}${url}`);

  useEffect(() => {
    if (!hotelId) {
      setRooms([]);
      setError("Chọn khách sạn để xem phòng.");
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError("");
        const roomsData = await roomService.getByHotelId(hotelId);
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
  }, [hotelId]);

  const openRoomDetail = (roomId) => {
    setSelectedRoomId(roomId);
    setShowDetail(true);
  };

  const closeRoomDetail = () => {
    setSelectedRoomId(null);
    setShowDetail(false);
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
  if (!rooms.length) return <div className="alert alert-info text-center">Không có phòng nào.</div>;

  return (
    <Container>
      <Row className="g-4">
        {paginatedRooms.map((room) => (
          <Col lg={4} md={6} key={room.id}>
            <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
              <div className="position-relative" style={{ height: "220px" }}>
                <Card.Img
                  src={room.imageUrl}
                  alt={room.roomType}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
                  <Card.Text className="text-muted mb-3" style={{ height: "40px", overflow: "hidden" }}>
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
                      className="fw-bold"
                    >
                      Chi tiết
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      href={`/booking?roomId=${room.id}&hotelId=${hotelId}`}
                      disabled={room.status !== "available"}
                      className="fw-bold"
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
          <span className="align-self-center fw-bold">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {showDetail && <RoomDetail show={showDetail} handleClose={closeRoomDetail} roomId={selectedRoomId} />}
    </Container>
  );
}

export default RoomList;
