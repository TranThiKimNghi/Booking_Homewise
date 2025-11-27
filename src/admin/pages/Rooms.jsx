import React, { useState } from "react";
import RoomModal from "../components/RoomModal";
import { Table, Button } from "react-bootstrap";

function Rooms() {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Deluxe Room", price: 120 },
    { id: 2, name: "Suite Room", price: 200 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const handleAdd = () => {
    setEditingRoom(null);
    setShowModal(true);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  const handleSave = (room) => {
    const index = rooms.findIndex((r) => r.id === room.id);
    if (index > -1) {
      // update
      const updated = [...rooms];
      updated[index] = room;
      setRooms(updated);
    } else {
      // add
      setRooms([...rooms, room]);
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
            <th>ID</th>
            <th>Room Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>${room.price}</td>
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
      />
    </div>
  );
}

export default Rooms;
