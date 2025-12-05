import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import HotelModal from "../components/HotelModal";
import hotelService from "../../services/hotelService";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load hotel list
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

  // ADD
  const handleAdd = () => {
    setSelectedHotel(null);
    setShowModal(true);
  };

  // EDIT
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  // SAVE Add/Update
  const handleSave = async (hotel) => {
    try {
      if (hotel.id) {
        await hotelService.update(hotel.id, hotel);
      } else {
        await hotelService.create(hotel);
      }

      setShowModal(false);
      setSelectedHotel(null);
      fetchHotels();

    } catch (err) {
      console.error("Error saving hotel:", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this hotel?")) return;

    try {
      await hotelService.delete(id);
      setHotels((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Hotels</h2>

      <Button className="mb-3" onClick={handleAdd}>
        Add Hotel
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
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
              <td colSpan="7" style={{ textAlign: "center" }}>
                No hotels found.
              </td>
            </tr>
          ) : (
            hotels.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.address}</td>
                <td>{h.phone}</td>
                <td>{h.email}</td>
                <td>{h.rating}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(h)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(h.id)}
                  >
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
