import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import bookingService from "../../services/bookingService";
import roomService from "../../services/roomService";
import formatCurrency from "../../utils/formatCurrency";

function BookingForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roomId = searchParams.get("roomId");
  const hotelId = searchParams.get("hotelId");

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId || !hotelId) {
        setError("Thiếu ID phòng hoặc khách sạn");
        setDataLoading(false);
        return;
      }
      try {
        const data = await roomService.getById(roomId);
        setRoom(data);
      } catch {
        setError("Không thể tải thông tin phòng");
      } finally {
        setDataLoading(false);
      }
    };
    fetchRoom();
  }, [roomId, hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn cần đăng nhập để đặt phòng");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        hotelId,
        roomId,
        checkingDate: new Date(checkIn).toISOString(),
        checkoutDate: new Date(checkOut).toISOString(),
      };

      const res = await bookingService.create(payload);

      // Navigate thẳng tới booking-detail và truyền dữ liệu booking
      navigate("/booking-detail", { state: { booking: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || "Đặt phòng thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Đang tải phòng...</p>
      </div>
    );
  }

  return (
  <div className="d-flex justify-content-center align-items-center py-5 bg-light" style={{ minHeight: "100vh" }}>
    <Card className="shadow-lg" style={{ maxWidth: 600, width: "100%", borderRadius: "12px" }}>
      <Card.Header className="bg-primary text-white text-center py-4" style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
        <h4 className="mb-1 fw-bold">Xác nhận đặt phòng</h4>
        <small>Phòng {room?.roomNumber} – {room?.roomType}</small>
      </Card.Header>

      <Card.Body className="p-4">
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Ngày nhận phòng</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-primary text-white"><FaCalendarAlt /></InputGroup.Text>
              <Form.Control
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Ngày trả phòng</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-primary text-white"><FaCalendarAlt /></InputGroup.Text>
              <Form.Control
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <div className="mb-4 text-center">
            <h5 className="fw-bold">Giá phòng: <span className="text-success">{formatCurrency(room?.price)}</span></h5>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-100 btn-lg"
            variant="success"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Đang xử lý...
              </>
            ) : "Xác nhận đặt phòng"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);

}

export default BookingForm;
