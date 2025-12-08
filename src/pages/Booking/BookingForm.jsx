import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { FaCalendarAlt, FaDoorOpen } from "react-icons/fa";
import bookingService from "../../services/bookingService";
import roomService from "../../services/roomService";
import formatCurrency from "../../utils/formatCurrency";
// import { useAuth } from "../../contexts/AuthContext.jsx"; // comment khi test

function BookingForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const { user } = useAuth(); // comment khi test

  const roomId = searchParams.get("roomId");
  const hotelId = searchParams.get("hotelId");

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  const MAX_GUESTS = 5;

  // --- Fetch thông tin phòng ---
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId || !hotelId) {
        setError("Thiếu ID phòng hoặc ID khách sạn.");
        setDataLoading(false);
        return;
      }
      try {
        const data = await roomService.getById(roomId);
        setRoom(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải thông tin phòng.");
      } finally {
        setDataLoading(false);
      }
    };
    fetchRoom();
  }, [roomId, hotelId]);

  const totalAmount = room ? room.price * parseInt(guests) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    // --- TẠO user GIẢ LẬP khi chưa login ---
    const testUser = { id: 1, name: "Test User", role: "CUSTOMER" };

    // --- Validate ---
    if (!room) return setError("Không thể đặt phòng do thiếu thông tin.");
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      return setError("Ngày trả phòng phải sau ngày nhận phòng.");
    }
    if (parseInt(guests) < 1 || parseInt(guests) > MAX_GUESTS) {
      return setError(`Số khách phải từ 1 đến ${MAX_GUESTS}.`);
    }

    try {
      const payload = {
        userId: testUser.id, // dùng user giả lập
        hotelId,
        roomId,
        checkingDate: checkIn,
        checkoutDate: checkOut,
        guests: parseInt(guests),
        note,
        totalAmount,
        status: "PENDING", // enum hợp lệ
      };

      const createdBooking = await bookingService.create(payload);

      setSuccess("Đặt phòng thành công! Đang chuyển hướng...");

      setTimeout(() => navigate(`/bookings/${createdBooking.id}`), 1500);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err);
      setError(err.response?.data?.message || "Có lỗi xảy ra khi đặt phòng!");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải chi tiết phòng...</p>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Alert variant="danger" style={{ maxWidth: "600px", width: "100%" }}>
          <h5 className="alert-heading">Lỗi</h5>
          <p>{error}</p>
          <hr />
          <p className="mb-0 small">Vui lòng quay lại trang danh sách phòng.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Card className="shadow-lg border-0" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
        <Card.Header
          className="border-0 text-white p-4"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            background: "linear-gradient(135deg, #0d6efd, #20c997)",
          }}
        >
          <h3 className="mb-0 text-center fw-bold">Xác nhận Đặt phòng</h3>
          <p className="mb-0 text-center small opacity-75">
            Phòng: <strong>{room?.roomType || "Đang tải..."}</strong> (Phòng số: <strong>{room?.roomNumber || "N/A"}</strong>)
          </p>
        </Card.Header>
        <Card.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ngày nhận phòng</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                <Form.Control
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày trả phòng</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaDoorOpen /></InputGroup.Text>
                <Form.Control
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số khách</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={MAX_GUESTS}
                value={guests}
                onChange={e => setGuests(parseInt(e.target.value))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Tổng tiền: {formatCurrency(totalAmount)}</h5>
            </div>

            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? "Đang xử lý..." : "Xác nhận đặt phòng"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookingForm;
