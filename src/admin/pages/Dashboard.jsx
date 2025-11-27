import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";

function Dashboard() {
  const stats = [
    { title: "Total Rooms", value: 48, sub: "Available: 30 | Occupied: 18" },
    { title: "Total Bookings (Today)", value: 12, sub: "6 confirmed · 3 pending · 3 cancelled" },
    { title: "Total Users", value: 210, sub: "New this week: 15" },
  ];

  const occupancy = 65; // % phòng đang được đặt (mock)
  const revenue = 75;   // % doanh thu so với target (mock)

  return (
    <div>
      {/* Title + Subtitle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <small className="text-muted">
            Tổng quan hoạt động khách sạn hôm nay
          </small>
        </div>
        <div className="text-end">
          <span className="badge bg-primary me-2">Admin</span>
          <span className="text-muted">Last update: just now</span>
        </div>
      </div>

      {/* 3 cards statistics */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="text-muted" style={{ fontSize: "0.9rem" }}>
                  {stat.title}
                </Card.Title>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    margin: "0.25rem 0 0.5rem",
                  }}
                >
                  {stat.value}
                </div>
                <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {stat.sub}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Occupancy & Revenue */}
      <Row>
        <Col md={6} className="mb-3">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0" style={{ fontSize: "1rem" }}>
                  Tỉ lệ lấp đầy phòng
                </Card.Title>
                <span className="fw-bold">{occupancy}%</span>
              </div>
              <ProgressBar now={occupancy} label={`${occupancy}%`} />
              <small className="text-muted d-block mt-2">
                Số phòng đã đặt so với tổng số phòng.
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0" style={{ fontSize: "1rem" }}>
                  Doanh thu tháng (so với mục tiêu)
                </Card.Title>
                <span className="fw-bold">{revenue}%</span>
              </div>
              <ProgressBar variant="success" now={revenue} label={`${revenue}%`} />
              <small className="text-muted d-block mt-2">
                Doanh thu hiện tại so với mục tiêu đặt ra trong tháng.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
