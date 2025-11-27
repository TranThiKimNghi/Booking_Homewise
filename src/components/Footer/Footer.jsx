import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="text-white mt-auto"
      style={{
        backgroundColor: "#1e90ff",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        boxShadow: "0 -4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Container className="py-4">
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Hotel Booking</h5>
            <p className="small">
              Đặt phòng khách sạn nhanh chóng, tiện lợi và an toàn. Hỗ trợ khách hàng 24/7.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className="fw-semibold">Liên kết nhanh</h6>
            <ul className="list-unstyled small">
              <li>
                <Link to="/" className="text-white text-decoration-none">Trang chủ</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-white text-decoration-none">Khách sạn</Link>
              </li>
              <li>
                <Link to="/login" className="text-white text-decoration-none">Đăng nhập</Link>
              </li>
              <li>
                <Link to="/register" className="text-white text-decoration-none">Đăng ký</Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className="fw-semibold">Theo dõi chúng tôi</h6>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-white fs-5"><FaFacebook /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "rgba(255,255,255,0.5)" }} />
      </Container>
    </footer>
  );
}

export default Footer;
