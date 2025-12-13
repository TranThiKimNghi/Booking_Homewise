import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { FaUserFriends, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

import Banner from "../../components/Header/Banner";
import hotelService from "../../services/hotelService";
import hotelImageService from "../../services/hotelImageService";

// ===== BACKEND URL =====
const BACKEND_URL = "http://localhost:8082";

// ===== Date Utils =====
const getToday = () => new Date().toISOString().split("T")[0];
const getTomorrow = () => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split("T")[0];
};

function Home() {
  const navigate = useNavigate();

  // ===== Search State =====
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(getToday());
  const [checkOut, setCheckOut] = useState(getTomorrow());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // ===== Hotel State =====
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [errorHotels, setErrorHotels] = useState("");

  // ================= FETCH HOTELS + IMAGES =================
  useEffect(() => {
    const fetchHotelsWithImages = async () => {
      setLoadingHotels(true);
      try {
        const data = await hotelService.getAll();

        const hotelsWithImages = await Promise.all(
          data.map(async (hotel) => {
            try {
              const images = await hotelImageService.getByHotelId(hotel.id);
              const primary = images.find((i) => i.isPrimary);
              const fallback = images[0];

              const imageUrl = primary?.url
                ? `${BACKEND_URL}${primary.url}`
                : fallback?.url
                ? `${BACKEND_URL}${fallback.url}`
                : null;

              return { ...hotel, imageUrl };
            } catch {
              return { ...hotel, imageUrl: null };
            }
          })
        );

        setHotels(hotelsWithImages);
      } catch (err) {
        console.error(err);
        setErrorHotels("Không thể tải danh sách khách sạn");
      } finally {
        setLoadingHotels(false);
      }
    };

    fetchHotelsWithImages();
  }, []);

  // ================= SEARCH =================
  const handleSearch = (e) => {
    e.preventDefault();

    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Ngày trả phòng phải sau ngày nhận phòng.");
      return;
    }

    const queryParams = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
    }).toString();

    navigate(`/rooms?${queryParams}`);
  };

  const guestText = `${adults} Người lớn · ${children} Trẻ em · ${rooms} Phòng`;

  return (
    <div>
      {/* ===== Banner ===== */}
      <Banner />

      {/* ===== SEARCH BAR ===== */}
      <Container style={{ marginTop: "-60px", marginBottom: "60px" }}>
        <Form onSubmit={handleSearch}>
          <Card className="shadow-lg border-0" style={{ borderRadius: "12px" }}>
            <Row className="g-0">
              {/* Destination */}
              <Col md={2} className="p-3">
                <FaMapMarkerAlt className="me-2 text-primary" />
                <Form.Control
                  placeholder="Điểm đến"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  style={{ border: "none", boxShadow: "none" }}
                />
              </Col>

              {/* Dates */}
              <Col md={4} className="p-3 border-start border-end">
                <Row>
                  <Col>
                    <Form.Label>Nhận phòng</Form.Label>
                    <Form.Control
                      type="date"
                      value={checkIn}
                      min={getToday()}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Trả phòng</Form.Label>
                    <Form.Control
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>

              {/* Guests */}
              <Col md={6} className="p-3">
                <Row>
                  <Col xs={7}>
                    <Dropdown
                      show={showGuestDropdown}
                      onToggle={setShowGuestDropdown}
                    >
                      <Dropdown.Toggle as="div" className="border p-2">
                        <FaUserFriends className="me-2" />
                        {guestText}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="px-3 py-2">
                          <Button onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                          <span className="mx-2">{adults}</span>
                          <Button onClick={() => setAdults(adults + 1)}>+</Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>

                  <Col xs={5}>
                    <Button type="submit" className="w-100">
                      <FaSearch className="me-2" /> Tìm
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Form>
      </Container>

      {/* ===== FEATURED HOTELS ===== */}
      <Container className="mb-5">
        <h2 className="mb-4 text-center">✨ Khách sạn nổi bật</h2>

        {loadingHotels ? (
          <Spinner />
        ) : errorHotels ? (
          <p className="text-danger text-center">{errorHotels}</p>
        ) : (
          <Row>
            {hotels.map((hotel) => (
              <Col md={4} key={hotel.id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    src={hotel.imageUrl || "/no-image.png"}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/no-image.png")}
                  />
                  <Card.Body>
                    <Card.Title>{hotel.name}</Card.Title>
                    <Card.Text>
                      <FaMapMarkerAlt className="me-1" />
                      {hotel.address}
                    </Card.Text>
                    <Button
                      as={Link}
                      to={`/rooms?hotelId=${hotel.id}`}
                      variant="outline-primary"
                      className="w-100"
                    >
                      Xem phòng
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;
