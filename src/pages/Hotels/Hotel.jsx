// HotelsPage.js
import React, { useState, useEffect } from "react";
import HotelList from "../components/Hotel/HotelList";
import { FaSearch, FaMapMarkedAlt, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Card, Form, InputGroup, Row, Col, Button, Container } from "react-bootstrap";
import hotelService from "../services/hotelService";

const PROVINCE_MAPPING = {
  "3fa85f64-5717-4562-b3fc-2c963f66afa6": "TP.HCM",
  "a0a9b8c7-6d54-3e21-b1f0-987654321cba": "Hà Nội",
  "e9f8g7h6-5i4j-3k2l-1m0n-o1p2q3r4s5t6": "Đà Nẵng",
};

const PROVINCE_OPTIONS = Object.entries(PROVINCE_MAPPING);

function HotelsPage() {
  // ===== Filter =====
  const [search, setSearch] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [rating, setRating] = useState("");

  // ===== Hotels Data =====
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ===== Fetch hotels =====
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getAll(); // giả sử getAll trả về danh sách khách sạn
        setHotels(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách khách sạn.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  // ===== Filtered Hotels =====
  const filteredHotels = hotels.filter((hotel) => {
    const text = search.toLowerCase();
    const matchName = hotel.name.toLowerCase().includes(text);
    const matchProvince = provinceId ? hotel.provinceId === provinceId : true;
    const matchRating = rating ? hotel.rating === parseInt(rating) : true;
    return matchName && matchProvince && matchRating;
  });

  // ===== Pagination =====
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHotels = filteredHotels.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleClearFilters = () => {
    setSearch("");
    setProvinceId("");
    setRating("");
    setCurrentPage(1);
  };

  return (
    <Container className="py-5">

      {/* Banner */}
      <div
        className="p-5 mb-5 text-center text-white shadow-lg d-flex flex-column justify-content-center align-items-center rounded-4"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1501117716987-c8e1ecb210f1")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "250px",
        }}
      >
        <h1 className="display-5 fw-bold text-shadow">Tìm kiếm Khách sạn hoàn hảo</h1>
        <p className="lead text-shadow">Khám phá nơi nghỉ dưỡng tuyệt vời cho chuyến đi sắp tới của bạn.</p>
      </div>

      {/* Filter Card */}
      <Card className="shadow-sm mb-5 p-4 rounded-4 border-0">
        <Card.Body>
          <Card.Title className="mb-4 text-primary d-flex align-items-center">
            <FaSearch className="me-2" /> Bộ lọc Khách sạn
          </Card.Title>
          <Row className="g-3 align-items-end">

            {/* Name */}
            <Col md={4} xs={12}>
              <Form.Label>Tên khách sạn</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Nhập tên khách sạn..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            {/* Province */}
            <Col md={4} xs={12}>
              <Form.Label>Tỉnh/Thành</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaMapMarkedAlt /></InputGroup.Text>
                <Form.Select
                  value={provinceId}
                  onChange={(e) => setProvinceId(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {PROVINCE_OPTIONS.map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Rating */}
            <Col md={3} xs={12}>
              <Form.Label>Đánh giá sao</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaStar /></InputGroup.Text>
                <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="">Tất cả</option>
                  <option value="5">⭐ 5 sao</option>
                  <option value="4">⭐ 4 sao</option>
                  <option value="3">⭐ 3 sao</option>
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Clear button */}
            <Col md={1} xs={12} className="text-end">
              <Button variant="outline-secondary" className="w-100" onClick={handleClearFilters}>
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Hotels List */}
      {loading ? (
        <p className="text-center">Đang tải khách sạn...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : paginatedHotels.length === 0 ? (
        <p className="text-center">Không tìm thấy khách sạn phù hợp.</p>
      ) : (
        <>
          <Row className="g-4 mb-4">
            {paginatedHotels.map((hotel) => (
              <Col md={4} xs={12} key={hotel.id}>
                <Card className="h-100 shadow-sm rounded-3">
                  <Card.Img
                    variant="top"
                    src={hotel.imageUrl || "/no-image.png"}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/no-image.png")}
                  />
                  <Card.Body>
                    <Card.Title>{hotel.name}</Card.Title>
                    <Card.Text>{hotel.address}</Card.Text>
                    <Button href={`/rooms?hotelId=${hotel.id}`} variant="primary" className="w-100">
                      Xem phòng
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Button variant="outline-primary" disabled={currentPage === 1} onClick={handlePrevPage}>
              <FaArrowLeft /> Trang trước
            </Button>
            <span>Trang {currentPage} / {totalPages}</span>
            <Button variant="outline-primary" disabled={currentPage === totalPages} onClick={handleNextPage}>
              Trang sau <FaArrowRight />
            </Button>
          </div>
        </>
      )}

      <style jsx="true">{`
        .text-shadow {
          text-shadow: 2px 2px 6px rgba(0,0,0,0.6);
        }
      `}</style>
    </Container>
  );
}

export default HotelsPage;
