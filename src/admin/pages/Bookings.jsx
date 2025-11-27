import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import BookingModal from "../components/BookingModal";
import bookingService from "../../services/bookingService";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getAll();
        setBookings(data); // đảm bảo data là mảng
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]); // fallback
      }
    };
    fetchBookings();
  }, []);

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this booking?")) {
      try {
        await bookingService.delete(id);
        setBookings(bookings.filter((b) => b.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Hotel ID</th>
            <th>Room ID</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(bookings || []).map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.userId}</td>
              <td>{b.hotelId}</td>
              <td>{b.roomId}</td>
              <td>{new Date(b.checkingDate).toLocaleString()}</td>
              <td>{new Date(b.checkoutDate).toLocaleString()}</td>
              <td>{b.status}</td>
              <td>${b.totalAmount}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleView(b)}>View</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(b.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <BookingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        booking={selectedBooking}
      />
    </div>
  );
}

export default Bookings;
