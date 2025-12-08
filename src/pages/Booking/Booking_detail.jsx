import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spinner, Alert, Badge } from "react-bootstrap";
import bookingService from "../../services/bookingService";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await bookingService.getById(id);
        setBooking(data);
      } catch (err) {
        console.error(err);
        setError("Không tải được chi tiết booking!");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) return <div className="text-center py-5">⏳ Đang tải dữ liệu...</div>;
  if (error) return <Alert variant="danger" className="text-center py-5">{error}</Alert>;
  if (!booking) return <Alert variant="info" className="text-center py-5">Không tìm thấy booking!</Alert>;

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "warning";
      case "approved": return "success";
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
          <h3 className="mb-0 text-center">Chi tiết Booking #{booking.id}</h3>
          <p className="mb-0 text-center small opacity-75">
            Kiểm tra trạng thái và thông tin đặt phòng
          </p>
        </Card.Header>
        <Card.Body className="p-4">
          <div className="mb-3">
            <h6 className="fw-bold">Thông tin khách hàng</h6>
            <p>Tên: <strong>{booking.customerName || "Khách vãng lai"}</strong></p>
            <p>Email: <strong>{booking.customerEmail || "Không có"}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Thông tin phòng</h6>
            <p>Khách sạn: <strong>{booking.hotelName}</strong></p>
            <p>Phòng: <strong>{booking.roomName}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Thời gian</h6>
            <p>Nhận phòng: <strong>{formatDate(booking.checkInDate)}</strong></p>
            <p>Trả phòng: <strong>{formatDate(booking.checkOutDate)}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Số khách</h6>
            <p><strong>{booking.guests}</strong> người</p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Ghi chú</h6>
            <p>{booking.note || "Không có ghi chú"}</p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Trạng thái</h6>
            <Badge bg={getStatusVariant(booking.status)} className="p-2">{booking.status?.toUpperCase()}</Badge>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold">Tổng tiền</h6>
            <p className="fs-5 fw-bold text-primary">{formatCurrency(booking.totalAmount)}</p>
          </div>

          <div className="text-center">
            <button className="btn btn-outline-primary px-4" style={{ borderRadius: "999px" }} onClick={() => navigate("/bookings")}>
              ← Quay lại
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookingDetail;
