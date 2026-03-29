import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UserModal({ show, handleClose, handleSave, userData }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFullname(userData.fullname || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setRoles(userData.roles || "");
      setPassword(""); // edit không cần password
    } else {
      setFullname("");
      setEmail("");
      setPhone("");
      setRoles("");
      setPassword("");
    }
    setErrors({});
  }, [userData, show]);

  const validate = () => {
    let err = {};
    if (!fullname) err.fullname = "Họ và tên bắt buộc";
    if (!email) err.email = "Email bắt buộc";
    if (!roles) err.roles = "Vai trò bắt buộc";

    // chỉ bắt buộc password khi tạo mới
    if (!userData && !password) {
      err.password = "Mật khẩu bắt buộc";
    }

    return err;
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    handleSave({
      id: userData ? userData.id : undefined,
      fullname,
      email,
      phone,
      roles,
      password: userData ? undefined : password, // chỉ gửi khi create
    });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {userData ? "Cập nhật người dùng" : "Thêm người dùng"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Fullname */}
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Nhập họ và tên"
            />
            {errors.fullname && (
              <small className="text-danger">{errors.fullname}</small>
            )}
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </Form.Group>

          {/* Password - chỉ hiện khi thêm */}
          {!userData && (
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </Form.Group>
          )}

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </Form.Group>

          {/* Roles */}
          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
            >
              <option value="">Chọn vai trò</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </Form.Select>
            {errors.roles && (
              <small className="text-danger">{errors.roles}</small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {userData ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;