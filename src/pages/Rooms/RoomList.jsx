import React, { useEffect, useState } from "react";
import roomService from "../../services/roomService"; 

function RoomList() {
  const [rooms, setRooms] = useState([]); // lưu danh sách phòng
  const [loading, setLoading] = useState(true); // trạng thái loading
  const [error, setError] = useState(""); // trạng thái lỗi

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await roomService.getAll(); // gọi API
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError("Có lỗi khi tải danh sách phòng!");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);
    if (loading) return <div>Đang tải phòng...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!rooms.length) return <div>Chưa có phòng nào.</div>;

  return (
    <div className="row">
      {rooms.map((room) => (
        <div className="col-md-4 mb-3" key={room.id}>
          <div className="card">
            <img
              src={room.image || "https://picsum.photos/300/200"}
              className="card-img-top"
              alt={room.name || "Room"}
            />
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text">
                {room.description || "Mô tả phòng chưa có"}
              </p>
              <p className="card-text fw-bold">{room.price ? `$${room.price}` : "Chưa có giá"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  [];
}

export default RoomList;

