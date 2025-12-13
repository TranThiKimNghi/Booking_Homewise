import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import HotelModal from "../components/models/HotelModal";
import hotelService from "../../services/hotelService";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchHotels = async () => {
    try {
      const data = await hotelService.getAll();
      setHotels(data ?? []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setHotels([]);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAdd = () => {
    setSelectedHotel(null);
    setShowModal(true);
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleSave = async (hotel) => {
    try {
      if (hotel.id) {
        await hotelService.update(hotel.id, hotel);
      } else {
        const newHotel = await hotelService.create(hotel);
        setHotels((prev) => [...prev, newHotel]);
      }
      fetchHotels();
    } catch (err) {
      console.error("Error saving hotel:", err);
      alert("Lưu khách sạn thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa khách sạn này?")) return;
    try {
      await hotelService.delete(id);
      setHotels((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Error deleting hotel:", err);
      alert("Xóa thất bại!");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Hotels</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Hotel
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">
                Chưa có khách sạn
              </td>
            </tr>
          ) : (
            hotels.map((h, i) => (
              <tr key={h.id}>
                <td>{i + 1}</td>
                <td>{h.name}</td>
                <td>{h.address}</td>
                <td>{h.phone}</td>
                <td>{h.email}</td>
                <td>{h.rating}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(h)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(h.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <HotelModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedHotel(null);
        }}
        handleSave={handleSave}
        hotelData={selectedHotel}
      />
    </div>
  );
}

export default Hotels;
