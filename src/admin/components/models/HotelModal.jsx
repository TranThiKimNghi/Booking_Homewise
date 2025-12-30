import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function HotelModal({ show, handleClose, handleSave, hotelData }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hotelData) {
      setName(hotelData.name || "");
      setAddress(hotelData.address || "");
      setPhone(hotelData.phone || "");
      setEmail(hotelData.email || "");
      setRating(hotelData.rating || "");
    } else {
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setRating("");
    }
    setErrors({});
  }, [hotelData, show]);

  const validate = () => {
    const err = {};
    if (!name) err.name = "Required";
    if (!address) err.address = "Required";
    if (!phone) err.phone = "Required";
    if (email && !/\S+@\S+\.\S+/.test(email)) err.email = "Invalid email";
    if (rating && (isNaN(rating) || rating < 0 || rating > 5))
      err.rating = "Rating must be 0-5";
    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    handleSave({
      id: hotelData ? hotelData.id : undefined,
      name,
      address,
      phone,
      email,
      rating: rating ? parseFloat(rating) : 0,
    });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{hotelData ? "Cập nhật khách sạn" : "Thêm khách sạn"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hotel name"
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Hotel address"
            />
            {errors.address && <small className="text-danger">{errors.address}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="0-5"
              min="0"
              max="5"
              step="0.1"
            />
            {errors.rating && <small className="text-danger">{errors.rating}</small>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {hotelData ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HotelModal;
