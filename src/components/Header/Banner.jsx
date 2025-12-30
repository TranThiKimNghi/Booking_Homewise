import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section
      style={{
        width: "100%",
        height: "500px",
        backgroundImage:
          "url('https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row>
          <Col md={8}>
            <h1 className="text-white fw-bold" style={{ fontSize: "3rem" }}>
              Welcome to HotelBooking
            </h1>
            <p className="text-white fs-5 mb-4">
              Đặt phòng khách sạn nhanh chóng, tiện lợi với hệ thống quản lý thông minh.
            </p>
            <Button
              as={Link}
              to="/rooms"
              variant="danger"
              size="lg"
              style={{ borderRadius: "6px" }}
            >
              Xem phòng ngay
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Banner;
