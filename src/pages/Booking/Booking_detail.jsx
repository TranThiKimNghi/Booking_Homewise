import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Alert, Badge } from "react-bootstrap";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

function BookingDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <Alert variant="info" className="text-center py-5">
        Không tìm thấy booking!
      </Alert>
    );
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "warning";
      case "confirmed": return "success";
      case "cancelled": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0" style={{ maxWidth: "700px", width: "100%", borderRadius: "20px" }}>
        <Card.Header
          className="text-white border-0"
          style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", background: "linear-gradient(135deg, #20c997, #0d6efd)" }}
        >
          <h3 className="mb-0 text-center">Chi tiết Booking #{booking.id.slice(0, 8)}</h3>
          <p className="mb-0 text-center small opacity-75">
            Kiểm tra trạng thái và thông tin đặt phòng
          </p>
          <div className="text-center mt-2">
            <Badge bg={getStatusVariant(booking.status)}>{booking.status || "Unknown"}</Badge>
          </div>
        </Card.Header>

        <Card.Body className="p-4">
          <div className="mb-3">
            <h6 className="fw-bold">Thông tin Booking</h6>
            <p>ID User: <strong>{booking.userId}</strong></p>
            <p>ID Khách sạn: <strong>{booking.hotelId}</strong></p>
            <p>ID Phòng: <strong>{booking.roomId}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Thời gian</h6>
            <p>Nhận phòng: <strong>{formatDate(booking.checkingDate)}</strong></p>
            <p>Trả phòng: <strong>{formatDate(booking.checkoutDate)}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Tổng tiền</h6>
            <p className="fs-5 fw-bold text-primary">{formatCurrency(booking.totalAmount)}</p>
          </div>

          <div className="text-center">
            <button
              className="btn btn-outline-primary px-4"
              style={{ borderRadius: "999px" }}
              onClick={() => navigate("/bookings/me")}
            >
              ← Quay lại
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookingDetail;
