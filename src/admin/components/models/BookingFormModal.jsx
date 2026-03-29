import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function BookingFormModal({ show, handleClose, booking, onSave }) {
  const [formData, setFormData] = useState({
    userId: "",
    hotelId: "",
    roomId: "",
    checkingDate: "",
    checkoutDate: "",
    totalAmount: "",
    status: "PENDING",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        userId: booking.userId || "",
        hotelId: booking.hotelId || "",
        roomId: booking.roomId || "",
        checkingDate: booking.checkingDate?.slice(0, 10) || "",
        checkoutDate: booking.checkoutDate?.slice(0, 10) || "",
        totalAmount: booking.totalAmount || "",
        status: booking.status || "PENDING",
      });
    } else {
      setFormData({
        userId: "",
        hotelId: "",
        roomId: "",
        checkingDate: "",
        checkoutDate: "",
        totalAmount: "",
        status: "PENDING",
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {booking ? "Cập nhật booking" : "Thêm booking"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Hotel ID</Form.Label>
            <Form.Control
              name="hotelId"
              value={formData.hotelId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Room ID</Form.Label>
            <Form.Control
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              name="checkingDate"
              value={formData.checkingDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              name="checkoutDate"
              value={formData.checkoutDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Tổng tiền</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CANCELLED">CANCELLED</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingFormModal;
