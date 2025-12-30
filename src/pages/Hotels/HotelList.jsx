import React, { useEffect, useState, useMemo } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaStar,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import hotelService from "../../services/hotelService";
import hotelImageService from "../../services/hotelImageService";
import TopNearby from "./TopNearbyList";

const HOTELS_PER_PAGE = 5;

// ✅ BACKEND URL (QUAN TRỌNG)
const BACKEND_URL = "http://localhost:8082";

function HotelList({ filter = {} }) {
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { search, provinceId, rating } = filter;

  // ===================== FETCH HOTEL + IMAGE =====================
  useEffect(() => {
    const fetchHotelsWithImages = async () => {
      setLoading(true);

      try {
        const hotels = await hotelService.getAll();

        const hotelsWithImage = await Promise.all(
          hotels.map(async (hotel) => {
            try {
              const images = await hotelImageService.getByHotelId(hotel.id);

              const primary = images.find((img) => img.isPrimary);
              const fallback = images[0];

              const imageUrl = primary?.url
                ? `${BACKEND_URL}${primary.url}`
                : fallback?.url
                ? `${BACKEND_URL}${fallback.url}`
                : null;

              return {
                ...hotel,
                imageUrl,
              };
            } catch (err) {
              console.error("Image load failed for hotel:", hotel.id);
              return { ...hotel, imageUrl: null };
            }
          })
        );

        setAllHotels(hotelsWithImage);
      } catch (err) {
        console.error("Fetch Hotels Error:", err);
        setError("Lỗi tải dữ liệu khách sạn!");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsWithImages();
  }, []);

  // ===================== FILTER =====================
  const filteredHotels = useMemo(() => {
    setCurrentPage(1);

    return allHotels.filter((hotel) => {
      let ok = true;

      if (search)
        ok &= hotel.name.toLowerCase().includes(search.toLowerCase());
      if (provinceId) ok &= hotel.provinceId === provinceId;
      if (rating) ok &= hotel.rating >= parseInt(rating);

      return ok;
    });
  }, [allHotels, search, provinceId, rating]);

  // ===================== PAGINATION =====================
  const totalResults = filteredHotels.length;
  const totalPages = Math.ceil(totalResults / HOTELS_PER_PAGE);

  const currentHotels = useMemo(() => {
    const start = (currentPage - 1) * HOTELS_PER_PAGE;
    return filteredHotels.slice(start, start + HOTELS_PER_PAGE);
  }, [filteredHotels, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ===================== UI STATE =====================
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải danh sách khách sạn...</p>
      </div>
    );
  }

  if (error)
    return <div className="alert alert-danger text-center">{error}</div>;

  if (filteredHotels.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        Không tìm thấy khách sạn phù hợp.
      </div>
    );
  }

  // ===================== RENDER LIST =====================
  return (
    <>
      <Row>
        {currentHotels.map((hotel) => (
          <Col lg={12} key={hotel.id} className="mb-4">
            <Card className="shadow-sm h-100 border-0">
              <Row className="g-0">
                {/* ẢNH */}
                <Col md={4} style={{ overflow: "hidden" }}>
                  <Card.Img
                    src={hotel.imageUrl || "/no-image.png"}
                    alt={hotel.name}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px 0 0 10px",
                    }}
                    onError={(e) => {
                      e.target.src = "/no-image.png";
                    }}
                  />
                </Col>

                {/* NỘI DUNG */}
                <Col md={8}>
                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title
                          className="text-primary fw-bold mb-0"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {hotel.name}
                        </Card.Title>

                        <div className="text-nowrap">
                          {[...Array(Math.min(5, hotel.rating || 0))].map(
                            (_, i) => (
                              <FaStar
                                key={i}
                                className="text-warning"
                                size={16}
                              />
                            )
                          )}
                          <span className="small text-muted ms-1">
                            ({hotel.rating} sao)
                          </span>
                        </div>
                      </div>

                      <Card.Text className="small text-muted mb-3">
                        <FaMapMarkerAlt
                          className="me-1 text-secondary"
                          size={14}
                        />
                        {hotel.address}
                      </Card.Text>

                      <p
                        className="text-muted"
                        style={{
                          fontSize: "0.9rem",
                          maxHeight: "50px",
                          overflow: "hidden",
                        }}
                      >
                        {hotel.description || "Mô tả đang cập nhật."}
                      </p>
                    </div>

                    <TopNearby hotelId={hotel.id} />

                    <div className="mt-3 text-end">
                      <Button
                        variant="primary"
                        as={Link}
                        to={`/rooms?hotelId=${hotel.id}`}
                        className="d-inline-flex align-items-center"
                      >
                        <FaEye className="me-2" /> Xem Chi tiết & Đặt phòng
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-5 p-3 border-top">
          <Button
            variant="outline-primary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaChevronLeft size={12} className="me-1" /> Trang trước
          </Button>

          <strong>
            Trang {currentPage}/{totalPages}
          </strong>

          <Button
            variant="outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Trang sau <FaChevronRight size={12} className="ms-1" />
          </Button>
        </div>
      )}
    </>
  );
}

export default HotelList;
