import React, { useState } from "react";
import { Card, Form, InputGroup, Row, Col, Container } from "react-bootstrap";
import { FaSearch, FaDollarSign, FaBed } from "react-icons/fa";
import RoomList from "../components/Room/RoomList";

function Rooms() {
    // 1. State cho các điều kiện lọc
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [roomType, setRoomType] = useState("");

    // Tạo đối tượng filterProps để truyền xuống RoomList
    const filterProps = { search, priceRange, roomType };

    return (
        <Container className="py-5">
            {/* 🏞️ Banner - Thêm hiệu ứng shadow và text-shadow */}
            <div
                className="p-5 mb-5 text-center text-white shadow-lg d-flex flex-column justify-content-center align-items-center"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1560448075-bb4e1f8a72cd")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    minHeight: "220px",
                }}
            >
                <h1 className="display-5 fw-bolder mb-2 text-shadow">
                    Chọn phòng bạn muốn đặt
                </h1>
                <p className="lead fw-normal text-shadow">
                    Xem các phòng có sẵn và các tiện nghi đi kèm.
                </p>
            </div>

            {/* ⚙️ Bộ lọc Nâng cao - Đặt trong Card */}
            <Card className="shadow-sm mb-5 p-3">
                <Card.Body>
                    <Card.Title className="mb-4 text-primary d-flex align-items-center">
                        Bộ lọc Phòng
                    </Card.Title>
                    <Row className="g-3 align-items-end">
                        
                        {/* 1. Tìm kiếm tên/loại phòng */}
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="small fw-bold text-muted">Tên hoặc mô tả phòng</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tìm theo tên phòng..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        {/* 2. Lọc theo Loại phòng */}
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label className="small fw-bold text-muted">Loại phòng</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><FaBed /></InputGroup.Text>
                                    <Form.Select 
                                        value={roomType} 
                                        onChange={(e) => setRoomType(e.target.value)}
                                    >
                                        <option value="">Tất cả loại phòng</option>
                                        {/* Giả định các loại phòng phổ biến */}
                                        <option value="Single">Single (1 người)</option>
                                        <option value="Double">Double (2 người)</option>
                                        <option value="Twin">Twin (2 giường đơn)</option>
                                        <option value="VIP Suite">VIP Suite</option>
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>
                        </Col>

                        {/* 3. Lọc theo Mức giá */}
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label className="small fw-bold text-muted">Mức giá (VND)</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><FaDollarSign /></InputGroup.Text>
                                    <Form.Select 
                                        value={priceRange} 
                                        onChange={(e) => setPriceRange(e.target.value)}
                                    >
                                        <option value="">Tất cả mức giá</option>
                                        {/* Giá trị này sẽ được RoomList xử lý logic */}
                                        <option value="1">Dưới 1.000.000 ₫</option>
                                        <option value="2">1.000.000 ₫ - 3.000.000 ₫</option>
                                        <option value="3">Trên 3.000.000 ₫</option>
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        
                    </Row>
                </Card.Body>
            </Card>

            {/* 🏨 Danh sách phòng (Truyền props lọc xuống) */}
            <RoomList filter={filterProps} />

            <style jsx="true">{`
                .text-shadow {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
                }
            `}</style>
        </Container>
    );
}

export default Rooms;