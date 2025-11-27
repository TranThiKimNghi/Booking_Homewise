import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RoomModal({ show, handleClose, handleSave, roomData, defaultHotelId }) {
  const [hotelId, setHotelId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  // Khi mở modal cho edit / add mới
  useEffect(() => {
    if (roomData) {
      // Edit
      setHotelId(roomData.hotelId || "");
      setRoomNumber(roomData.roomNumber || "");
      setRoomType(roomData.roomType || "");
      setPrice(roomData.price ?? 0);
      setStatus(roomData.status || "");
      setDescription(roomData.description || "");
    } else {
      // Add mới
      setHotelId(defaultHotelId || "");
      setRoomNumber("");
      setRoomType("");
      setPrice(0);
      setStatus("");
      setDescription("");
    }
  }, [roomData, defaultHotelId]);

  const handleSubmit = () => {
    const dto = {
      id: roomData ? roomData.id : undefined, // create thì để undefined cho backend tự tạo
      hotelId,
      roomNumber,
      roomType,
      price: Number(price),
      status,
      description,
    };

    handleSave(dto);   // parent sẽ gọi API create/update ở đây
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{roomData ? "Edit Room" : "Add Room"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Nếu hotelId đã biết sẵn (theo khách sạn đang chọn) có thể disable ô này */}
          <Form.Group className="mb-3">
            <Form.Label>Hotel ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter hotel ID"
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="BOOKED">BOOKED</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {roomData ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomModal;
