import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Dropdown,Spinner,} from "react-bootstrap";
import { FaUserFriends, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Banner from "../../components/Header/Banner";
import hotelService from "../../services/hotelService"; 
import keycloak from "../../keycloak/Keycloak";

// Hàm tiện ích: lấy ngày hôm nay và ngày mai để đặt mặc định
const getToday = () => new Date().toISOString().split('T')[0];
const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

function Home() {
    const navigate = useNavigate();

    // State tìm kiếm - Đặt giá trị mặc định cho ngày tháng
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState(getToday());
    const [checkOut, setCheckOut] = useState(getTomorrow());
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
                const data = await hotelService.getAll(); 
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

        // 1. Kiểm tra ngày hợp lệ
        if (new Date(checkIn) >= new Date(checkOut)) {
            alert("Ngày trả phòng phải sau ngày nhận phòng.");
            return;
        }

        // 2. Kiểm tra đăng nhập
        if (!keycloak.authenticated) {
            keycloak.login();
            return;
        }
        
        // 3. Thực hiện chuyển hướng
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
    
    // Thiết lập ràng buộc cho Date Picker
    const handleCheckInChange = (e) => {
        const newCheckIn = e.target.value;
        setCheckIn(newCheckIn);
        // Nếu ngày nhận phòng mới >= ngày trả phòng, đặt ngày trả phòng là ngày sau ngày nhận phòng
        if (new Date(newCheckIn) >= new Date(checkOut)) {
            const nextDay = new Date(newCheckIn);
            nextDay.setDate(nextDay.getDate() + 1);
            setCheckOut(nextDay.toISOString().split('T')[0]);
        }
    };

    return (
        <div>
            {/* Banner */}
            <Banner />

            {/* Thanh tìm kiếm */}
            <Container style={{ marginTop: "-60px", marginBottom: "60px" }}>
                <Form onSubmit={handleSearch}>
                    <Card className="shadow-lg border-0" style={{ borderRadius: "12px" }}>
                        <Row className="g-0">
                            
                            {/* Cột 1: Điểm đến */}
                            <Col md={2} sm={12} className="p-3">
                                <div className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="me-2 text-primary" size={20} />
                                    <div className="flex-grow-1">
                                        <Form.Label className="mb-0 small fw-bold text-muted">Điểm đến</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Bạn muốn đến đâu?"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            style={{ border: "none", boxShadow: "none", padding: 0 }}
                                            required
                                        />
                                    </div>
                                </div>
                            </Col>
                            
                            {/* Cột 2: Ngày */}
                            <Col md={4} sm={12} className="p-3" style={{ borderLeft: "1px solid #e3e3e3", borderRight: "1px solid #e3e3e3" }}>
                                <Row className="g-2">
                                    <Col xs={6}>
                                        <Form.Label className="mb-0 small fw-bold text-muted">Ngày nhận phòng</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={checkIn}
                                            onChange={handleCheckInChange}
                                            min={getToday()} // Ngăn người dùng chọn ngày trong quá khứ
                                            style={{ border: "none", boxShadow: "none", padding: 0 }}
                                            required
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Label className="mb-0 small fw-bold text-muted">Ngày trả phòng</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            min={checkIn} // Ngăn ngày trả phòng trước ngày nhận phòng
                                            style={{ border: "none", boxShadow: "none", padding: 0 }}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            {/* Cột 3: Khách & phòng + Nút Tìm */}
                            <Col md={6} sm={12} className="p-3">
                                <Row className="g-2 align-items-center">
                                    {/* Khách & phòng Dropdown */}
                                    <Col xs={7}>
                                        <Form.Label className="mb-0 small fw-bold text-muted">Khách & phòng</Form.Label>
                                        <Dropdown
                                            show={showGuestDropdown}
                                            onToggle={(isOpen) => setShowGuestDropdown(isOpen)}
                                        >
                                            {/* *** ĐIỂM ĐÃ SỬA: Thay as={Form.Control} bằng as="div" để tránh lỗi thẻ rỗng (void element) *** */}
                                            <Dropdown.Toggle
                                                as="div" 
                                                className="d-flex align-items-center justify-content-between border rounded px-2 py-1"
                                                style={{ cursor: "pointer", backgroundColor: "#fff", height: 'auto' }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <FaUserFriends className="me-2" />
                                                    <span className="text-truncate">{guestText}</span>
                                                </div>
                                                <span>▾</span>
                                            </Dropdown.Toggle>

                                            {/* Dropdown Menu logic giữ nguyên */}
                                            <Dropdown.Menu align="end" style={{ minWidth: "260px", padding: "1rem" }} onClick={(e) => e.stopPropagation()}>
                                                
                                                {/* Người lớn */}
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

                                                {/* Trẻ em */}
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

                                                {/* Phòng */}
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
                                    </Col>

                                    {/* Nút Tìm */}
                                    <Col xs={5}>
                                        <Button
                                            type="submit"
                                            className="w-100 h-100 btn-lg d-flex align-items-center justify-content-center"
                                            style={{ borderRadius: "8px" }}
                                        >
                                            <FaSearch className="me-2" /> Tìm
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Card>
                </Form>
            </Container>

            {/* Danh sách Khách sạn nổi bật */}
            <Container className="mb-5">
                <h2 className="mb-4 text-center">✨ Khách sạn nổi bật</h2>

                {loadingHotels ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2 text-muted">Đang tải khách sạn...</p>
                    </div>
                ) : errorHotels ? (
                    <div className="text-center text-danger py-3">{errorHotels}</div>
                ) : hotels.length === 0 ? (
                    <div className="text-center py-3 text-muted">Chưa có khách sạn nổi bật nào để hiển thị.</div>
                ) : (
                    <Row>
                        {hotels.map((hotel) => (
                            <Col lg={4} md={6} className="mb-4" key={hotel.id}>
                                <Card className="shadow-sm h-100 hotel-card-hover" style={{ borderRadius: "10px", overflow: "hidden" }}>
                                    <Card.Img
                                        variant="top"
                                        src={
                                            hotel.imageUrl || `https://picsum.photos/400/250?random=${hotel.id}`
                                        }
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-primary mb-1">{hotel.name}</Card.Title>
                                        <Card.Text className="small text-muted mb-3">
                                            <FaMapMarkerAlt className="me-1" size={12} /> {hotel.address}
                                        </Card.Text>
                                        {/* Giả định có rating từ 1-5 */}
                                        <Card.Text className="mb-2">
                                            {[...Array(Math.min(5, hotel.rating || 4))].map((_, i) => <span key={i} className="text-warning">★</span>)}
                                        </Card.Text>
                                        
                                        <div className="mt-auto"> 
                                            <Button variant="outline-primary" as={Link} to={`/rooms?hotelId=${hotel.id}`} className="w-100">
                                                Xem phòng
                                            </Button>
                                        </div>
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