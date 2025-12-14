// src/admin/pages/Hotels.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import HotelModal from "../components/models/HotelModal";
import hotelService from "../../services/hotelService";
import hotelImageService from "../../services/hotelImageService";

const BACKEND_URL = "http://localhost:8082"; // URL backend
const PAGE_SIZE = 6;

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const resolveImageUrl = (url) =>
    !url ? "/no-image.png" : url.startsWith("http") ? url : `${BACKEND_URL}${url}`;

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const hotelsData = await hotelService.getAll();
      const hotelsWithImages = await Promise.all(
        hotelsData.map(async (hotel) => {
          try {
            const images = await hotelImageService.getByHotelId(hotel.id);
            const primary = images.find((img) => img.isPrimary);
            const fallback = images[0];
            return { ...hotel, imageUrl: resolveImageUrl(primary?.url || fallback?.url) };
          } catch {
            return { ...hotel, imageUrl: "/no-image.png" };
          }
        })
      );
      setHotels(hotelsWithImages);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách khách sạn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAdd = () => {
    setEditingHotel(null);
    setShowModal(true);
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa khách sạn này?")) return;
    try {
      await hotelService.delete(id);
      setHotels((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error(err);
      alert("Xóa khách sạn thất bại!");
    }
  };

  const handleSave = async (hotel) => {
    try {
      if (hotel.id) {
        await hotelService.update(hotel.id, hotel);
      } else {
        const newHotel = await hotelService.create(hotel);
        setHotels((prev) => [...prev, newHotel]);
      }
      fetchHotels();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Lưu khách sạn thất bại!");
    }
  };

  const totalPages = Math.ceil(hotels.length / PAGE_SIZE);
  const paginatedHotels = hotels.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải khách sạn...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!hotels.length) return <div className="alert alert-info text-center">Chưa có khách sạn nào</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý khách sạn</h2>
        <Button variant="primary" onClick={handleAdd}>
          + Thêm khách sạn
        </Button>
      </div>

      <Row className="g-4">
        {paginatedHotels.map((hotel) => (
          <Col lg={4} md={6} key={hotel.id}>
            <Card className="h-100 shadow-sm">
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold text-primary">{hotel.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {hotel.address} <br />
                    📞 {hotel.phone} | ✉️ {hotel.email} <br />
                    ⭐ {hotel.rating || "Chưa đánh giá"}
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button size="sm" variant="warning" onClick={() => handleEdit(hotel)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(hotel.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Prev / Next */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <HotelModal show={showModal} handleClose={() => setShowModal(false)} handleSave={handleSave} hotelData={editingHotel} />
    </Container>
  );
}

export default Hotels;
