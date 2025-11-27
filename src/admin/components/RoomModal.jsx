import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RoomModal({ show, handleClose, handleSave, roomData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (roomData) {
      setName(roomData.name);
      setPrice(roomData.price);
    } else {
      setName("");
      setPrice("");
    }
  }, [roomData]);

  const handleSubmit = () => {
    handleSave({ id: roomData ? roomData.id : Date.now(), name, price });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{roomData ? "Edit Room" : "Add Room"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
