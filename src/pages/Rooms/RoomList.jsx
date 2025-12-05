import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link} from "react-router-dom";// Import hook để đọc query params
import { Card, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import { FaBed, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import roomService from "../../services/roomService"; 
import formatCurrency from "../../utils/formatCurrency"; // <--- Hàm tiện ích để định dạng tiền tệ (cần tạo)


function RoomList() {
    // 1. Lấy hotelId từ URL Query Parameter
    const [searchParams] = useSearchParams();
    const hotelId = searchParams.get("hotelId"); 
    
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 2. Fetch dữ liệu phòng (dựa trên hotelId)
    useEffect(() => {
        const fetchRooms = async () => {
            if (!hotelId) {
                // Nếu không có hotelId, không fetch và báo lỗi
                setError("Thiếu ID khách sạn để tải danh sách phòng.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");
            try {
                // *** ĐIỂM SỬA CHỮA: Gọi API chỉ lấy phòng của khách sạn này ***
                // Giả định roomService.getRoomsByHotelId là hàm API chính xác
                const data = await roomService.getRoomsByHotelId(hotelId); 
                
                // Giả định API trả về một mảng phòng
                setRooms(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setError(err.response?.data?.message || "Có lỗi khi tải danh sách phòng!");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [hotelId]); // Dependency: Chỉ chạy lại khi hotelId thay đổi

    // 3. Xử lý trạng thái Loading/Error/Empty
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải phòng...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!rooms.length) {
        return (
            <div className="alert alert-info text-center">
                Không tìm thấy phòng nào cho khách sạn này.
            </div>
        );
    }

    // 4. Render Danh sách phòng với giao diện đẹp mắt
    return (
        <Row className="g-4">
            {rooms.map((room) => (
                // Mỗi phòng chiếm 12 cột trên màn hình lớn để tối đa hóa diện tích Card ngang
                <Col lg={12} key={room.id}>
                    <Card className="shadow-lg border-0 room-card-hover" style={{ borderRadius: "10px" }}>
                        <Row className="g-0">
                            
                            {/* Cột 1: Hình ảnh phòng */}
                            <Col md={4} style={{ overflow: 'hidden' }}>
                                <Card.Img
                                    variant="top"
                                    src={
                                        room.imageUrl || `https://picsum.photos/400/250?random=${room.id}`
                                    }
                                    alt={room.roomType}
                                    style={{ height: "100%", objectFit: "cover", borderRadius: "10px 0 0 10px" }}
                                />
                            </Col>
                            
                            {/* Cột 2: Chi tiết phòng */}
                            <Col md={8}>
                                <Card.Body className="d-flex flex-column justify-content-between p-4">
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-start">
                                            {/* Loại phòng & Số phòng */}
                                            <Card.Title className="text-primary fw-bold" style={{ fontSize: '1.4rem' }}>
                                                <FaBed className="me-2" size={20} />
                                                {room.roomType || "Loại phòng chưa xác định"} 
                                                <span className="text-muted fw-normal ms-3" style={{ fontSize: '0.9rem' }}>
                                                    (Phòng số: {room.roomNumber || 'N/A'})
                                                </span>
                                            </Card.Title>

                                            {/* Trạng thái phòng */}
                                            {room.status === "available" ? (
                                                <Badge bg="success" className="p-2 d-flex align-items-center">
                                                    <FaCheckCircle className="me-1" /> CÒN PHÒNG
                                                </Badge>
                                            ) : (
                                                <Badge bg="danger" className="p-2 d-flex align-items-center">
                                                    <FaTimesCircle className="me-1" /> ĐÃ ĐẶT/HẾT
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Mô tả */}
                                        <Card.Text className="text-muted mt-2" style={{ fontSize: '0.95rem' }}>
                                            {room.description || "Phòng có đầy đủ tiện nghi cơ bản, diện tích rộng rãi, và tầm nhìn đẹp."}
                                        </Card.Text>
                                    </div>
                                    
                                    {/* Giá và nút Đặt */}
                                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                                        <div className="fw-bold text-danger d-flex align-items-center">
                                            <FaMoneyBillWave className="me-2" size={24} />
                                            <span style={{ fontSize: '1.8rem' }}>
                                                {/* Định dạng giá tiền */}
                                                {formatCurrency(room.price) || "Liên hệ giá"}
                                            </span>
                                        </div>

                                        <Button 
                                            
                                            as={Link} 
                                           
                                            to={`/booking?roomId=${room.id}&hotelId=${hotelId}`}

                                            variant="primary" 
                                            disabled={room.status !== "available"}
                                        >
                                            {room.status === "available" ? "Chọn phòng này" : "Tạm thời hết phòng"}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default RoomList;