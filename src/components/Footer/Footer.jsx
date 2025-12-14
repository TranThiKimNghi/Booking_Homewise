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
      <Container className="py-5">
        <Row className="text-center text-md-start">
          {/* Column 1: Hotel Info */}
          <Col md={3} className="mb-3">
            <h5 className="fw-bold">Hotel Booking</h5>
            <p className="small">
              Đặt phòng khách sạn nhanh chóng, tiện lợi và an toàn. Hỗ trợ khách hàng 24/7.
            </p>
          </Col>

          {/* Column 2: Liên kết nhanh & Hỗ trợ */}
          <Col md={3} className="mb-3">
            <h6 className="fw-semibold">Liên kết & Hỗ trợ</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-white text-decoration-none">Trang chủ</Link></li>
              <li><Link to="/rooms" className="text-white text-decoration-none">Khách sạn</Link></li>
              <li><Link to="/login" className="text-white text-decoration-none">Đăng nhập</Link></li>
              <li><Link to="/register" className="text-white text-decoration-none">Đăng ký</Link></li>
              <li className="mt-2">Quản lí các chuyến đi của bạn</li>
              <li>Liên hệ Dịch vụ Khách hàng</li>
              <li>Trung tâm thông tin bảo mật</li>
            </ul>
          </Col>

          {/* Column 3: Khám phá thêm */}
          <Col md={3} className="mb-3">
            <h6 className="fw-semibold">Khám phá thêm</h6>
            <ul className="list-unstyled small">
              <li>Chương trình khách hàng thân thiết Genius</li>
              <li>Ưu đãi theo mùa và dịp lễ</li>
              <li>Bài viết về du lịch</li>
              <li>Booking.com dành cho Doanh Nghiệp</li>
              <li>Traveller Review Awards</li>
              <li>Cho thuê xe hơi</li>
              <li>Tìm chuyến bay</li>
              <li>Đặt nhà hàng</li>
              <li>Booking.com dành cho Đại Lý Du Lịch</li>
            </ul>
          </Col>

          {/* Column 4: Về chúng tôi & Điều khoản */}
          <Col md={3} className="mb-3">
            <h6 className="fw-semibold">Về chúng tôi & Điều khoản</h6>
            <ul className="list-unstyled small">
              <li>Điều khoản và cài đặt</li>
              <li>Chính sách Bảo mật</li>
              <li>Điều khoản dịch vụ</li>
              <li>Chính sách về Khả năng tiếp cận</li>
              <li>Tranh chấp đối tác</li>
              <li>Chính sách chống Nô lệ Hiện đại</li>
              <li>Chính sách về Quyền con người</li>
              <li>Dành cho đối tác</li>
              <li>Đăng nhập vào trang Extranet</li>
              <li>Trợ giúp đối tác</li>
              <li>Đăng chỗ nghỉ của Quý vị</li>
              <li>Trở thành đối tác phân phối</li>
              <li>Về chúng tôi</li>
              <li>Về Booking.com</li>
              <li>Chúng tôi hoạt động như thế nào</li>
              <li>Du lịch bền vững</li>
              <li>Truyền thông</li>
              <li>Cơ hội việc làm</li>
              <li>Quan hệ cổ đông</li>
              <li>Liên hệ công ty</li>
              <li>Hướng dẫn và cáo báo nội dung</li>
            </ul>
          </Col>
        </Row>

        {/* Social Icons */}
        <Row className="mt-4">
          <Col className="d-flex justify-content-center gap-3">
            <a href="#" className="text-white fs-5"><FaFacebook /></a>
            <a href="#" className="text-white fs-5"><FaTwitter /></a>
            <a href="#" className="text-white fs-5"><FaInstagram /></a>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.5)" }} />
        <p className="text-center small mb-0">&copy; 2025 Hotel Booking. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
