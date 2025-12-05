import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Sửa: Dùng useSearchParams
import { Card, Row, Col, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaDoorOpen, FaUserFriends, FaRegStickyNote, FaDollarSign } from "react-icons/fa"; // Thêm icons
import bookingService from "../../services/bookingService";
import roomService from "../../services/roomService"; // Cần để lấy thông tin phòng
import formatCurrency from "../../utils/formatCurrency"; 

// Giả định: currentUser phải được lấy từ Context/Redux
const MOCK_USER_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; 
const MAX_GUESTS = 5; // Giới hạn số khách

function BookingForm() {
    const [searchParams] = useSearchParams();
    
    // Lấy ID phòng và ID khách sạn từ URL query params
    const roomId = searchParams.get("roomId"); 
    const hotelId = searchParams.get("hotelId"); 
    
    const navigate = useNavigate();

    // 1. State Dữ liệu/Form
    const [room, setRoom] = useState(null); // Lưu thông tin phòng đã chọn
    const [name, setName] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [note, setNote] = useState("");

    // 2. State Xử lý
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataLoading, setDataLoading] = useState(true); // State load data ban đầu

    // 3. Effect: Load thông tin phòng khi component được mount
    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (!roomId || !hotelId) {
                setError("Thiếu ID phòng hoặc ID khách sạn.");
                setDataLoading(false);
                return;
            }
            try {
                // Gọi API lấy chi tiết phòng
                const roomData = await roomService.getById(roomId); 
                setRoom(roomData);
            } catch (err) {
                setError("Không thể tải thông tin phòng này.");
                console.error(err);
            } finally {
                setDataLoading(false);
            }
        };
        fetchRoomDetails();
    }, [roomId, hotelId]);

    // 4. Tính toán Tổng tiền
    const totalAmount = room && guests > 0 ? room.price * Number(guests) : 0;
    
    // 5. Hàm Xử lý Đặt phòng
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra logic ngày tháng đơn giản (có thể cải tiến thêm)
        if (new Date(checkIn) >= new Date(checkOut)) {
            return setError("Ngày trả phòng phải sau ngày nhận phòng.");
        }
        
        // Kiểm tra dữ liệu phòng đã load
        if (!room) return setError("Không thể đặt phòng do thiếu thông tin.");

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const payload = {
                // Sửa lỗi: Sử dụng MOCK_USER_ID thay vì currentUser.id
                userId: MOCK_USER_ID, 
                // Sửa lỗi: Sử dụng hotelId từ URL/state thay vì room.hotelId
                hotelId: hotelId, 
                // Sửa lỗi: Sử dụng roomId từ URL thay vì id (useParams)
                roomId: roomId, 
                checkingDate: checkIn,
                checkoutDate: checkOut,
                status: "pending",
                totalAmount: totalAmount, 
            };

            const result = await bookingService.create(payload);

            setSuccess("Đặt phòng thành công! Đang chuyển hướng...");
            setTimeout(() => navigate("/bookings"), 1500); // Chuyển đến trang danh sách bookings
        } catch (err) {
            console.error(err.response || err);
            setError(err.response?.data?.message || "Có lỗi xảy ra khi đặt phòng!");
        } finally {
            setLoading(false);
        }
    };

    // --- Render ---

    if (dataLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải chi tiết phòng...</p>
            </div>
        );
    }
    
    if (error && !loading) {
        // Hiển thị lỗi nghiêm trọng (thiếu ID, lỗi API khi tải phòng)
        return (
             <div className="d-flex justify-content-center py-5">
                <Alert variant="danger" style={{ maxWidth: "600px", width: "100%" }}>
                    <h5 className="alert-heading">Lỗi Tải Dữ liệu</h5>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0 small">Vui lòng quay lại trang danh sách phòng.</p>
                </Alert>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <Card className="shadow-lg border-0" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
                <Card.Header 
                    className="border-0 text-white p-4"
                    style={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        background: "linear-gradient(135deg, #0d6efd, #20c997)",
                    }}
                >
                    <h3 className="mb-0 text-center fw-bold">Xác nhận Đặt phòng</h3>
                    <p className="mb-0 text-center small opacity-75">
                        Phòng: **{room?.roomType || 'Đang tải...'}** (Phòng số: **{room?.roomNumber || 'N/A'}**)
                    </p>
                </Card.Header>

                <Card.Body className="p-4">
                    {/* Thông báo lỗi/thành công */}
                    {error && <Alert variant="danger" className="py-2">{error}</Alert>}
                    {success && <Alert variant="success" className="py-2">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* 1. Họ và tên */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold small text-muted">Họ và tên người đặt</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaUser /></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ tên của bạn"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* 2. Ngày nhận/trả phòng */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold small text-muted">Ngày nhận phòng</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                                        <Form.Control
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold small text-muted">Ngày trả phòng</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><FaDoorOpen /></InputGroup.Text>
                                        <Form.Control
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* 3. Số khách */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold small text-muted">Số khách</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaUserFriends /></InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max={MAX_GUESTS} // Giới hạn max guests
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* 4. Ghi chú */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold small text-muted">Ghi chú (tuỳ chọn)</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaRegStickyNote /></InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Ví dụ: Yêu cầu giường đôi, tầng cao..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* 5. Tóm tắt và Tổng tiền */}
                        <div className="bg-light rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center border">
                            <div>
                                <h6 className="mb-1 fw-bold text-primary">Tổng cộng:</h6>
                                <p className="mb-0 small text-muted">
                                    Giá phòng (x{guests} khách): {formatCurrency(room?.price || 0)}/khách/đêm
                                </p>
                            </div>
                            <h4 className="mb-0 fw-bolder text-danger d-flex align-items-center">
                                <FaDollarSign className="me-2" size={20} />
                                {formatCurrency(totalAmount)}
                            </h4>
                        </div>

                        {/* Nút Submit */}
                        <div className="d-grid gap-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="fw-semibold"
                                style={{ borderRadius: "999px" }}
                                disabled={loading || !room}
                            >
                                {loading ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    "Xác nhận đặt phòng"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookingForm;