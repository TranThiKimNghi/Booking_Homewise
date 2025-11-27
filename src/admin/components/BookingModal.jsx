import React from "react";
import { Modal, Button } from "react-bootstrap";

function BookingModal({ show, handleClose, booking }) {
  if (!booking) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {booking.id}</p>
        <p><strong>User ID:</strong> {booking.userId}</p>
        <p><strong>Hotel ID:</strong> {booking.hotelId}</p>
        <p><strong>Room ID:</strong> {booking.roomId}</p>
        <p><strong>Check-in:</strong> {new Date(booking.checkingDate).toLocaleString()}</p>
        <p><strong>Check-out:</strong> {new Date(booking.checkoutDate).toLocaleString()}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingModal;
