import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import customerService from "../../services/customerService";

function Profile() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await customerService.get();
        setCustomer(data);
      } catch (err) {
        console.error(err);
        setError("Không tải được thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await customerService.update({
        fullname: customer.fullname,
        phone: customer.phone,
      });

      setMessage("Cập nhật thông tin thành công!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Lỗi cập nhật. Vui lòng thử lại!");
      setMessage("");
    }
  };

  // =========================
  // DELETE ACCOUNT
  // =========================
  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản?")) return;

    try {
      await customerService.delete();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      setError("Không thể xóa tài khoản.");
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!customer)
    return <h3 className="text-center">Không có dữ liệu</h3>;

  // =========================
  // UI
  // =========================
  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <Card className="shadow p-4">
        <h3 className="text-center mb-3">Thông tin tài khoản</h3>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* FULLNAME */}
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              value={customer.fullname || ""}
              onChange={(e) =>
                setCustomer({ ...customer, fullname: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={customer.email || ""}
              disabled
            />
          </Form.Group>

          {/* PHONE */}
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              value={customer.phone || ""}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              required
            />
          </Form.Group>

          {/* BUTTONS */}
          <Button type="submit" variant="primary" className="w-100 mb-2">
            Cập nhật
          </Button>

          <Button
            variant="outline-danger"
            className="w-100"
            onClick={handleDelete}
          >
            Xóa tài khoản
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Profile;