import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hotelService from "../../services/hotelService";

function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await hotelService.getById(id);
        setHotel(data);
      } catch (err) {
        setError(err.response?.data?.message || "Lấy thông tin khách sạn thất bại!");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="card p-3">
      <h3>{hotel.name}</h3>
      <p>{hotel.address}</p>
      <p>Số phòng: {hotel.rooms?.length || 0}</p>
    </div>
  );
}

export default HotelDetail;
