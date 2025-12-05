import React, { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert, Badge, Card, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import bookingService from "../../services/bookingService";
import formatCurrency from "../../utils/formatCurrency"; // Đảm bảo đã có hàm này
import formatDate from "../../utils/formatDate"; // <--- Cần tạo hàm này

// Hàm tiện ích đơn giản để định dạng trạng thái (status)
const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
        case 'completed':
            return 'success';
        case 'pending':
            return 'warning';
        case 'cancelled':
            return 'danger';
        default:
            return 'secondary';
    }
};

// Giả định hàm formatDate (Nếu chưa có, bạn có thể tạo trong utils/formatDate.js)
// const formatDate = (dateString) => {
//    return new Date(dateString).toLocaleDateString('vi-VN', { 
//        year: 'numeric', month: '2-digit', day: '2-digit', 
//        hour: '2-digit', minute: '2-digit'
//    });
// };


const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Thêm state cho lỗi

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                // Giả định service trả về mảng dữ liệu đặt phòng
                const data = await bookingService.getAll();
                // Đảm bảo data là mảng
                setBookings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Không thể tải danh sách đặt phòng.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    // 1. Trạng thái Loading
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải lịch sử đặt phòng...</p>
            </div>
        );
    }

    // 2. Trạng thái Error
    if (error) {
        return <Alert variant="danger" className="text-center">{error}</Alert>;
    }

    // 3. Trạng thái Empty
    if (!bookings.length) {
        return <Alert variant="info" className="text-center">Bạn chưa có lịch sử đặt phòng nào.</Alert>;
    }

    // 4. Render Danh sách (Sử dụng Table để hiển thị chi tiết)
    return (
        <Container className="py-4">
            <h2 className="mb-4 text-primary fw-bold">Lịch sử Đặt phòng của bạn</h2>
            
            <Card className="shadow-sm">
                <Card.Body className="p-0">
                    <Table striped hover responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ngày Check-in</th>
                                <th>Ngày Check-out</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking.id}>
                                    <td>{index + 1}</td>
                                    <td className="fw-medium">
                                        <FaCalendarAlt className="text-info me-1" size={12} />
                                        {/* Sử dụng hàm formatDate */}
                                        {formatDate(booking.checkingDate)}
                                    </td>
                                    <td className="fw-medium">
                                        <FaClock className="text-danger me-1" size={12} />
                                        {formatDate(booking.checkoutDate)}
                                    </td>
                                    <td>
                                        <span className="fw-bold text-success">
                                            <FaMoneyBillWave className="me-1" size={14} />
                                            {/* Sử dụng hàm formatCurrency */}
                                            {formatCurrency(booking.totalAmount)}
                                        </span>
                                    </td>
                                    <td>
                                        <Badge bg={getStatusVariant(booking.status)} className="p-2">
                                            {booking.status?.toUpperCase() || 'KHÔNG RÕ'}
                                        </Badge>
                                    </td>
                                    <td>
                                        {/* Giả định nút xem chi tiết đặt phòng */}
                                        <a href={`/bookings/${booking.id}`} className="text-primary fw-medium">
                                            <FaInfoCircle className="me-1" /> Xem
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
            {/* LƯU Ý: Nếu muốn giao diện dạng card cho mobile, có thể thêm vào đây */}
        </Container>
    );
};

export default BookingList;