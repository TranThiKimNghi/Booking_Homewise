import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RoomModal({ show, handleClose, handleSave, roomData }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("available");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (roomData) {
      setRoomNumber(roomData.roomNumber || "");
      setRoomType(roomData.roomType || "");
      setPrice(roomData.price || "");
      setStatus(roomData.status || "available");
      setDescription(roomData.description || "");
    } else {
      setRoomNumber("");
      setRoomType("");
      setPrice("");
      setStatus("available");
      setDescription("");
    }
    setErrors({});
  }, [roomData, show]);

  const validate = () => {
    let err = {};
    if (!roomNumber) err.roomNumber = "Required";
    if (!roomType) err.roomType = "Required";
    if (!price || isNaN(price)) err.price = "Invalid price";
    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    handleSave({
      id: roomData ? roomData.id : undefined,
      roomNumber,
      roomType,
      price: parseFloat(price),
      status,
      description,
    });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{roomData ? "Cập nhật phòng" : "Thêm phòng"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Nhập số phòng"
            />
            {errors.roomNumber && <small className="text-danger">{errors.roomNumber}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              placeholder="Nhập loại phòng"
            />
            {errors.roomType && <small className="text-danger">{errors.roomType}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Nhập giá phòng"
              type="number"
            />
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả phòng"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {roomData ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomModal;
