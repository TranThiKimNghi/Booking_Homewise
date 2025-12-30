import React, { useEffect, useState } from "react";
import nearbyService from "../../services/nearbyService"; // Dùng service riêng

const TopNearby = ({ hotelId }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadNearby = async () => {
      try {
        const data = await nearbyService.getTopNearby(hotelId);
        setPlaces(data);
      } catch (e) {
        console.error(e);
      }
    };

    if (hotelId) loadNearby();
  }, [hotelId]);

  return (
    <div>
      <strong>Địa điểm gần đây:</strong>
      <ul>
        {places.map((p) => (
          <li key={p.id}>{p.placeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopNearby;
