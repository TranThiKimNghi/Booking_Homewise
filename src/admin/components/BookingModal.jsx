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
        <p><strong>User:</strong> {booking.user}</p>
        <p><strong>Room:</strong> {booking.room}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingModal;
