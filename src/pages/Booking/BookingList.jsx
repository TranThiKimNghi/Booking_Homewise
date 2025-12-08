import React, { useState, useEffect, useContext } from "react";
import { Table, Container, Spinner, Alert, Badge, Card } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import bookingService from "../../services/bookingService";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import { AuthContext } from "../../contexts/AuthContext";

const getStatusVariant = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

function BookingList() {
  const { user } = useContext(AuthContext); // user hiện tại
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setError("Bạn cần đăng nhập để xem lịch sử đặt phòng.");
        setLoading(false);
        return;
      }
      try {
        const data = await bookingService.getByUser(user.id);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách đặt phòng.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải lịch sử đặt phòng...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  if (!bookings.length) {
    return <Alert variant="info" className="text-center">Bạn chưa có lịch sử đặt phòng nào.</Alert>;
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-primary fw-bold">Lịch sử Đặt phòng của bạn</h2>
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Ngày Check-in</th>
                <th>Ngày Check-out</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td><FaCalendarAlt className="text-info me-1" /> {formatDate(booking.checkingDate)}</td>
                  <td><FaClock className="text-danger me-1" /> {formatDate(booking.checkoutDate)}</td>
                  <td><FaMoneyBillWave className="me-1" /> {formatCurrency(booking.totalAmount)}</td>
                  <td><Badge bg={getStatusVariant(booking.status)} className="p-2">{booking.status?.toUpperCase() || "KHÔNG RÕ"}</Badge></td>
                  <td>
                    <Link to={`/bookings/${booking.id}`} className="text-primary">
                      <FaInfoCircle className="me-1" /> Xem
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingList;
