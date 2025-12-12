import React, { useEffect, useState } from "react";
import userService from "../../services/customerService";
import UserModal from "../components/UserModal";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const list = await userService.getAll();
      setUsers(list);
    } catch (err) {
      console.log("Load user lỗi:", err);
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

        setUsers((prev) =>
          prev.map((u) => (u.id === data.id ? { ...u, ...data } : u))
        );
      } else {
        const newUser = await userService.create(data);
        setUsers((prev) => [...prev, newUser]);
      }
    } catch (error) {
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

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý người dùng</h2>
        <button
          className="btn btn-primary fw-semibold"
          onClick={() => {
            setSelectedUser(null);
            setModalShow(true);
          }}
        >
          + Thêm người dùng
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : users.length === 0 ? (
        <p>Chưa có người dùng.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setSelectedUser(u);
                      setModalShow(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <UserModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleSave={handleSave}
        userData={selectedUser}
      />
    </div>
  );
}

export default Users;
