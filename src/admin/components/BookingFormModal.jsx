import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function BookingFormModal({ show, handleClose, onSave, booking }) {
  const [form, setForm] = useState({
    userId: "",
    hotelId: "",
    roomId: "",
    checkingDate: "",
    checkoutDate: "",
    status: "",
    totalAmount: ""
  });

  useEffect(() => {
    if (booking) {
      setForm({
        userId: booking.userId,
        hotelId: booking.hotelId,
        roomId: booking.roomId,
        checkingDate: booking.checkingDate?.slice(0, 16),
        checkoutDate: booking.checkoutDate?.slice(0, 16),
        status: booking.status,
        totalAmount: booking.totalAmount,
      });
    } else {
      setForm({
        userId: "",
        hotelId: "",
        roomId: "",
        checkingDate: "",
        checkoutDate: "",
        status: "",
        totalAmount: ""
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{booking ? "Edit Booking" : "Add Booking"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>User ID</Form.Label>
            <Form.Control name="userId" value={form.userId} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Hotel ID</Form.Label>
            <Form.Control name="hotelId" value={form.hotelId} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Room ID</Form.Label>
            <Form.Control name="roomId" value={form.roomId} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Check-in</Form.Label>
            <Form.Control type="datetime-local" name="checkingDate" value={form.checkingDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Check-out</Form.Label>
            <Form.Control type="datetime-local" name="checkoutDate" value={form.checkoutDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Status</Form.Label>
            <Form.Control name="status" value={form.status} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control name="totalAmount" type="number" value={form.totalAmount} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingFormModal;
