import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookingModal from "../components/BookingModal";

function Bookings() {
  const [bookings, setBookings] = useState([
    { id: 1, user: "Alice", room: "Deluxe", date: "2025-12-01", status: "Confirmed" },
    { id: 2, user: "Bob", room: "Suite", date: "2025-12-05", status: "Pending" },
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this booking?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Room</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user}</td>
              <td>{b.room}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>
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
