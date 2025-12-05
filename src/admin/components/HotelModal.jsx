import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function HotelModal({ show, handleClose, handleSave, hotelData }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (hotelData) {
      setName(hotelData.name || "");
      setAddress(hotelData.address || "");
      setPhone(hotelData.phone || "");
      setEmail(hotelData.email || "");
      setRating(hotelData.rating ?? "");
    } else {
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setRating("");
    }
  }, [hotelData]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Hotel name required");
      return;
    }
    
    const hotel = {
      id: hotelData ? hotelData.id : undefined,
      name,
      address,
      phone,
      email,
      rating: Number(rating)
    };

    handleSave(hotel);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{hotelData ? "Edit Hotel" : "Add Hotel"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter hotel name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>

        <Button variant="primary" onClick={handleSubmit}>
          {hotelData ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HotelModal;
