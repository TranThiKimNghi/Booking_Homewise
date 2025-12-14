// src/admin/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import userService from "../../services/customerService";
import UserModal from "../components/models/UserModal";

const PAGE_SIZE = 6;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const list = await userService.getAll();
      setUsers(list ?? []);
      setError("");
    } catch (err) {
      console.error("Load user lỗi:", err);
      setError("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await userService.update(data.id, data);
        setUsers((prev) => prev.map((u) => (u.id === data.id ? { ...u, ...data } : u)));
      } else {
        const newUser = await userService.create(data);
        setUsers((prev) => [...prev, newUser]);
      }
      setModalShow(false);
    } catch {
      alert("Lưu người dùng thất bại.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
    try {
      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Xóa thất bại.");
    }
  };

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Đang tải người dùng...</p>
      </div>
    );

  if (error) return <div className="alert alert-danger text-center">{error}</div>;
  if (!users.length) return <div className="alert alert-info text-center">Chưa có người dùng</div>;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý người dùng</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedUser(null);
            setModalShow(true);
          }}
        >
          + Thêm người dùng
        </Button>
      </div>

      <Row className="g-4">
        {paginatedUsers.map((u, i) => (
          <Col md={6} lg={4} key={u.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold text-primary">{u.fullName}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <strong>Email:</strong> {u.email} <br />
                    <strong>SĐT:</strong> {u.phoneNumber} <br />
                    <strong>Vai trò:</strong>{" "}
                    <Badge bg={u.role === "admin" ? "success" : "secondary"}>{u.role}</Badge>
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      setSelectedUser(u);
                      setModalShow(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteUser(u.id)}>
                    Xóa
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Modal */}
      <UserModal show={modalShow} handleClose={() => setModalShow(false)} handleSave={handleSave} userData={selectedUser} />
    </Container>
  );
}

export default Users;
