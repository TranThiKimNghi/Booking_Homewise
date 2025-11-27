import React, { useState, useEffect } from "react";
import RoomModal from "../components/RoomModal";
import { Table, Button } from "react-bootstrap";
import roomService from "../../services/roomService";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  // Load rooms từ API
  const fetchRooms = async () => {
    try {
      const data = await roomService.getAll();
      setRooms(data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAdd = () => {
    setEditingRoom(null);
    setShowModal(true);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await roomService.delete(id);
        setRooms(rooms.filter((r) => r.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleSave = async (room) => {
  try {
    if (room.id) {
      await roomService.update(room);
    } else {
      await roomService.create(room);
    }
    fetchRooms(); // gọi lại để cập nhật danh sách
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div>
      <h2 className="mb-4">Manage Rooms</h2>
      <Button className="mb-3" onClick={handleAdd}>
        Add Room
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>${room.price}</td>
              <td>{room.status}</td>
              <td>{room.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(room)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(room.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RoomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        roomData={editingRoom}
        defaultHotelId="" // truyền hotelId mặc định nếu có
      />
    </div>
  );
}

export default Rooms;
