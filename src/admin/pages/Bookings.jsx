import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import BookingModal from "../components/BookingModal";
import BookingFormModal from "../components/BookingFormModal";
import bookingService from "../../services/bookingService";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showView, setShowView] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getAll();
      setBookings(data || []);
    } catch (error) {
      console.error("Load failed", error);
      setBookings([]);
    }
  };

  const handleAdd = () => {
    setEditingBooking(null);
    setShowForm(true);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingBooking) {
        await bookingService.update(editingBooking.id, formData);
      } else {
        await bookingService.create(formData);
      }
      loadBookings(); // refresh list
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await bookingService.delete(id);
        loadBookings();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-3">📌 Manage Bookings</h2>

      <Button variant="success" className="mb-3" onClick={handleAdd}>
        ➕ Add Booking
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
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
                <Button variant="info" size="sm" onClick={() => { setSelectedBooking(b); setShowView(true); }}>
                  View
                </Button>{" "}
                <Button variant="warning" size="sm" onClick={() => handleEdit(b)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(b.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <BookingModal
        show={showView}
        handleClose={() => setShowView(false)}
        booking={selectedBooking}
      />

      <BookingFormModal
        show={showForm}
        handleClose={() => setShowForm(false)}
        booking={editingBooking}
        onSave={handleSave}
      />
    </div>
  );
}

export default Bookings;
