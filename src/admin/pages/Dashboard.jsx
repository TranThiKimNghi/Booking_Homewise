import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaBed, FaHotel, FaBook, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import userService from "../../services/customerService";
import roomService from "../../services/roomService";
import hotelService from "../../services/hotelService";
import bookingService from "../../services/bookingService";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    rooms: 0,
    hotels: 0,
    bookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    // kiểm tra admin có login chưa
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      return navigate("/admin/login");
    }

    const loadDashboard = async () => {
      try {
        // KHÔNG truyền token nữa
        const [users, rooms, hotels, bookings] = await Promise.all([
          userService.getAll(),
          roomService.getAll(),
          hotelService.getAll(),
          bookingService.getAll(),
        ]);

        const safeUsers = Array.isArray(users) ? users.length : 0;
        const safeRooms = Array.isArray(rooms) ? rooms.length : 0;
        const safeHotels = Array.isArray(hotels) ? hotels.length : 0;
        const safeBookings = Array.isArray(bookings) ? bookings.length : 0;

        const safeRevenue = Array.isArray(bookings)
          ? bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
          : 0;

        setStats({
          users: safeUsers,
          rooms: safeRooms,
          hotels: safeHotels,
          bookings: safeBookings,
          revenue: safeRevenue,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    loadDashboard();
  }, []);

  const statCards = [
    { title: "Users", value: stats.users, icon: <FaUsers size={30} />, bg: "primary" },
    { title: "Rooms", value: stats.rooms, icon: <FaBed size={30} />, bg: "success" },
    { title: "Hotels", value: stats.hotels, icon: <FaHotel size={30} />, bg: "warning" },
    { title: "Bookings", value: stats.bookings, icon: <FaBook size={30} />, bg: "info" },
    {
      title: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: <FaDollarSign size={30} />,
      bg: "danger",
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <Row className="g-4">
        {statCards.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className={`h-100 text-white bg-${item.bg} shadow`}>
              <Card.Body className="d-flex align-items-center">
                <div className="me-3">{item.icon}</div>
                <div>
                  <Card.Title>{item.value}</Card.Title>
                  <Card.Text>{item.title}</Card.Text>
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
