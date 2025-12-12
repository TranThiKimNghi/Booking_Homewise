import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import customerService from "../../services/customerService";

function Profile() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        const res = await customerService.getInfo(token);
        setCustomer(res.data);
      } catch (err) {
        setError("Không tải được thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await customerService.update(token, {
        fullname: customer.fullname,
        phone: customer.phone,
      });

      setMessage("Cập nhật thông tin thành công!");
      setError("");
    } catch (err) {
      setError("Lỗi cập nhật. Vui lòng thử lại!");
      setMessage("");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!customer) return <h3 className="text-center">Không có dữ liệu</h3>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <Card className="shadow-sm p-4">
        <h3 className="text-center mb-3">Thông tin tài khoản</h3>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              value={customer.fullname}
              onChange={(e) =>
                setCustomer({ ...customer, fullname: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={customer.email} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Cập nhật
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Profile;
