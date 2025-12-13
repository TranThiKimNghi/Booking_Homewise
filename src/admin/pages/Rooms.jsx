import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import RoomModal from "../components/models/RoomModal";
import roomService from "../../services/roomService";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

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
    if (!window.confirm("Bạn chắc chắn muốn xóa phòng này?")) return;
    try {
      await roomService.delete(id);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (err) {
      alert("Xóa thất bại!");
      console.error(err);
    }
  };

  const handleSave = async (room) => {
    try {
      if (room.id) {
        await roomService.update(room.id, room);
      } else {
        const newRoom = await roomService.create(room);
        setRooms((prev) => [...prev, newRoom]);
      }
      fetchRooms();
    } catch (err) {
      console.error("Save room error:", err);
      alert("Lưu phòng thất bại!");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Rooms</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Add Room
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">
                Chưa có phòng nào
              </td>
            </tr>
          ) : (
            rooms.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.roomNumber}</td>
                <td>{r.roomType}</td>
                <td>${r.price}</td>
                <td>{r.status}</td>
                <td>{r.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(r)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
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
