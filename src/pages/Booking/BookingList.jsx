import React, { useState, useEffect } from "react";
import bookingService from "../../services/bookingService";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getAll();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {bookings.map((b) => (
        <li key={b.id}>{b.name} - {b.date}</li>
      ))}
    </ul>
  );
};

export default BookingList;
