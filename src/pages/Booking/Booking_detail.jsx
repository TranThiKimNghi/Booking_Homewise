import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";

function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBooking = async () => {
      try {
        const data = await bookingService.getById(id);
        setBooking(data);
      } catch (err) {
        console.error(err);
        setError("Không tải được chi tiết đặt phòng!");
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [id]);

  if (loading) return <div className="text-center py-5">⏳ Đang tải dữ liệu...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;
  if (!booking) return <div className="text-center py-5">Không tìm thấy booking!</div>;

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "700px", width: "100%", borderRadius: "20px" }}
      >
        <div
          className="card-header text-white border-0"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            background: "linear-gradient(135deg, #20c997, #0d6efd)",
          }}
        >
          <h3 className="mb-0 text-center">Chi tiết Booking #{booking.id}</h3>
          <p className="mb-0 text-center small opacity-75">
            Kiểm tra trạng thái và thông tin đặt phòng của bạn
          </p>
        </div>

        <div className="card-body p-4">
          <div className="mb-3">
            <h6 className="fw-bold mb-1">Thông tin khách hàng</h6>
            <p className="mb-1">Tên: <strong>{booking.customerName}</strong></p>
            <p>Email: <strong>{booking.customerEmail || "Không có"}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold mb-1">Thông tin phòng</h6>
            <p>Khách sạn: <strong>{booking.hotelName}</strong></p>
            <p>Phòng: <strong>{booking.roomName}</strong></p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold mb-1">Thời gian</h6>
            <p>
              Nhận phòng: <strong>{booking.checkinDate}</strong>
            </p>
            <p>
              Trả phòng: <strong>{booking.checkoutDate}</strong>
            </p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold mb-1">Số khách</h6>
            <p><strong>{booking.guests}</strong> người</p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold mb-1">Ghi chú</h6>
            <p>{booking.note || "Không có ghi chú"}</p>
          </div>

          <hr />

          <div className="mb-3">
            <h6 className="fw-bold mb-1">Trạng thái</h6>
            <span
              className={`badge px-3 py-2 ${
                booking.status === "pending"
                  ? "bg-warning"
                  : booking.status === "approved"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>

          <div className="mb-3">
            <h6 className="fw-bold mb-1">Tổng tiền</h6>
            <p className="fs-5 fw-bold text-primary">
              {booking.totalAmount ? `$${booking.totalAmount}` : "Chưa tính"}
            </p>
          </div>

          <div className="text-center">
            <button
              className="btn btn-outline-primary px-4"
              style={{ borderRadius: "999px" }}
              onClick={() => navigate("/booking")}
            >
              ← Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
