import React, { useEffect, useState } from "react";
import hotelService from "../../services/hotelService";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelService.getAll();
        setHotels(data);
      } catch (err) {
        setError(err.response?.data?.message || "Lấy danh sách khách sạn thất bại!");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="row">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{hotel.name}</h5>
              <p className="card-text">{hotel.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HotelList;
