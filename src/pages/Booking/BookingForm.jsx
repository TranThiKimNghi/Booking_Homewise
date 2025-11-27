import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService"; // default export

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  try {
    const payload = {
      userId: currentUser.id,  
      hotelId: room.hotelId,   
      roomId: id,
      checkingDate: checkIn,
      checkoutDate: checkOut,
      status: "pending",
      totalAmount: room.price * Number(guests), 
    };

    const result = await bookingService.create(payload);

    setSuccess("Đặt phòng thành công!");
    setTimeout(() => navigate("/booking"), 1000);
  } catch (err) {
    console.error(err.response || err);
    setError(err.response?.data?.message || "Có lỗi xảy ra khi đặt phòng!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}
      >
        <div
          className="card-header border-0 text-white"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            background: "linear-gradient(135deg, #0d6efd, #20c997)",
          }}
        >
          <h3 className="mb-0 text-center">Đặt phòng #{id}</h3>
          <p className="mb-0 text-center small opacity-75">
            Vui lòng điền đầy đủ thông tin để hoàn tất đặt phòng
          </p>
        </div>

        <div className="card-body p-4">
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập họ tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Ngày nhận phòng</label>
                <input
                  type="date"
                  className="form-control"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Ngày trả phòng</label>
                <input
                  type="date"
                  className="form-control"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Số khách</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Ghi chú (tuỳ chọn)</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Ví dụ: Yêu cầu giường đôi, tầng cao..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="bg-light rounded-3 p-3 mb-3">
              <h6 className="mb-2 fw-semibold">Thông tin đặt phòng</h6>
              <ul className="mb-0 small">
                <li>Phòng: <strong>#{id}</strong></li>
                <li>Khách: <strong>{guests}</strong></li>
                <li>Thời gian:{" "}
                  {checkIn && checkOut ? (
                    <strong>{checkIn} → {checkOut}</strong>
                  ) : (
                    <span className="text-muted">Chưa chọn ngày</span>
                  )}
                </li>
              </ul>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary flex-grow-1 fw-semibold"
                style={{ borderRadius: "999px" }}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Xác nhận đặt phòng"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ borderRadius: "999px" }}
                onClick={() => {
                  setName("");
                  setCheckIn("");
                  setCheckOut("");
                  setGuests(1);
                  setNote("");
                  setError("");
                  setSuccess("");
                }}
              >
                Xoá
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
