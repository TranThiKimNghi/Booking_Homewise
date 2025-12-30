// src/admin/pages/Bookings.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import BookingModal from "../components/models/BookingModal";
import BookingFormModal from "../components/models/BookingFormModal";
import bookingService from "../../services/bookingService";
import userService from "../../services/customerService";
import hotelService from "../../services/hotelService";
import roomService from "../../services/roomService";
import roomImageService from "../../services/roomImageService";

const BACKEND_URL = "http://localhost:8082";
const PAGE_SIZE = 6;

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const resolveImageUrl = (url) =>
    !url ? "/no-image.png" : url.startsWith("http") ? url : `${BACKEND_URL}${url}`;

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings();

      const bookingsWithDetails = await Promise.all(
        data.map(async (b) => {
          let userName = "Unknown";
          let hotelName = "Unknown";
          let roomName = "Unknown";
          let roomImage = "/no-image.png";

          // user
          if (b.userId) {
            try {
              const user = await userService.getById(b.userId);
              userName = user?.fullname || user?.name || "Unknown";
            } catch {}
          }

          // hotel
          if (b.hotelId) {
            try {
              const hotel = await hotelService.getById(b.hotelId);
              hotelName = hotel?.name || "Unknown";
            } catch {}
          }

          // room
          if (b.roomId) {
            try {
              const room = await roomService.getById(b.roomId);
              roomName = room?.name || "Unknown";

              const images = await roomImageService.getByRoomId(b.roomId);
              const primary = images.find((img) => img.isPrimary);
              const fallback = images[0];
              roomImage = resolveImageUrl(primary?.url || fallback?.url);
            } catch {}
          }

          return { ...b, userName, hotelName, roomName, roomImage };
        })
      );

      setBookings(bookingsWithDetails);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleAdd = () => {
    setEditingBooking(null);
    setShowForm(true);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa booking này?")) return;
    try {
      await bookingService.delete(id);
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Xóa booking thất bại!");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingBooking) {
        await bookingService.update(editingBooking.id, formData);
      } else {
        await bookingService.create(formData);
      }
      loadBookings();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Lưu booking thất bại!");
    }
  };

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const paginatedBookings = bookings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải booking...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!bookings.length) return <div className="alert alert-info text-center">Chưa có booking nào</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý booking</h2>
        <Button variant="success" onClick={handleAdd}>
          + Thêm booking
        </Button>
      </div>

      <Row className="g-4">
        {paginatedBookings.map((b) => (
          <Col lg={4} md={6} key={b.id}>
            <Card className="h-100 shadow-sm">
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img
                  src={b.roomImage}
                  alt={b.roomName}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <Badge
                  bg={b.status?.toLowerCase() === "pending" ? "warning" : b.status?.toLowerCase() === "confirmed" ? "success" : "danger"}
                  className="position-absolute top-2 end-2 py-2 px-3"
                >
                  {b.status}
                </Badge>
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold text-primary">
                    {b.hotelName} - {b.roomName}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    Người đặt: {b.userName} <br />
                    Check-in: {new Date(b.checkingDate).toLocaleDateString()} <br />
                    Check-out: {new Date(b.checkoutDate).toLocaleDateString()} <br />
                    Tổng tiền: ${b.totalAmount}
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button size="sm" variant="info" onClick={() => { setSelectedBooking(b); setShowView(true); }}>
                    View
                  </Button>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(b)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(b.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
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

      {/* Modals */}
      <BookingModal show={showView} handleClose={() => setShowView(false)} booking={selectedBooking} />
      <BookingFormModal show={showForm} handleClose={() => setShowForm(false)} booking={editingBooking} onSave={handleSave} />
    </Container>
  );
}

export default AdminBookings;
