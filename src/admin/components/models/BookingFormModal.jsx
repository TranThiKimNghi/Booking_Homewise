import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import userService from "../../../services/customerService";
import hotelService from "../../../services/hotelService";
import roomService from "../../../services/roomService";

function BookingFormModal({ show, handleClose, booking, onSave }) {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [userId, setUserId] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkingDate, setCheckingDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    if (booking) {
      setUserId(booking.userId || "");
      setHotelId(booking.hotelId || "");
      setRoomId(booking.roomId || "");
      setCheckingDate(booking.checkingDate?.slice(0, 16) || "");
      setCheckoutDate(booking.checkoutDate?.slice(0, 16) || "");
      setStatus(booking.status || "");
      setTotalAmount(booking.totalAmount || "");
    } else {
      setUserId(""); setHotelId(""); setRoomId("");
      setCheckingDate(""); setCheckoutDate(""); setStatus(""); setTotalAmount("");
    }
  }, [booking, show]);

  useEffect(() => {
    userService.getAll().then(setUsers).catch(console.error);
    hotelService.getAll().then(setHotels).catch(console.error);
  }, []);

  useEffect(() => {
    if (hotelId) {
      roomService.getByHotel(hotelId).then(setRooms).catch(console.error);
    } else {
      setRooms([]);
    }
  }, [hotelId]);

  const handleSubmit = () => {
    onSave({
      userId, hotelId, roomId,
      checkingDate, checkoutDate,
      status, totalAmount: parseFloat(totalAmount)
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{booking ? "Edit Booking" : "Add Booking"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>User</Form.Label>
            <Form.Select value={userId} onChange={(e) => setUserId(e.target.value)}>
              <option value="">Select user</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Hotel</Form.Label>
            <Form.Select value={hotelId} onChange={(e) => setHotelId(e.target.value)}>
              <option value="">Select hotel</option>
              {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Room</Form.Label>
            <Form.Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              <option value="">Select room</option>
              {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="datetime-local"
              value={checkingDate}
              onChange={(e) => setCheckingDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="datetime-local"
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Total amount"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>{booking ? "Update" : "Add"}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingFormModal;
