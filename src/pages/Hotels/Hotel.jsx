// HotelsPage.js
import React, { useState } from "react";
import HotelList from "../components/Hotel/HotelList";
import { FaSearch, FaMapMarkedAlt, FaStar } from "react-icons/fa";
import { Card, Form, InputGroup, Row, Col } from "react-bootstrap";

// Province mapping: (bạn nhớ đổi lại bằng provinceId thật từ backend)
const PROVINCE_MAPPING = {
  "3fa85f64-5717-4562-b3fc-2c963f66afa6": "TP.HCM",
  "a0a9b8c7-6d54-3e21-b1f0-987654321cba": "Hà Nội",
  "e9f8g7h6-5i4j-3k2l-1m0n-o1p2q3r4s5t6": "Đà Nẵng",
};

const PROVINCE_OPTIONS = Object.entries(PROVINCE_MAPPING);

function HotelsPage() {
  const [search, setSearch] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [rating, setRating] = useState("");

  const filterProps = { search, provinceId, rating };

  return (
    <div className="container py-5">

      {/* Banner */}
      <div
        className="p-5 mb-5 text-center text-white shadow-lg d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1501117716987-c8e1ecb210f1")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "15px",
          minHeight: "250px",
        }}
      >
        <h1 className="display-4 fw-bolder mb-2 text-shadow">
          Tìm kiếm Khách sạn hoàn hảo
        </h1>
        <p className="lead fw-normal text-shadow">
          Khám phá nơi nghỉ dưỡng tuyệt vời cho chuyến đi sắp tới của bạn.
        </p>
      </div>

      {/* Bộ lọc */}
      <Card className="shadow-sm mb-5 p-3">
        <Card.Body>
          <Card.Title className="mb-4 text-primary d-flex align-items-center">
            <FaSearch className="me-2" /> Bộ lọc Khách sạn
          </Card.Title>

          <Row className="g-3">

            {/* Tìm theo tên */}
            <Col md={4}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Tìm theo tên khách sạn..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Tỉnh/Thành */}
            <Col md={4}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text><FaMapMarkedAlt /></InputGroup.Text>
                  <Form.Select
                    value={provinceId}
                    onChange={(e) => setProvinceId(e.target.value)}
                  >
                    <option value="">Chọn tỉnh/thành</option>
                    {PROVINCE_OPTIONS.map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Rating */}
            <Col md={4}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text><FaStar /></InputGroup.Text>
                  <Form.Select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Đánh giá sao</option>
                    <option value="5">⭐ 5 sao</option>
                    <option value="4">⭐ 4 sao</option>
                    <option value="3">⭐ 3 sao</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>

          </Row>
        </Card.Body>
      </Card>

      {/* Danh sách khách sạn */}
      <HotelList filter={filterProps} />

      <style jsx="true">{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
}

export default HotelsPage;
