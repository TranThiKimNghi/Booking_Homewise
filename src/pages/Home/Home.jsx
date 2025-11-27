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
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import Banner from "../../components/Header/Banner";
import hotelService from "../../services/hotelService"; // <-- kết nối API hotels
import keycloak from "../../keycloak/Keycloak";

function Home() {
  const navigate = useNavigate();

  // State tìm kiếm
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // State hotels
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [errorHotels, setErrorHotels] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoadingHotels(true);
        const data = await hotelService.getAll(); // API trả về mảng hotel
        setHotels(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setErrorHotels("Không thể tải danh sách khách sạn");
      } finally {
        setLoadingHotels(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Nếu chưa login, redirect sang Keycloak login
    if (!keycloak.authenticated) {
      keycloak.login();
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

  const guestText = `${adults} người lớn · ${children} trẻ em · ${rooms} phòng`;
  const dateText =
    checkIn && checkOut ? `${checkIn} — ${checkOut}` : "Chọn ngày đến - ngày đi";

  return (
    <div>
      {/* Banner */}
      <Banner />

      {/* Thanh tìm kiếm kiểu Booking */}
      <Container style={{ marginTop: "-40px", marginBottom: "40px" }}>
        <Form onSubmit={handleSearch}>
          <Card className="shadow-lg" style={{ borderRadius: "8px" }}>
            <Row className="g-0 align-items-stretch">
              {/* Điểm đến */}
              <Col md={4} sm={12}>
                <div
                  className="h-100 d-flex flex-column justify-content-center px-3 py-2"
                  style={{ borderRight: "1px solid #e3e3e3" }}
                >
                  <Form.Label className="mb-1 small text-muted">Điểm đến</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bạn muốn đến đâu?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ border: "none", boxShadow: "none", paddingLeft: 0 }}
                    required
                  />
                </div>
              </Col>

              {/* Ngày */}
              <Col md={4} sm={12}>
                <div
                  className="h-100 d-flex flex-column justify-content-center px-3 py-2"
                  style={{ borderRight: "1px solid #e3e3e3" }}
                >
                  <Form.Label className="mb-1 small text-muted">Ngày</Form.Label>
                  <div className="d-flex" style={{ gap: "0.5rem" }}>
                    <Form.Control
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                    />
                    <Form.Control
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </Col>

              {/* Khách & phòng */}
              <Col md={3} sm={12}>
                <div className="h-100 d-flex flex-column justify-content-center px-3 py-2">
                  <Form.Label className="mb-1 small text-muted">Khách & phòng</Form.Label>
                  <Dropdown
                    show={showGuestDropdown}
                    onToggle={(isOpen) => setShowGuestDropdown(isOpen)}
                  >
                    <Dropdown.Toggle
                      as="div"
                      className="d-flex align-items-center justify-content-between border rounded px-2 py-1"
                      style={{ cursor: "pointer", backgroundColor: "#fff" }}
                    >
                      <div className="d-flex align-items-center">
                        <FaUserFriends className="me-2" />
                        <span className="text-truncate">{guestText}</span>
                      </div>
                      <span>▾</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      align="end"
                      style={{ minWidth: "260px", padding: "1rem" }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Người lớn</span>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                          >
                            -
                          </Button>
                          <span className="mx-2">{adults}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setAdults((prev) => prev + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Trẻ em</span>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                          >
                            -
                          </Button>
                          <span className="mx-2">{children}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setChildren((prev) => prev + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Phòng</span>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                          >
                            -
                          </Button>
                          <span className="mx-2">{rooms}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setRooms((prev) => prev + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="text-end">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setShowGuestDropdown(false)}
                        >
                          Xong
                        </Button>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>

              {/* Nút Tìm */}
              <Col md={1} sm={12}>
                <div className="h-100 d-flex align-items-center justify-content-center p-2">
                  <Button
                    type="submit"
                    className="w-100 btn-primary"
                    style={{ borderRadius: "8px" }}
                  >
                    Tìm
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Form>
      </Container>

      {/* Danh sách Hotels */}
      <Container className="mb-5">
        <h2 className="mb-4">Khách sạn nổi bật</h2>

        {loadingHotels ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : errorHotels ? (
          <div className="text-center text-danger py-3">{errorHotels}</div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-3">Chưa có khách sạn nào</div>
        ) : (
          <Row>
            {hotels.map((hotel) => (
              <Col md={4} className="mb-3" key={hotel.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      hotel.imageUrl || `https://picsum.photos/300/200?random=${hotel.id}`
                    }
                  />
                  <Card.Body>
                    <Card.Title>{hotel.name}</Card.Title>
                    <Card.Text className="small text-muted">{hotel.address}</Card.Text>
                    <Button variant="primary" as={Link} to={`/rooms?hotelId=${hotel.id}`}>
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
