import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaBed, FaHotel, FaBook, FaDollarSign } from "react-icons/fa";
import userService from "../../services/userService";
import roomService from "../../services/roomService";
import hotelService from "../../services/hotelService";
import bookingService from "../../services/bookingService";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const users = await userService.getAll();
        setUserCount(Array.isArray(users) ? users.length : 0);

        const rooms = await roomService.getAll();
        setRoomCount(Array.isArray(rooms) ? rooms.length : 0);

        const hotels = await hotelService.getAll();
        setHotelCount(Array.isArray(hotels) ? hotels.length : 0);

        const bookings = await bookingService.getAll();
        setBookingCount(Array.isArray(bookings) ? bookings.length : 0);

        const totalRevenue = Array.isArray(bookings)
          ? bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
          : 0;

        setRevenue(totalRevenue);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { title: "Users", count: userCount, icon: <FaUsers size={30} />, bg: "primary" },
    { title: "Rooms", count: roomCount, icon: <FaBed size={30} />, bg: "success" },
    { title: "Hotels", count: hotelCount, icon: <FaHotel size={30} />, bg: "warning" },
    { title: "Bookings", count: bookingCount, icon: <FaBook size={30} />, bg: "info" },
    { title: "Revenue", count: `$${revenue.toLocaleString()}`, icon: <FaDollarSign size={30} />, bg: "danger" },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Dashboard</h2>
      <Row className="g-4">
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <Card className={`text-white bg-${stat.bg} h-100 shadow`}>
              <Card.Body className="d-flex align-items-center">
                <div className="me-3">{stat.icon}</div>
                <div>
                  <Card.Title>{stat.count}</Card.Title>
                  <Card.Text>{stat.title}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
