import React, { useEffect, useState, useMemo } from "react";
import { 
    Card, Button, Row, Col, Spinner, 
    Pagination, 
} from "react-bootstrap";
import { FaMapMarkerAlt, FaStar, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import hotelService from "../../services/hotelService";

// Cấu hình: Số khách sạn tối đa mỗi trang
const HOTELS_PER_PAGE = 5; 

/**
 * Component hiển thị danh sách khách sạn, áp dụng lọc và phân trang
 * @param {object} props
 * @param {object} props.filter - Điều kiện lọc (search, provinceId, rating)
 */
function HotelList({ filter = {} }) { 
    const [allHotels, setAllHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 

    const { search, provinceId, rating } = filter; 

    // 1. Fetch dữ liệu khách sạn
    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const data = await hotelService.getAll();
                setAllHotels(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Fetch Hotels Error:", err);
                setError(err.response?.data?.message || "Lấy danh sách khách sạn thất bại!");
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // 2. Logic Lọc dữ liệu
    const filteredHotels = useMemo(() => {
        // Reset trang về 1 khi bộ lọc thay đổi
        setCurrentPage(1); 
        
        if (!allHotels.length) return [];

        return allHotels.filter((hotel) => {
            let passesFilter = true;
            
            // Lọc theo Tên (name)
            if (search) {
                passesFilter = passesFilter && hotel.name.toLowerCase().includes(search.toLowerCase());
            }

            // Lọc theo Tỉnh/Thành (provinceId)
            if (provinceId) {
                passesFilter = passesFilter && hotel.provinceId === provinceId;
            }

            // Lọc theo Đánh giá (rating)
            if (rating) {
                const minRating = parseInt(rating, 10);
                passesFilter = passesFilter && (hotel.rating >= minRating);
            }

            return passesFilter;
        });
    }, [allHotels, search, provinceId, rating]);

    // 3. Logic Phân trang
    const totalResults = filteredHotels.length;
    const totalPages = Math.ceil(totalResults / HOTELS_PER_PAGE);
    
    const currentHotels = useMemo(() => {
        const startIndex = (currentPage - 1) * HOTELS_PER_PAGE;
        const endIndex = startIndex + HOTELS_PER_PAGE;
        return filteredHotels.slice(startIndex, endIndex);
    }, [filteredHotels, currentPage]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
        }
    };
    
    // Tính toán thống kê trang
    const startIndex = (currentPage - 1) * HOTELS_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * HOTELS_PER_PAGE, totalResults);


    // --- Hiển thị Trạng thái (Loading, Error) ---
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải danh sách khách sạn...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    // Hiển thị "Không tìm thấy"
    if (filteredHotels.length === 0) {
        return (
            <div className="alert alert-warning text-center">
                Không tìm thấy khách sạn nào phù hợp với điều kiện tìm kiếm/lọc của bạn.
            </div>
        );
    }
    
    // --- Render Danh sách ---
    return (
        <>
            <Row>
                {/* Vẫn giữ nguyên giao diện Card ngang đã sửa trước đó */}
                {currentHotels.map((hotel) => (
                    <Col lg={12} className="mb-4" key={hotel.id}>
                        <Card className="shadow-sm h-100 hotel-card-hover border-0">
                            <Row className="g-0">
                                <Col md={4} style={{ overflow: 'hidden' }}>
                                    <Card.Img
                                        src={
                                            hotel.imageUrl || `https://picsum.photos/400/300?random=${hotel.id}` 
                                        }
                                        alt={hotel.name}
                                        style={{ height: "100%", objectFit: "cover", borderRadius: "10px 0 0 10px" }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="d-flex flex-column justify-content-between p-4">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Card.Title className="text-primary fw-bold mb-0 me-2" style={{ fontSize: '1.5rem' }}>
                                                    {hotel.name}
                                                </Card.Title>
                                                <div className="text-nowrap">
                                                    {[...Array(Math.min(5, hotel.rating || 0))].map((_, i) => (
                                                        <FaStar key={i} className="text-warning me-1" size={16} />
                                                    ))}
                                                    <span className="small text-muted ms-1">({hotel.rating || 0} sao)</span>
                                                </div>
                                            </div>

                                            <Card.Text className="small text-muted mb-3">
                                                <FaMapMarkerAlt className="me-1 text-secondary" size={14} /> 
                                                <span className="fw-medium">{hotel.address || "Địa chỉ chưa cập nhật"}</span>
                                            </Card.Text>
                                            
                                            <p className="text-muted" style={{ fontSize: '0.9rem', maxHeight: '50px', overflow: 'hidden' }}>
                                                {hotel.description || "Khách sạn cung cấp dịch vụ nghỉ dưỡng cao cấp, tiện nghi hiện đại và vị trí thuận lợi."}
                                            </p>
                                        </div>

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

            {/* 🚀 Giao diện Phân trang Mới (Sáng tạo hơn) */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-5 p-3 border-top">
                   

                    {/* Các Nút Điều hướng */}
                    <div className="d-flex align-items-center">
                        {/* Nút Quay lại */}
                        <Button 
                            variant="outline-primary" 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="me-3 d-flex align-items-center"
                            style={{ borderRadius: '8px' }}
                        >
                            <FaChevronLeft className="me-1" size={12} /> Trang trước
                        </Button>

                        {/* Số trang hiện tại */}
                        <span className="fw-bold text-primary mx-3">
                            Trang {currentPage} / {totalPages}
                        </span>

                        {/* Nút Tiếp theo */}
                        <Button 
                            variant="outline-primary" 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                            className="d-flex align-items-center"
                            style={{ borderRadius: '8px' }}
                        >
                            Trang sau <FaChevronRight className="ms-1" size={12} />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default HotelList;